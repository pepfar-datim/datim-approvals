function periodSelectorDirective(periodService, workflowService, $log) {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'period/periodselector.html',
        link: function (scope) {
            scope.period = {
                selectedPeriod: undefined,
                periods: []
            };

            scope.changePeriod = function ($item) {
                if ($item === undefined) {
                    return;
                }

                periodService.setPeriod($item);
            };

            // When the workflow is updated we'll need to update the periods
            workflowService.currentWorkflow$
                .flatMap(function (workflow) {
                    return periodService.getPeriodsForWorkflow(workflow);
                })
                .map(function (periods) {
                    // Set retrieved periods onto the scope so they show up in the dropdown
                    scope.period.periods = periods;

                    // If we have at least 1 period we'll change the selected period to the first one in the list
                    if (periods.length > 0) {
                        $log.info('Set selected period to ', periods[0]);
                        scope.period.selectedPeriod = periods[0];
                        scope.changePeriod(periods[0]);
                    }
                })
                .safeApply(scope)
                .subscribe();
        }
    };
}

angular.module('PEPFAR.approvals').directive('periodSelector', periodSelectorDirective);
