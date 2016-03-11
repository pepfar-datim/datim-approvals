describe('Datasetgroup service', function () {
    var merUrl = '/dhis/api/dataSets?fields=name,shortName,id,periodType,categoryCombo%5Bid,name,categories%5Bid%5D%5D&filter=id:in:%5Bfx2HjpODE5y,xXmmo2so2V8,gpJ2TLXI3mY,w9BiI08vABw%5D&paging=false';
    var eaUrl = '/dhis/api/dataSets?fields=name,shortName,id,periodType,categoryCombo%5Bid,name,categories%5Bid%5D%5D&filter=id:in:%5BeLRAaV32xH5,kLPghhtGPvZ,A4ivU53utt2,wEKkfO7aAI3,JmnzNK18klO%5D&paging=false';

    var service;
    var $httpBackend;
    var periodService = {
        filterPeriodTypes: sinon.spy()
    };
    var errorHandlerMock;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals', function ($provide) {
        $provide.factory('periodService', function () {
            return periodService;
        });
        $provide.factory('errorHandler', function () {
           return {
               error: sinon.spy(),
               warning: sinon.spy()
           };
        });
    }));
    beforeEach(inject(function (_$httpBackend_, dataSetGroupService, errorHandler) {
        errorHandlerMock = errorHandler;

        $httpBackend = _$httpBackend_;
        service = dataSetGroupService;

        $httpBackend.expectGET('/dhis/api/dataApprovalWorkflows?fields=id,name,displayName,dataApprovalLevels%5BdisplayName,id,level%5D%26paging%3Dfalse&paging=false')
            .respond(200, {
                "dataApprovalWorkflows": [{
                    "name": "EA",
                    "id": "h7g3CDxdExi",
                    "displayName": "EA",
                    "dataApprovalLevels": [{"id": "aypLtfWShE5"}, {"id": "fsIo8vU2VFZ"}, {"id": "rImhZfF6RKy"}, {"id": "jtLSx6a19Ps"}]
                }, {
                    "name": "MER",
                    "id": "QeGps9iWl1i",
                    "displayName": "MER",
                    "dataApprovalLevels": [{"id": "aypLtfWShE5"}, {"id": "fsIo8vU2VFZ"}, {"id": "rImhZfF6RKy"}, {"id": "jtLSx6a19Ps"}]
                }, {
                    "name": "SIMS",
                    "id": "FmDY2sTeoYw",
                    "displayName": "SIMS",
                    "dataApprovalLevels": [{"id": "MROYE5CmsDF"}, {"id": "aypLtfWShE5"}]
                }]
            });

        $httpBackend.expectGET('/dhis/api/dataSets?fields=name,shortName,id,periodType,workflow%5Bid,periodType%5D,categoryCombo%5Bid,name,categories%5Bid%5D%5D&filter=workflow.id:in:%5Bh7g3CDxdExi,QeGps9iWl1i,FmDY2sTeoYw%5D&paging=false')
            .respond(200, {
                dataSets: [
                    {
                        id: 'iP8irTNtByO',
                        name: 'DSD: DS 1',
                        shortName: 'DSD: DS 1',
                        workflow: {
                            id: "QeGps9iWl1i"
                        },
                        categoryCombo: {
                            name: "Funding Mechanism",
                            id: "wUpfppgjEza",
                            categories: [
                                {id: "SH885jaRe0o"}
                            ]
                        }
                    },
                    {
                        id: 'iP8irTNtByO',
                        name: 'DSD: DS 1',
                        shortName: 'DSD: DS 1',
                        workflow: {
                            id: "h7g3CDxdExi"
                        },
                        categoryCombo: {
                            name: "Funding Mechanism",
                            id: "wUpfppgjEza",
                            categories: [
                                {id: "SH885jaRe0o"}
                            ]
                        }
                    },
                ],
            });

        $httpBackend.expectGET('/dhis/api/categoryCombos/wUpfppgjEza?fields=id,categoryOptionCombos%5Bid,name%5D')
            .respond(200, {
                id: 'da885jaRe0o',
                name: '11 - Some mechanism ',
            });

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
        expect(service).to.be.a('object');
    });

    it('should have a method to get available groups', function () {
        expect(service.getGroups).to.be.a('function');
    });

    describe('getGroups', function () {
        it('should return an array', function () {
            expect(service.getGroups()).to.deep.equal({});
        });

        it('should filter the datasetgroups after they have been loaded', function () {
            sinon.spy(service, 'filterDataSetsForUser');

            $httpBackend.flush();

            expect(service.filterDataSetsForUser).to.have.callCount(1);
        });

        xit('should return the filtered data sets groups when loaded', function () {
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

            expect(service.getGroups()).to.deep.equal(expectedDataSetGroups);
        });
    });

    describe('filterDataSetsForUser', function () {
        it('should exist as a method', function () {
            expect(service.filterDataSetsForUser).to.be.a('function');
        });

        xit('should filter the dataset list based on the ones that are accessible', function () {
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

            expect(service.getGroups()).to.deep.equal(filteredUserGroups);
        });
    });

    describe('getDataSetGroupNames', function () {
        it('should exist as a method', function () {
            expect(service.getDataSetGroupNames).to.be.a('function');
        });

        it('should return the data set group names', function () {
            $httpBackend.flush();

            expect(service.getDataSetGroupNames()).to.deep.equal([ 'EA', 'MER' ]);
        });
    });

    describe('getDataSets', function () {
        beforeEach(function () {
            $httpBackend.flush();
        });

        it('should return the datasets based for this the key', function () {
            var dataSets = service.getDataSetsForGroup('MER');

            expect(dataSets.length).to.equal(1);
            expect(dataSets[0].id).to.equal('iP8irTNtByO');
            expect(dataSets[0].name).to.equal('DSD: DS 1');
            expect(dataSets[0].workflow).not.to.be.undefined;
        });
    });

    it('after loading the datasets it should call the periodService', function () {
        $httpBackend.flush();

        expect(periodService.filterPeriodTypes).to.been.called;
    });
});
