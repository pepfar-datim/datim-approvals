describe('Period selector directive', function () {
    var element;
    var scope;
    var periodService;

    beforeEach(module('period/periodselector.html'));
    beforeEach(module('PEPFAR.approvals', {
        periodService: periodService = periodServiceMock()
    }));
    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<period-selector></period-selector>');

        scope = $rootScope.$new();
        scope.period = {};

        element = $compile(element)(scope);
        scope.$digest();
    }));


    it('should compile to a div', function () {
        expect(element.prop('tagName')).toBe('DIV');
    });

    it('should add a select for the available period types', function () {
        var selectElement = element.children().first();

        expect(selectElement.prop('tagName')).toBe('SELECT');
    });

    it('should add a list of options to the select', function () {
        var selectElement = element.children().first();

        expect(selectElement.children().length).toBe(12);
    });

    it('should update the list of available options if they change', function () {
        var selectElement;

        spyOn(periodService, 'getPeriodTypes').andReturn(['Yearly']);

        selectElement = element.children().first();
        scope.$apply();

        expect(selectElement.children().length).toBe(2);
    });

    it('should display a select box for the periods', function () {
        var selectElementForPeriods;

        selectElementForPeriods = element.children().last();
        scope.$apply();

        expect(selectElementForPeriods.children().length).toBe(5);
    });

    it('should disable the period selectbox', function () {
        var selectElementForPeriods;

        selectElementForPeriods = element.children().last();

        expect(selectElementForPeriods.attr('disabled')).toBe('disabled');
    });

    it('should enable the period selectbox when a period type is chosen', function () {
        var selectElementForPeriods;

        scope.period.selectedPeriodType = 'Monthly';
        scope.$apply();

        selectElementForPeriods = element.children().last();

        expect(selectElementForPeriods.attr('disabled')).toBe('disabled');
    });
});