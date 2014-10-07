describe('Approvals Service', function () {
    var $httpBackend;
    var approvalsService;
    var $rootScope;
    var catchCallback;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _approvalsService_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        approvalsService = _approvalsService_;

        catchCallback = jasmine.createSpy();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be an object', function () {
        expect(approvalsService).toBeAnObject();
    });

    it('should add dataApprovals endPoint to the api service', inject(function (d2Api) {
        expect(d2Api.getEndPoint('dataApprovals')).toBeAnObject();
    }));

    describe('approve', function () {
        it('should be a method', function () {
            expect(approvalsService.approve).toBeAFunction();
        });

        it('should reject the promise when there are no parameters', function () {
            approvalsService.approve().catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('The parameters for approvals are missing');
        });

        it('should reject the promise when the period is missing', function () {
            approvalsService.approve({}).catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('Period parameter (pe) is missing or empty');
        });

        it('should reject the promise when the approval level is missing', function () {
            approvalsService.approve({ pe: '2014' }).catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('Approval level parameter (al) is missing or empty');
        });

        it('should reject the promise when the datasets are missing', function () {
            approvalsService.approve({ pe: '2014', al: 'd3234ss' }).catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('Dataset id parameter (ds) is missing or empty');
        });

        it('should reject the promise when the category option is missing', function () {
            approvalsService.approve({ pe: '2014', al: 'd3234ss', ds: ['1', '2'] }).catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('Category option parameter is missing or empty');
        });

        it('should do a post request when the data is completed', function () {
            $httpBackend.expectPOST('/dhis/api/dataApprovals?al=d3234ss&co=d234453&ds=1&ds=2&pe=2014').respond(200);

            approvalsService.approve({ pe: '2014', al: 'd3234ss', ds: ['1', '2'], co: 'd234453' });

            $httpBackend.flush();
        });
    });

    describe('unapprove', function () {
        it('should be a method', function () {
            expect(approvalsService.unapprove).toBeAFunction();
        });

        it('should reject the promise when there are no parameters', function () {
            approvalsService.unapprove().catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('The parameters for approvals are missing');
        });

        it('should reject the promise when the period is missing', function () {
            approvalsService.unapprove({}).catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('Period parameter (pe) is missing or empty');
        });

        it('should reject the promise when the approval level is missing', function () {
            approvalsService.unapprove({ pe: '2014' }).catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('Approval level parameter (al) is missing or empty');
        });

        it('should reject the promise when the datasets are missing', function () {
            approvalsService.unapprove({ pe: '2014', al: 'd3234ss' }).catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('Dataset id parameter (ds) is missing or empty');
        });

        it('should reject the promise when the category option is missing', function () {
            approvalsService.unapprove({ pe: '2014', al: 'd3234ss', ds: ['1', '2'] }).catch(catchCallback);
            $rootScope.$apply();

            expect(catchCallback).toHaveBeenCalledWith('Category option parameter is missing or empty');
        });

        it('should do a post request when the data is completed', function () {
            $httpBackend.expectDELETE('/dhis/api/dataApprovals?al=d3234ss&co=d234453&ds=1&ds=2&pe=2014').respond(200);

            approvalsService.unapprove({ pe: '2014', al: 'd3234ss', ds: ['1', '2'], co: 'd234453' });

            $httpBackend.flush();
        });
    });
});
