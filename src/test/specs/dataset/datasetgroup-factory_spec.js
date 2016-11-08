describe('Dataset group factory', function () {
    var dataSetGroupFactory;
    var dataSetGroup;

    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (_dataSetGroupFactory_) {
        dataSetGroupFactory = _dataSetGroupFactory_;

        dataSetGroup = dataSetGroupFactory(fixtures.get('dataSets'));
    }));

    it('should return a function', function () {
        expect(dataSetGroupFactory).to.be.a('function');
    });

    it('should return an object', function () {
        expect(dataSetGroupFactory()).to.be.a('object');
    });

    it('should accept an array of datasets', function () {
        dataSetGroupFactory(fixtures.get('dataSets'));
    });

    it('should return an array of dataSets when calling get', function () {
        expect(dataSetGroup.get()).to.deep.equal(fixtures.get('dataSets'));
    });

    it('should return the period types when calling getPeriodTypes', function () {
        expect(dataSetGroup.getPeriodTypes()).to.deep.equal(['Monthly', 'Yearly']);
    });

    it('should return the ids for the datasets in the group', function () {
        expect(dataSetGroup.getIds()).to.deep.equal(['Zqg76KonUx1', 'cIGsv0OBVi8', 'lr508Rm7mHS', 'xY5nwObRyi7', 'vX0MoAE7JfL']);
    });

    it('should return the unique categories', function () {
        expect(dataSetGroup.getCategoryIds()).to.deep.equal(['SH885jaRe0o', 'GLevLNI9wkl']);
    });
});
