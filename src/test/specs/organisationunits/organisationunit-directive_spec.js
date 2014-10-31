describe('Period selector directive', function () {
    var element;
    var scope;
    var organisationunitsService;

    beforeEach(module('organisationunits/organisationunitselector.html'));
    beforeEach(module('PEPFAR.approvals', {
        organisationunitsService: organisationunitsService = organisationunitsServiceMock()
    }));
    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<organisationunit-selector></period-selector>');

        scope = $rootScope.$new();
        scope.period = {};

        element = $compile(element)(scope);
        scope.$digest();
    }));


    it('should compile to a div', function () {
        expect(element.prop('tagName')).toBe('DIV');
    });
});