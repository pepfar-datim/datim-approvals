describe('Tree service', function () {
    var service, treeCacheService, $httpBackend;

    beforeEach(module('d2-rest'));
    beforeEach(module('d2'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (treeService, _treeCacheService_, _$httpBackend_) {
        service = treeService;
        treeCacheService = _treeCacheService_;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('/dhis/api/dataApprovalLevels?fields=id,name,orgUnitLevel,level,categoryOptionGroupSet%5Bid,name,displayName,categoryOptionGroups%5Bid,name%5D%5D&paging=false')
            .respond(200, fixtures.get('approvalLevels'));

        $httpBackend.whenGET('/dhis/api/organisationUnits?fields=id,name,level,parent%5Bid%5D,children%5Bid,name,level%5D&filter=level:eq:1&paging=false')
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

        it('should call the loadOrganisationUnitsLevel method with the first level object', function () {
            var firstevelObject = { name: "global", level: 1 };

            spyOn(service, 'preLoad');

            service.parseApprovalLevels([firstevelObject]);

            expect(service.preLoad).toHaveBeenCalledWith();
        });

        it('should not call the preLoad method when there are no levels', function () {
            spyOn(service, 'preLoad');

            service.parseApprovalLevels([]);

            expect(service.preLoad).not.toHaveBeenCalled();
        });

        it('should call build the treeStructure based on the approvalLevels', function () {
            var expectedTreeStructure = [
                { "id":"aypLtfWShE5", "type": "organisationUnits", "orgUnitLevel": 1, "level": 1 },
                { "id":"JNpaWdWCyDN", "type": "organisationUnits", "orgUnitLevel": 2, "level": 2 },
                { "id":"vqWNeqjozr9", "type": "categoryOptionGroups", "orgUnitLevel": 2, "level": 3 },
                { "id":"WccDi5x6FSp", "type": "categoryOptionGroups", "orgUnitLevel": 2, "level": 4 }
            ];

            service.parseApprovalLevels(fixtures.get('approvalLevels').dataApprovalLevels);

            expect(service.getTreeStructure()).toEqual(expectedTreeStructure);
        });
    });

    describe('loadOrganisationUnitsLevel', function () {
        var firstLevel;

        beforeEach(function () {
            firstLevel = fixtures.get('approvalLevels').dataApprovalLevels[0];
        });

        it('should ask the api for the first orgunit level', function () {
            $httpBackend.flush();
            $httpBackend.resetExpectations();

            $httpBackend.expectGET('/dhis/api/organisationUnits?fields=id,name,level,parent%5Bid%5D,children%5Bid,name,level%5D&filter=level:eq:1&paging=false')
                .respond(200, fixtures.get('orgUnitLevel1'));

            service.loadOrganisationUnitsLevel(1);

            $httpBackend.flush();
        });

        it('should call the addItems method with the orgunitItems to add and the level', function () {
            spyOn(service, 'addItems');

            service.loadOrganisationUnitsLevel(1);

            $httpBackend.flush();

            expect(service.addItems).toHaveBeenCalledWith(fixtures.get('orgUnitLevel1').organisationUnits, 1);
        });
    });

    describe('addItems', function () {
        var itemsArray, expectedItems;

        beforeEach(function () {
            itemsArray = [
                { id: 'dfwhghrfww', name: 'item1', level: "1" },
                { id: 'dffds3wfww', name: 'item2', level: "1" },
                { id: 'd242dfwfww', name: 'item3', level: "1", children: [
                    { id: 'sdfhrfww', name: 'item4', level: "2" },
                    { id: 'dc234fww', name: 'item5', level: "2" }
                ] }
            ];
            expectedItems = {
                dfwhghrfww: { id: 'dfwhghrfww', name: 'item1', level: "1" },
                dffds3wfww: { id: 'dffds3wfww', name: 'item2', level: "1" },
                d242dfwfww: { id: 'd242dfwfww', name: 'item3', level: "1", items: [
                    { id: 'sdfhrfww', name: 'item4', level: "2" },
                    { id: 'dc234fww', name: 'item5', level: "2" }
                ] }
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

    describe('getLevels', function () {
        it('should call the treeCacheService for a category when the level is a category', function () {
            $httpBackend.flush();

            spyOn(treeCacheService, 'getCategory');

            service.loadItemsFor({ level: 2 });

            expect(treeCacheService.getCategory).toHaveBeenCalledWith('vqWNeqjozr9');
        });
    });
});
