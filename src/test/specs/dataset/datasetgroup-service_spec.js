describe('Datasetgroup service', function () {
    var merUrl = '/dhis/api/dataSets?fields=name,shortName,id,periodType,categoryCombo%5Bid,name,categories%5Bid%5D%5D&filter=id:in:%5Bfx2HjpODE5y,xXmmo2so2V8,gpJ2TLXI3mY,w9BiI08vABw%5D&paging=false';
    var eaUrl = '/dhis/api/dataSets?fields=name,shortName,id,periodType,categoryCombo%5Bid,name,categories%5Bid%5D%5D&filter=id:in:%5BeLRAaV32xH5,kLPghhtGPvZ,A4ivU53utt2,wEKkfO7aAI3,JmnzNK18klO%5D&paging=false';
    var simsUrl = '/dhis/api/dataSets?fields=name,shortName,id,periodType,categoryCombo%5Bid,name,categories%5Bid%5D%5D&filter=id:in:%5BnideTeYxXLu,J9Yq8jDd3nF,iqaWSeKDhS3,M059pmNzZYE%5D&paging=false';

    var service;
    var $httpBackend;
    var periodService = {
        filterPeriodTypes: jasmine.createSpy()
    };
    var errorHandlerMock;

    var systemSettingRequest;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals', function ($provide) {
        $provide.factory('periodService', function () {
            return periodService;
        });
        $provide.factory('errorHandler', function () {
           return {
               error: jasmine.createSpy('errorHandler.error'),
               warning: jasmine.createSpy('errorHandler.warning')
           };
        });
    }));
    beforeEach(inject(function (_$httpBackend_, dataSetGroupService, errorHandler) {
        errorHandlerMock = errorHandler;

        $httpBackend = _$httpBackend_;
        service = dataSetGroupService;

        systemSettingRequest = $httpBackend.whenGET('/dhis/api/systemSettings/keyApprovalDataSetGroups');
        systemSettingRequest.respond(200, fixtures.get('dataSetGroups'));
        $httpBackend.whenGET(merUrl)
            .respond(200, { dataSets: [
                { name : 'DSD: DS 1', shortName : 'DSD: DS 1', id : 'iP8irTNtByO' }
            ] });
        $httpBackend.whenGET(eaUrl)
            .respond(200, { dataSets: [
                { name : 'EA: DataSet 1', shortName : 'EA: DS1', id : 'eLRAaV32xH5' },
                { name : 'EA: DataSet 2', shortName : 'EA: DS 2', id : 'A4ivU53utt2' }
            ] });
        $httpBackend.whenGET(simsUrl)
            .respond(200, { dataSets: [ ] });

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

    it('should call the errorHandler when the dataset groups are not set up correctly', function () {
        systemSettingRequest.respond(200, '');

        $httpBackend.flush();

        expect(errorHandlerMock.error).toHaveBeenCalledWith('Dataset groups not defined in systemsettings (key: keyApprovalDataSetGroups), see the deployment manual on how to configure the app.', true);
    });

    it('should warn the user when no dataset groups can not be found but the setting is defined as an array', function () {
        systemSettingRequest.respond(200, '[]');

        $httpBackend.flush();

        expect(errorHandlerMock.warning).toHaveBeenCalledWith('No dataset groups were found that your account can access. This could be the result of your account not having access to these datasets.', true);
    });
});
