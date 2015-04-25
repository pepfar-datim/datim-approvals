angular.module('PEPFAR.approvals').factory('analyticsStatus', analyticsStatus);

function analyticsStatus(Restangular) {
    return {
        getStatus: getStatus
    };

    function getStatus() {

    }
}