describe('Tree service', function () {
    var service, $httpBackend;

    beforeEach(module('d2-rest'));
    beforeEach(module('d2'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (treeService, _$httpBackend_) {
        service = treeService;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('/dhis/api/dataApprovalLevels?fields=id,name,orgUnitLevel,level,categoryOptionGroupSet&paging=false')
            .respond(200, fixtures.get('approvalLevels'));

        $httpBackend.whenGET('/dhis/api/organisationUnits?fields=id,name,level&filter=level:eq:1&paging=false')
            .respond(200, fixtures.get('orgUnitLevel1'));
    }));

    it('should be defined', function () {
        expect(service).toBeDefined();
    });

    it('should have a getItemsFor method', function () {
        expect(service.getItemsFor).toBeDefined();
    });

    it('should load the approval levels from the api', function () {
        $httpBackend.flush();

        expect(service.getLevels().length).toBe(4);
    });

    it('should return the level one organisation units', function () {
        $httpBackend.flush();
    });

    describe('parseApprovalLevels', function () {
        it('should order the array based on the level property', function () {
            var levelArray, expectedArray;

            levelArray = [
                { level: 4 },
                { level: 3 },
                { level: 1 }
            ];

            expectedArray = [
                { level: 1 },
                { level: 3 },
                { level: 4 }
            ];

            service.parseApprovalLevels(levelArray);

            expect(service.getLevels()).toEqual(expectedArray);
        });

        it('should call the loadLevel method with the first level object', function () {
            var firstevelObject = { name: "global", level: 1 };

            spyOn(service, 'loadLevel');

            service.parseApprovalLevels([firstevelObject]);

            expect(service.loadLevel).toHaveBeenCalledWith(firstevelObject);
        });

        it('should not call the loadLevel method when there are no levels', function () {
            spyOn(service, 'loadLevel');

            service.parseApprovalLevels([]);

            expect(service.loadLevel).not.toHaveBeenCalled();
        });
    });

    describe('loadLevel', function () {
        var firstLevel;

        beforeEach(function () {
            firstLevel = fixtures.get('approvalLevels').dataApprovalLevels[0];
        });

        it('should ask the api for the first orgunit level', function () {
            $httpBackend.flush();
            $httpBackend.resetExpectations();

            $httpBackend.expectGET('/dhis/api/organisationUnits?fields=id,name,level&filter=level:eq:1&paging=false')
                .respond(200, fixtures.get('orgUnitLevel1'));

            service.loadLevel(firstLevel);

            $httpBackend.flush();
        });

        it('should call the addItems method with the orgunitItems to add and the level', function () {
            spyOn(service, 'addItems');

            service.loadLevel(firstLevel);

            $httpBackend.flush();

            expect(service.addItems).toHaveBeenCalledWith(fixtures.get('orgUnitLevel1').organisationUnits, firstLevel.level);
        });
    });

    describe('addItems', function () {
        var itemsArray, expectedItems;

        beforeEach(function () {
            itemsArray = [
                { id: 'dfwhghrfww', name: 'item1', level: "1" },
                { id: 'dffds3wfww', name: 'item2', level: "1" },
                { id: 'd242dfwfww', name: 'item3', level: "1" }
            ];
            expectedItems = {
                dfwhghrfww: { id: 'dfwhghrfww', name: 'item1', level: "1" },
                dffds3wfww: { id: 'dffds3wfww', name: 'item2', level: "1" },
                d242dfwfww: { id: 'd242dfwfww', name: 'item3', level: "1" }
            };
        });

        it('should add the items to the items property', function () {
            service.addItems(itemsArray, 1);

            expect(service.items).toEqual(expectedItems);
        });
    });

    describe('getItemsFor', function () {

        beforeEach(function () {
            service.items = {
                dfwhghrfww: { id: 'dfwhghrfww', name: 'item1', level: "1", items: [ { id: "subitemid" } ] },
                dffds3wfww: { id: 'dffds3wfww', name: 'item2', level: "1" },
                d242dfwfww: { id: 'd242dfwfww', name: 'item3', level: "1" }
            };
        });

        it('should return the root when the id "root" is passed in', function () {
            var rootItems = service.getItemsFor('root');

            expect(rootItems).toEqual(service.items);
        });

        it('should return part of the subtree that is asked for', function () {
            var subTree = service.getItemsFor('dfwhghrfww');

            expect(subTree).toEqual(service.items.dfwhghrfww.items);
        });

        it('should return an empty array when the id does not exist', function () {
           var unknownTree = service.getItemsFor('idonotexist');

            expect(unknownTree).toEqual([]);
        });
    });
});
