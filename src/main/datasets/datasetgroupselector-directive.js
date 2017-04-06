function dataSetGroupSelectorDirective(dataSetGroupService) {
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

            scope.onChange = function ($item) {
                // Set scope to keep dropdown in sync with dropdown
                scope.dataset.selectedDataSetGroup = $item;
                dataSetGroupService.setCurrentDataSetGroup($item);
            };

            dataSetGroupService
                .dataSetGroups$
                .take(1)
                .map(function (datasetGroups) {
                    if (angular.isArray(datasetGroups)) {
                        scope.dataset.groups = datasetGroups;

                        // Fire onChange to set to the first group
                        scope.onChange(scope.dataset.groups[0]);
                    }
                })
                .safeApply(scope)
                .subscribe();
        }
    };
}

angular.module('PEPFAR.approvals').directive('datasetGroupSelector', dataSetGroupSelectorDirective);
