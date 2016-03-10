describe('Period service', function () {
    var service;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (periodService, $httpBackend) {
        service = periodService;
        
        $httpBackend
            .expectGET('/dhis/api/system/info')
            .respond(200, {
                calendar: 'iso8601',
                dateFormat: 'yyyy-mm-dd',
            });
            
        
        $httpBackend.flush();
    }));

    it('should be an object', function () {
        expect(service).to.be.a('object');
    });

    it('should expose the getPastPeriodsRecentFirst periods', function () {
        expect(service.getPastPeriodsRecentFirst).to.be.a('function');
    });

    it('should have the period types', function () {
        var periodTypes = [
            "Daily",
            "Weekly",
            "Monthly",
            "BiMonthly",
            "Quarterly",
            "SixMonthly",
            "SixMonthlyApril",
            "Yearly",
            "FinancialApril",
            "FinancialJuly",
            "FinancialOct"
        ];

        expect(service.getPeriodTypes()).to.deep.equal(periodTypes);
    });

    //TODO: Mock out the period generator
    describe('getPastPeriodsRecentFirst', function () {
        it('should return periods', function () {
            service.setPeriodType('Monthly');

            expect(service.getPastPeriodsRecentFirst()).to.be.a('array');
        });

        it('it should not return a new array', function () {
            service.setPeriodType('Monthly');

            expect(service.getPastPeriodsRecentFirst()).to.equal(service.getPastPeriodsRecentFirst());
        });
    });
    
    describe('setPeriodType', function () {
        it('should generate the correct yearly periods', function () {
            service.setPeriodType('Yearly');
            
            var generatedPeriods = service.getPastPeriodsRecentFirst();
            var thisYearString = (new Date()).getFullYear().toString();
            
            expect(thisYearString).to.equal(generatedPeriods[0].name);
        })
    });

    describe('filterPeriodTypes', function () {
        it('should be a method', function () {
            expect(service.filterPeriodTypes).to.be.a('function');
        });

        it('filter period types on the lowerst available one', function () {
            var filteredPeriods;

            service.filterPeriodTypes(['Monthly', 'BiMonthly', 'Weekly', 'Daily']);
            filteredPeriods = service.getPeriodTypes();

            expect(filteredPeriods).to.deep.equal(['BiMonthly', 'Quarterly', 'SixMonthly', 'SixMonthlyApril', 'Yearly', 'FinancialApril', 'FinancialJuly', 'FinancialOct']);
        });

        it('filter period types with yearly as the lowest', function () {
            var filteredPeriods;

            service.filterPeriodTypes(['Monthly', 'BiMonthly', 'Weekly', 'Daily', 'Yearly']);
            filteredPeriods = service.getPeriodTypes();

            expect(filteredPeriods).to.deep.equal(['Yearly', 'FinancialApril', 'FinancialJuly', 'FinancialOct']);
        });
        
        it('should emit a value from the periodTypes$ observable', function (done) {
            service.filterPeriodTypes(['Monthly', 'BiMonthly', 'Weekly', 'Daily', 'Yearly']);

            service.periodTypes$
                .subscribe(function (filteredPeriods) {
                    expect(filteredPeriods).to.deep.equal(['Yearly', 'FinancialApril', 'FinancialJuly', 'FinancialOct']);
                    done();
                });
        });
    });
    
    describe('setPeriod', function () {
        it('should emit the set value from the observable', function (done) {
            service.setPeriod('September');
           
            service.period$
                .subscribe(function (period) {
                    expect(period).to.equal('September');
                    done();
                });
        });
    });
});
