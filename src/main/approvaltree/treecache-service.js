function treeCacheService() {
    var service = this;
    this.orgUnitsPerLevel = {};
    this.categoryOptionGroupsPerLevels = {};

    function getOrgUnitLevelId(levelNumber) {
        var id = 'level_' + levelNumber;
        if (!_.isArray(service.orgUnitsPerLevel[id])) {
            service.orgUnitsPerLevel[id] = [];
        }
        return id;
    }

    this.addOrgUnits = function (orgUnits) {
        _.forEach(orgUnits, function (orgUnit) {
            if (orgUnit.parent && orgUnit.parent.id) {
                orgUnit.parent = orgUnit.parent.id;
            }

            _.forEach(orgUnit.children, function (childOrgUnit) {
                childOrgUnit.parent = orgUnit.id;
                service.orgUnitsPerLevel[getOrgUnitLevelId(childOrgUnit.level)].push(childOrgUnit);
            });

            delete orgUnit.children;
            service.orgUnitsPerLevel[getOrgUnitLevelId(orgUnit.level)].push(orgUnit);
        });
    };

    this.getOrgUnitsForLevel = function (levelNumber) {
        if (_.isNumber(levelNumber) && _.isArray(this.orgUnitsPerLevel[getOrgUnitLevelId(levelNumber)])) {
            return this.orgUnitsPerLevel[getOrgUnitLevelId(levelNumber)];
        }
        return [];
    }

    var fundingPartners = [
        {"id": "OO5qyDIwoMk", "created": "2014-05-09T23:23:09.013+0000", "name": "DOD", "lastUpdated": "2014-05-28T19:50:35.546+0000"},
        {"id": "FPUgmtt8HRi", "created": "2014-05-09T23:23:06.953+0000", "name": "HHS/CDC", "lastUpdated": "2014-05-28T19:50:35.140+0000"},
        {"id": "RGC9tURSc3W", "created": "2014-05-09T23:23:07.143+0000", "name": "HHS/HRSA", "lastUpdated": "2014-05-28T19:50:34.398+0000"},
        {"id": "m4mzzwVQOUi", "created": "2014-05-09T23:23:07.533+0000", "name": "U.S. Peace Corps", "lastUpdated": "2014-05-28T19:50:32.568+0000"},
        {"id": "m4mzzwVQOUi", "created": "2014-05-09T23:23:07.533+0000", "name": "U.S. Peace Corps", "lastUpdated": "2014-05-28T19:50:32.568+0000"},
        {"id": "NLV6dy7BE2O", "created": "2014-05-09T23:23:07.254+0000", "name": "USAID", "lastUpdated": "2014-05-28T19:50:35.483+0000"},
        {"id": "ICxISjHPJF4", "created": "2014-05-09T23:23:08.038+0000", "name": "USDOS/BAA", "lastUpdated": "2014-05-28T19:50:32.986+0000"},
        {"id": "MWmqTPSvhD1", "created": "2014-05-09T23:23:10.199+0000", "name": "USDOS/BPRM", "lastUpdated": "2014-05-28T19:50:34.890+0000"}
    ];

    this.getCategory = function () {
        return fundingPartners;
    }
}

angular.module('PEPFAR.approvals').service('treeCacheService', treeCacheService);
