describe('Dataset group selector directive', function () {
    var element;
    var scope;
    var dataSetGroupService = dataSetGroupServiceMock();

    beforeEach(module('datasets/datasetgroupselector.html'));
    beforeEach(module('PEPFAR.approvals', {
        dataSetGroupService: dataSetGroupService
    }));
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();

        element = angular.element('<dataset-group-selector dataset-groups="datasetGroups"></dataset-group-selector>');

        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should have a class dataset-group-selector', function () {
        expect(element[0].getAttribute('class')).to.contain('dataset-group-selector');
    });

    it('should have a select child', function () {
        expect(element.children().length).to.equal(1);
        expect(element.children().first().prop('tagName')).to.equal('DIV');
    });

    describe('select', function () {
        var selectElement;
        beforeEach(function () {
            dataSetGroupService.datasetGroups = ['MER', 'EA'];
            scope.$apply();

            selectElement = element.children().first();
        });

        it('should have no options when there are no dataset groups', function () {
            dataSetGroupService.datasetGroups = [];
            scope.$apply();

            expect(selectElement.find('.ui-select-choices-group .ui-select-choices-row').length).to.equal(0);
        });

        it('should have options when they are set onto the scope', function () {
            expect(selectElement.find('.ui-select-choices-group .ui-select-choices-row').length).to.equal(2);
        });

        it('should display the options with the right names', function () {
            expect(selectElement.find('.ui-select-choices-group .ui-select-choices-row-inner').first().text().trim()).to.equal('MER');
            expect(selectElement.find('.ui-select-choices-group .ui-select-choices-row-inner').last().text().trim()).to.equal('EA');
        });

        it('should have the option id as values', function () {
            expect(selectElement.find('.ui-select-choices-group .ui-select-choices-row-inner').first().text().trim()).to.equal('MER');
            expect(selectElement.find('.ui-select-choices-group .ui-select-choices-row-inner').last().text().trim()).to.equal('EA');
        });

        it('should only display the options', function () {
            expect(element.find('.ui-select-choices-group .ui-select-choices-row-inner').length).to.equal(2);
        });
    });
});
