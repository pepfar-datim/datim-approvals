function approvalLevelsService($q, Restangular, rx, $log, $rootScope) {
    var deferred = $q.defer();

    var organisationUnitLevelsRequest = Restangular
        .all('organisationUnitLevels')
        .getList({
            fields: 'level,displayName',
            paging: false
        });

    var dataApprovalLevelsRequest = Restangular
        .all('dataApprovalLevels')
        .getList({
            fields: 'id,name,displayName,orgUnitLevel,level,categoryOptionGroupSet[id,name]',
            paging: false
        });

    var organisationUnitLevels$ = rx.Observable.fromPromise(organisationUnitLevelsRequest);
    var dataApprovalLevels$ = rx.Observable.fromPromise(dataApprovalLevelsRequest);

    /**
     * Create an ordered list of approvalLevels
     *
     * @param {Array} organisationUnitLevels List of organisation unit levels as returned by the DHIS2 API.
     * @returns {Array} An array of organisation units with level numbers as indexes [1: Global, 2: Country, 3: Agency]
     */
    // TODO: It might be better to return an object that uses numbers as keys, as now an array with empty holes will occur
    function getOrganisationUnitLevelNamesByLevelNumber(organisationUnitLevels) {
        return organisationUnitLevels
                .reduce(function (acc, organisationUnitLevel) {
                    acc[organisationUnitLevel.level] = organisationUnitLevel.displayName;
                    return acc;
                }, []);
    }

    var approvalLevels$ = rx.Observable.combineLatest(
        organisationUnitLevels$,
        dataApprovalLevels$,
        function (organisationUnitLevels, dataApprovalLevels) {
            var organisationUnitLevelNamesByLevelIndex = getOrganisationUnitLevelNamesByLevelNumber(organisationUnitLevels);

            var approvalLevelsWithLevelName = dataApprovalLevels
                // Add the levelName property to the approvalLevel object, based on the categoryOptionGroupSet name or fall back to the organisationUnit name.
                .map(function (approvalLevel) {
                    if (approvalLevel.categoryOptionGroupSet) {
                        approvalLevel.levelName = approvalLevel.categoryOptionGroupSet.name;
                    } else {
                        approvalLevel.levelName = organisationUnitLevelNamesByLevelIndex[approvalLevel.orgUnitLevel];
                    }

                    return approvalLevel;
                });

            // TODO: This function looks a bit like a hack and is only called once. Can perhaps be solved differently.
            approvalLevelsWithLevelName.getCategoryOptionGroupSetIdsForLevels = function () {
                return _.map(_.filter(approvalLevelsWithLevelName, 'categoryOptionGroupSet'), function (level) {
                    if (level.categoryOptionGroupSet) {
                        return {
                            name: level.name,
                            level: level.level,
                            cogsId: level.categoryOptionGroupSet.id
                        };
                    }
                });
            };
            return approvalLevelsWithLevelName;
        }
    ).safeApply($rootScope);

    function success(approvalLevels) {
        deferred.resolve(approvalLevels);
    }

    function failure(error) {
        $log.error('Failed to load dataApprovalLevels', error);
    }

    approvalLevels$.subscribe(success, failure);

    function approvalLevelPromiseGetter() {
        return deferred.promise;
    }

    approvalLevels$.get = approvalLevelPromiseGetter;

    return approvalLevels$;
}

angular.module('PEPFAR.approvals').factory('approvalLevelsService', approvalLevelsService);
