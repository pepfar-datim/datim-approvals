describe('Approval levels Service', function () {
    var approvalLevelsService;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (_approvalLevelsService_) {
        approvalLevelsService = _approvalLevelsService_;
    }));

    it('should be an object', function () {
        expect(approvalLevelsService).toBeAnObject();
    });

    it('should return a promise object', function () {
        expect(approvalLevelsService.get()).toBeAPromiseLikeObject();
    });

    describe('get function', function () {
        var $httpBackend;
        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('/dhis/api/dataApprovalLevels?fields=id,name,displayName,orgUnitLevel,level,categoryOptionGroupSet%5Bid%5D').respond(200, fixtures.get('approvalLevels'));
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should return an array of with approval level objects', function () {
            var approvalLevels;

            approvalLevelsService.get().then(function (data) {
                approvalLevels = data;
            });
            $httpBackend.flush();

            expect(approvalLevels.length).toBe(4);
        });

        it('should have a getLevelNames function on the result', function () {
            var approvalLevels;

            approvalLevelsService.get().then(function (data) {
                approvalLevels = data;
            });
            $httpBackend.flush();

            expect(approvalLevels.getCategoryOptionGroupSetIdsForLevels).toBeAFunction();
        });

        it('should give an array when the level names when calling getLevelNames on the result', function () {
            var approvalLevels;

            approvalLevelsService.get().then(function (data) {
                approvalLevels = data;
            });
            $httpBackend.flush();


            expect(approvalLevels.getCategoryOptionGroupSetIdsForLevels()).toEqual([ { level: 3, cogsId: 'bw8KHXzxd9i' }, { level: 4, cogsId: 'BOyWrF33hiR' }]);
        });
    });
});
