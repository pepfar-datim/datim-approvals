/* global jQuery */
angular.module('PEPFAR.approvals', [
    'restangular',
    'd2-recordtable',
    'd2-translate',
    'ui.select',
    'ui.bootstrap.tpls',
    'ui.bootstrap.tabs',
    'ui.bootstrap.typeahead',
    'ui.bootstrap.progressbar',
    'ngCacheBuster',
    'rx'
]);
angular.module('PEPFAR.approvals').controller('appController', appController);
angular.module('PEPFAR.approvals').controller('tableViewController', tableViewController);
angular.module('PEPFAR.approvals').controller('acceptTableViewController', acceptTableViewController);
angular.module('PEPFAR.approvals').controller('acceptedTableViewController', acceptedTableViewController);
angular.module('PEPFAR.approvals').controller('submittedTableViewController', submittedTableViewController);
angular.module('PEPFAR.approvals').controller('viewTableViewController', viewTableViewController);

angular.module('PEPFAR.approvals')
    .config(function (uiSelectConfig) {
        uiSelectConfig.theme = 'bootstrap';
    })
    .config(function (httpRequestInterceptorCacheBusterProvider) {
        httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*\.html.*/]);
    });

//jshint maxstatements: 46
function appController(periodService, $scope, currentUser, mechanismsService,
                       approvalLevelsService, toastr, AppManifest,
                       systemSettings, $translate, userApprovalLevels$,
                       organisationunitsService, $log, rx, workflowService) {
    var self = this;
    var vm = this;
    var organisationUnit$ = new rx.ReplaySubject(1);
    var mechanisms$ = new rx.ReplaySubject(1);

    vm.infoBox = {
        isShowing: false,
        showBox: function () {
            this.isShowing = !this.isShowing;
        }
    };

    this.loading = true;
    this.actionItems = 0;
    this.state = {};
    this.showData = false;
    this.tabs = {
        accept: {
            access: false,
            name: ['Accept'],
            state: false,
            action: []
        },
        submit: {
            access: false,
            name: ['Submit'],
            state: false,
            action: []
        },
        unsubmit: {
            access: false,
            name: ['Recall submission'],
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

    this.headerBar = {
        logo: AppManifest.activities.dhis.href + '/dhis-web-commons/css/light_blue/logo_banner.png',
        title: systemSettings.applicationTitle,
        link: AppManifest.activities.dhis.href
    };

    this.hasTableDetails = function () {
        if (mechanismsService.categories.length > 0 &&
            mechanismsService.dataSetIds.length > 0 &&
            mechanismsService.organisationUnit && mechanismsService.organisationUnit !== '' &&
            angular.isString(mechanismsService.period)) {
            return true;
        }
        return false;
    };

    function setInfoBoxLevels() {
        vm.infoBox.levelAbove = getNextApprovalLevel() && getNextApprovalLevel().displayName;
        vm.infoBox.levelBelow = getPreviousApprovalLevel() && getPreviousApprovalLevel().displayName;
    }

    var usersAndAllApprovalLevels$ = rx.Observable.combineLatest(
        userApprovalLevels$,
        approvalLevelsService,
        function (userApprovalLevel, approvalLevels) {
            return [userApprovalLevel, approvalLevels];
        }
    );

    rx.Observable.combineLatest(
        usersAndAllApprovalLevels$,
        mechanisms$,
        organisationUnit$,
        function (approvalLevels, mechanisms, organisationUnit) {
            return {
                approvalLevels: approvalLevels,
                mechanisms: mechanisms
                    .filter(function (mechanism) {
                        // When you are a global user and global is selected as an organisationUnit you should see everything
                        if (organisationUnit.name === 'Global') {
                            return true;
                        }

                        return mechanism.country === organisationUnit.name;
                    })
            };
        }
    )
        .subscribe(function (data) {
            var mechanisms = data.mechanisms;
            var actionMechanisms = [];

            setInfoBoxLevels();

            _.each(mechanisms, function (mechanism) {
                var previousApprovalLevel = getPreviousApprovalLevel() || {};

                if (mechanism.mayApprove && (mechanism.level === previousApprovalLevel.level)) {
                    actionMechanisms.push(mechanism.id);
                }

                if (mechanism.mayAccept && (mechanism.level === previousApprovalLevel.level)) {
                    actionMechanisms.push(mechanism.id);
                }
            });

            actionMechanisms = actionMechanisms.reduce(function (actionMechanisms, mechanismId) {
                if (actionMechanisms.indexOf(mechanismId) === -1) {
                    actionMechanisms.push(mechanismId);
                }
                return actionMechanisms;
            }, []);

            self.actionItems = actionMechanisms.length;
            self.setStatus();

            $scope.$broadcast('MECHANISMS.updated', mechanisms);
        });

    this.getTableData = function () {
        if (self.hasTableDetails()) {
            $translate('Loading...').then(function (translation) {
                self.status = translation;
            });

            self.loading = true;
            mechanismsService.getMechanisms()
                .take(1)
                .subscribe(function (mechanisms) {
                    mechanisms$.onNext(mechanisms);
                    self.loading = false;
                });

        }
    };

    this.setStatus = function () {
        if (this.actionItems === 0) {
            $translate('No action required').then(function (translations) {
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
    };

    this.hasAllDetails = function () {
        if ($scope.details.period &&
            ($scope.details.currentSelection.length > 0 &&
            $scope.details.dataSets &&
            $scope.details.orgUnit &&
            this.getActiveTab())) {

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
                if (mechanism.mayApprove === true) {
                    actions.approve.push(mechanism.id);
                }
                if (mechanism.mayUnapprove === true) {
                    actions.unapprove.push(mechanism.id);
                }
                if (mechanism.mayAccept === true) {
                    actions.accept.push(mechanism.id);
                }
                if (mechanism.mayUnaccept === true) {
                    actions.unaccept.push(mechanism.id);
                }
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

    this.getActiveTab = function () {
        return _.find(this.tabs, {state: true});
    };

    this.deSelect = function (tabName) {
        if (this.tabs[tabName]) {
            this.tabs[tabName].state = false;
        }
        $scope.details.currentSelection = [];
        this.updateViewButton();
        $scope.$broadcast('RECORDTABLE.selection.clear');
    };

    $scope.approvalLevel = {};

    $translate(['View/Act on', 'mechanism(s)']).then(function (translations) {
        self.text.viewAct = [translations['View/Act on'], 0, translations['mechanism(s)']].join(' ');
    });

    currentUser.permissions.then(function (permissions) { //jshint maxcomplexity:7
        permissions = _(permissions);

        if (permissions.contains('ALL')) {
            self.tabs.accept.access = true;
            self.tabs.accept.name = ['Accept'];
            self.tabs.accept.action = ['accept'];
            self.tabs.submit.access = true;
            self.tabs.submit.name = ['Submit', 'Return submission'];
            self.tabs.submit.action = ['approve'];
            self.tabs.unsubmit.access = true;
            self.tabs.unsubmit.name = ['Recall submission'];
            self.tabs.unsubmit.action = ['unapprove'];
            return;
        }

        if (permissions.contains('F_ACCEPT_DATA_LOWER_LEVELS')) {
            if ((permissions.contains('F_APPROVE_DATA') || permissions.contains('F_APPROVE_DATA_LOWER_LEVELS'))) {
                //All permissions
                self.tabs.accept.access = true;
                self.tabs.accept.name = ['Accept'];
                self.tabs.accept.action = ['accept'];
                self.tabs.submit.access = true;
                self.tabs.submit.name = ['Submit', 'Return submission'];
                self.tabs.submit.action = ['approve'];
                self.tabs.unsubmit.access = true;
                self.tabs.unsubmit.name = ['Recall submission'];
                self.tabs.unsubmit.action = ['unapprove'];
            } else {
                //Only accept lower levels
                self.tabs.accept.access = true;
                self.tabs.accept.name = ['Accept', 'Return submission'];
                self.tabs.accept.action = ['accept'];
                self.tabs.submit.access = false;
                self.tabs.submit.name = ['Unaccept'];
                self.tabs.submit.action = ['unaccept'];
                self.tabs.unsubmit.access = true;
                self.tabs.unsubmit.name = ['Return submission'];
                self.tabs.unsubmit.action = ['unaccept'];
            }
        } else {
            if ((permissions.contains('F_APPROVE_DATA') || permissions.contains('F_APPROVE_DATA_LOWER_LEVELS'))) {
                //Only approve
                self.tabs.submit.access = true;
                self.tabs.submit.name = ['Submit'];
                self.tabs.submit.action = ['approve'];
                self.tabs.unsubmit.access = true;
                self.tabs.unsubmit.name = ['Recall submission'];
                self.tabs.unsubmit.action = ['unapprove'];
            }
        }
    });

    $scope.details = {
        orgUnit: undefined,
        period: undefined,
        dataSets: undefined,
        currentSelection: []
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
    };

    this.updateViewButton = function () {
        var actionText = 'View/Act';
        var activeTab = _.find(this.tabs, {state: true});

        if (activeTab) {
            if (Array.isArray(activeTab.name)) {
                actionText = $translate.instant(activeTab.name.join(' or '));
            }
            if (angular.isString(activeTab.name)) {
                actionText = $translate.instant(activeTab.name);
            }
        }

        this.text.viewAct = [
            $translate.instant(actionText),
            $scope.details.currentSelection.length,
            $translate.instant('mechanism(s)')
        ].join(' ');
    };

    //Get the users org unit off the user
    currentUser.then(function () {
        var orgUnit;

        if (Array.isArray(currentUser.valueFor('dataViewOrganisationUnits')) &&
            currentUser.valueFor('dataViewOrganisationUnits').length >= 1) {
            orgUnit = currentUser.valueFor('dataViewOrganisationUnits')[0];
        } else {
            if (currentUser.valueFor('organisationUnits').length >= 1) {
                orgUnit = currentUser.valueFor('organisationUnits')[0];
            } else {
                if (window.console && window.console.error) {
                    window.console.error('No orgunit found for the current user');
                }
            }
        }

        $scope.details.orgUnit = orgUnit.id;
        self.currentUser.orgUnit = orgUnit;

        organisationunitsService.currentOrganisationUnit = orgUnit;

        self.updateTitle();

        function userApprovalLevelsLoaded(approvalLevel) {
            $scope.approvalLevel = $scope.details.approvalLevel = approvalLevel[0];
            if ($scope.approvalLevel.categoryOptionGroupSet) {
                self.updateTitle();
            }
            organisationunitsService.currentOrganisationUnit.level = $scope.approvalLevel.level;
        }

        function userApprovalLevelsFailed() {
            toastr.error('Unable to load your Data Approval Levels. (Please submit a ticket)');
        }

        userApprovalLevels$.subscribe(userApprovalLevelsLoaded, userApprovalLevelsFailed);

    });

    //TODO: This might be confusing as this is changing the tabs in a different place.
    usersAndAllApprovalLevels$
        .subscribe(function (result) {
            if ($scope.approvalLevel.level === result[1].length) {
                self.tabs.accept.access = false;
                self.tabs.accept.state = false;
                self.tabs.submit.access = true;
                self.tabs.submit.state = true;
                self.tabs.submit.name = ['Submit'];
            }
        }, function () {
            toastr.error('Unable to load Data Approval levels, yours or all. (Please submit a ticket)');
        });

    workflowService
        .currentWorkflow$
        .subscribe(function (workflow) {
            $scope.currentWorkflow = workflow;
            $log.info('Current workflow', workflow);
        });

    function getNextApprovalLevel() {
        if ($scope.currentWorkflow) {
            try {
                var nextApprovalLevel = $scope.currentWorkflow.getApprovalLevelBeforeLevel($scope.approvalLevel.id);
                return nextApprovalLevel;
            } catch (e) {}
        }

        return {};
    }

    function getPreviousApprovalLevel() {
        if ($scope.currentWorkflow) {
            try {
                var previousApprovalLevel = $scope.currentWorkflow.getApprovalLevelBelowLevel($scope.approvalLevel.id);
                return previousApprovalLevel;
            } catch (e) {}
        }

        return {};
    }

    //When the dataset group is changed update the filter types and the datasets
    $scope.$on('DATASETGROUP.changed', function (event, dataSets) {
        // Grab the period types from the Workflow
        workflowService.setCurrentWorkflow(dataSets.get()[0].workflow);

        $scope.details.dataSets = dataSets.get();
        mechanismsService.categories = dataSets.getCategoryIds();
        mechanismsService.dataSetIds = dataSets.getIds();
        mechanismsService.dataSets = dataSets.get();

        // Reset the selection
        $scope.details.currentSelection = [];

        // When the details are available load the mechanisms for the table
        if (self.hasTableDetails()) {
            self.showData = false;
            self.deSelect();
        }

        self.updateViewButton();
    });

    function setOrganisationUnit() {
        if (organisationunitsService.currentOrganisationUnit.name === 'Global') {
            if (!$scope.globalUser) {
                $scope.globalUser = {
                    isGlobalUser: true,
                    globalOUId: organisationunitsService.currentOrganisationUnit.id
                };
                $log.info('User is concidered a global user');
                $log.info($scope.globalUser);
            }
            mechanismsService.isGlobal = true;
        } else {
            mechanismsService.isGlobal = false;
        }

        mechanismsService.organisationUnit = organisationunitsService.currentOrganisationUnit.id;
        organisationUnit$.onNext(organisationunitsService.currentOrganisationUnit);
    }

    $scope.$on('RECORDTABLE.selection.changed', function (event, selection) {
        $scope.details.currentSelection = selection;

        self.updateViewButton();
    });

    $scope.$on('APP.submit.success', function (event, mechanisms) {
        var successMessage = [
            mechanisms.action[0].toUpperCase(),
            mechanisms.action.substr(1),
            ' successful for ',
            mechanisms.mechanisms.length,
            ' mechanism(s)'
        ];
        if (mechanisms.mechanisms.length < 10) {
            //FIXME: Html in controller :( Bad practice
            successMessage.push('<ul>');
            angular.forEach(mechanisms.mechanisms, function (mechanism) {
                successMessage.push('<li>' + mechanism.mechanism + '</li>');
            });
            successMessage.push('</ul>');
        }
        toastr.success(successMessage.join(''), undefined, {timeOut: 4000, extendedTimeOut: 2500});
        if (self.hasTableDetails()) {
            self.showData = false;
            self.getTableData();
            self.deSelect();
        }
    });

    $scope.$on('APP.errorhandler.error', function () {
        self.loading = false;
    });

    $scope.$on('APP.submit.error', function (event, message) {
        toastr.error(message);
        if (self.hasTableDetails()) {
            self.showData = false;
            self.getTableData();
            self.deSelect();
        }
    });

    periodService.period$
        .subscribe(function (period) {
            // $log.info('Period changed to',  period);
            $scope.details.period = period.id;
            mechanismsService.period = $scope.details.period;

            //TODO: See if we can resolve this a bit more clever (It's duplicate with other stuff)
            $scope.details.currentSelection = [];
            self.updateViewButton();
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
        if (currentUser.organisationUnits) {
            return currentUser.organisationUnits[0].id;
        }
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.details.orgUnit = newVal;
            setOrganisationUnit();
        }
    });

    $scope.$watch(function () {
        return organisationunitsService.currentOrganisationUnit;
    }, function (newVal) {
        if (newVal && newVal.name) {
            organisationUnit$.onNext(newVal);
        }
    });
}

function tableViewController($scope) {
    this.approvalTableConfig = {
        columns: [
            {name: 'mechanism', sortable: true, searchable: true},
            {name: 'country', sortable: true, searchable: true},
            {name: 'agency', sortable: true, searchable: true},
            {name: 'partner', sortable: true, searchable: true},
            {name: 'status', sortable: true, searchable: true},
            {name: 'actions', sortable: true, searchable: true}
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

    this.getPreviousApprovalLevel = function () {
        if ($scope.currentWorkflow) {
            try {
                var previousApprovalLevel = $scope.currentWorkflow.getApprovalLevelBelowLevel($scope.approvalLevel.id);
                return previousApprovalLevel;
            } catch (e) {}
        }

        return {};
    };
}

function acceptTableViewController($scope, $controller) {
    jQuery.extend(this, $controller('tableViewController', {$scope: $scope}));

    var filterBelowUserLevel = function (item) {
        if ($scope.approvalLevel && item.level > $scope.approvalLevel.level && item.mayAccept === true) {
            return true;
        }
        return false;
    }.bind(this);

    this.actionsToFilterOn = [{mayAccept: true}, filterBelowUserLevel];
    this.approvalTableData = this.filterData(this.approvalTableDataSource);

    $scope.$on('MECHANISMS.updated', function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
        this.hasActionItems = !!_.filter(this.approvalTableData, {
            mayAccept: true,
            level: this.getPreviousApprovalLevel().level
        }).length;
    }.bind(this));
}

function acceptedTableViewController($scope, $controller) {
    jQuery.extend(this, $controller('tableViewController', {$scope: $scope}));

    this.actionsToFilterOn = [{mayApprove: true}, {mayUnaccept: true}];
    this.approvalTableData = this.filterData(this.approvalTableDataSource);

    $scope.$on('MECHANISMS.updated', function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
        this.hasActionItems = !!_.filter(this.approvalTableData, {
            mayApprove: true,
            level: this.getPreviousApprovalLevel().level
        }).length;
    }.bind(this));
}

function submittedTableViewController($scope, $controller) {
    jQuery.extend(this, $controller('tableViewController', {$scope: $scope}));

    var filterOnLevel = function (item) {
        // User does not have an approval level so, everything is false
        if (!$scope.approvalLevel) {
            return false;
        }

        var onLowerLevelAndAccepted = ((parseInt(item.level, 10) === this.getPreviousApprovalLevel().level) && item.accepted);

        if (((item.level === $scope.approvalLevel.level)  || onLowerLevelAndAccepted)  && item.mayUnapprove === true) {
            return true;
        }
        return false;
    }.bind(this);

    this.actionsToFilterOn = [filterOnLevel];
    this.approvalTableData = this.filterData(this.approvalTableDataSource);

    $scope.$on('MECHANISMS.updated', function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
    }.bind(this));
}

function viewTableViewController($scope, $controller) {
    jQuery.extend(this, $controller('tableViewController', {$scope: $scope}));

    //The filter always returns true.
    this.filterData = function (data) {
        return _.filter(data, function () {
            return true;
        }, this);
    };
    this.approvalTableData = this.filterData();

    $scope.$on('MECHANISMS.updated', function (event, mechanisms) {
        this.approvalTableData = this.filterData(mechanisms);
    }.bind(this));
}
