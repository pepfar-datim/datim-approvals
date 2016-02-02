function organisationunitSelectorDirective(organisationunitsService) {
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
                        .then(function (dataList) {
                            var thisOrgUnit = {
                                id: organisationunitsService.currentOrganisationUnit.id,
                                name: organisationunitsService.currentOrganisationUnit.displayName
                            };
                            dataList = _.sortBy(dataList, 'displayName');
                            scope.organisationUnit.organisationUnits = [thisOrgUnit].concat(dataList);
                            scope.organisationUnit.selected = scope.organisationUnit.organisationUnits[0];
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
