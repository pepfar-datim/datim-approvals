function dataSetGroupSelectorDirective(dataSetGroupService, dataSetGroupFactory) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'datasets/datasetgroupselector.html',
        link: function (scope) {
            function updateDataSetGroups(datasetGroups) {
                if (angular.isArray(datasetGroups)) {
                    scope.datasetGroups = datasetGroups;
                    scope.selectedDataSetGroup = scope.datasetGroups[0];
                }
            }
            updateDataSetGroups(dataSetGroupService.getDataSetGroupNames());

            scope.$watch(function () {
                return dataSetGroupService.getDataSetGroupNames();
            }, function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    updateDataSetGroups(newVal);
                }
            });

            scope.onChange = function () {
                scope.$emit(
                    'DATASETGROUP.changed',
                    dataSetGroupFactory(dataSetGroupService.getDataSetsForGroup(scope.selectedDataSetGroup))
                );
            };
        }
    }
}

angular.module('PEPFAR.approvals').directive('datasetGroupSelector', dataSetGroupSelectorDirective);
