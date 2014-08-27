describe('Approval tree directive', function () {
    var element, scope, controller;

    beforeEach(module('approvaltree/approvaltree.html'));
    beforeEach(module('approvaltree/treenode.html'));
    beforeEach(module('d2'));

    beforeEach(module('PEPFAR.approvals', function ($provide) {
        $provide.service('treeService', treeServiceMock);
    }));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<approval-tree></approval-tree>');

        element = $compile(element)(scope);
        scope.$digest();

        controller = element.controller('approvalTree')
    }));

    it('should compile the directive', function () {
        expect(element.hasClass('approval-tree')).toBe(true);
        expect(element.prop('tagName')).toBe('DIV');
    });

    it('should load the tree structure from the treeService', function () {
        expect(element.children().first().prop('tagName')).toBe('UL');
        expect(element.children().length).toBe(1);
    });
});
