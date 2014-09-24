describe('Mechanism service', function () {
    var mechanismService;
    var $httpBackend;
    var $log;
    var apiUrl = '/dhis/api/../dhis-web-pepfar-approvals/mechanisms.json';

    var mechanismsFromApi = [
        {
            mechanism: '12345 - Partner Jones: Systems Strengthening',
            country: 'Rwanda',
            agency: 'USAID',
            partner: 'Partner Jones',
            status: 'Submitted by country',
            actions: [
                'submit'
            ]
        },
        {
            mechanism: 'Partner Jones: HPSS',
            country: 'Rwanda',
            agency: 'USAID',
            partner: 'Partner Jones',
            status: 'Accepted by global',
            actions: [
                'unsubmit'
            ]
        },
        {
            mechanism: 'MoH CoAg',
            country: 'Rwanda',
            agency: 'HHS/CDC',
            partner: 'Ministry of Health Rwanda',
            status: 'Submitted by country',
            actions: [
                'unsubmit'
            ]
        },
        {
            mechanism: 'Supporting implementation of National AIDS Framework',
            country: 'Rwanda',
            agency: 'HHS/CDC',
            partner: 'Ministry of Health Rwanda',
            status: 'Accepted by country',
            actions: [
                ''
            ]
        },
        {
            mechanism: '23456 - Partner Jones: HIV Care',
            country: 'Rwanda',
            agency: 'USAID',
            partner: 'Partner Jones',
            status: 'Submitted by global',
            actions: [
                'unsubmit'
            ]
        }
    ];

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));

    beforeEach(inject(function (_mechanismService_, _$httpBackend_, _$log_) {
        mechanismService = _mechanismService_;
        $httpBackend = _$httpBackend_;
        $log = _$log_;

        $httpBackend.whenGET(apiUrl).respond(200, angular.copy(mechanismsFromApi));
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('getData', function () {
        it('should act like a promise', function () {
            expect(mechanismService.getData().then).toBeAFunction();
            expect(mechanismService.getData().catch).toBeAFunction();
            expect(mechanismService.getData().finally).toBeAFunction();
        });

        it('should do a request to the api for the mechanisms', function () {
            $httpBackend.expectGET(apiUrl);

            mechanismService.getData();

            $httpBackend.flush();
        });

        it('should only return the data and not the added rest functions', function () {
            var mechanisms = [];

            mechanismService.getData().then(function (data) {
                mechanisms = data
            });
            $httpBackend.flush();

            expect(mechanisms).toEqual(mechanismsFromApi);
        });

        it('should add the parameters to the url', function () {
            mechanismService.period = '2014';
            mechanismService.datasets = ['dsetId1', 'dsetId2', 'dsetId3'];

            mechanismService.getData();

            $httpBackend.expectGET(apiUrl + '?ds=dsetId1&ds=dsetId2&ds=dsetId3&pe=2014').respond(200);
        });
    });

    describe('period property', function () {
        it('should set the period on the service', function () {
            mechanismService.period = '2014';

            expect(mechanismService.period).toEqual('2014');
        });

        it('should log an error when the given value is not a string', function () {
            mechanismService.period = [];

            expect($log.error.logs).toContain(['Mechanism Service: Period should be a string']);
        });
    });

    describe('datasets property', function () {
        it('should be set to an empty array', function () {
            expect(mechanismService.datasets).toEqual([]);
        });

        it('should set the dataset on the service', function () {
            mechanismService.datasets = ['set1', 'set2', 'set3'];

            expect(mechanismService.datasets).toEqual(['set1', 'set2', 'set3']);
        });

        it('should log an error when the given value is not an array', function () {
            mechanismService.datasets = '';

            expect($log.error.logs).toContain(['Mechanism Service: Period should be a string']);
        });
    });
});
