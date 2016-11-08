function periodSelectorDirective(periodService) {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'period/periodselector.html',
        link: function (scope) {
            scope.period = {
                selectedPeriodType: undefined,
                selectedPeriod: undefined,
                periodTypes: periodService.getPeriodTypes(),
                periodsRecentFirst: periodService.getPastPeriodsRecentFirst()
            };

            scope.changePeriod = function ($item) {
                if ($item === undefined) {
                    return;
                }

                periodService.setPeriod($item);
            };

            periodService.periodTypes$
                .subscribe(function () {
                    scope.period.periodTypes = periodService.getPeriodTypes();
                    scope.period.selectedPeriodType = scope.period.periodTypes[0];

                    periodService.setPeriodType(scope.period.selectedPeriodType);
                    scope.period.periodsRecentFirst = periodService.getPastPeriodsRecentFirst();

                    //Always select the first period when a new type is picked
                    scope.period.selectedPeriod = scope.period.periodsRecentFirst[1];
                    scope.changePeriod(scope.period.selectedPeriod);
                });

        }
    };
}

angular.module('PEPFAR.approvals').directive('periodSelector', periodSelectorDirective);
