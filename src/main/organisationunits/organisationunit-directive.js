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

                if (newVal === oldVal) return;
                if (organisationunitsService.currentOrganisationUnit && organisationunitsService.currentOrganisationUnit.level) {
                    levelToGet = organisationunitsService.currentOrganisationUnit.level + 1;

                    //TODO: PEPFAR Hack to circumvent the global regions
                    if (organisationunitsService.currentOrganisationUnit.level == 1) {
                        levelToGet += 1;
                    } else {
                        return;
                    }

                    organisationunitsService.requestOrganisationUnitsForLevel(levelToGet).then(function (dataList) {
                        scope.organisationUnit.organisationUnits = dataList.getDataOnly();
                    });
                }
            }, true);

            scope.changeOrganisationUnit = function ($item) {
                organisationunitsService.currentOrganisationUnit = $item;
            }
        }
    }
}

angular.module('PEPFAR.approvals').directive('organisationunitSelector', organisationunitSelectorDirective);