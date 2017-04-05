describe('Mechanisms service', function () {
    var mechanismsService;
    var $httpBackend;
    var $rootScope;
    var $log;
    var apiUrlWithCorrectParameters = ['/dhis/api/categories.json?',
        [
            'paging=false',
            'filter=id:in:%5BSH885jaRe0o,GLevLNI9wkl%5D',
            'fields=id,name'
            //'fields=id,name,categoryOptions[id,name,organisationUnits[id,name],categoryOptionCombos[id,name],categoryOptionGroups[id,name,categoryOptionGroupSet[id]]'
        ].join('&')
    ].join('');

    var defaultCategoryUrl =  '/dhis/api/categoryOptions?paging=false&filter=categories.id:eq:GLevLNI9wkl&fields=id,name,organisationUnits%5Bid,name%5D,categoryOptionCombos%5Bid,name%5D,categoryOptionGroups%5Bid,name,categoryOptionGroupSet%5Bid%5D%5D';
    var fundingMechanismCategoryUrl = '/dhis/api/categoryOptions?paging=false&filter=categories.id:eq:SH885jaRe0o&fields=id,name,organisationUnits%5Bid,name%5D,categoryOptionCombos%5Bid,name%5D,categoryOptionGroups%5Bid,name,categoryOptionGroupSet%5Bid%5D%5D';

    var categoriesFromApi = fixtures.get('categories');

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals', function ($provide) {
        $provide.factory('AppManifest', function () {
           return {activities: {dhis: {href: '/dhis'}}};
        });
        $provide.factory('workflowService', function (rx) {
            return {
                currentWorkflow$: rx.Observable.just(
                    {
                        "name": "MER Results",
                        "id": "QeGps9iWl1i",
                        "displayName": "MER Results",
                        "dataApprovalLevels": [
                            {"id": "aypLtfWShE5", "name": "1", "level": 1, "orgUnitLevel": 1, "displayName": "Global"},
                            {"id": "JNpaWdWCyDN", "name": "3", "level": 3, "orgUnitLevel": 2, "displayName": "Country"},
                            {"id": "vqWNeqjozr9", "name": "2 - Funding Agency", "level": 4, "orgUnitLevel": 2, "categoryOptionGroupSet": {"id": "bw8KHXzxd9i", "name": "Funding Agency", "displayName": "Funding Agency"}},
                            {"id": "WccDi5x6FSp", "name": "2 - Implementing Partner", "level": 5, "orgUnitLevel": 2, "categoryOptionGroupSet": {"id": "BOyWrF33hiR", "name": "Implementing Partner", "displayName": "Implementing Partner"}}
                        ],

                        getApprovalLevelById: function (id) {
                            if (!id) {
                                return undefined;
                            }

                            return this.dataApprovalLevels.reduce(function (acc, workFlow) {
                                if (workFlow.id === id) {
                                    return workFlow;
                                }

                                return acc;
                            }, null);
                        },
                        getApprovalLevelBeforeLevel: function (id) {
                            if (id === 'JNpaWdWCyDN') {
                                return this.dataApprovalLevels[0];
                            }

                            if (id === 'vqWNeqjozr9') {
                                return this.dataApprovalLevels[1];
                            }

                            if (id === 'aypLtfWShE5') {
                                throw new Error('There is no level above this level')
                            }

                            throw new Error('There is no level above this level');
                        },
                    }
                ),
            }
        });

        $provide.factory('approvalLevelsService', function (rx) {
            return rx.Observable.just({
                getCategoryOptionGroupSetIdsForLevels: function () {
                    return [{"name":"Funding Agency","level":3,"categoryOptionGroupSet":{"id":"bw8KHXzxd9i"}},{"name":"Implementing Partner","level":4,"categoryOptionGroupSet":{"id":"BOyWrF33hiR"}}];
                }
            })
        });
    }));

    beforeEach(inject(function (_mechanismsService_, _$httpBackend_, _$log_, _$rootScope_) {
        mechanismsService = _mechanismsService_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $log = _$log_;

        //TODO: If we mock the approvalLevelsService we will not have to do the http call
        $httpBackend.whenGET('/dhis/api/organisationUnitLevels?fields=level,displayName&paging=false')
            .respond(200, fixtures.get('orgUnitLevels'));
        $httpBackend.whenGET('/dhis/api/dataApprovalLevels?fields=id,name,displayName,orgUnitLevel,level,categoryOptionGroupSet%5Bid,name%5D&paging=false')
            .respond(200, fixtures.get('approvalLevels'));
        // $httpBackend.expectGET('/dhis/api/dataApprovals/categoryOptionCombos?ds=a&ds=b&ou=ybg3MO3hcf4&pe=2014Oct')
        //             .respond(200, fixtures.get('cocApprovalStatus'));

        var workflowResponse = {
            "dataApprovalWorkflows": [{
                "name": "MER Results",
                "id": "QeGps9iWl1i",
                "displayName": "MER Results",
                "dataApprovalLevels": [{"id": "aypLtfWShE5", "level": 1, "displayName": "Global"}, {
                    "id": "fsIo8vU2VFZ",
                    "level": 5,
                    "displayName": "Implementing Partner"
                }, {"id": "rImhZfF6RKy", "level": 3, "displayName": "Inter-Agency"}, {
                    "id": "jtLSx6a19Ps",
                    "level": 4,
                    "displayName": "Funding Agency"
                }]
            }, {
                "name": "MER Targets",
                "id": "AEt9nEjcmhw",
                "displayName": "MER Targets",
                "dataApprovalLevels": [{"id": "aypLtfWShE5", "level": 1, "displayName": "Global"}, {
                    "id": "fsIo8vU2VFZ",
                    "level": 5,
                    "displayName": "Implementing Partner"
                }, {"id": "rImhZfF6RKy", "level": 3, "displayName": "Inter-Agency"}, {
                    "id": "jtLSx6a19Ps",
                    "level": 4,
                    "displayName": "Funding Agency"
                }]
            }, {
                "name": "mg_test",
                "id": "rrUYETtwcgu",
                "displayName": "mg_test",
            }, {
                "name": "SIMS",
                "id": "FmDY2sTeoYw",
                "displayName": "SIMS",
                "dataApprovalLevels": [{
                    "id": "MROYE5CmsDF",
                    "level": 2,
                    "displayName": "Global Funding Agency"
                }, {"id": "aypLtfWShE5", "level": 1, "displayName": "Global"}]
            }]
        };

        $httpBackend.whenGET('/dhis/api/dataApprovalWorkflows?fields=id,name,displayName,dataApprovalLevels%5BdisplayName,id,level%5D&paging=false')
            .respond(200, workflowResponse);

        // $httpBackend.flush();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('getData', function () {
        it('should act like a promise', function () {
            expect(mechanismsService.getData().then).to.be.a('function');
            expect(mechanismsService.getData().catch).to.be.a('function');
            expect(mechanismsService.getData().finally).to.be.a('function');
        });

        it('should not do a request to the api for the categories when parameters are missing', function () {
            mechanismsService.getData();
        });

        describe('requests', function () {
            var categoriesRequest;

            beforeEach(function () {
                $httpBackend.expectGET(fundingMechanismCategoryUrl)
                    .respond(200, fixtures.get('fundingMechanismCategory'));
                $httpBackend.expectGET(defaultCategoryUrl)
                    .respond(200, fixtures.get('defaultCategory'));

                categoriesRequest = $httpBackend.expectGET(apiUrlWithCorrectParameters);
                categoriesRequest.respond(200, {
                    categories: [
                        {id: 'SH885jaRe0o', name: 'Funding Mechanism'},
                        {id: 'GLevLNI9wkl', name: 'default'}
                    ]
                });
            });

            it('should add the parameters to the url', function () {
                mechanismsService.period = '2014';
                mechanismsService.categories = ['SH885jaRe0o', 'GLevLNI9wkl'];

                mechanismsService.getData();

                $httpBackend.flush();
            });


            it('should reject when the request fails', function () {
                var catchSpy = sinon.spy();
                categoriesRequest.respond(400, 'Error while loading categories');

                mechanismsService.period = '2014';
                mechanismsService.categories = ['SH885jaRe0o', 'GLevLNI9wkl'];

                mechanismsService
                    .getData()
                    .catch(catchSpy);

                $httpBackend.flush();

                expect(catchSpy).to.be.called;
            });

            it('should resolve with the correct values', function () {
                var categories;

                mechanismsService.period = '2014';
                mechanismsService.categories = ['SH885jaRe0o', 'GLevLNI9wkl'];

                mechanismsService
                    .getData()
                    .then(function (data) {
                        categories = data;
                    });

                $httpBackend.flush();

                expect(categories.length).to.equal(2);
                expect(categories[0].id).to.equal('SH885jaRe0o');
                expect(categories[1].id).to.equal('GLevLNI9wkl');
            });
        });
    });

    describe('getMechanisms', function () {
        var deferredGetData;
        var deferredGetStatuses;
        var $rootScope;

        beforeEach(inject(function ($q, _$rootScope_) {
            $rootScope = _$rootScope_;
            deferredGetData = $q.defer();
            deferredGetStatuses = $q.defer();

            sinon.stub(mechanismsService, 'getData').returns(deferredGetData.promise);
            sinon.stub(mechanismsService, 'getStatuses').returns(deferredGetStatuses.promise);
        }));

        it('should act like an observable', function () {
            expect(mechanismsService.getMechanisms().subscribe).to.be.a('function');
            expect(mechanismsService.getMechanisms().map).to.be.a('function');
            expect(mechanismsService.getMechanisms().combineLatest).to.be.a('function');
        });

        describe('returned data', function () {
            var dataResult;
            beforeEach(function (done) {
                mechanismsService.getMechanisms()
                    .subscribe(
                        function (data) {
                            dataResult = data;
                            done();
                        },
                        function (error) {
                            done(error);
                        }
                    );

                deferredGetData.resolve(categoriesFromApi.categories);
                deferredGetStatuses.resolve(fixtures.get('cocApprovalStatus'));
                $rootScope.$apply();
            });

            it('should return an array in the then function', function () {
                expect(dataResult).to.be.a('array');
            });

            it('should return all the categoryOptions in an array', function () {
                expect(dataResult.length).to.equal(4);
            });

            it('should return the correct data', function () {
                expect(dataResult[0].actions).to.equal('Submit')
            });

            it('should add the approval level to the mechanism', function () {
                expect(dataResult[0].level).to.equal(2);
            });

            it('should add the status to the mechanism', function () {
                expect(dataResult[0].status).to.equal('Accepted by Global');
                expect(dataResult[1].status).to.equal('Submitted by Country');
            });

            it('should show pending for mechanisms without a level', function () {
                expect(dataResult[3].status).to.equal('Pending');
            });

            it('should add the mayReadData status to the mechanism', function () {
                expect(dataResult[0].mayReadData).to.equal(true);
                expect(dataResult[3].mayReadData).to.equal(false);
            });

            it('should not return mechanisms without categoryOptionCombos', function () {

            });
        });
    });

    describe('categories property', function () {
        it('should be set to an empty array', function () {
            expect(mechanismsService.categories).to.deep.equal([]);
        });

        it('should set the categories on the service', function () {
            mechanismsService.categories = ['set1', 'set2', 'set3'];

            expect(mechanismsService.categories).to.deep.equal(['set1', 'set2', 'set3']);
        });

        it('should log an error when the given value is not an array', function () {
            mechanismsService.categories = '';
            var errorMessages = $log.error.logs.reduce(function (acc, v) {return acc.concat(v);}, []);

            expect(errorMessages).to.contain('Mechanism Service: Categories should be an array');
        });
    });

    describe('organisation units property', function () {
        it('should set to an empty string', function () {
            expect(mechanismsService.organisationUnit).to.equal('');
        });

        it('should set the given orgunit id onto the service', function () {
            mechanismsService.organisationUnit = 'asd11sss';

            expect(mechanismsService.organisationUnit).to.equal('asd11sss');
        });

        it('should log an error when a value that is not a string is given', function () {
            mechanismsService.organisationUnit = [];
            var errorMessages = $log.error.logs.reduce(function (acc, v) {return acc.concat(v);}, []);

            expect(errorMessages).to.contain('Mechanism Service: OrganisationUnit should be a string');
        });
    });

    describe('getStatuses', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/dhis/api/dataApprovals/categoryOptionCombos?ds=a&ds=b&ou=ybg3MO3hcf4&pe=2014Oct')
                .respond(200, fixtures.get('cocApprovalStatus'));

            mechanismsService.period = '2014Oct';
            mechanismsService.dataSetIds = ['a', 'b'];
            mechanismsService.organisationUnit = 'ybg3MO3hcf4';
        });

        it('should request statuses from the API', function () {
            mechanismsService.getStatuses();

            $httpBackend.flush();
        });

        it('should return the status data from the api', function () {
            var returnedData;

            mechanismsService.getStatuses().then(function (data) {
                returnedData = data;
            });

            $httpBackend.flush();

            expect(returnedData).to.have.length(5);
            expect(returnedData[0].id).to.equal('qS0ABIH66TS');

            // TODO: Add more solid verification of the data structure
        });

        it('should call the api without an orgunit', function () {
            $httpBackend.resetExpectations();
            $httpBackend.expectGET('/dhis/api/dataApprovals/categoryOptionCombos?ds=a&ds=b&pe=2014Oct')
                .respond(200, fixtures.get('cocApprovalStatus'));

            mechanismsService.isGlobal = true;

            mechanismsService.getStatuses();
            $httpBackend.flush();
        });
    });
});
