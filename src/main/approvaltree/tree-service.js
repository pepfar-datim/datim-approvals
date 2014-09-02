function treeService(d2Api, treeCacheService, $q, $rootScope) {
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

    this.flattenedTree = [];
    this.items = {};

    this.parseApprovalLevels = function (approvalLevels) {
        _.map(_.sortBy(approvalLevels, 'level'), function (approvalLevel) {
            var treeStructureNode = {};

            treeStructureNode.id = approvalLevel.id;
            treeStructureNode.level = approvalLevel.level;
            treeStructureNode.orgUnitLevel = approvalLevel.orgUnitLevel;

            if (approvalLevel.categoryOptionGroupSet) {
                treeStructureNode.type = LEVEL_TYPE.category;
                treeStructureNode.categoryId = approvalLevel.categoryOptionGroupSet.id;
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

        if (orgUnitLevels.length === 0) {
            return;
        }
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
        service.buildFlattenVersionOfTree();
    };

    this.getItemsFor = function (id) {
        if (this.flattenedTree[id]) {
            return this.flattenedTree[id].items;
        }
        if (id === 'root') {
            return this.items;
        }
        return emptyArray;
    };

    this.getCategoryOptions = function (node) {
        this.findParentOf(node);
        return $q.when();
    };

    this.findParentOf = function () {
    };

    this.getLevels = function () {
        return levels;
    };

    function getItems(items) {
        var getValues = function (item) {
            return _.pick(item, ['id', 'items']);
        };

        return _.map(items, function (item) {
            return getItems(item.items).concat([getValues(item)]);
        });
    }

    function getUniqueById(values) {
        return _.uniq(values, function (item) {
            return item.id;
        });
    }

    this.buildFlattenVersionOfTree = function () {
        var structure = getItems(this.items);
        _.forEach(getUniqueById(_.flatten(structure)), function (item) {
            this.flattenedTree[item.id] = item;
        }, this);
    };

    this.loadCategoryItems = function (node, level) {
        var deferred = $q.defer();

        if (treeCacheService.getCategory(level.id) === undefined) {
            d2Api.categoryOptionGroups.getList({
                fields: 'id,name',
                filter: 'categoryOptionGroupSet.id:eq:' + level.categoryId,
                paging: 'false'
            }).then(function (categoryOptionGroups) {
                    var category;
                    treeCacheService.addCategory(categoryOptionGroups.getDataOnly(), level.id);
                    category = _.map(treeCacheService.getCategory(level.id), function (item) {
                        item.level = node.level + 1;
                        return item;
                    });
                    deferred.resolve(category);
                });
        } else {
            deferred.resolve(_.map(treeCacheService.getCategory(level.id), function (item) {
                item.level = node.level + 1;
                return item;
            }));
        }

        return deferred.promise;
    };

    this.loadItemsFor = function (node) {
        var level;

        if (!node || !node.level) {
            return;
        }
        level = _.filter(treeStructure, {level: (node.level + 1) }).pop();

        //When there are no more levels load the mechanisms
        if (!level) {
            this.getCategoryOptions().then(function (categoryOptions) {
                console.log(categoryOptions);
                node.items = categoryOptions;
            });

            return;
        }

        //When the level type is a category check the cache for category
        if (level.type === LEVEL_TYPE.category && level.categoryId) {
            this.loadCategoryItems(node, level).then(function (data) {
                node.items = data;
                service.buildFlattenVersionOfTree();
            });
        }

        service.buildFlattenVersionOfTree();
    };

    //Configure the api endpoints we will use
    d2Api.addEndPoint('dataApprovalLevels');
    d2Api.addEndPoint('organisationUnits');
    d2Api.addEndPoint('categoryOptionGroups');

    d2Api.dataApprovalLevels.getList({
        "fields": "id,name,orgUnitLevel,level,categoryOptionGroupSet[id,name,displayName]",
        "paging": "false"
    }).then(function (data) {
            service.parseApprovalLevels(data.getDataOnly())
        });
}

angular.module('PEPFAR.approvals').service('treeService', treeService);
