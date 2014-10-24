function dataViewController($scope, approvalsService, $translate) {
    this.filteredDataSets = [];
    this.details = $scope.details;
    this.getMechanismsByIds = function (ids) {
        var ids = _(ids);
        return _.filter(this.details.currentSelection, function (mechanism) {
            return ids.contains(mechanism.id);
        });
    };

    this.getActionTextFor = function(type) {
        var translations;

        function ucFirst(value) {
            return value.replace(/^./, function (value) { return value.toUpperCase(); });
        }

        if (this.details.actions && this.details.actions[type]) {
            return $translate.instant(ucFirst(type) + ' {{count}} mechanism(s)', { count: this.details.actions[type].length });
        }
    }

    this.getPeriod = function () {
        return this.details.period;
    };

    this.getDataSetIds = function () {
        if (angular.isArray(this.details.dataSets)) {
            return _.pluck(this.details.dataSets, 'id');
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

    function getActionCallBackFor(actionName) {
        return function () {
            $scope.$emit('APP.submit.success', { action: actionName, mechanisms: mechanisms } );
        }
    }

    function actionErrorCallBack(message) {
            $scope.$emit('APP.submit.error', message.statusText);
    }

    function prepareApprovalServiceParams(params, mechanisms) {
        var approvalParams = angular.copy(params);

        approvalParams.coc = _.pluck(mechanisms, 'catComboId');
        approvalParams.pe = [approvalParams.pe];

        return approvalParams;
    }

    this.submit = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);
        var approvalParams;

        if (this.isParamsComplete()) {
            approvalParams= prepareApprovalServiceParams(params, mechanisms);

            if (approvalParams.coc.length > 0) {
                approvalsService.approve(approvalParams).then(getActionCallBackFor('approve'), actionErrorCallBack);
            }
        }
    };

    this.accept = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);
        var approvalParams;

        if (this.isParamsComplete()) {
            approvalParams= prepareApprovalServiceParams(params, mechanisms);

            if (approvalParams.coc.length > 0) {
                approvalsService.accept(approvalParams).then(getActionCallBackFor('accept'), actionErrorCallBack);
            }
        }
    };

    this.unapprove = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);
        var approvalParams;

        if (this.isParamsComplete()) {
            approvalParams= prepareApprovalServiceParams(params, mechanisms);

            if (approvalParams.coc.length > 0) {
                approvalsService.unapprove(approvalParams).then(getActionCallBackFor('unapprove'), actionErrorCallBack);
            }
        }
    };

    this.unaccept = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);
        var approvalParams;

        if (this.isParamsComplete()) {
            approvalParams= prepareApprovalServiceParams(params, mechanisms);

            if (approvalParams.coc.length > 0) {
                approvalsService.unaccept(approvalParams).then(getActionCallBackFor('unaccept'), actionErrorCallBack);
            }
        }
    };
}

angular.module('PEPFAR.approvals').controller('dataViewController', dataViewController);
