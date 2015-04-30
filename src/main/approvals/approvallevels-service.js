function approvalLevelsService($q, d2Api) {
    var promise;
    var orgUnitLevels, approvalLevels;
    this.get = function () {
        return promise;
    };

    d2Api.addEndPoint('organisationUnitLevels');
    d2Api.addEndPoint('dataApprovalLevels');

    orgUnitLevels = d2Api.organisationUnitLevels.getList({
        fields: 'level,displayName',
        paging: false
    });

    approvalLevels = d2Api.dataApprovalLevels.getList({
        fields: 'id,name,displayName,orgUnitLevel,level,categoryOptionGroupSet[id,name]'
    });

    promise = $q.all([orgUnitLevels, approvalLevels]).then(function (results) {
        var orgUnitLevels = results[0].getDataOnly();
        var approvalLevels = results[1].getDataOnly();
        var orgUnitLevelsByLevel = [];

        angular.forEach(orgUnitLevels, function (orgUnitLevel) {
            orgUnitLevelsByLevel[orgUnitLevel.level] = orgUnitLevel.displayName;
        }, this);

        angular.forEach(approvalLevels, function (approvalLevel) {
            if (approvalLevel.categoryOptionGroupSet) {
                approvalLevel.levelName = approvalLevel.categoryOptionGroupSet.name;
            } else {
                approvalLevel.levelName = orgUnitLevelsByLevel[approvalLevel.orgUnitLevel];
            }
        }, this);

        approvalLevels.getCategoryOptionGroupSetIdsForLevels = function () {
            return _.map(_.filter(approvalLevels, 'categoryOptionGroupSet'), function (level) {
                if (level.categoryOptionGroupSet) {
                    return {
                        level: level.level,
                        cogsId: level.categoryOptionGroupSet.id
                    };
                }
            });
        };
        return approvalLevels;
    });
}

angular.module('PEPFAR.approvals').service('approvalLevelsService', approvalLevelsService);
