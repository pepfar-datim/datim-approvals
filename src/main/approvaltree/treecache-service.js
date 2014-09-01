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

    this.getCategory = function (levelId) {
        return this.categoryOptionGroupsPerLevels[levelId];
    };

    this.addCategory = function (categoryOptionGroups, levelId) {
        this.categoryOptionGroupsPerLevels[levelId] = categoryOptionGroups;
    };
}

angular.module('PEPFAR.approvals').service('treeCacheService', treeCacheService);
