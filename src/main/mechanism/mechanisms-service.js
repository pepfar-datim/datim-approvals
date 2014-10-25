function mechanismsService(d2Api, $log, $q, approvalLevelsService) {
    var self = this;
    var AGENCY_LEVEL = 3;
    var PARTNER_LEVEL = 4;

    var period;
    var dataSetIds = [];
    var categories = [];

    var deferred = $q.defer();

    var statuses = {
        'accepted': 'Accepted',
        'submitted': 'Submitted'
    };

    var mechanisms = [];

    var categoryOptionComboCache = {};
    // categoryCombos/bjDvmb4bfuf.json?fields=id,categoryOptionCombos[id]
    d2Api.addEndPoint('categoryCombos');

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
                $log.error('Mechanism Service: Period should be a string');
                return;
            }
            categories = value;
        },
        get: function () {
            return categories;
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
                return _.map(category.categoryOptions, function (categoryOption) {
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

        function getCountryFromCategoryOption(categoryOption) {
            return categoryOption.organisationUnits[0] ? categoryOption.organisationUnits[0].name : ''
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

            self.getData().then(function (data) {
                _.each(data, function (category) {
                    _.each(self.dataSets, function (dataSet) {
                        if (dataSet.categoryCombo.name === 'default' &&
                            dataSet.categoryCombo.categories[0].id === category.id) {
                            _.each(category.categoryOptions, function (mechanism) {
                                if (mechanism.name === 'default') {
                                    mechanism.name = dataSet.name;
                                }
                            });
                        }
                    });
                });
                deferred.resolve(data);
            }, function () {
                deferred.reject('Error loading category data');
            });

            return deferred.promise;
        }

        return $q.all([getCategoriesAndReplaceDefaults(), approvalLevelsService.get(), this.getStatuses()]).then(function (data) {
            var parsedData = parseData(data[0], data[1].getCategoryOptionGroupSetIdsForLevels());

            self.filterMechanisms(data[2], parsedData, data[1]);

            return mechanisms;
        }, function (err) {
            $log.error('Mechanism Service: Unable to parse the mechanisms');
        });
    };

    this.filterMechanisms = function (mechanismsStatuses, parsedData, approvalLevels) {
        mechanisms = [];
        _.each(mechanismsStatuses, function (mechanismStatus) {
            var actions = [];
            var status = [];
            var approvalLevel;
            var mechanism =  _.find(parsedData, { catComboId: mechanismStatus.id });

            if (mechanismStatus.level && mechanismStatus.level.id) {
                approvalLevel = _.find(approvalLevels, { id: mechanismStatus.level.id });
            }

            if (!mechanism) { return; }

            if (mechanismStatus.permissions.mayApprove === true) {
                mechanism.mayApprove = true;
                actions.push('Submit');
            }
            if (mechanismStatus.permissions.mayUnapprove === true) {
                mechanism.mayUnapprove = true;
                actions.push('Unsubmit');
            }
            if (mechanismStatus.permissions.mayUnaccept === true) {
                mechanism.mayUnaccept = true;
                actions.push('Unaccept');
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
                } else {
                    status.push('Submitted');
                }
                status.push(approvalLevel.levelName);
            } else {
                status.push('Pending');
            }


            mechanism.status = status.join(' by ');
            mechanism.actions = actions.join(', ');
            mechanism.level = mechanismStatus.level && mechanismStatus.level.level || undefined ;
            mechanisms.push(mechanism);
        });
    };

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
            d2Api.getEndPoint('categories').getList(params).then(function (data) {
                deferred.resolve(data.getDataOnly());
            }, function () {
                deferred.reject('Request for categories failed');
            });
        } else {
            deferred.reject('Not all required params are set');
        }

        return deferred.promise;
    };

    this.getStatuses = function () {
        return d2Api.getEndPoint('dataApprovals/categoryOptionCombos').getList({
            pe: period,
            ds: dataSetIds
        }).then(function (data) {
            return data.getDataOnly();
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
