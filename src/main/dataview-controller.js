function dataViewController($scope, approvalsService, $translate, $log) {
    var self = this;

    this.filteredDataSets = [];
    this.details = $scope.details;
    this.getMechanismsByIds = function (ids) {
        var idsLodash = _(ids);
        return _.filter(this.details.currentSelection, function (mechanism) {
            return idsLodash.contains(mechanism.id);
        });
    };

    this.isLocked = false;

    this.getActionTextFor = function (type) {
        function ucFirst(value) {
            return value.replace(/^./, function (value) {
                return value.toUpperCase();
            });
        }

        if (type === 'unapprove') {
            var isReturn = (this.details.currentSelection || []).reduce(function (isReturn, mechanism) {
                return (isReturn && /Return submission/.test(mechanism.actions));
            }, true);

            if (isReturn) {
                return $translate.instant('Return submission for {{count}} mechanism(s)', {count: this.details.actions[type].length});
            }
        }

        if (this.details.actions && this.details.actions[type]) {
            return $translate.instant(ucFirst(type) + ' {{count}} mechanism(s)', {count: this.details.actions[type].length});
        }
    };

    this.getPeriod = function () {
        return this.details.period;
    };

    this.getDataSetIds = function () {
        if (angular.isArray(this.details.dataSets)) {
            return _.map(this.details.dataSets, 'id');
        }
        return [];
    };

    this.getApprovalLevelId = function () {
        if (this.details.approvalLevel) {
            return this.details.approvalLevel.id;
        }
    };

    this.getParamsForMechanism = function () {
        var params = {};

        if (angular.isString(this.getPeriod()) && this.getPeriod().length > 0) {
            params.pe = this.getPeriod();
        }

        if (angular.isArray(this.getDataSetIds()) && this.getDataSetIds().length > 0) {
            params.ds = this.getDataSetIds();
        }

        return params;
    };

    this.isParamsComplete = function () {
        var params = this.getParamsForMechanism();

        if (angular.isObject(params) &&
            angular.isString(params.pe) && params.pe.length > 0 &&
            angular.isArray(params.ds) && params.ds.length > 0) {
            return true;
        }
        return false;
    };

    function getActionCallBackFor(actionName, mechanisms) {
        return function () {
            self.isLocked = false;
            $scope.$emit('APP.submit.success', {action: actionName, mechanisms: mechanisms});
        };
    }

    function actionErrorCallBack(message) {
        var resultMessage;

        self.isLocked = false;

        if (!/<[a-z][\s\S]*>/.test(message.data) && angular.isString(message.data)) {
            resultMessage = message.data;
        } else {
            resultMessage = (message.status ? message.status + ': ' : '') + message.statusText;
        }

        $scope.$emit('APP.submit.error', $translate.instant(resultMessage));
    }

    function prepareApprovalServiceParams(params, mechanisms, action) {
        var approvalParams = {};

        approvalParams.approvals = _.map(mechanisms, function (mechanism) {
            return {
                aoc: mechanism.catComboId,
                ou: determineOu(mechanism, action)
            };
        });
        approvalParams.pe = [params.pe];
        approvalParams.ds = params.ds;

        return approvalParams;

        function determineOu(mechanism, action) {
            if (isGlobal()) {
                //Adjust the mechanisms ou for any actions that happen on the global level
                if (mechanism.level === 1 || mechanism.level === 2) {
                    //Adjust the mechanisms ou for any actions that happen on the global level
                    $log.info(mechanism, 'is on level 1 therefore we replace the ou with', $scope.globalUser.globalOUId);
                    return $scope.globalUser.globalOUId;
                }
                if ((mechanism.nextLevel === 1 || mechanism.nextLevel === 2)
                    && mechanism.accepted === true && action === 'submit') {
                        $log.info(mechanism, 'is about to be submitted from level 2 and is accepted therefore we replace the ou with', $scope.globalUser.globalOUId);
                        return $scope.globalUser.globalOUId;
                }
            }

            return mechanism.organisationUnit;
        }

        function isGlobal() {
            return !!($scope.globalUser && $scope.globalUser.isGlobalUser && $scope.globalUser.globalOUId);
        }
    }

    this.submit = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);
        var approvalParams;

        this.isLocked = true;

        if (this.isParamsComplete()) {
            approvalParams = prepareApprovalServiceParams(params, mechanisms, 'submit');

            if (approvalParams.approvals.length > 0) {
                approvalsService.approve(approvalParams).then(getActionCallBackFor('submit', mechanisms), actionErrorCallBack);
            }
        }
    };

    this.accept = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);
        var approvalParams;

        this.isLocked = true;

        if (this.isParamsComplete()) {
            approvalParams = prepareApprovalServiceParams(params, mechanisms, 'accept');

            if (approvalParams.approvals.length > 0) {
                approvalsService.accept(approvalParams).then(getActionCallBackFor('accept', mechanisms), actionErrorCallBack);
            }
        }
    };

    this.unapprove = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);
        var approvalParams;

        this.isLocked = true;

        if (this.isParamsComplete()) {
            approvalParams = prepareApprovalServiceParams(params, mechanisms, 'unapprove');

            if (approvalParams.approvals.length > 0) {
                approvalsService.unapprove(approvalParams).then(getActionCallBackFor('unsubmit', mechanisms), actionErrorCallBack);
            }
        }
    };

    this.unaccept = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);
        var approvalParams;

        this.isLocked = true;

        if (this.isParamsComplete()) {
            approvalParams = prepareApprovalServiceParams(params, mechanisms, 'unaccept');

            if (approvalParams.approvals.length > 0) {
                approvalsService.unaccept(approvalParams).then(getActionCallBackFor('unaccept', mechanisms), actionErrorCallBack);
            }
        }
    };
}

angular.module('PEPFAR.approvals').controller('dataViewController', dataViewController);
