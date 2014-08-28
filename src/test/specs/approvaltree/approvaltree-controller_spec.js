describe('Approval tree controller', function () {
    var controller, treeService;

    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function ($controller, $rootScope) {
        treeService = new treeServiceMock();
        controller = $controller('approvalTreeController', {
            $scope: $rootScope.$new(),
            treeService: treeService
        });
    }));

    it('should be defined', function () {
        expect(controller).toBeDefined();
    });

    describe('getItemsFor method', function () {
        it('should exist', function () {
            expect(controller.getItemsFor).toBeDefined();
            expect(typeof controller.getItemsFor).toBe('function');
        });

        it('should return the part of the tree that is requested', function () {
            var levelOneItems = controller.getItemsFor('root');

            expect(levelOneItems.length).toBe(1);
            expect(levelOneItems[0]).toEqual({ "name": "Global", "id": "global" });
        });

        it('should return an empty array when asking for a unknown level', function () {
            var unknownLevelItems = controller.getItemsFor(32);

            expect(unknownLevelItems).toEqual([]);
        });
    });

    describe('expandIconClick method', function () {
        it('should exist', function () {
            expect(controller.expandIconClick).toBeDefined();
            expect(typeof controller.expandIconClick).toBe('function');
        });

        it('should toggle the expand status of the node', function () {
            expect(controller.isExpanded('myId')).toBe(false);

            controller.expandIconClick({ id : 'myId' });

            expect(controller.isExpanded('myId')).toBe(true);

            controller.expandIconClick({ id : 'myId' });

            expect(controller.isExpanded('myId')).toBe(false);
        });

        it('should call the loadItemsFor method on the service for elements without children', function () {
            spyOn(treeService, 'loadItemsFor');
            controller.expandIconClick({ id : 'myId' });

            expect(treeService.loadItemsFor).toHaveBeenCalledOnce();
        });
    });

    describe('hasItems', function () {

        beforeEach(function () {
            treeService.items = {
                myId: {
                    items: [
                        {}, {}
                    ]
                },
                anotherId: {
                    items: {

                    }
                }
            };
        });

        it('should return true when the the node has children', function () {
            expect(controller.hasItems('myId')).toBe(true);
        });

        it('should return false when the node has no children', function () {
            expect(controller.hasItems('anotherId')).toBe(false);
        });
    });
});
