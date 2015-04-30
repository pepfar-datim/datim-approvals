angular.module('PEPFAR.approvals').directive('analyticsStatus', analyticsStatusDirective);

function analyticsStatusDirective() {
    var UPDATE_INTERVAL = 60000;
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
                    $timeout(getStatusUpdate, UPDATE_INTERVAL);
                })
                .finally(function () {
                    $timeout(getStatusUpdate, UPDATE_INTERVAL);
                });
        }

        function getStatusText() {
            return analyticsUpdateInterval;
        }
    }
}
