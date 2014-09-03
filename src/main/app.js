function treeService() {

}

function appController(treeService, $scope) {
    this.addRwanda = function () {
        treeService.items.rwanda.items = [
            { "name": "DOD" },
            { "name": "USAID" }
        ];
    };

    $scope.$on('DATASETGROUP.changed', function (dataSetGroup) {
        console.log('i am being fired');
        console.log('the new dataset group is:');
        console.log(dataSetGroup);
    });
}

angular.module('PEPFAR.approvals', ['d2']);
angular.module('PEPFAR.approvals').controller('appController', appController);
angular.module('PEPFAR.approvals').service('treeService', treeService);

