describe('Datasetgroup service', function () {
    var service;
    var $httpBackend;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (_$httpBackend_, dataSetGroupService) {
        $httpBackend = _$httpBackend_;
        service = dataSetGroupService;

        $httpBackend.whenGET('/dhis/api/systemSettings/keyApprovalDataSetGroups')
            .respond(200, fixtures.get('dataSetGroups'));
        $httpBackend.whenGET(/\/dhis\/api\/dataSets\/\w/).respond(409);
    }));

    it('should be defined', function () {
        expect(service).toBeAnObject();
    });

    it('should have a method to get available groups', function () {
        expect(service.getGroups).toBeAFunction();
    });

    it('should ask the server for the system setting dataSetGroups', function () {
        $httpBackend.expectGET('/dhis/api/systemSettings/keyApprovalDataSetGroups')
            .respond(200, fixtures.get('dataSetGroups'));
        $httpBackend.flush();
    });

    describe('getGroups', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/dhis/api/dataSets/iP8irTNtByO').respond(200, {
                name: 'DSD: DS 1',
                shortName: 'DSD: DS 1',
                id: 'iP8irTNtByO'
            });

            $httpBackend.expectGET('/dhis/api/dataSets/eLRAaV32xH5').respond(200, {
                name: 'EA: DataSet 1',
                shortName: 'EA: DS1',
                id: 'eLRAaV32xH5'
            });
        });

        it('should return an array', function () {
            expect(service.getGroups()).toEqual({});
        });

        it('should filter the datasetgroups after they have been loaded', function () {
            spyOn(service, 'filterDataSetsForUser').andCallThrough();

            $httpBackend.flush();

            expect(service.filterDataSetsForUser).toHaveBeenCalledOnce();
        });

        it('should return the filtered data sets groups when loaded', function () {
            var expectedDataSetGroups = {
                MER: {
                    name: 'MER',
                    dataSets: [{
                        name: 'DSD: DS 1',
                        shortName: 'DSD: DS 1',
                        id: 'iP8irTNtByO'
                    }]
                },
                EA: {
                    name: 'EA',
                    dataSets: [{
                        name: 'EA: DataSet 1',
                        shortName: 'EA: DS1',
                        id: 'eLRAaV32xH5'
                    }]
                }
            }
            $httpBackend.flush();

            expect(service.getGroups()).toEqual(expectedDataSetGroups);
        });
    });

    describe('filterDataSetsForUser', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/dhis/api/dataSets/eLRAaV32xH5').respond(200, {
                name: 'EA: DataSet 1',
                shortName: 'EA: DS1',
                id: 'eLRAaV32xH5'
            });
            $httpBackend.expectGET('/dhis/api/dataSets/A4ivU53utt2').respond(200, {
                name: 'EA: DataSet 2',
                shortName: 'EA: DS 2',
                id: 'A4ivU53utt2'
            });
        });

        it('should exist as a method', function () {
            expect(service.filterDataSetsForUser).toBeAFunction();
        });

        it('should filter the dataset list based on the ones that are accessible', function () {
            var dataFromResult = JSON.parse(fixtures.get('dataSetGroups'));
            var filteredUserGroups = {
                EA: {
                    name: "EA",
                    dataSets: [
                        {
                            name: 'EA: DataSet 1',
                            shortName: 'EA: DS1',
                            id: 'eLRAaV32xH5'
                        },
                        {
                            name: 'EA: DataSet 2',
                            shortName: 'EA: DS 2',
                            id: 'A4ivU53utt2'
                        }
                    ]
                }
            };
            $httpBackend.flush();

            service.filterDataSetsForUser([dataFromResult[1]]);

            $httpBackend.flush();

            expect(service.getGroups()).toEqual(filteredUserGroups);
        });
    });

    describe('getDataSetGroupNames', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/dhis/api/dataSets/iP8irTNtByO').respond(200, {
                name: 'DSD: DS 1',
                shortName: 'DSD: DS 1',
                id: 'iP8irTNtByO'
            });

            $httpBackend.expectGET('/dhis/api/dataSets/eLRAaV32xH5').respond(200, {
                name: 'EA: DataSet 1',
                shortName: 'EA: DS1',
                id: 'eLRAaV32xH5'
            });
        });

        it('should exist as a method', function () {
            expect(service.getDataSetGroupNames).toBeAFunction();
        });

        it('should return the data set group names', function () {
            $httpBackend.flush();

            expect(service.getDataSetGroupNames()).toEqual([ 'MER', 'EA' ]);
        });
    });
});
