describe('Analytics status service', function () {
    var service;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals', function ($provide) {
        $provide.factory('errorHandler', function () {
            return {
                warn: sinon.spy()
            };
        })
    }));
    beforeEach(inject(function ($injector) {
        service = $injector.get('analyticsStatus');
    }));

    it('should be an object', function () {
        expect(service).to.be.a('object');
    });

    it('should return a promise object', function () {
        expect(service.getIntervalSinceLastAnalyticsTableSuccess().then).to.be.a('function');
        expect(service.getIntervalSinceLastAnalyticsTableSuccess().catch).to.be.a('function');
    });

    describe('getStatus', function () {
        var $httpBackend;
        var systemInfoRequest;

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;

            systemInfoRequest = $httpBackend.expectGET('/dhis/api/system/info');
            systemInfoRequest.respond(200, fixtures.get('system/info'));
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should ask for system/info from the server', function () {
            service.getIntervalSinceLastAnalyticsTableSuccess();

            $httpBackend.flush();
        });

        it('should return the string of for the time', function () {
            var intervalText;

            service.getIntervalSinceLastAnalyticsTableSuccess()
                .then(function (data) {
                    intervalText = data;
                });

            $httpBackend.flush();

            expect(intervalText).to.equal('996 h, 36 m, 11 s');
        });

        it('should show message on missing property', function () {
            var intervalText;

            systemInfoRequest.respond(200, {});

            service.getIntervalSinceLastAnalyticsTableSuccess()
                .catch(function (data) {
                    intervalText = data;
                });

            $httpBackend.flush();

            expect(intervalText).to.equal('Unable to find last updated time');
        });

        it('should show not found message on http error', function () {
            var intervalText;

            systemInfoRequest.respond(200, {});

            service.getIntervalSinceLastAnalyticsTableSuccess()
                .catch(function (data) {
                    intervalText = data;
                });

            $httpBackend.flush();

            expect(intervalText).to.equal('Unable to find last updated time');
        });
    });
});
