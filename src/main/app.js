function appController(periodService, $scope, currentUser) {
    var controller = this;
    $scope.$on('DATASETGROUP.changed', function (event, dataSets) {
        periodService.filterPeriodTypes(dataSets.getPeriodTypes());
    });

    $scope.$watch(function () {
        return periodService.period;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            controller.details.period = newVal.iso;
        }
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

    $scope.$watch(function () {
        if (currentUser.organisationUnits)
            return currentUser.organisationUnits[0].id;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            controller.details.orgUnit = newVal;
        }
    })
}

angular.module('PEPFAR.approvals', ['d2', 'ui.select']);
angular.module('PEPFAR.approvals').controller('appController', appController);

angular.module('PEPFAR.approvals').config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});
