describe('Workflow service', function () {
    var workflowService;
    var rx;
    var $httpBackend;
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
    var dataApprovalWorkflowsRequest;

    beforeEach(module('d2-rest'));
    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function ($injector) {
        workflowService = $injector.get('workflowService');
        rx = $injector.get('rx');
        $httpBackend = $injector.get('$httpBackend');

        dataApprovalWorkflowsRequest = $httpBackend
            .expectGET('/dhis/api/dataApprovalWorkflows?fields=id,name,displayName,dataApprovalLevels%5BdisplayName,id,level%5D&paging=false');
        dataApprovalWorkflowsRequest.respond(200, workflowResponse);
    }));

    it('should return an object', function () {
        expect(workflowService).to.be.a('object');
    });

    describe('setCurrentWorkflow()', function () {
        it('should be a function', function () {
            expect(workflowService.setCurrentWorkflow).to.be.a('function');
        });

        it('should emit a value from currentWorkflow$ when called', function (done) {
            var newWorkflow = {
                name: 'QUR Results',
                id: 'QeGps9iWl1i'
            };

            workflowService.currentWorkflow$
                .subscribe(function (currentWorkflow) {
                    expect(currentWorkflow.displayName).to.equal(workflowResponse.dataApprovalWorkflows[0].displayName);
                    expect(currentWorkflow.dataApprovalLevels).to.deep.equal(workflowResponse.dataApprovalWorkflows[0].dataApprovalLevels);
                    done();
                });

            workflowService.setCurrentWorkflow(newWorkflow);
            $httpBackend.flush();
        });
    });

    describe('workflowService.workflows$', function () {
        it('should be an observable', function () {
            expect(workflowService.workflows$).to.be.an.instanceof(rx.Observable);
        });

        it('should emit the workflows when they are loaded', function (done) {
            var expectedWorkflows = workflowResponse.dataApprovalWorkflows;

            workflowService.workflows$
                .subscribe(function (workflows) {
                    expect(workflows.length).to.equal(4);
                    workflows
                        .forEach(function (workflow, index) {
                            expect(workflow.displayName).to.equal(expectedWorkflows[index].displayName);
                            expect(workflow.id).to.equal(expectedWorkflows[index].id);
                            expect(workflow.dataApprovalLevels).to.deep.equal(expectedWorkflows[index].dataApprovalLevels);
                        });

                    done();
                });

            $httpBackend.flush();
        });

        it('should emit an error when the workflow loading failed', function (done) {
            dataApprovalWorkflowsRequest
                .respond(500, 'Could not load dataApprovalWorkflows');

            workflowService.workflows$
                .subscribe(function () {}, function (error) {
                    expect(error.message).to.equal('Could not load dataApprovalWorkflows');
                    done();
                });

            $httpBackend.flush();
        });

        it('should allow late subscribers to still receive the message', function (done) {
            var expectedWorkflows = workflowResponse.dataApprovalWorkflows;

            $httpBackend.flush();

            workflowService.workflows$
                .subscribe(function (workflows) {
                    expect(workflows.length).to.equal(4);
                    workflows
                        .forEach(function (workflow, index) {
                            expect(workflow.displayName).to.equal(expectedWorkflows[index].displayName);
                            expect(workflow.id).to.equal(expectedWorkflows[index].id);
                            expect(workflow.dataApprovalLevels).to.deep.equal(expectedWorkflows[index].dataApprovalLevels);
                        });

                    done();
                });
        });
    });

    describe('getApprovalLevelById()', function () {
        var workflow;

        describe('correct behavior', function () {
            beforeEach(function (done) {
                $httpBackend.flush();

                workflowService.currentWorkflow$
                    .subscribe(function (currentWorkflow) {
                        workflow = currentWorkflow;
                        done();
                    });

                workflowService.setCurrentWorkflow(workflowResponse.dataApprovalWorkflows[0]);
            });

            it('should be a function', function () {
                expect(workflow.getApprovalLevelById).to.be.a('function');
            });

            it('should return the correct level for a workflow', function () {
                expect(workflow.getApprovalLevelById('rImhZfF6RKy')).to.deep.equal({"id": "rImhZfF6RKy", "level": 3, "displayName": "Inter-Agency"});
            });
        });

        it('should throw an error when the workflow has no approval levels', function (done) {
            workflowService.currentWorkflow$
                .subscribe(function (workflow) {
                    expect(function () {
                        workflow.getApprovalLevelById('rrUYETtwcgu');
                    }).to.throw('This workflow does not have any approval levels');
                    done();
                });

            workflowService.setCurrentWorkflow({id: 'rrUYETtwcgu'});
            $httpBackend.flush();
        });
    });

    describe('getApprovalLevelBeforeLevel()', function () {
        var workflow;

        describe('correct behavior', function () {
            beforeEach(function (done) {
                $httpBackend.flush();

                workflowService.currentWorkflow$
                    .subscribe(function (currentWorkflow) {
                        workflow = currentWorkflow;
                        done();
                    });

                workflowService.setCurrentWorkflow(workflowResponse.dataApprovalWorkflows[0]);
            });

            it('should be a function', function () {
                expect(workflow.getApprovalLevelBeforeLevel).to.be.a('function');
            });

            it('should return the correct level before the provided level', function () {
                expect(workflow.getApprovalLevelBeforeLevel('rImhZfF6RKy')).to.deep.equal({"id": "aypLtfWShE5", "level": 1, "displayName": "Global"});
            });

            it('should throw an error when there is no higher level', function () {
                expect(function () {
                    workflow.getApprovalLevelBeforeLevel('aypLtfWShE5');
                }).to.throw('There is no level above this level');
            });
        });

        it('should throw an error when the workflow has no approval levels', function (done) {
            workflowService.currentWorkflow$
                .subscribe(function (workflow) {
                    expect(function () {
                        workflow.getApprovalLevelBeforeLevel('rrUYETtwcgu');
                    }).to.throw('This workflow does not have any approval levels');
                    done();
                });

            workflowService.setCurrentWorkflow({id: 'rrUYETtwcgu'});
            $httpBackend.flush();
        });
    });

    describe('getApprovalLevelBelowLevel()', function () {
        var workflow;

        describe('correct behavior', function () {
            beforeEach(function (done) {
                $httpBackend.flush();

                workflowService.currentWorkflow$
                    .subscribe(function (currentWorkflow) {
                        workflow = currentWorkflow;
                        done();
                    });

                workflowService.setCurrentWorkflow(workflowResponse.dataApprovalWorkflows[0]);
            });

            it('should be a function', function () {
                expect(workflow.getApprovalLevelBelowLevel).to.be.a('function');
            });

            it('should return the correct level before the provided level', function () {
                expect(workflow.getApprovalLevelBelowLevel('rImhZfF6RKy')).to.deep.equal({"id": "jtLSx6a19Ps", "level": 4, "displayName": "Funding Agency"});
            });

            it('should throw an error when there is no higher level', function () {
                expect(function () {
                    workflow.getApprovalLevelBelowLevel('fsIo8vU2VFZ');
                }).to.throw('There is no level below this level');
            });
        });

        it('should throw an error when the workflow has no approval levels', function (done) {
            workflowService.currentWorkflow$
                .subscribe(function (workflow) {
                    expect(function () {
                        workflow.getApprovalLevelBelowLevel('rrUYETtwcgu');
                    }).to.throw('This workflow does not have any approval levels');
                    done();
                });

            workflowService.setCurrentWorkflow({id: 'rrUYETtwcgu'});
            $httpBackend.flush();
        });
    });
});
