describe('Period service', function () {
    var service;
    var periodSettingMock;
    var $rootScope;
    var clock;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals', function ($provide) {
        $provide.factory('dataStore', function ($q) {
            periodSettingMock = sinon.stub()
                .returns($q.when({
                        "MER Results": { // Id of dataApprovalWorkflow
                            "2017Q1": {
                                "name": "January - March 2017",
                                "start": 'Fri Mar 31 2017 21:00:00 GMT+0200',
                                "end": 'Fri Apr 14 2017 21:00:00 GMT+0200',
                            }
                        },
                        "MER Targets": {  // Id of dataApprovalWorkflow
                            "2017Oct": {
                                "name": "October 2017 - October 2018",
                                "start": 1490986800000,
                                "end": 1492196400,
                            }
                        }
                    }));

            return {
                getPeriodSettings: periodSettingMock
            };
        });
    }));
    beforeEach(inject(function (periodService, _$rootScope_) {
        $rootScope = _$rootScope_;
        service = periodService;

        var now = Date('Fri Apr 10 2017 21:00:00 GMT+0200');
        clock = sinon.useFakeTimers(1491850800000);
    }));

    afterEach(function () {
        clock.restore();
    });

    it('should be an object', function () {
        expect(service).to.be.a('object');
    });

    it('should expose the getPeriodsForWorkflow periods', function () {
        expect(service.getPeriodsForWorkflow).to.be.a('function');
    });

    describe('getPeriodsForWorkflow', function () {
        it('should ask the dataStore for the periodSettings', function () {
            service.getPeriodsForWorkflow({ id: 'QeGps9iWl1i', name: 'MER Results' });

            expect(periodSettingMock).to.be.called;
        });

        it('should return an observable like object', function () {
            var periodsForWorkflow$ = service.getPeriodsForWorkflow({ id: 'QeGps9iWl1i', name: 'MER Results' });

            expect(periodsForWorkflow$.subscribe).to.be.a('function');
        });

        it('should return the periods for just the workflow', function (done) {
            var periodsForWorkflow$ = service.getPeriodsForWorkflow({ id: 'QeGps9iWl1i', name: 'MER Results' });

            periodsForWorkflow$.subscribe(
                function (periods) {
                    expect(periods).to.deep.equal([
                        { id: '2017Q1', name: 'January - March 2017' }
                    ]);
                    done();
                },
                function (error) {
                    done(error);
                });

            $rootScope.$apply();
        });
    });

    xit('should have the period types', function () {
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
    xdescribe('getPastPeriodsRecentFirst', function () {
        it('should return periods', function () {
            service.setPeriodType('Monthly');

            expect(service.getPastPeriodsRecentFirst()).to.be.a('array');
        });

        it('it should not return a new array', function () {
            service.setPeriodType('Monthly');

            expect(service.getPastPeriodsRecentFirst()).to.equal(service.getPastPeriodsRecentFirst());
        });
    });
    
    xdescribe('setPeriodType', function () {
        it('should generate the correct yearly periods', function () {
            service.setPeriodType('Yearly');
            
            var generatedPeriods = service.getPastPeriodsRecentFirst();
            var thisYearString = (new Date()).getFullYear().toString();
            
            expect(thisYearString).to.equal(generatedPeriods[0].name);
        })
    });

    xdescribe('filterPeriodTypes', function () {
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
