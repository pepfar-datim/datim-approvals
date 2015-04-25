describe('Analytics status service', function () {
    var service;

    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function ($injector) {
        service = $injector.get('analyticsStatus');
    }));

    it('should be an object', function () {
        expect(service).toBeAnObject();
    });

    it('should return a promise object', function () {
        expect(service.get()).toBeAPromiseLikeObject();
    });

    describe('get function', function () {
        var $httpBackend, approvalLevels;

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('/dhis/api/organisationUnitLevels?fields=level,displayName&paging=false')
                .respond(200, fixtures.get('orgUnitLevels'));
            $httpBackend.expectGET('/dhis/api/dataApprovalLevels?fields=id,name,displayName,orgUnitLevel,level,categoryOptionGroupSet%5Bid,name%5D')
                .respond(200, fixtures.get('approvalLevels'));

            service.get().then(function (data) {
                approvalLevels = data;
            });

            $httpBackend.flush();
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should return an array of with approval level objects', function () {
            expect(approvalLevels.length).toBe(4);
        });

        it('should have a getLevelNames function on the result', function () {
            expect(approvalLevels.getCategoryOptionGroupSetIdsForLevels).toBeAFunction();
        });

        it('should give an array when the level names when calling getLevelNames on the result', function () {
            expect(approvalLevels.getCategoryOptionGroupSetIdsForLevels()).toEqual([ { level: 3, cogsId: 'bw8KHXzxd9i' }, { level: 4, cogsId: 'BOyWrF33hiR' }]);
        });

        it('should add the name of the org unit level to the approval level if it is available', function () {
            expect(approvalLevels[0].levelName).toBe('Global');
            expect(approvalLevels[1].levelName).toBe('Country');
            expect(approvalLevels[2].levelName).toBe('Funding Agency');
            expect(approvalLevels[3].levelName).toBe('Implementing Partner');
        });
    });
});
