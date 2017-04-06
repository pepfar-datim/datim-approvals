describe('DataStore Service', function () {
    var $httpBackend;
    var $rootScope;
    var dataStore;
    var periodSettingsFixture = {
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
    };
    var errorHandlerError;

    beforeEach(module('PEPFAR.approvals', function ($provide) {
        errorHandlerError = sinon.spy();
        $provide.factory('errorHandler', function () {
            return {
                error: errorHandlerError,
            };
        });
    }));
    beforeEach(inject(function (_$rootScope_, _dataStore_) {
        dataStore = _dataStore_;
        $rootScope = _$rootScope_;
    }));

    it('should have a getPeriodSettings method', function () {
        expect(dataStore.getPeriodSettings).to.be.a('function');
    });

    describe('getPeriodSettings', function () {
        var periodSettingsRequest;

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;

            periodSettingsRequest = $httpBackend.expectGET('/dataStore/approvals/periodSettings');
            
            periodSettingsRequest
                .respond(200, periodSettingsFixture);
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should return a Promise like object', function () {
            expect(dataStore.getPeriodSettings().then).to.be.a('function');
        });

        it('should request the dataStore for the period settings when called', function () {
            // Expectations are explicitly tested by the afterEach
            dataStore.getPeriodSettings();
        });

        it('should return the expected structure', function (done) {
            dataStore.getPeriodSettings()
                .then(function (periodSettings) {
                    expect(periodSettings).to.deep.equal(periodSettingsFixture);
                    done();
                })
                .catch(done);

            $httpBackend.flush();
            $rootScope.$apply();
        });

        it('should return the same promise when it was once called', function () {
            expect(dataStore.getPeriodSettings()).to.equal(dataStore.getPeriodSettings());
        });

        it('should call the error handler when the settings can not be loaded', function () {
            periodSettingsRequest.respond(404, '');
            dataStore.getPeriodSettings();

            $httpBackend.flush();
            $rootScope.$apply();
            
            expect(errorHandlerError).to.be.called;
        });
    });
});
