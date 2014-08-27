describe('Tree node directive', function () {
    var controller, element, scope, isoScope;

    beforeEach(module('approvaltree/treenode.html'));
    beforeEach(module('d2'));
    beforeEach(module('PEPFAR.approvals', function ($provide) {
        $provide.service('treeService', treeServiceMock);
    }));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<tree-node tree-nodes="items"></tree-node>');

        scope.items = [
            { "name": "Malawi", "id": "malawi" },
            { "name": "Kenya", "id": "kenya" },
            { "name": "Rwanda", "id": "rwanda" }
        ];

        element = $compile(element)(scope);
        scope.$digest();

        isoScope = element.isolateScope();

        controller = element.controller('treeNode');
    }));

    it('should compile the directive', function () {
        expect(element.hasClass('tree-node')).toBe(true);
        expect(element.prop('tagName')).toBe('UL');
    });

    it('should put the tree-nodes onto the scope as nodes', function () {
        expect(isoScope.nodes).toBe(scope.items);
    });

    it('should display an element for each of the items', function () {
        var treeElements = element.find('> li');

        expect(treeElements.length).toBe(3);
    });

    it('should display the item name in the last span', function () {
        var firstLevelFirstItem = element.find(':first-child span').last();

        expect(firstLevelFirstItem.text()).toBe('Malawi');
    });

    it('should give the name span a class tree-node-name', function () {
        var firstLevelFirstItem = element.find(':first-child span').last();

        expect(firstLevelFirstItem.hasClass('tree-node-name')).toBe(true);
    });

    describe('expand icon', function () {
        var expandIcon;

        beforeEach(function () {
            expandIcon = element.find(':first-child i').first();
            spyOn(controller, 'expandIconClick');
        });

        it('should add the first <i> for the expand/collapse icon', function () {
            expect(expandIcon.hasClass('fa')).toBe(true);
            expect(expandIcon.hasClass('fa-plus-square-o')).toBe(true);
        });

        it('should call getSubTree when clicking the icon', function () {
            expandIcon.click();

            expect(controller.expandIconClick).toHaveBeenCalled();
        });

        it('should pass the node to the getSubTree method when clicked', function () {
            expandIcon.click();

            expect(controller.expandIconClick).toHaveBeenCalledWith('malawi');
        });
    });

    describe('sub tree', function () {
        var treeService;

        beforeEach(inject(function (_treeService_) {
            treeService = _treeService_;
        }));

        it('should display the subtree when there are items', function () {
            spyOn(treeService, 'getItemsFor').andCallThrough();

            treeService.items.rwanda.items = [
                { "name": "DOD" },
                { "name": "USAID" }
            ];
            scope.$apply();

            expect(treeService.getItemsFor).toHaveBeenCalledWith('rwanda');

            expect(element.find('ul').find('span').first().text()).toBe('DOD');
            expect(element.find('ul').find('span').last().text()).toBe('USAID');
        });
    });
});
