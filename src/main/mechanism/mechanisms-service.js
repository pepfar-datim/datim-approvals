function mechanismsService(d2Api, $log, $q, $http, approvalLevelsService, AppManifest) {
    var self = this;
    var AGENCY_LEVEL = 3;
    var PARTNER_LEVEL = 4;

    var period;
    var dataSetIds = [];
    var categories = [];
    var organisationUnit = '';

    var mechanisms = [];

    var orgUnitCache = {};
    var categoryCache = {};

    this.isGlobal = false;

    /**
     * Does an ajax GET request using jquery
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
                if (cogsIdsForLevel.level === AGENCY_LEVEL) {
                    return true;
                }
                return false;
            }).cogsId;

            var parterCOGSId = _.find(cogsIdsForLevels, function (cogsIdsForLevel) {
                if (cogsIdsForLevel.level === PARTNER_LEVEL) {
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

            return data.__wrapped__;
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
                });
                categoryCache[categories.join('_')] = data;
                deferred.resolve(data);

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

            }, function () {
                deferred.reject('Error loading category data');
            });

            return deferred.promise;

            function getCategoryData(categoryId) {
                var categoryOptionCombosUrl = ['api', 'categoryOptions.json'].join('/') + '?' + filters.join('&');
                var queryParams = [
                        'paging=false',
                        'filter=categories.id:eq:' + categoryId,
                        'fields=id,name,organisationUnits[id,name],categoryOptionCombos[id,name],categoryOptionGroups[id,name,categoryOptionGroupSet[id]'
                    ];

                return request(categoryOptionComboUrl, queryParams);
            }
        }

        return $q.all([getCategoriesAndReplaceDefaults(), approvalLevelsService.get(), this.getStatuses()]).then(function (data) {
            var parsedData = parseData(data[0], data[1].getCategoryOptionGroupSetIdsForLevels());

            self.filterMechanisms(data[2], parsedData, data[1]);

            return mechanisms;
        }, function () {
            $log.error('Mechanism Service: Unable to parse the mechanisms');
        });
    };

    this.filterMechanisms = function (mechanismsStatuses, parsedData, approvalLevels) {
        mechanisms = [];

        //TODO: Refactor this function
        //jshint maxcomplexity:16, maxstatements:41
        _.each(mechanismsStatuses, function (mechanismStatus) {
            var actions = [];
            var status = [];
            var approvalLevel;
            var mechanism =  angular.copy(_.find(parsedData, { catComboId: mechanismStatus.id }));

            if (!mechanism) { return; }

            if (mechanismStatus.level && mechanismStatus.level.id) {
                approvalLevel = _.find(approvalLevels, { id: mechanismStatus.level.id });
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

            if (approvalLevel) {
                if (mechanismStatus.accepted === true) {
                    status.push('Accepted');
                    if (mechanismStatus.level && mechanismStatus.level.level) {
                        approvalLevel = _.find(approvalLevels, { level: (parseInt(mechanismStatus.level.level) - 1) });
                        status.push(approvalLevel.levelName);
                    }
                } else {
                    status.push('Submitted');
                    status.push(approvalLevel.levelName);
                }
            } else {
                status.push('Pending');
            }


            mechanism.status = status.join(' by ');
            mechanism.actions = actions.join(', ');
            mechanism.organisationUnit = mechanismStatus.ou;

            if (mechanism.country === '') {
                if (orgUnitCache[mechanismStatus.ou]) {
                    mechanism.country = orgUnitCache[mechanismStatus.ou];
                }
            }

            mechanism.level = mechanismStatus.level && parseInt(mechanismStatus.level.level, 10) || undefined ;
            mechanisms.push(mechanism);
        });
    };
    //jshint maxcomplexity:6, maxstatements:30

    this.getData = function () {
        var deferred = $q.defer();
        var params = {
            paging: false,
            filter: _.map(categories, function (category) {
                return 'id:eq:' + category;
            }),
            fields: 'id,name,categoryOptions[id,name,organisationUnits[id,name],categoryOptionCombos[id,name],categoryOptionGroups[id,name,categoryOptionGroupSet[id]]'
        };

        if (this.areParamsCorrect(params)) {
            var categoriesUrl = ['api', 'categories.json'].join('/');
            var filters = [
                'paging=false',
                params.filter.map(function (filterText) {
                    return 'filter=' + filterText;
                }).join('&'),
                'fields=' + params.fields
            ];

            return request(categoriesUrl, filters)
                .then(function (data) {
                    console.log('Loaded categories using $http');

                    if (data && data.categories && data.categories.length) {
                        console.log('Loaded categories using $http');
                        return data.categories;
                    }
                })
                .catch(function () {
                    return $q.reject('Request for categories failed');
                });
        } else {
            return $q.reject('Not all required params are set');
        }
    };

    this.getStatuses = function () {
        return d2Api.getEndPoint('dataApprovals/categoryOptionCombos').getList({
            pe: period,
            ds: dataSetIds,
            ou: self.isGlobal ? undefined : organisationUnit //Don't pass the org unit id when the org unit is global
        }).then(function (data) {
            return data.getDataOnly();
        }).catch(function (e) {
            $log.error('Failed to get statuses');
            $q.reject(e);
        });
    };

    this.areParamsCorrect = function (params) {
        if (params.filter.length <= 0) {
            $log.error('Mechanism Service: Categories should set when trying to request mechanisms');
            return false;
        }
        return true;
    };

    d2Api.addEndPoint('categories');
    d2Api.addEndPoint('dataApprovals/categoryOptionCombos');
}

angular.module('PEPFAR.approvals').service('mechanismsService', mechanismsService);
