angular.module('PEPFAR.approvals').factory('toastr', function () {
    var toastrOptions;

    if (window.toastr) {
        toastrOptions = window.toastr.options;
        toastrOptions.positionClass = "toast-top-right";
        toastrOptions.timeOut = 0;
        toastrOptions.extendedTimeOut = 0;
        toastrOptions.closeButton = true;
        toastrOptions.tapToDismiss = false;

        return window.toastr;
    }
    throw Error('Toastr.js library does not seem to be loaded.');
});