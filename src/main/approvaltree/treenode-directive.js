function treeNodeDirective(recursionHelper) {
    return {
        restrict: 'E',
        replace: true,
        controller: 'approvalTreeController',
        controllerAs: 'tree',
        scope: {
            nodes: '=treeNodes'
        },
        templateUrl: 'approvaltree/treenode.html',
        link: function (scope, element, attr, controller) {

        },
        compile: recursionHelper.compile
    };
}

angular.module('PEPFAR.approvals').directive('treeNode', treeNodeDirective);
