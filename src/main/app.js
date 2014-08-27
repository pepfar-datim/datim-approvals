function treeService() {

}

function appController(treeService, $scope) {
    this.addRwanda = function () {
        treeService.items.rwanda.items = [
            { "name": "DOD" },
            { "name": "USAID" }
        ];
        console.log(treeService.getItemsFor('rwanda'));
    }
}

angular.module('PEPFAR.approvals', ['d2']);
angular.module('PEPFAR.approvals').controller('appController', appController);
angular.module('PEPFAR.approvals').service('treeService', treeService);

