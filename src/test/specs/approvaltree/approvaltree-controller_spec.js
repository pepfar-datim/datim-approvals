describe('Approval tree controller', function () {
    var controller;

    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function ($controller, $rootScope) {
        controller = $controller('approvalTreeController', {
            $scope: $rootScope.$new(),
            treeService: new treeServiceMock()
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

            controller.expandIconClick('myId');

            expect(controller.isExpanded('myId')).toBe(true);

            controller.expandIconClick('myId');

            expect(controller.isExpanded('myId')).toBe(false);
        });
    });
});
