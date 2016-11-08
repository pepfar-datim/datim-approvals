describe('Approval levels Service', function () {
    var approvalLevelsService;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (_approvalLevelsService_) {
        approvalLevelsService = _approvalLevelsService_;
    }));

    it('should be an object', function () {
        expect(approvalLevelsService).to.be.a('object');
    });

    it('should return a promise object', function () {
        expect(approvalLevelsService.get().then).to.be.a('function');
        expect(approvalLevelsService.get().catch).to.be.a('function');
    });

    describe('get function', function () {
        var $httpBackend, approvalLevels;
        var $rootScope;

        beforeEach(inject(function (_$httpBackend_, $injector) {
            $httpBackend = _$httpBackend_;
            $rootScope = $injector.get('$rootScope');

            $httpBackend.expectGET('/dhis/api/organisationUnitLevels?fields=level,displayName&paging=false')
                .respond(200, fixtures.get('orgUnitLevels'));
            $httpBackend.expectGET('/dhis/api/dataApprovalLevels?fields=id,name,displayName,orgUnitLevel,level,categoryOptionGroupSet%5Bid,name%5D&paging=false')
                .respond(200, fixtures.get('approvalLevels'));

            $httpBackend.flush();
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should return an array of approval level objects', function (done) {
            approvalLevelsService
                .subscribe(function (approvalLevels) {
                    expect(approvalLevels.length).to.equal(5);
                    done();
                });
        });

        it('should have a getLevelNames function on the result', function (done) {
            approvalLevelsService
                .subscribe(function (approvalLevels) {
                    expect(approvalLevels.getCategoryOptionGroupSetIdsForLevels).to.be.a('function');
                    done();
                });
        });

        it('should give an array when the level names when calling getLevelNames on the result', function (done) {
            approvalLevelsService
                .subscribe(function (approvalLevels) {
                    expect(approvalLevels.getCategoryOptionGroupSetIdsForLevels()).to.deep.equal([ { level: 4, cogsId: 'bw8KHXzxd9i' }, { level: 5, cogsId: 'BOyWrF33hiR' }]);
                    done();
                });
        });

        it('should add the name of the org unit level to the approval level if it is available', function (done) {
            approvalLevelsService
                .subscribe(function (approvalLevels) {
                    expect(approvalLevels[0].levelName).to.equal('Global');
                    expect(approvalLevels[1].levelName).to.equal('Global');
                    expect(approvalLevels[2].levelName).to.equal('Country');
                    expect(approvalLevels[3].levelName).to.equal('Funding Agency');
                    expect(approvalLevels[4].levelName).to.equal('Implementing Partner');
                    done();
                });
        });
    });
});
