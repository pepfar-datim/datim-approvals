function periodSelectorDirective(periodService) {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'period/periodselector.html',
        link: function (scope, element) {
            scope.period = {
                selectedPeriodType: undefined,
                selectedPeriod: undefined,
                periodTypes: periodService.getPeriodTypes(),
                periodsRecentFirst: periodService.getPastPeriodsRecentFirst()
            };

            scope.$watch(function () {
                return periodService.getPeriodTypes();
            }, function (newVal, oldVal) {
                 if (newVal !== oldVal) {
                     scope.period.periodTypes = periodService.getPeriodTypes();
                 }
            });

            scope.changedPeriodType = function () {
                periodService.setPeriodType(scope.period.selectedPeriodType);
                scope.period.periodsRecentFirst = periodService.getPastPeriodsRecentFirst();

                //Always select the first period when a new type is picked
                scope.period.selectedPeriod = scope.period.periodsRecentFirst[0];
            };
        }
    }
}

angular.module('PEPFAR.approvals').directive('periodSelector', periodSelectorDirective);