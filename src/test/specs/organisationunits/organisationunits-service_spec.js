describe('Organisationunits service', function () {
    var service;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (organisationunitsService) {
        service = organisationunitsService;
    }));

    it('should be an object', function () {
        expect(service).to.be.a('object');
    });

    it('should be a method', function () {
        expect(service.requestOrganisationUnitsForLevel).to.be.a('function');
    });

    describe('getOrganisationUnitChildrenFor', function () {
        var $httpBackend;

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;

            service.currentOrganisationUnit = {
                id: 'ybg3MO3hcf4'
            };

            $httpBackend.expectGET('/dhis/api/organisationUnits/ybg3MO3hcf4?fields=id,name,displayName&level=3&paging=false').respond(200, fixtures.get('organisationUnitsForLevelThree'));
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should call the organisation units endpoint', function () {
            service.requestOrganisationUnitsForLevel('ybg3MO3hcf4', 3);
            $httpBackend.flush();
        });

        it('should pass an array to the promise then', function (done) {
            var organisationUnits = undefined;

            service.requestOrganisationUnitsForLevel('ybg3MO3hcf4', 3)
                .subscribe(function (results) {
                    organisationUnits = results;
                });
            $httpBackend.flush();

            setTimeout(function () {
                expect(organisationUnits).to.be.a('array');
                expect(organisationUnits.length).to.equal(37);
                done();
            });
        });
    });

    describe('currentOrganisationUnit', function () {
        it('should exist on the service', function () {
            expect(service.currentOrganisationUnit).not.to.be.undefined;
        });

        it('should be an object', function () {
            expect(service.currentOrganisationUnit).to.be.a('object');
        });
    });
});
