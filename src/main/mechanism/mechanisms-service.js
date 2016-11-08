function mechanismsService(Restangular, $log, $q, approvalLevelsService, workflowService, categoriesService, rx) {
    var self = this;
    var AGENCY_LEVEL = 'Funding Agency';
    var PARTNER_LEVEL = 'Implementing Partner';

    var period;
    var dataSetIds = [];
    var categories = [];
    var organisationUnit = '';

    var mechanisms = [];

    var orgUnitCache = {};
    var categoryCache = {};

    this.isGlobal = false;

    Object.defineProperty(this, 'period', {
        set: function (value) {
            if (!angular.isString(value)) {
                $log.error('Mechanism Service: Period should be a string');
                return;
            }
            period = value;
        },
        get: function () {
            return period;
        }
    });

    Object.defineProperty(this, 'dataSetIds', {
        set: function (value) {
            if (!angular.isArray(value)) {
                $log.error('Mechanism Service: DataSets should be a string');
                return;
            }
            dataSetIds = value;
        },
        get: function () {
            return dataSetIds;
        }
    });

    Object.defineProperty(this, 'categories', {
        set: function (value) {
            if (!angular.isArray(value)) {
                $log.error('Mechanism Service: Categories should be an array');
                return;
            }
            categories = value;
        },
        get: function () {
            return categories;
        }
    });

    Object.defineProperty(this, 'organisationUnit', {
        set: function (value) {
            if (!angular.isString(value)) {
                $log.error('Mechanism Service: OrganisationUnit should be a string');
                return;
            }
            organisationUnit = value;
        },
        get: function () {
            return organisationUnit;
        }
    });

    this.getMechanisms = function () {
        function parseData(categories, cogsIdsForLevels) {
            var data;

            var agencyCOGSId = _.find(cogsIdsForLevels, function (cogsIdsForLevel) {
                if (cogsIdsForLevel.name === AGENCY_LEVEL) {
                    return true;
                }
                return false;
            }).cogsId;

            var parterCOGSId = _.find(cogsIdsForLevels, function (cogsIdsForLevel) {
                if (cogsIdsForLevel.name === PARTNER_LEVEL) {
                    return true;
                }
                return false;
            }).cogsId;

            data = _(categories).map(function (category) {
                return _.map(filterCategoryOptions(category.categoryOptions), function (categoryOption) {
                    var mechanism = {
                        id: categoryOption.id,
                        mechanism: categoryOption.name,
                        country: getCountryFromCategoryOption(categoryOption),
                        agency: getAgencyFromCategoryOption(categoryOption.categoryOptionGroups || [], agencyCOGSId),
                        partner: getPartnerFromCategoryOption(categoryOption.categoryOptionGroups || [], parterCOGSId),
                        status: '',
                        actions: '',
                        category: category.id,
                        catComboId: categoryOption.categoryOptionCombos[0].id //FIXME: Hacked for pepfar to always be the first
                    };
                    return mechanism;
                });
            }).flatten();

            return data.value();
        }

        function filterCategoryOptions(categoryOptions) {
            var filteredCategoryOptions;
            filteredCategoryOptions = filterCategoryOptionsWithCategoryOptionCombo(categoryOptions);
            filteredCategoryOptions = filterOrganisationUnits(filteredCategoryOptions);
            return filteredCategoryOptions;
        }

        function filterCategoryOptionsWithCategoryOptionCombo(categoryOptions) {
            return _.filter(categoryOptions, function (categoryOption) {
                if (angular.isArray(categoryOption.categoryOptionCombos) &&
                    categoryOption.categoryOptionCombos.length > 0) {
                    return true;
                }
                return false;
            });
        }

        function filterOrganisationUnits(categoryOptions) {
            return categoryOptions.filter(function (categoryOption) {
                if (angular.isArray(categoryOption.organisationUnits) &&
                    categoryOption.organisationUnits.length > 0) {
                    return true;
                }
                return false;
            });
        }

        function getCountryFromCategoryOption(categoryOption) {
            if (categoryOption.organisationUnits[0]) {
                orgUnitCache[categoryOption.organisationUnits[0].id] = categoryOption.organisationUnits[0].name;
            }

            return categoryOption.organisationUnits[0] ? categoryOption.organisationUnits[0].name : '';
        }

        function getPartnerFromCategoryOption(categoryOptionGroups, parterCOGSId) {
            var partner = _.find(categoryOptionGroups, function (categoryOptionGroup) {
                if (categoryOptionGroup.categoryOptionGroupSet &&
                    categoryOptionGroup.categoryOptionGroupSet.id &&
                    categoryOptionGroup.categoryOptionGroupSet.id === parterCOGSId) {
                    return true;
                }
                return false;
            });

            if (partner) {
                return partner.name;
            }
            return '';
        }

        function getAgencyFromCategoryOption(categoryOptionGroups, agencyCOGSId) {
            var agency = _.find(categoryOptionGroups, function (categoryOptionGroup) {
                if (categoryOptionGroup.categoryOptionGroupSet &&
                    categoryOptionGroup.categoryOptionGroupSet.id &&
                    categoryOptionGroup.categoryOptionGroupSet.id === agencyCOGSId) {
                    return true;
                }
                return false;
            });

            if (agency) {
                return agency.name;
            }
            return '';
        }

        function getCategoriesAndReplaceDefaults() {
            var deferred = $q.defer();

            //Load categories from cache
            if (categoryCache[categories.join('_')]) {
                deferred.resolve(categoryCache[categories.join('_')]);
                return deferred.promise;
            }

            self.getData().then(function (data) {
                _.each(data, function (category) {
                    _.each(self.dataSets, replaceMechanismNameWithDataSetNameForDefaultCategoryComboNameDefault);

                    function replaceMechanismNameWithDataSetNameForDefaultCategoryComboNameDefault(dataSet) {
                        if (dataSet.categoryCombo.name === 'default' && dataSet.categoryCombo.categories[0].id === category.id) {
                            _.each(category.categoryOptions, function (mechanism) {
                                if (mechanism.name === 'default') {
                                    mechanism.name = dataSet.name;
                                    mechanism.hasDefaultCategory = true;
                                }
                            });
                        }
                    }
                });
                categoryCache[categories.join('_')] = data;
                deferred.resolve(data);

            }, function () {
                deferred.reject('Error loading category data');
            });

            return deferred.promise;
        }

        return rx.Observable.combineLatest(
                rx.Observable.fromPromise(getCategoriesAndReplaceDefaults()),
                approvalLevelsService,
                rx.Observable.fromPromise(this.getStatuses()),
                workflowService.currentWorkflow$,
                function (categories, approvalLevels, statuses, workflow) {
                    return [categories, approvalLevels, statuses, workflow];
                })
                .map(function (data) {
                    var categories = data[0];
                    var approvalLevels = data[1];
                    var workflow = data[3];

                    var parsedData = parseData(categories, approvalLevels.getCategoryOptionGroupSetIdsForLevels());

                    self.filterMechanisms(data[2], parsedData, data[1], workflow);

                    return mechanisms;
                }, function () {
                    $log.error('Mechanism Service: Unable to parse the mechanisms');
                });
    };

    this.filterMechanisms = function (mechanismsStatuses, parsedData, approvalLevels, workflow) {
        mechanisms = [];

        //TODO: Refactor this function
        //jshint maxcomplexity:16, maxstatements:43
        _.each(mechanismsStatuses, function (mechanismStatus) {
            var actions = [];
            var status = [];
            var approvalLevel;
            var mechanism = angular.copy(_.find(parsedData, {catComboId: mechanismStatus.id}));

            if (!mechanism) {
                return;
            }

            if (mechanismStatus.level && mechanismStatus.level.id) {
                // console.log('Current level', workflow.getApprovalLevelById(mechanismStatus.level.id));
                // approvalLevel = _.find(approvalLevels, {id: mechanismStatus.level.id});
                approvalLevel = workflow.getApprovalLevelById(mechanismStatus.level.id);
            }

            if (mechanismStatus.permissions.mayApprove === true) {
                mechanism.mayApprove = true;
                actions.push('Submit');
            }
            if (mechanismStatus.permissions.mayUnapprove === true) {
                mechanism.mayUnapprove = true;
                if (mechanismStatus.permissions.mayAccept || mechanismStatus.permissions.mayUnaccept) {
                    actions.push('Return submission');
                } else {
                    actions.push('Recall submission');
                }
            }
            if (mechanismStatus.permissions.mayUnaccept === true) {
                mechanism.mayUnaccept = false; //Since 0.1.8 Unaccept is not allowed anymore
                //mechanism.mayUnaccept = true;
                //actions.push('Unaccept');
            }
            if (mechanismStatus.permissions.mayAccept === true) {
                mechanism.mayAccept = true;
                actions.push('Accept');
            }

            if (mechanismStatus.permissions.mayReadData === true) {
                mechanism.mayReadData = true;
            } else {
                mechanism.mayReadData = false;
            }

            mechanism.accepted = false;
            if (approvalLevel) {
                if (mechanismStatus.accepted === true) {
                    mechanism.accepted = true;
                    status.push('Accepted');
                    if (mechanismStatus.level && mechanismStatus.level.level) {
                        // approvalLevel = _.find(approvalLevels, {level: (parseInt(mechanismStatus.level.level) - 1)});
                        approvalLevel = workflow.getApprovalLevelBeforeLevel(mechanismStatus.level.id);
                        status.push(approvalLevel.displayName);
                    }
                } else {
                    status.push('Submitted');
                    status.push(approvalLevel.displayName);
                }
            } else {
                status.push('Pending');
            }

            mechanism.status = status.join(' by ');
            mechanism.actions = actions.join(', ');
            mechanism.organisationUnit = mechanismStatus.ou;

            mechanism.level = mechanismStatus.level && parseInt(mechanismStatus.level.level, 10) || undefined;

            try {
                mechanism.nextLevel = workflow.getApprovalLevelBeforeLevel(mechanismStatus.level.id).level;
            } catch(e) {}

            mechanisms.push(mechanism);
        });
    };
    //jshint maxcomplexity:6, maxstatements:30

    this.getData = function () {
        return categoriesService.getCategories(categories);
    };

    this.getStatuses = function () {
        return Restangular.all('dataApprovals/categoryOptionCombos').getList({
            pe: period,
            ds: dataSetIds,
            ou: self.isGlobal ? undefined : organisationUnit //Don't pass the org unit id when the org unit is global
        }).catch(function (e) {
            $log.error('Failed to get statuses');
            return $q.reject(e);
        });
    };
}

angular.module('PEPFAR.approvals').service('mechanismsService', mechanismsService);

/**********************************************************************************/
angular.module('PEPFAR.approvals').factory('categoriesService', categoriesService);
function categoriesService(request, $q, $log) {
    return {
        getCategories: getCategories
    };

    function getCategories(categoryIds) {
        var categoriesUrl = ['api', 'categories.json'].join('/');
        var fields = 'fields=id,name';
        var filters;
        var queryParams;
        var categoryOptionsPromises;
        var categoriesPromise;

        if (!areParamsCorrect(categoryIds)) {
            return $q.reject('Not all required params are set');
        }

        filters = [encodeURI(['id:in:[', categoryIds.join(','), ']'].join(''))];
        queryParams = ['paging=false', createFilterQueryParamFrom(filters), fields];

        categoryOptionsPromises = categoryIds
            .map(function (categoryId) {
                return requestCategoryOptionsByCategoryId(categoryId)
                    .then(function (response) {
                        response.categoryId = categoryId;
                        return response;
                    });
            });

        categoriesPromise = request(categoriesUrl, queryParams)
            .then(extractCategories)
            .catch(function () {
                return $q.reject('Request for categories failed');
            });

        return $q.all([categoriesPromise].concat(categoryOptionsPromises))
            .then(function (responses) {
                var categories = responses.shift();
                var categoryOptionsForCategories = responses;

                categoryOptionsForCategories.forEach(function (categoryOptions) {
                    categories.forEach(function (category) {
                        if (categoryOptions.categoryId === category.id) {
                            category.categoryOptions = categoryOptions.categoryOptions;
                        }
                    });
                });

                return categories;
            });
    }

    function requestCategoryOptionsByCategoryId(categoryId) {
        return request('api/categoryOptions', [
            'paging=false',
            'filter=categories.id:eq:' + categoryId,
            'fields=' + encodeURI('id,name,organisationUnits[id,name],categoryOptionCombos[id,name],categoryOptionGroups[id,name,categoryOptionGroupSet[id]]')
        ]);
    }

    function extractCategories(data) {
        if (data && data.categories && data.categories.length) {
            $log.log('Loaded categories using $http');
            return data.categories;
        }
        return [];
    }

    function createFilterQueryParamFrom(filters) {
        return filters.map(function (filterText) {
            return 'filter=' + filterText;
        }).join('&');
    }

    function areParamsCorrect(filters) {
        if (filters.length <= 0) {
            $log.error('Categories Service (getCategories): Ids should be provided when trying to request mechanisms');
            return false;
        }
        return true;
    }
}

/**********************************************************************************/
angular.module('PEPFAR.approvals').factory('request', requestProvider);
function requestProvider($http, $q, AppManifest) {

    return request;

    /**
     * Does an ajax GET request using $http
     *
     * @param {String} url Url to request from
     * @param {Object} queryParams Query params that should be added to the url.
     * @returns {Promise}
     */
    function request(url, queryParams) {
        return $http.get([AppManifest.activities.dhis.href, url].join('/') + '?' + queryParams.join('&'))
            .then(function (response) {
                return response.data;
            })
            .catch(function (response) {
                return $q.reject(response.statusText);
            });
    }
}
