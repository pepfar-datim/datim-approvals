function appController(periodService, $scope) {
    $scope.$on('DATASETGROUP.changed', function (event, dataSets) {
        periodService.filterPeriodTypes(dataSets.getPeriodTypes());
    });

    this.details = {
        orgUnit: 'global',
        period: '2014',
        dataSets: [
            'df2dfsddf', 'dsfsd22', 'fedf22w'
        ],
        cog: '1dsff22',
        cogs: '1dsff22'
    };
    var stuff = this;
    setTimeout(function () {
        $scope.$apply(function () {
            stuff.details.cogs = 'stuff';
        });
    }, 1000);

}

angular.module('PEPFAR.approvals', ['d2', 'ui.select']);
angular.module('PEPFAR.approvals').controller('appController', appController);

angular.module('PEPFAR.approvals').config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});
