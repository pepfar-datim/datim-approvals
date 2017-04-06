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

        $httpBackend.expectGET('/dhis/api/dataApprovalWorkflows?fields=id,name,displayName,dataApprovalLevels%5BdisplayName,id,level%5D&paging=false')
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

        $httpBackend.whenGET('/dhis/api/dataSets?fields=name,shortName,id,periodType,workflow%5Bid,periodType%5D,categoryCombo%5Bid,name,categories%5Bid%5D%5D&filter=workflow.id:in:%5Bh7g3CDxdExi,QeGps9iWl1i,FmDY2sTeoYw%5D&paging=false')
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

        $httpBackend.whenGET('/dhis/api/categoryCombos/wUpfppgjEza?fields=id,categoryOptionCombos%5Bid,name%5D')
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

    xit('after loading the datasets it should call the periodService', function () {
        $httpBackend.flush();

        expect(periodService.filterPeriodTypes).to.been.called;
    });
});
