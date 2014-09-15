function dataSetGroupSelectorDirective(dataSetGroupService, dataSetGroupFactory) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'datasets/datasetgroupselector.html',
        link: function (scope) {
            scope.dataset = {
                groups: undefined,
                selectedDataSetGroup: undefined
            };

            function updateDataSetGroups(datasetGroups) {
                if (angular.isArray(datasetGroups)) {
                    scope.dataset.groups = datasetGroups;
                    scope.dataset.selectedDataSetGroup = scope.dataset.groups[0];
                }
            }

            scope.$watch(function () {
                return dataSetGroupService.getDataSetGroupNames();
            }, function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    updateDataSetGroups(newVal);
                }
            });

            scope.$watch(function () {
                return scope.dataset.selectedDataSetGroup;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    scope.$emit(
                        'DATASETGROUP.changed',
                        dataSetGroupFactory(dataSetGroupService.getDataSetsForGroup(scope.dataset.selectedDataSetGroup))
                    );
                }
            });

            scope.onChange = function ($item) {
                scope.dataset.selectedDataSetGroup = $item;
            };
        }
    }
}

angular.module('PEPFAR.approvals').directive('datasetGroupSelector', dataSetGroupSelectorDirective);
