angular.module('PEPFAR.approvals').factory('analyticsStatus', analyticsStatus);

function analyticsStatus(Restangular, errorHandler, $q) {
    return {
        getIntervalSinceLastAnalyticsTableSuccess: getIntervalSinceLastAnalyticsTableSuccess
    };

    function getIntervalSinceLastAnalyticsTableSuccess() {
        var NOT_FOUND_MESSAGE = 'Unable to find last updated time';

        return Restangular.all('system').get('info')
            .then(function (systemInfo) {
                if (systemInfo.intervalSinceLastAnalyticsTableSuccess) {
                    return systemInfo.intervalSinceLastAnalyticsTableSuccess;
                }
                return $q.reject(NOT_FOUND_MESSAGE);
            })
            .catch(function () {
                return $q.reject(NOT_FOUND_MESSAGE);
            });
    }
}
