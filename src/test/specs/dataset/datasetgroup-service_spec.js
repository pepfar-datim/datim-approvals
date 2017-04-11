describe('Datasetgroup service', function () {
    var service;
    var $httpBackend;
    var $rootScope;
    var periodService = {
        getPeriodsForWorkflow: sinon.stub()
    };
    var errorHandlerMock;
    var dataApprovalWorkflows = fixtures.get('workflowsWithDatasets').dataApprovalWorkflows;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals', function ($provide) {
        $provide.factory('workflowService', function (rx, $rootScope) {
            return {
                workflows$: rx.Observable.just(dataApprovalWorkflows).safeApply($rootScope)
            };
        });
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
    beforeEach(inject(function (_$httpBackend_, _$rootScope_, errorHandler) {
        errorHandlerMock = errorHandler;

        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;

        periodService.getPeriodsForWorkflow
            .returns(Rx.Observable.just([]));
    }));

    beforeEach(inject(function (dataSetGroupService) {
        service = dataSetGroupService;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should be defined', function () {
        expect(service).to.be.a('object');
    });

    describe('dataSetGroups$', function () {
        it('should emit the workflows', function (done) {
            periodService.getPeriodsForWorkflow
                .withArgs(dataApprovalWorkflows[0])
                .returns(Rx.Observable.just([
                    { id: '2016Q2', "name": "April - June 2016", },
                    { id: '2017Q1', name: 'January - March 2017' }
                ]));

            periodService.getPeriodsForWorkflow
                .withArgs(dataApprovalWorkflows[1])
                .returns(Rx.Observable.just([
                    { id: '2017Oct', "name": "October 2017 - September 2018", },
                ]));

            service.dataSetGroups$
                .subscribe(
                    function (workflows) {
                        expect(workflows).to.have.length(2);
                        done();
                    },
                    function (err) { done(err) }
                );
        });

        it('should return just the workflow that has periods', function (done) {
            periodService.getPeriodsForWorkflow
                .withArgs(dataApprovalWorkflows[0])
                .returns(Rx.Observable.just([]));

            periodService.getPeriodsForWorkflow
                .withArgs(dataApprovalWorkflows[1])
                .returns(Rx.Observable.just([
                    { id: '2017Oct', "name": "October 2017 - September 2018", },
                ]));

            service.dataSetGroups$
                .subscribe(
                    function (workflows) {
                        expect(workflows).to.have.length(1);
                        done();
                    },
                    function (err) { done(err) }
                );
        });

        it('should log an error message when no workflows have been found', function (done) {
            periodService.getPeriodsForWorkflow
                .withArgs(dataApprovalWorkflows[0])
                .returns(Rx.Observable.just([]));

            periodService.getPeriodsForWorkflow
                .withArgs(dataApprovalWorkflows[1])
                .returns(Rx.Observable.just([]));

            service.dataSetGroups$
                .subscribe(
                    function (workflows) {
                        expect(errorHandlerMock.error).to.be.calledWith('Could not not find any workflows (Data Streams)');
                        expect(workflows).to.have.length(0);
                        done();
                    },
                    function (err) { done(err) }
                );
        });

        it('should not log an error when there are workflows', function (done) {
            periodService.getPeriodsForWorkflow
                .withArgs(dataApprovalWorkflows[1])
                .returns(Rx.Observable.just([
                    { id: '2017Oct', "name": "October 2017 - September 2018", },
                ]));

            service.dataSetGroups$
                .subscribe(
                    function (workflows) {
                        expect(errorHandlerMock.error).not.to.be.called;
                        done();
                    },
                    function (err) { done(err) }
                );
        });
    });
});
