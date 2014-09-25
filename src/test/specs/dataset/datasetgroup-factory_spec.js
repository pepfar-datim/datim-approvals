describe('Dataset group factory', function () {
    var dataSetGroupFactory;
    var dataSetGroup;

    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (_dataSetGroupFactory_) {
        dataSetGroupFactory = _dataSetGroupFactory_;

        dataSetGroup = dataSetGroupFactory(fixtures.get('dataSets'));
    }));

    it('should return a function', function () {
        expect(dataSetGroupFactory).toBeAFunction();
    });

    it('should return an object', function () {
        expect(dataSetGroupFactory()).toBeAnObject();
    });

    it('should accept an array of datasets', function () {
        dataSetGroupFactory(fixtures.get('dataSets'));
    });

    it('should return an array of dataSets when calling get', function () {
        expect(dataSetGroup.get()).toEqual(fixtures.get('dataSets'));
    });

    it('should return the period types when calling getPeriodTypes', function () {
        expect(dataSetGroup.getPeriodTypes()).toEqual(['Monthly', 'Yearly']);
    });

    it('should return the ids for the datasets in the group', function () {
        expect(dataSetGroup.getIds()).toEqual(['Zqg76KonUx1', 'cIGsv0OBVi8', 'lr508Rm7mHS', 'xY5nwObRyi7', 'vX0MoAE7JfL']);
    });

    it('should return the unique categories', function () {
        expect(dataSetGroup.getCategoryIds()).toEqual(['SH885jaRe0o', 'GLevLNI9wkl']);
    });
});
