function mechanismsService(d2Api, $log, $q, approvalLevelsService) {
    var AGENCY_LEVEL = 3;
    var PARTNER_LEVEL = 4;

    //var period;
    var categories = [];
    var deferred = $q.defer();


//    Object.defineProperty(this, 'period', {
//        set: function (value) {
//            if (!angular.isString(value)) {
//                $log.error('Mechanism Service: Period should be a string');
//                return;
//            }
//            period = value;
//        },
//        get: function () {
//            return period;
//        }
//    });

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
                        agency: getAgencyFromCategoryOption(categoryOption.groups || [], agencyCOGSId),
                        partner: getPartnerFromCategoryOption(categoryOption.groups || [], parterCOGSId),
                        status: '',
                        action: '',
                        category: category.id
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

        return $q.all([this.getData(), approvalLevelsService.get()]).then(function (data) {
            return parseData(data[0], data[1].getCategoryOptionGroupSetIdsForLevels());
        }, function (err) {
            $log.error('Mechanism Service: Unable to parse the mechanisms');
        });
    };

    this.getData = function () {
        var deferred = $q.defer();
        var params = {
            paging: false,
//            pe: period,
            filter: _.map(categories, function (category) {
                return 'id:eq:' + category;
            }),
            fields: 'id,name,categoryOptions[id,name,organisationUnits[id,name],categoryOptionCombos[id,name],groups[id,name,categoryOptionGroupSet[id]]'
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

    this.areParamsCorrect = function (params) {
//        if (!params.pe || (params.pe.length <= 0)) {
//            $log.error('Mechanism Service: Period should set when trying to request mechanisms');
//            return false;
//        }
        if (params.filter.length <= 0) {
            $log.error('Mechanism Service: Categories should set when trying to request mechanisms');
            return false;
        }
        return true;
    };

    d2Api.addEndPoint('categories');
}

angular.module('PEPFAR.approvals').service('mechanismsService', mechanismsService);
