describe('Mechanism service', function () {
    var mechanismService;
    var $httpBackend;
    var $log;
    var apiUrlWithCorrectParameters = ['/dhis/api/categories?',
        'fields=id,name,categoryOptions%5Bid,name,organisationUnits,',
        'groups%5Bid,name,categoryOptionGroupSet%5Bid%5D%5D&',
        'filter=id:eq:dsetId1&filter=id:eq:dsetId2&filter=id:eq:dsetId3',
        '&paging=false'].join('');

    var categoriesFromApi = fixtures.get('categories');

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));

    beforeEach(inject(function (_mechanismService_, _$httpBackend_, _$log_) {
        mechanismService = _mechanismService_;
        $httpBackend = _$httpBackend_;
        $log = _$log_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('getMechanisms', function () {
        it('should act like a promise', function () {
            expect(mechanismService.getMechanisms().then).toBeAFunction();
            expect(mechanismService.getMechanisms().catch).toBeAFunction();
            expect(mechanismService.getMechanisms().finally).toBeAFunction();
        });

        it('should not do a request to the api for the mechanisms when parameters are missing', function () {
            mechanismService.getMechanisms();
        });

        it('should add the parameters to the url', function () {
            mechanismService.period = '2014';
            mechanismService.categories = ['dsetId1', 'dsetId2', 'dsetId3'];

            mechanismService.getMechanisms();

            $httpBackend.expectGET(apiUrlWithCorrectParameters).respond(200);
        });

        it('should only return the data and not the added rest functions', function () {
            var mechanisms = [];

            $httpBackend.expectGET(apiUrlWithCorrectParameters).respond(200, angular.copy(categoriesFromApi));

            mechanismService.period = '2014';
            mechanismService.categories = ['dsetId1', 'dsetId2', 'dsetId3'];

            mechanismService.getMechanisms().then(function (data) {
                mechanisms = data
            });
            $httpBackend.flush();

            expect(mechanisms).toEqual(categoriesFromApi.categories);
        });
    });

//    describe('period property', function () {
//        it('should set the period on the service', function () {
//            mechanismService.period = '2014';
//
//            expect(mechanismService.period).toEqual('2014');
//        });
//
//        it('should log an error when the given value is not a string', function () {
//            mechanismService.period = [];
//
//            expect($log.error.logs).toContain(['Mechanism Service: Period should be a string']);
//        });
//    });

    describe('categories property', function () {
        it('should be set to an empty array', function () {
            expect(mechanismService.categories).toEqual([]);
        });

        it('should set the categories on the service', function () {
            mechanismService.categories = ['set1', 'set2', 'set3'];

            expect(mechanismService.categories).toEqual(['set1', 'set2', 'set3']);
        });

        it('should log an error when the given value is not an array', function () {
            mechanismService.categories = '';

            expect($log.error.logs).toContain(['Mechanism Service: Period should be a string']);
        });
    });
});
