function approvalLevelsService(d2Api) {
    var promise;
    this.get = function () {
        return promise;
    };

    d2Api.addEndPoint('dataApprovalLevels');
    promise = d2Api.dataApprovalLevels.getList({
        fields: 'id,name,displayName,orgUnitLevel,level,categoryOptionGroupSet[id]'
    }).then(function (approvalLevelsFromApi) {
        var approvalLevels = approvalLevelsFromApi.getDataOnly();
        approvalLevels.getCategoryOptionGroupSetIdsForLevels = function () {
            return _.map(_.filter(approvalLevels,'categoryOptionGroupSet'), function (level) {
                if (level.categoryOptionGroupSet) {
                    return {
                        level: level.level,
                        cogsId: level.categoryOptionGroupSet.id
                    };
                }
            });
        }
        return approvalLevels;
    });
}

angular.module('PEPFAR.approvals').service('approvalLevelsService', approvalLevelsService);
