function approvalsService($q, d2Api) {

    //TODO rework this to not by default return true
    function checkApprovalData(approvalData) {
        if (!angular.isObject(approvalData)) {
            return 'The parameters for approvals are missing';
        }

        if (!angular.isArray(approvalData.pe) || approvalData.pe.length === 0) {
            return 'Period parameter (pe) is missing or empty';
        }

        if (!angular.isArray(approvalData.ds) || approvalData.ds.length === 0) {
            return 'Dataset id parameter (ds) is missing or empty';
        }

        if (!angular.isArray(approvalData.approvals) || approvalData.approvals.length === 0) {
            return 'Category option combo parameter is missing or empty';
        }

        return true;
    }

    this.approve = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            // First parameter is undefined because we do not post a body but
            // the data is in the query params in the second parameter.
            return d2Api.getEndPoint('dataApprovals/approvals').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    };

    this.unapprove = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            return d2Api.getEndPoint('dataApprovals/unapprovals').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    }

    this.accept = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            return d2Api.getEndPoint('dataAcceptances/acceptances').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    }

    this.unaccept = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            return d2Api.getEndPoint('dataAcceptances/unacceptances').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    }

    d2Api.addEndPoint('dataApprovals/approvals');
    d2Api.addEndPoint('dataApprovals/unapprovals');
    d2Api.addEndPoint('dataAcceptances/acceptances');
    d2Api.addEndPoint('dataAcceptances/unacceptances');
}

angular.module('PEPFAR.approvals').service('approvalsService', approvalsService);
