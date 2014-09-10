describe('Datasetgroup service', function () {
    var merUrl = '/dhis/api/dataSets?fields=name,shortName,id,periodType&filters=id:eq:cIGsv0OBVi8&filters=id:eq:xY5nwObRyi7&filters=id:eq:lr508Rm7mHS&filters=id:eq:vVhGT24UEw9&filters=id:eq:vX0MoAE7JfL&filters=id:eq:vu4lNmAaBkm&filters=id:eq:m4DLLzOPF08&filters=id:eq:hdjgjnHcr8H&filters=id:eq:KIG137Mm5rJ&filters=id:eq:Zqg76KonUx1&filters=id:eq:wji7xi0tZGm&filters=id:eq:z6YxZoMm227&filters=id:eq:NYveSOaHM3O&filters=id:eq:maRBXO2gNjU&filters=id:eq:oIKX7smWRnp&filters=id:eq:dGlmC3LBp4q&filters=id:eq:KDniz30AG0s&filters=id:eq:BjJjrjHdsKT&filters=id:eq:qOv1iM5q1Mr&filters=id:eq:HxkXrH39hmG&filters=id:eq:iP8irTNtByO&filters=id:eq:iVC0ZksKDDM&filters=id:eq:S7f1nmVrLIT&paging=false';
    var eaUrl = '/dhis/api/dataSets?fields=name,shortName,id,periodType&filters=id:eq:eLRAaV32xH5&filters=id:eq:kLPghhtGPvZ&filters=id:eq:A4ivU53utt2&filters=id:eq:wEKkfO7aAI3&filters=id:eq:JmnzNK18klO&paging=false';

    var service;
    var $httpBackend;
    var periodService = {
        filterPeriodTypes: jasmine.createSpy()
    };

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals', {
        periodService: periodService
    }));
    beforeEach(inject(function (_$httpBackend_, dataSetGroupService) {
        $httpBackend = _$httpBackend_;
        service = dataSetGroupService;

        $httpBackend.whenGET('/dhis/api/systemSettings/keyApprovalDataSetGroups')
            .respond(200, fixtures.get('dataSetGroups'));
        $httpBackend.whenGET(merUrl)
            .respond(200, { dataSets: [
                { name : 'DSD: DS 1', shortName : 'DSD: DS 1', id : 'iP8irTNtByO' }
            ] });
        $httpBackend.whenGET(eaUrl)
            .respond(200, { dataSets: [
                { name : 'EA: DataSet 1', shortName : 'EA: DS1', id : 'eLRAaV32xH5' },
                { name : 'EA: DataSet 2', shortName : 'EA: DS 2', id : 'A4ivU53utt2' }
            ] });

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
    });

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
            };
            $httpBackend.expectGET(eaUrl)
                .respond(200, { dataSets: [
                    { name : 'EA: DataSet 1', shortName : 'EA: DS1', id : 'eLRAaV32xH5' },
                ] });

            $httpBackend.flush();

            expect(service.getGroups()).toEqual(expectedDataSetGroups);
        });
    });

    describe('filterDataSetsForUser', function () {
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
            $httpBackend.expectGET(merUrl)
                .respond(200, { dataSets: [
                ] });

            $httpBackend.flush();

            service.filterDataSetsForUser([dataFromResult[1]]);

            $httpBackend.flush();

            expect(service.getGroups()).toEqual(filteredUserGroups);
        });
    });

    describe('getDataSetGroupNames', function () {
        it('should exist as a method', function () {
            expect(service.getDataSetGroupNames).toBeAFunction();
        });

        it('should return the data set group names', function () {
            $httpBackend.flush();

            expect(service.getDataSetGroupNames()).toEqual([ 'EA', 'MER' ]);
        });
    });

    describe('getDataSets', function () {
        beforeEach(function () {
            $httpBackend.flush();
        });

        it('should return the datasets based for this the key', function () {
            expect(service.getDataSetsForGroup('MER')).toEqual([{ id : 'iP8irTNtByO', name : 'DSD: DS 1', shortName : 'DSD: DS 1' }]);
        });
    });

    it('after loading the datasets it should call the periodService', function () {
        $httpBackend.flush();

        expect(periodService.filterPeriodTypes).toHaveBeenCalled();
    });
});
