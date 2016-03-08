function organisationunitSelectorDirective(organisationunitsService, $log) {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'organisationunits/organisationunitselector.html',
        link: function (scope) {
            scope.organisationUnit = {
                selected: undefined,
                organisationUnits: [],
                currentOrganisationUnit: {}
            };

            scope.$watch(function () {
                return organisationunitsService.currentOrganisationUnit;
            }, function (newVal, oldVal) {
                var levelToGet;

                if (newVal === oldVal) { return; }

                if (organisationunitsService.currentOrganisationUnit && organisationunitsService.currentOrganisationUnit.level &&
                    organisationunitsService.currentOrganisationUnit.id) {
                    levelToGet = organisationunitsService.currentOrganisationUnit.level + 1;

                    //TODO: PEPFAR Hack to only display this option for global users
                    if (organisationunitsService.currentOrganisationUnit.level !== 1) { return; }

                    organisationunitsService.requestOrganisationUnitsForLevel(organisationunitsService.currentOrganisationUnit.id, levelToGet)
                        .subscribe(function (dataList) {
                            var thisOrgUnit = {
                                id: organisationunitsService.currentOrganisationUnit.id,
                                name: organisationunitsService.currentOrganisationUnit.displayName
                            };
                            dataList = _.sortBy(dataList, 'displayName');
                            scope.organisationUnit.organisationUnits = [thisOrgUnit].concat(dataList);
                            scope.organisationUnit.selected = scope.organisationUnit.organisationUnits[0];
                        }, function () {
                            $log.error('Could not load organisation units for level: ' + levelToGet);
                        });
                }
            }, true);

            scope.changeOrganisationUnit = function ($item) {
                organisationunitsService.currentOrganisationUnit = $item;
            };
        }
    };
}

angular.module('PEPFAR.approvals').directive('organisationunitSelector', organisationunitSelectorDirective);
