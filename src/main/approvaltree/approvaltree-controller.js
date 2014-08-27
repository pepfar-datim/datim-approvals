function approvalTreeController($scope, treeService) {
    var expandedNodes = [];

    this.getItemsFor = function (level) {
        return treeService.getItemsFor(level);
    };

    this.expandIconClick = function (id) {
        var idLocation;

        if (this.isExpanded(id)) {
            idLocation = expandedNodes.indexOf(id);
            delete expandedNodes[idLocation];
            return;
        }

        expandedNodes.push(id);
    };

    this.isExpanded = function (id) {
        if (expandedNodes.indexOf(id) !== -1) {
            return true;
        }
        return false;
    };

//    $scope.$watch(treeService.items, function (newVal, oldVal) {
//        if (newVal !== oldVal) {
//            console.log('updating');
//            $scope.$apply();
//        }
//    });
}

angular.module('PEPFAR.approvals').controller('approvalTreeController', approvalTreeController);
