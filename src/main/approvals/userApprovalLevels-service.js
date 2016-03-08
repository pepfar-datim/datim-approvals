function userApprovalLevelsService(Restangular, rx) {
    var userApprovalLevelPromise = Restangular
        .all('me')
        .get('dataApprovalLevels');

    return rx.Observable.fromPromise(userApprovalLevelPromise);
}

angular.module('PEPFAR.approvals').factory('userApprovalLevels$', userApprovalLevelsService);
