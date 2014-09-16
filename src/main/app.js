function appController(periodService, $scope, currentUser) {
    var controller = this;

    $scope.details = {
        orgUnit: undefined,
        period: undefined,
        dataSets: undefined,
        cog: '1dsff22',
        cogs: '1dsff22'
    };

    //Get the users org unit off the user
    currentUser.then(function () {
        var orgUnit;

        if (currentUser.valueFor('dataViewOrganisationUnits') &&
            currentUser.valueFor('dataViewOrganisationUnits')[0]) {
            orgUnit = currentUser.valueFor('dataViewOrganisationUnits')[0];
        } else {
            orgUnit = currentUser.valueFor('organisationUnits')[0];
        }

        $scope.details.orgUnit =  orgUnit.id;
        controller.title = orgUnit.name + ' - Data approval';
    });

    //When the dataset group is changed update the filter types and the datasets
    $scope.$on('DATASETGROUP.changed', function (event, dataSets) {
        periodService.filterPeriodTypes(dataSets.getPeriodTypes());
        $scope.details.dataSets = dataSets.get();
    });

    $scope.$watch(function () {
        return periodService.period;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.details.period = newVal.iso;
        }
    });

    $scope.$watch(function () {
        if (currentUser.organisationUnits)
            return currentUser.organisationUnits[0].id;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.details.orgUnit = newVal;
        }
    });
}

function dataViewController($scope) {
    this.details = $scope.details;
}

function tableViewController($scope) {
    this.approvalTableConfig = {
        columns: [
            { name: 'mechanism', sortable: true, searchable: true },
            { name: 'country', sortable: true, searchable: true },
            { name: 'agency', sortable: true, searchable: true },
            { name: 'partner', sortable: true, searchable: true },
            { name: 'status', sortable: true, searchable: true },
            { name: 'actions', sortable: true, searchable: true }
        ],
        pageItems: 3
    };

    this.approvalTableData = [
        {
            mechanism: '12345 - Partner Jones: Systems Strengthening',
            country: 'Rwanda',
            agency: 'USAID',
            partner: 'Partner Jones',
            status: 'Submitted by country',
            actions: 'Accept'
        }, {
            mechanism: 'Partner Jones: HPSS',
            country: 'Rwanda',
            agency: 'USAID',
            partner: 'Partner Jones',
            status: 'Accepted by global',
            actions: 'Submit'
        }, {
            mechanism: 'MoH CoAg',
            country: 'Rwanda',
            agency: 'HHS/CDC',
            partner: 'Ministry of Health Rwanda',
            status: 'Submitted by country',
            actions: 'Accept'
        }, {
            mechanism: 'Supporting implementation of National AIDS Framework',
            country: 'Rwanda',
            agency: 'HHS/CDC',
            partner: 'Ministry of Health Rwanda',
            status: 'Accepted by country',
            actions: ''
        }, {
            mechanism: '23456 - Partner Jones: HIV Care',
            country: 'Rwanda',
            agency: 'USAID',
            partner: 'Partner Jones',
            status: 'Submitted by global',
            actions: 'Unsubmit'
        }
    ];
}

angular.module('PEPFAR.approvals', ['ngRoute', 'd2', 'ui.select']);
angular.module('PEPFAR.approvals').controller('appController', appController);
angular.module('PEPFAR.approvals').controller('dataViewController', dataViewController);
angular.module('PEPFAR.approvals').controller('tableViewController', tableViewController);

angular.module('PEPFAR.approvals').config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});

angular.module('PEPFAR.approvals').config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/data-view', {
        templateUrl: 'dataview.html',
        controller: 'dataViewController',
        controllerAs: 'dataView'
    });
    $routeProvider.otherwise({
        templateUrl: 'tableview.html',
        controller: 'tableViewController',
        controllerAs: 'tableView'
    });
});
