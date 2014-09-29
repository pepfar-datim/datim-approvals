describe('Mechanisms service', function () {
    var mechanismsService;
    var $httpBackend;
    var $log;
    var apiUrlWithCorrectParameters = ['/dhis/api/categories?',
        'fields=id,name,categoryOptions%5Bid,name,organisationUnits%5Bid,name%5D,',
        'categoryOptionCombos%5Bid,name%5D,groups%5Bid,name,categoryOptionGroupSet%5Bid%5D%5D&',
        'filter=id:eq:dsetId1&filter=id:eq:dsetId2&filter=id:eq:dsetId3',
        '&paging=false'].join('');

    var categoriesFromApi = fixtures.get('categories');

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));

    beforeEach(inject(function (_mechanismsService_, _$httpBackend_, _$log_) {
        mechanismsService = _mechanismsService_;
        $httpBackend = _$httpBackend_;
        $log = _$log_;

        //TODO: If we mock the approvalLevelsService we will not have to do the http call
        $httpBackend.expectGET('/dhis/api/organisationUnitLevels?fields=level,displayName&paging=false')
            .respond(200, fixtures.get('orgUnitLevels'));
        $httpBackend.whenGET('/dhis/api/dataApprovalLevels?fields=id,name,displayName,orgUnitLevel,level,categoryOptionGroupSet%5Bid,name%5D')
            .respond(200, fixtures.get('approvalLevels'));

        $httpBackend.flush();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('getData', function () {
        it('should act like a promise', function () {
            expect(mechanismsService.getData().then).toBeAFunction();
            expect(mechanismsService.getData().catch).toBeAFunction();
            expect(mechanismsService.getData().finally).toBeAFunction();
        });

        it('should not do a request to the api for the categories when parameters are missing', function () {
            mechanismsService.getData();
        });

        it('should add the parameters to the url', function () {
            mechanismsService.period = '2014';
            mechanismsService.categories = ['dsetId1', 'dsetId2', 'dsetId3'];

            mechanismsService.getData();

            $httpBackend.expectGET(apiUrlWithCorrectParameters).respond(200);
        });

        it('should only return the data and not the added rest functions', function () {
            var mechanisms = [];

            $httpBackend.expectGET(apiUrlWithCorrectParameters).respond(200, angular.copy(categoriesFromApi));

            mechanismsService.period = '2014';
            mechanismsService.categories = ['dsetId1', 'dsetId2', 'dsetId3'];

            mechanismsService.getData().then(function (data) {
                mechanisms = data
            });
            $httpBackend.flush();

            expect(mechanisms[0].getRestangularUrl).not.toBeDefined();
            expect(mechanisms[0].restangularCollection).not.toBeDefined();
            expect(mechanisms[0].getDataOnly).not.toBeDefined();
        });

        it('should reject when the request fails', function () {
            var catchSpy = jasmine.createSpy();

            $httpBackend.expectGET(apiUrlWithCorrectParameters).respond(404);

            mechanismsService.period = '2014';
            mechanismsService.categories = ['dsetId1', 'dsetId2', 'dsetId3'];

            mechanismsService.getData().catch(catchSpy);
            $httpBackend.flush();

            expect(catchSpy).toHaveBeenCalled();
        });
    });

    describe('getMechanisms', function () {
        var deferredGetData;
        var deferredGetStatuses;
        var $rootScope;

        beforeEach(inject(function ($q, _$rootScope_) {
            $rootScope = _$rootScope_;
            deferredGetData = $q.defer();
            deferredGetStatuses = $q.defer();

            spyOn(mechanismsService, 'getData').andReturn(deferredGetData.promise);
            spyOn(mechanismsService, 'getStatuses').andReturn(deferredGetStatuses.promise);
        }));

        it('should act like a promise', function () {
            expect(mechanismsService.getMechanisms().then).toBeAFunction();
            expect(mechanismsService.getMechanisms().catch).toBeAFunction();
            expect(mechanismsService.getMechanisms().finally).toBeAFunction();
        });

        describe('returned data', function () {
            var dataResult;
            beforeEach(inject(function () {
                mechanismsService.getMechanisms().then(function (data) {
                    dataResult = data;
                });

                deferredGetData.resolve(categoriesFromApi.categories);
                deferredGetStatuses.resolve(fixtures.get('cocApprovalStatus'));
                $rootScope.$apply();
            }));

            it('should return an array in the then function', function () {
                expect(dataResult).toBeAnArray();
            });

            it('should return all the categoryOptions in an array', function () {
                expect(dataResult.length).toBe(4);
            });

            it('should return the correct data', function () {
                expect(dataResult[0].action).toBe('Submit, Unaccept')
            });
        });
    });

//    describe('period property', function () {
//        it('should set the period on the service', function () {
//            mechanismsService.period = '2014';
//
//            expect(mechanismsService.period).toEqual('2014');
//        });
//
//        it('should log an error when the given value is not a string', function () {
//            mechanismsService.period = [];
//
//            expect($log.error.logs).toContain(['Mechanism Service: Period should be a string']);
//        });
//    });

    describe('categories property', function () {
        it('should be set to an empty array', function () {
            expect(mechanismsService.categories).toEqual([]);
        });

        it('should set the categories on the service', function () {
            mechanismsService.categories = ['set1', 'set2', 'set3'];

            expect(mechanismsService.categories).toEqual(['set1', 'set2', 'set3']);
        });

        it('should log an error when the given value is not an array', function () {
            mechanismsService.categories = '';

            expect($log.error.logs).toContain(['Mechanism Service: Period should be a string']);
        });
    });

    describe('getStatuses', function () {

        beforeEach(function () {
            $httpBackend.expectGET('/dhis/api/../dhis-web-pepfar-approvals/fake-api/dataApproval.json')
                .respond(200, fixtures.get('cocApprovalStatus'));
        });

        it('should request statuses from the API', function () {
            mechanismsService.getStatuses();

            $httpBackend.flush();
        });

        it('should return the status data from the api', function () {
            var returnedData;

            mechanismsService.getStatuses().then(function (data) {
                returnedData = data;
            });

            $httpBackend.flush();

            expect(returnedData).toEqual(fixtures.get('cocApprovalStatus'));
        });
    });
});
