angular.module('PEPFAR.approvals').directive('analyticsStatus', analyticsStatusDirective);

function analyticsStatusDirective() {
    return {
        restrict: 'E',
        scope: true,
        template: '<div class="analytics-status-update" ng-bind="analyticsStatusCtrl.getStatusText()"></div>',
        controller: analyticsStatusCtrl,
        controllerAs: 'analyticsStatusCtrl',
        bindToController: true
    };

    function analyticsStatusCtrl(analyticsStatus, $timeout) {
        var vm = this;
        var analyticsUpdateInterval;

        vm.getStatusText = getStatusText;

        initialise();
        function initialise() {
            getStatusUpdate();
        }

        function getStatusUpdate() {
            analyticsStatus.getIntervalSinceLastAnalyticsTableSuccess()
                .then(function (intervalSinceLastAnalyticsTableSuccess) {

                    analyticsUpdateInterval = [
                        'Data was updated',
                        intervalSinceLastAnalyticsTableSuccess,
                        'ago'
                    ].join(' ');
                })
                .catch(function (message) {
                    analyticsUpdateInterval = message;
                    $timeout(getStatusUpdate, 30000);
                })
                .finally(function () {
                    $timeout(getStatusUpdate, 30000);
                });
        }

        function getStatusText() {
            return analyticsUpdateInterval;
        }
    }
}
