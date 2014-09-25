function appController(periodService, $scope, currentUser, mechanismService) {
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

        $scope.details.orgUnit = orgUnit.id;
        controller.title = orgUnit.name + ' - Data approval'; //TODO: Add COGS
    });

    //When the dataset group is changed update the filter types and the datasets
    $scope.$on('DATASETGROUP.changed', function (event, dataSets) {
        periodService.filterPeriodTypes(dataSets.getPeriodTypes());
        $scope.details.dataSets = dataSets.get();
        mechanismService.categories = dataSets.getCategoryIds();

        mechanismService.getMechanisms().then(function (mechanisms) {
            $scope.$broadcast('MECHANISMS.updated', mechanisms);
        });
    });

    $scope.$watch(function () {
        return periodService.period;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.details.period = newVal.iso;
            mechanismService.period = $scope.details.period;
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

function tableViewController(mechanismService, $scope) {
    this.approvalTableConfig = {
        columns: [
            { name: 'mechanism', sortable: true, searchable: true },
            { name: 'country', sortable: true, searchable: true },
            { name: 'agency', sortable: true, searchable: true },
            { name: 'partner', sortable: true, searchable: true },
            { name: 'status', sortable: true, searchable: true },
            { name: 'actions', sortable: true, searchable: true }
        ],
        select: true,
        headerInputClass: 'form-control'
    };

    this.approvalTableDataSource = [];

    this.hasItems = function (tabCtrl, tabName) {
        tabCtrl.setActive(tabName, !!this.approvalTableData.length);

        return !!this.approvalTableData.length;
    };

    this.mechanismHasActions = function (mechanism, actions) {
        var result = false;
        _.each(actions, function (action) {
            result = result || _.contains(mechanism.actions, action);
        });
        return result;
    };

    this.actionsToFilterOn = [];
    this.filterData = function (data) {
        return _.filter(data, function (mechanism) {
            if (this.mechanismHasActions(mechanism, this.actionsToFilterOn)) {
                return true;
            }
            return false;
        }, this);
    };
}

function recievedTableViewController($scope, $controller) {
    $.extend(this, $controller('tableViewController', { $scope: $scope }));

    this.actionsToFilterOn = ['accept'];
    this.approvalTableData = this.filterData(this.approvalTableDataSource);

    $scope.$on('MECHANISMS.updated', (function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
    }).bind(this));
}

function acceptedTableViewController($scope, $controller) {
    $.extend(this, $controller('tableViewController', { $scope: $scope }));

    this.actionsToFilterOn = ['submit'];
    this.approvalTableData = this.filterData(this.approvalTableDataSource);

    $scope.$on('MECHANISMS.updated', (function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
    }).bind(this));
}

function submittedTableViewController($scope, $controller) {
    $.extend(this, $controller('tableViewController', { $scope: $scope }));

    this.actionsToFilterOn = ['unsubmit'];
    this.approvalTableData = this.filterData(this.approvalTableDataSource);

    $scope.$on('MECHANISMS.updated', (function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
    }).bind(this));
}

function allTableViewController($scope, $controller) {
    $.extend(this, $controller('tableViewController', { $scope: $scope }));

    //The filter always returns true.
    this.filterData = function (data) {
        return _.filter(data, function () {
            return true;
        }, this);
    };
    this.approvalTableData = this.filterData();

    $scope.$on('MECHANISMS.updated', (function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
    }).bind(this));
}

function tabController() {
    this.state = {};

    this.setActive = function (tabName, isActive) {
        var active = _.filter(this.state, function (item) {
            if (item === true) {
                return true;
            }
            return false;
        });

        if (active.length === 0) {
            _.each(this.state, function (item) {
                if (item !== tabName) {
                    item = false;
                }
            });
            this.state[tabName] = isActive;
        }
    };
}

angular.module('PEPFAR.approvals', ['d2', 'ui.select', 'ui.bootstrap.tabs']);
angular.module('PEPFAR.approvals').controller('appController', appController);
angular.module('PEPFAR.approvals').controller('dataViewController', dataViewController);
angular.module('PEPFAR.approvals').controller('tabController', tabController);
angular.module('PEPFAR.approvals').controller('tableViewController', tableViewController);
angular.module('PEPFAR.approvals').controller('recievedTableViewController', recievedTableViewController);
angular.module('PEPFAR.approvals').controller('acceptedTableViewController', acceptedTableViewController);
angular.module('PEPFAR.approvals').controller('submittedTableViewController', submittedTableViewController);
angular.module('PEPFAR.approvals').controller('allTableViewController', allTableViewController);

angular.module('PEPFAR.approvals').config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});
