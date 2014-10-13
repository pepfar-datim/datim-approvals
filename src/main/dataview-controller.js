function dataViewController($scope, approvalsService) {
    this.filteredDataSets = [];
    this.details = $scope.details;
    this.getMechanismsByIds = function (ids) {
        var ids = _(ids);
        return _.filter(this.details.currentSelection, function (mechanism) {
            return ids.contains(mechanism.id);
        });
    };

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

        if (angular.isString(this.getApprovalLevelId()) && this.getApprovalLevelId().length > 0) {
            params.al = this.getApprovalLevelId();
        }

        return params;
    };

    this.isParamsComplete = function () {
        var params = this.getParamsForMechanism();

        if (angular.isObject(params) &&
            angular.isString(params.pe) && params.pe.length > 0 &&
            angular.isString(params.al) && params.al.length > 0 &&
            angular.isArray(params.ds) && params.ds.length > 0) {
            return true;
        }
        return false;
    };

    this.submit = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);

        if (this.isParamsComplete()) {
            var approvalParams = angular.copy(params);

            approvalParams.co = _.pluck(mechanisms, 'id');

            if (approvalParams.co.length > 0) {
                approvalsService.approve(approvalParams).then(function () {
                    $scope.$emit('APP.submit.success', { action: 'approve', mechanisms: mechanisms } );
                }, function (message) {
                    $scope.$emit('APP.submit.error', message.statusText);
                });
            }
        }
    };

    this.accept = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);

        if (this.isParamsComplete()) {
            var approvalParams = angular.copy(params);

            approvalParams.co = _.pluck(mechanisms, 'id');

            if (approvalParams.co.length > 0) {
                approvalsService.accept(approvalParams).then(function () {
                    $scope.$emit('APP.submit.success', { action: 'accept', mechanisms: mechanisms } );
                }, function (message) {
                    $scope.$emit('APP.submit.error', message.statusText);
                });
            }
        }
    };

    this.unapprove = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);

        if (this.isParamsComplete()) {
            var approvalParams = angular.copy(params);

            approvalParams.co = _.pluck(mechanisms, 'id');

            if (approvalParams.co.length > 0) {
                approvalsService.unapprove(approvalParams).then(function () {
                    $scope.$emit('APP.submit.success', { action: 'unapprove', mechanisms: mechanisms } );
                }, function (message) {
                    $scope.$emit('APP.submit.error', message.statusText);
                });;
            }
        }
    };

    this.unaccept = function (ids) {
        var params = this.getParamsForMechanism();
        var mechanisms = this.getMechanismsByIds(ids);

        if (this.isParamsComplete()) {
            var approvalParams = angular.copy(params);

            approvalParams.co = _.pluck(mechanisms, 'id');

            if (approvalParams.co.length > 0) {
                approvalsService.unaccept(approvalParams).then(function () {
                    $scope.$emit('APP.submit.success', { action: 'unaccept', mechanisms: mechanisms } );
                }, function (message) {
                    $scope.$emit('APP.submit.error', message.statusText);
                });;
            }
        }
    };
}

angular.module('PEPFAR.approvals').controller('dataViewController', dataViewController);
