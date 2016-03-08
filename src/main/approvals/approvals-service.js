function approvalsService($q, Restangular) {

    //TODO rework this to not by default return true
    function checkApprovalData(approvalData) {
        if (!angular.isObject(approvalData)) {
            return 'The parameters for approvals are missing';
        }

        try {
            hasValidPeriod(approvalData);
            hasValidDataSet(approvalData);
            hasValidCategoryOptionCombo(approvalData);
        } catch (errorMessage) {
            return errorMessage;
        }

        return true;
    }

    function hasValidPeriod(approvalData) {
        if (!angular.isArray(approvalData.pe) || approvalData.pe.length === 0) {
            throw 'Period parameter (pe) is missing or empty';
        }
    }

    function hasValidDataSet(approvalData) {
        if (!angular.isArray(approvalData.ds) || approvalData.ds.length === 0) {
            throw 'Dataset id parameter (ds) is missing or empty';
        }
    }

    function hasValidCategoryOptionCombo(approvalData) {
        if (!angular.isArray(approvalData.approvals) || approvalData.approvals.length === 0) {
            throw 'Category option combo parameter is missing or empty';
        }
    }

    this.approve = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            // First parameter is undefined because we do not post a body but
            // the data is in the query params in the second parameter.
            return Restangular.all('dataApprovals/approvals').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    };

    this.unapprove = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            return Restangular.all('dataApprovals/unapprovals').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    };

    this.accept = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            return Restangular.all('dataAcceptances/acceptances').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    };

    this.unaccept = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            return Restangular.all('dataAcceptances/unacceptances').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    };
}

angular.module('PEPFAR.approvals').service('approvalsService', approvalsService);
