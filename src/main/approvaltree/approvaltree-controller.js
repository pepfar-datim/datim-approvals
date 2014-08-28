function approvalTreeController($scope, treeService) {
    var expandedNodes = [];

    this.getItemsFor = function (id) {
        return treeService.getItemsFor(id);
    };

    this.expandIconClick = function (node) {
        var idLocation,
            id = node.id;

        if (this.isExpanded(id)) {
            idLocation = expandedNodes.indexOf(id);
            delete expandedNodes[idLocation];
            return;
        }

        if (! this.hasItems(id)) {
            treeService.loadItemsFor(node);
        }

        expandedNodes.push(id);
    };

    this.isExpanded = function (id) {
        if (expandedNodes.indexOf(id) !== -1) {
            return true;
        }
        return false;
    };

    this.hasItems = function (id) {
        var items = treeService.getItemsFor(id);
        if (items && items.length > 0) {
            return true;
        }
        return false;
    };

    this.isShowLoading = function (id) {
        return (!this.hasItems(id) && this.isExpanded(id));
    };
}

angular.module('PEPFAR.approvals').controller('approvalTreeController', approvalTreeController);
