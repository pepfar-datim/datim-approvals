function treeService(d2Api) {
    var service = this;
    //Empty array stub that is returned when no items are available
    //We return an empty array from a variable instead of a return []; so we
    //do not trigger new digest loops.
    var emptyArray = [];
    var orgUnitLevel = 1;
    var approvalLevel = 1;

    var levels = [];

    this.items = {};

    this.parseApprovalLevels = function (approvalLevels) {
        _.map(_.sortBy(approvalLevels, 'level'), function (approvalLevel) {
            levels.push(approvalLevel)
        }, this);

        if (levels[0]) {
            this.loadLevel(levels[0]);
        }
    };

    this.loadLevel = function (level) {
        d2Api.organisationUnits.getList({
            "paging": "false",
            "fields": "id,name,level",
            "filter": "level:eq:1"
        }).then(function (data) {
            service.addItems(data.getDataOnly(), level.level);
        });
    };

    this.addItems = function (orgUnits, level) {
        if (level === 1) {
            _.map(orgUnits, function (orgUnit) {
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

    //Configure the api endpoints we will use
    d2Api.addEndPoint('dataApprovalLevels');
    d2Api.addEndPoint('organisationUnits');

    d2Api.dataApprovalLevels.getList({
        "fields": "id,name,orgUnitLevel,level,categoryOptionGroupSet",
        "paging": "false"
    }).then(function (data) {
        service.parseApprovalLevels(data.getDataOnly())
    });
}

angular.module('PEPFAR.approvals').service('treeService', treeService);
