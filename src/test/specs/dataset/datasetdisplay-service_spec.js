describe('applyDataSetDisplayRules', function () {
    var applyDataSetDisplayRules;

    beforeEach(module('PEPFAR.approvals', {
        dataSetGroupService: {
            getDataSetDisplayRules: sinon.stub()
                .returns([
                    {
                        "workflow": "MER Targets",
                        "matchPeriodOn": {
                            "test": "^[0-9]{4}Oct$",
                            "comparator": "lt",
                            "value": 2016
                        },
                        "dataSets": [
                            "xJ06pxmxfU6",
                            "LBSk271pP7J",
                            "rDAUgkkexU1",
                            "IOarm0ctDVL",
                            "VjGqATduoEX",
                            "PHyD22loBQH",
                            "oYO9GvA05LE"
                        ]
                    }, {
                        "workflow": "MER Targets",
                        "matchPeriodOn": {
                            "test": "^[0-9]{4}Oct$",
                            "comparator": "gte",
                            "value": 2016
                        },
                        "dataSets": [
                            "xxo1G5V1JG2",
                            "AyFVOGbAvcH",
                            "tCIW2VFd8uu",
                            "JXKUYJqmyDd",
                            "qRvKHvlzNdv",
                            "lbwuIo56YoG",
                            "Om3TJBRH8G8"
                        ]
                    }
                ])
        }
    }));
    beforeEach(inject(function ($injector) {
        applyDataSetDisplayRules = $injector.get('applyDataSetDisplayRules');
    }));

    it('should return a function', function () {
        expect(applyDataSetDisplayRules).to.be.a('function');
    })
});
