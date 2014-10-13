angular.module('PEPFAR.approvals').factory('toastr', function () {
    if (window.toastr) {
        window.toastr.options.positionClass = "toast-top-right";

        return window.toastr;
    }
    throw Error('Toastr.js library does not seem to be loaded.');
});