function treeService(d2Api, treeCacheService, $q) {
    var service = this;
    //Empty array stub that is returned when no items are available
    //We return an empty array from a variable instead of a return []; so we
    //do not trigger new digest loops.
    var emptyArray = [];
    var orgUnitLevel = 1;
    var approvalLevel = 1;
    var levels = [];
    var treeStructure = [];
    var preLoadLevelDepth = 2;
    var LEVEL_TYPE = {
        category: 'categoryOptionGroups',
        orgUnit: 'organisationUnits'
    }


    this.items = {};

    this.parseApprovalLevels = function (approvalLevels) {
        _.map(_.sortBy(approvalLevels, 'level'), function (approvalLevel) {
            var treeStructureNode = {};

            treeStructureNode.id = approvalLevel.id;
            treeStructureNode.level = approvalLevel.level;
            treeStructureNode.orgUnitLevel = approvalLevel.orgUnitLevel;

            if (approvalLevel.categoryOptionGroupSet) {
                treeStructureNode.type = LEVEL_TYPE.category;
            } else {
                treeStructureNode.type = LEVEL_TYPE.orgUnit;
            }

            treeStructure.push(treeStructureNode)
            levels.push(approvalLevel);
        }, this);

        if (treeStructure.length > 0) {
            this.preLoad();
        }
    };

    this.preLoad = function () {
        var levelsToPreLoad = treeStructure.slice(0, preLoadLevelDepth);
        var orgUnitLevels;

        orgUnitLevels = _.filter(levelsToPreLoad, function (treeStructureLevel) {
            if (treeStructureLevel.type === LEVEL_TYPE.orgUnit) {
                return true;
            }
            return false;
        }, this);

        if (orgUnitLevels.length === 0) { return; }
        orgUnitLevels = orgUnitLevels.reverse();

        function loadOrgUnitLevels() {
            var level = orgUnitLevels.pop();
            service.loadOrganisationUnitsLevel(level.level).then(function () {
                loadOrgUnitLevels();
            });
        }
        loadOrgUnitLevels();
    };

    this.getTreeStructure = function () {
        return treeStructure;
    }

    //TODO: Look at this promise structure as of right now it's useless..
    this.loadOrganisationUnitsLevel = function (level) {
        var deferred = $q.defer();
        var requestParams = {
            "paging": "false",
            "fields": "id,name,level,parent[id],children[id,name,level]",
            "filter": "level:eq:" + (level || 1)
        };
        var orgUnitsFromCache = treeCacheService.getOrgUnitsForLevel(level);

        if (orgUnitsFromCache.length > 0) {
            service.addItems(orgUnitsFromCache);
            deferred.resolve();
        }

        d2Api.organisationUnits.getList(requestParams).then(function (data) {
            service.addItems(data.getDataOnly(), level);
            deferred.reject();
        });
        return deferred.promise;
    };

    this.addItems = function (orgUnits, level) {
        if (level === 1) {
            _.map(orgUnits, function (orgUnit) {
                if (angular.isArray(orgUnit.children)) {
                    orgUnit.items = orgUnit.children;
                    delete orgUnit.children;
                }
                this.items[orgUnit.id] = orgUnit;
            }, this);
        }
    };

    this.getItemsFor = function (id) {
        if (this.items[id]) {
            return this.items[id].items;
        }
        if (id === 'root') {
            return this.items;
        }
        return emptyArray;
    };

    this.getLevels = function () {
        return levels;
    };

    this.loadItemsFor = function (node) {
        var level = _.filter(treeStructure, {level: (node.level + 1) }).pop();
        if (level.type === LEVEL_TYPE.category) {
            node.items = treeCacheService.getCategory(level.id);
        }
    };

    //Configure the api endpoints we will use
    d2Api.addEndPoint('dataApprovalLevels');
    d2Api.addEndPoint('organisationUnits');

    d2Api.dataApprovalLevels.getList({
        "fields": "id,name,orgUnitLevel,level,categoryOptionGroupSet[id,name,displayName,categoryOptionGroups[id,name]]",
        "paging": "false"
    }).then(function (data) {
        service.parseApprovalLevels(data.getDataOnly())
    });
}

angular.module('PEPFAR.approvals').service('treeService', treeService);
