function appController(periodService, $scope, currentUser, mechanismsService,
                       approvalLevelsService, $q, toastr, AppManifest, systemSettings, $translate) {
    var self = this;
    var loaded = false;

    this.actionItems = 0;
    this.state = {};
    this.showData = false;
    this.tabs = {
        accept: {
            access: false,
            name: 'Accept',
            state: false,
            action: []
        },
        submit: {
            access: false,
            name: 'Submit',
            state: false,
            action: []
        },
        unsubmit: {
            access: false,
            name: 'Unsubmit',
            state: false,
            action: []
        },
        view: {
            access: true,
            name: 'View',
            state: false,
            action: ['view']
        }
    };
    this.currentUser = {};

    this.text = {};
    $translate(['View/Act on', 'mechanism(s)']).then(function (translations) {
        self.text.viewAct = [translations['View/Act on'], 0, translations['mechanism(s)']].join(' ');
    });

    this.headerBar = {
        logo: AppManifest.activities.dhis.href + '/dhis-web-commons/css/light_blue/logo_banner.png',
        title: systemSettings.applicationTitle,
        link: AppManifest.activities.dhis.href
    };

    this.hasTableDetails = function () {
        if (mechanismsService.categories.length > 0 &&
            mechanismsService.dataSetIds.length > 0 &&
            angular.isString(mechanismsService.period)) {
            return true;
        }
        return false;
    };

    this.getTableData = function () {
        if (self.hasTableDetails()) {
            $translate('Loading...').then(function (translation) {
                self.status = translation;
            });

            $q.all([userApprovalLevelPromise, approvalLevelsService.get()]).then(function () {
                mechanismsService.getMechanisms().then(function (mechanisms) {
                    self.actionItems = 0;
                    _.each(mechanisms, function (mechanism) {
                        if (mechanism.mayApprove || mechanism.mayAccept) {
                            self.actionItems += 1;
                        }

                        /**
                         * Hack to display the dataset names for mechanisms that have the name default
                         */
                        if (mechanism.mechanism === 'default') {
                            var dataSetNames = _.pluck(_.filter($scope.details.dataSets, function (dataSet) {
                                return !!_.find(dataSet.categoryCombo.categoryOptionCombos, { id: mechanism.catComboId });
                            }), 'name');
                            mechanism.mechanism = dataSetNames.join(', ');
                        }
                    });

                    self.setStatus();

                    $scope.$broadcast('MECHANISMS.updated', mechanisms);
                });
            });
        }
    };

    this.setStatus = function () {
        if (this.actionItems === 0) {
            $translate('Done! (No actions required)').then(function (translations) {
                self.status = translations;
            });
        } else {
            $translate(this.actionItems > 1 ? 'mechanisms require action' : 'mechanism requires action').then(function (translation) {
                self.status = ' ' + translation;
            });
        }
    };

    this.getStatus = function () {
        if (this.status) {
            return this.status;
        }
    }

    this.hasAllDetails = function () {
        if ($scope.details.period
            && ($scope.details.currentSelection.length > 0
            && $scope.details.dataSets
            && $scope.details.orgUnit
            && this.getActiveTab())) {
            return true;
        }
        return false;
    };

    this.updateDataView = function () {
        function generateActions() {
            var actions = {
                approve: [],
                unapprove: [],
                accept: [],
                unaccept: []
            };
            _.each($scope.details.currentSelection, function (mechanism) {
                if (mechanism.mayApprove === true) { actions.approve.push(mechanism.id) }
                if (mechanism.mayUnapprove === true) { actions.unapprove.push(mechanism.id) }
                if (mechanism.mayAccept === true) { actions.accept.push(mechanism.id) }
                if (mechanism.mayUnaccept === true) { actions.unaccept.push(mechanism.id) }
            });

            return actions;
        }
        if (this.getActiveTab().name === 'View') {
            $scope.details.actions = {};
        } else {
            $scope.details.actions = generateActions();
        }

        if (this.hasAllDetails()) {
            $scope.$broadcast('DATAVIEW.update', $scope.details);
            this.showData = true;
        }
    };

    this.setActive = function (tabName, isActive) {
        var active = _.filter(this.state, function (item) {
            if (item === true ) {
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

    this.getActiveTab = function () {
        return _.find(this.tabs, { state: true } );
    };

    this.deSelect = function () {
        $scope.details.currentSelection = [];
        $scope.$broadcast('RECORDTABLE.selection.clear');
    };

    $scope.approvalLevel = {};

    currentUser.permissions.then(function (permissions) {
        permissions = _(permissions);

        if (permissions.contains('ALL')) {
            self.tabs.accept.access = true;
            self.tabs.accept.name = 'Accept/Return';
            self.tabs.accept.action = ['accept', 'unapprove'];
            self.tabs.submit.access = true;
            self.tabs.submit.name = 'Submit/Unaccept';
            self.tabs.submit.action = ['approve', 'unaccept'];
            self.tabs.unsubmit.access = true;
            self.tabs.unsubmit.name = 'Unsubmit';
            self.tabs.unsubmit.action = ['unapprove'];
            return;
        }

        if (permissions.contains('NOT_F_ACCEPT_DATA_LOWER_LEVELS')) {
            if ((permissions.contains('F_APPROVE_DATA') || permissions.contains('F_APPROVE_DATA_LOWER_LEVELS'))) {
                //All permissions
                self.tabs.accept.access = true;
                self.tabs.accept.name = 'Accept/Return';
                self.tabs.accept.action = ['accept', 'unapprove'];
                self.tabs.submit.access = true;
                self.tabs.submit.name = 'Submit/Unaccept';
                self.tabs.submit.action = ['approve', 'unaccept'];
                self.tabs.unsubmit.access = true;
                self.tabs.unsubmit.name = 'Unsubmit';
                self.tabs.unsubmit.action = ['unapprove'];
            } else {
                //Only accept lower levels
                self.tabs.accept.access = true;
                self.tabs.accept.name = 'Accept/Return';
                self.tabs.accept.action = ['accept', 'unapprove'];
                self.tabs.submit.access = true;
                self.tabs.submit.name = 'Unaccept';
                self.tabs.submit.action = ['unaccept'];
            }
        } else {
            if ((permissions.contains('F_APPROVE_DATA') || permissions.contains('F_APPROVE_DATA_LOWER_LEVELS'))) {
                //Only approve
                self.tabs.submit.access = true;
                self.tabs.submit.name = 'Submit';
                self.tabs.submit.action = ['approve'];
                self.tabs.unsubmit.access = true;
                self.tabs.unsubmit.name = 'Unsubmit';
                self.tabs.unsubmit.action = ['unapprove'];
            } else {
                //Only view
            }
        }
    });

    $scope.details = {
        orgUnit: undefined,
        period: undefined,
        dataSets: undefined,
        currentSelection: [],
    };

    this.updateTitle = function () {
        var title = [];

        if ($scope.approvalLevel && $scope.approvalLevel.categoryOptionGroupSet && $scope.approvalLevel.categoryOptionGroupSet.name) {
            title.push($scope.approvalLevel.categoryOptionGroupSet.name);
        }

        if (self.currentUser.orgUnit && self.currentUser.orgUnit.name) {
            title.push(self.currentUser.orgUnit.name);
        }

        title.push($translate.instant('Data approval'));

        self.title = title.join(' - ');
    }

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
        self.currentUser.orgUnit = orgUnit;

        self.updateTitle();
    });

    //TODO: Replace this with the real call
    var stuff = $q.defer();
    currentUser.approvalLevel = stuff.promise;
    stuff.resolve({ level: 1, id: 'aypLtfWShE5', categoryOptionGroupSet: { name: 'Implementing partner' }});

    var userApprovalLevelPromise = currentUser.approvalLevel.then(function (approvalLevel) {
        $scope.details.approvalLevel = approvalLevel;
        $scope.approvalLevel = approvalLevel;
        if ($scope.approvalLevel.categoryOptionGroupSet) {
            self.updateTitle();
        }
    });

    $q.all([userApprovalLevelPromise, approvalLevelsService.get()]).then(function (result) {
        if ($scope.approvalLevel.level === result[1].length) {
            self.tabs.accept.access = false;
            self.tabs.accept.state = false;
            self.tabs.submit.access = true;
            self.tabs.submit.state = true;
            self.tabs.submit.name = 'Pending';
        }
    });

    //When the dataset group is changed update the filter types and the datasets
    $scope.$on('DATASETGROUP.changed', function (event, dataSets) {
        periodService.filterPeriodTypes(dataSets.getPeriodTypes());
        $scope.details.dataSets = dataSets.get();
        mechanismsService.categories = dataSets.getCategoryIds();
        mechanismsService.dataSetIds = dataSets.getIds()

        $scope.details.currentSelection = [];

        //TODO: Since it's pepfar we might not have to request the mechanism again when the
        //category changes, as they only use one category
        if (self.hasTableDetails()) {
            self.showData = false;
            self.getTableData();
            self.deSelect();
        }

        self.text.viewAct = [$translate.instant('View/Act on'),
            $scope.details.currentSelection.length,
            $translate.instant('mechanism(s)')].join(' ');
    });

    $scope.$on('RECORDTABLE.selection.changed', function (event, selection) {
        $scope.details.currentSelection = selection;

        self.text.viewAct = [$translate.instant('View/Act on'),
                             $scope.details.currentSelection.length,
                             $translate.instant('mechanism(s)')].join(' ');
    });

    $scope.$on('APP.submit.success', function (event, mechanisms) {
        var successMessage = [mechanisms.action[0].toUpperCase(),
                              mechanisms.action.substr(1),
                              ' successful for ',
                              mechanisms.mechanisms.length,
                              ' mechanism(s)'];
        if (mechanisms.mechanisms.length < 10) {
            //FIXME: Html in controller :( Bad practice
            successMessage.push('<ul>');
            angular.forEach(mechanisms.mechanisms, function (mechanism) {
                successMessage.push('<li>' + mechanism.mechanism + '</li>');
            });
            successMessage.push('</ul>');
        }
        toastr.success(successMessage.join(''));
        if (self.hasTableDetails()) {
            self.showData = false;
            self.getTableData();
            self.deSelect();
        }
    });

    $scope.$on('APP.submit.error', function (event, message) {
        toastr.error(message);
        if (self.hasTableDetails()) {
            self.showData = false;
            self.getTableData();
            self.deSelect();
        }
    });

    $scope.$watch(function () {
        return periodService.period;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.details.period = newVal.iso;
            mechanismsService.period = $scope.details.period;
        }

        //TODO: See if we can resolve this a bit more clever (It's duplicate with other stuff)
        $scope.details.currentSelection = [];
        self.text.viewAct = [$translate.instant('View/Act on'),
            $scope.details.currentSelection.length,
            $translate.instant('mechanism(s)')].join(' ');
    });

    $scope.$watch(function () {
       return mechanismsService.period;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if (self.hasTableDetails()) {
                self.showData = false;
                self.getTableData();
            }
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

function tableViewController(mechanismsService, $scope) {
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

    //TODO: Perhaps take setActive out of this method as it's called a lot of times this way
    this.hasItems = function (appCtrl, tabName) {
        appCtrl.setActive(tabName, ((!!this.approvalTableData.length) && appCtrl.tabs[tabName] && appCtrl.tabs[tabName].access));

        return !!this.approvalTableData.length;
    };

    this.actionsToFilterOn = [];
    this.filterData = function (data) {
        var result = [];

        _.each(this.actionsToFilterOn, function (filter) {
            result = result.concat(_.filter(data, filter));
        });

        return _.uniq(result);
    };
}

function acceptTableViewController($scope, $controller) {
    $.extend(this, $controller('tableViewController', { $scope: $scope }));

    var filterBelowUserLevel = (function (item) {
        if ($scope.approvalLevel && item.level > $scope.approvalLevel.level && item.mayUnapprove === true) {
            return true;
        }
        return false;
    }).bind(this);

    this.actionsToFilterOn = [{ mayAccept: true }, filterBelowUserLevel];
    this.approvalTableData = this.filterData(this.approvalTableDataSource);

    $scope.$on('MECHANISMS.updated', (function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
        this.hasActionItems = !!_.filter(this.approvalTableData, { mayAccept: true }).length;
    }).bind(this));
}

function acceptedTableViewController($scope, $controller) {
    $.extend(this, $controller('tableViewController', { $scope: $scope }));

    this.actionsToFilterOn = [{ mayApprove: true }, { mayUnaccept: true }];
    this.approvalTableData = this.filterData(this.approvalTableDataSource);

    $scope.$on('MECHANISMS.updated', (function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
        this.hasActionItems = !!_.filter(this.approvalTableData, { mayApprove: true }).length;
    }).bind(this));
}

function submittedTableViewController($scope, $controller) {
    $.extend(this, $controller('tableViewController', { $scope: $scope }));

    var filterOnLevel = (function (item) {
        if ($scope.approvalLevel && item.level === $scope.approvalLevel.level && item.mayUnapprove === true) {
            return true;
        }
        return false;
    }).bind(this);

    this.actionsToFilterOn = [filterOnLevel];
    this.approvalTableData = this.filterData(this.approvalTableDataSource);

    $scope.$on('MECHANISMS.updated', (function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
    }).bind(this));
}

function viewTableViewController($scope, $controller) {
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

angular.module('PEPFAR.approvals', ['d2', 'd2-translate', 'ui.select', 'ui.bootstrap.tabs', 'd2-typeahead', 'ui.bootstrap.typeahead', 'ui.bootstrap.progressbar']);
angular.module('PEPFAR.approvals').controller('appController', appController);
angular.module('PEPFAR.approvals').controller('tableViewController', tableViewController);
angular.module('PEPFAR.approvals').controller('acceptTableViewController', acceptTableViewController);
angular.module('PEPFAR.approvals').controller('acceptedTableViewController', acceptedTableViewController);
angular.module('PEPFAR.approvals').controller('submittedTableViewController', submittedTableViewController);
angular.module('PEPFAR.approvals').controller('viewTableViewController', viewTableViewController);

angular.module('PEPFAR.approvals').config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});
