function approvalsService($q, d2Api) {

    //TODO rework this to not by default return true
    function checkApprovalData(approvalData) {
        if (!angular.isObject(approvalData)) {
            return 'The parameters for approvals are missing';
        }

        if (!angular.isString(approvalData.pe) || approvalData.pe.length === 0) {
            return 'Period parameter (pe) is missing or empty';
        }

        if (!angular.isString(approvalData.al) || approvalData.al.length === 0) {
            return 'Approval level parameter (al) is missing or empty';
        }

        if (!angular.isArray(approvalData.ds) || approvalData.ds.length === 0) {
            return 'Dataset id parameter (ds) is missing or empty';
        }

        if (!angular.isArray(approvalData.co) || approvalData.co.length === 0) {
            return 'Category option parameter is missing or empty';
        }

        return true;
    }

    this.approve = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            // First parameter is undefined because we do not post a body but
            // the data is in the query params in the second parameter.
            return d2Api.getEndPoint('dataApprovals/approve').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    };

    this.unapprove = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            return d2Api.getEndPoint('dataApprovals/unapprove').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    }

    this.accept = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            return d2Api.getEndPoint('dataApprovals/accept').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    }

    this.unaccept = function (approvalData) {
        var approvalStatus = checkApprovalData(approvalData);

        if (approvalStatus === true) {
            return d2Api.getEndPoint('dataApprovals/unaccept').post(approvalData);
        }
        return $q.reject({statusText: approvalStatus});
    }

    d2Api.addEndPoint('dataApprovals/approve');
    d2Api.addEndPoint('dataApprovals/unapprove');
    d2Api.addEndPoint('dataApprovals/accept');
    d2Api.addEndPoint('dataApprovals/unaccept');
}

angular.module('PEPFAR.approvals').service('approvalsService', approvalsService);
