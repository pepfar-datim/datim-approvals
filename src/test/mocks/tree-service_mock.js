function treeServiceMock() {
    //Empty array stub that is returned when no items are available
    //We return an empty array from a variable instead of a return []; so we
    //do not trigger new digest loops.
    var emptyArray = [];

    this.buildLevels = {
        _1: [{
            name: "Global",
            id: "global"
        }]
    };

    this.items = {
        "global": {
            "name": "Global",
            "id": "global",
            "items": [
                { "name": "Malawi", "id": "malawi" },
                { "name": "Kenya", "id": "kenya" },
                { "name": "Rwanda", "id": "rwanda" }
            ],
            "children": [
                "malawi", "kenya", "rwanda"
            ]
        },
        "malawi": {
            "name": "Malawi"
        },
        "kenya": {
            "name": "Kenya"
        },
        "rwanda": {
            "name": "Rwanda"
        }
    };

    this.getItemsFor = function (id) {
        if (this.items[id]) {
            return this.items[id].items;
        }
        if (id === 'root') {
            return this.buildLevels._1;
        }
        return emptyArray;
    };
}
