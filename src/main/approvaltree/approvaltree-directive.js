function approvalTreeDirective() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'approvaltree/approvaltree.html',
        controllerAs: 'tree',
        controller: 'approvalTreeController'
    };
}

angular.module('PEPFAR.approvals').directive('approvalTree', approvalTreeDirective);
