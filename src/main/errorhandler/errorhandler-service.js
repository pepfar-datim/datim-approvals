angular.module('PEPFAR.approvals').factory('errorHandler', function (toastr, $rootScope) {
    var service = this;

    return {
        error: error,
        warning: warning
    };

    function error(message, broadcast) {
        return handleError('error', message, broadcast);
    }

    function warning(message, broadcast) {
        return handleError('warning', message, broadcast);
    }

    function handleError(type, message, broadcast) {
        toastr[type]([message]);

        if (broadcast) {
            broadcastErrorEvent(message);
        }

        return service;
    }

    function broadcastErrorEvent(message) {
        $rootScope.$broadcast('APP.errorhandler.error', message);
    }
});
