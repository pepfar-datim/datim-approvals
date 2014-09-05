function dataSetGroupSelectorDirective(dataSetGroupService, dataSetGroupFactory) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'datasets/datasetgroupselector.html',
        link: function (scope) {
            function updateDataSetGroups(datasetGroups) {
                scope.dataset = {};

                if (angular.isArray(datasetGroups)) {
                    scope.dataset.groups = datasetGroups;
                    scope.dataset.selectedDataSetGroup = scope.dataset.groups[0];
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
                    dataSetGroupFactory(dataSetGroupService.getDataSetsForGroup(scope.dataset.selectedDataSetGroup))
                );
            };
        }
    }
}

angular.module('PEPFAR.approvals').directive('datasetGroupSelector', dataSetGroupSelectorDirective);
