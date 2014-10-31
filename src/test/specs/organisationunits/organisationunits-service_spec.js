describe('Organisationunits service', function () {
    var service;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (organisationunitsService) {
        service = organisationunitsService;
    }));

    it('should be an object', function () {
        expect(service).toBeAnObject();
    });

    it('should be a method', function () {
        expect(service.requestOrganisationUnitsForLevel).toBeAFunction();
    });

    describe('getOrganisationUnitChildrenFor', function () {
        var $httpBackend;

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('/dhis/api/organisationUnits?fields=id,name&filter=level:eq:3&paging=false').respond(200, fixtures.get('organisationUnitsForLevelThree'));
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('should call the organisation units endpoint', function () {
            service.requestOrganisationUnitsForLevel(3);
            $httpBackend.flush();
        });

        it('should pass an array to the promise then', function () {
            var organisationUnits = undefined;

            service.requestOrganisationUnitsForLevel(3).then(function (results) {
                organisationUnits = results;
            });
            $httpBackend.flush();

            expect(organisationUnits).toBeAnArray();
            expect(organisationUnits.length).toEqual(37);
        });
    });

    describe('currentOrganisationUnit', function () {
        it('should exist on the service', function () {
            expect(service.currentOrganisationUnit).toBeDefined();
        });

        it('should be an object', function () {
            expect(service.currentOrganisationUnit).toBeAnObject();
        });
    });
});
