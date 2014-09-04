function treeService() {

}

function appController(treeService, periodService, $scope) {
    this.addRwanda = function () {
        treeService.items.rwanda.items = [
            { "name": "DOD" },
            { "name": "USAID" }
        ];
    };

    $scope.$on('DATASETGROUP.changed', function (event, dataSets) {
        periodService.filterPeriodTypes(dataSets.getPeriodTypes());
    });
}

angular.module('PEPFAR.approvals', ['d2']);
angular.module('PEPFAR.approvals').controller('appController', appController);
angular.module('PEPFAR.approvals').service('treeService', treeService);

