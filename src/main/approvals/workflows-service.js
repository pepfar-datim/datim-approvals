function workflowService(rx, Restangular, $q) {
    var currentWorkflow$ = new rx.ReplaySubject(1);
    var workflows$ = requestWorkflowsFromApi();

    function getApprovalLevelById(uid) {
        if (!this || !Array.isArray(this.dataApprovalLevels)) {
            throw new Error('This workflow does not have any approval levels');
        }

        return _.find(this.dataApprovalLevels, function (dataApprovalLevel) {
            return dataApprovalLevel.id === uid;
        });
    }

    // TODO: Rename to a better fitting name that reflects `AboveLevel`
    function getApprovalLevelBeforeLevel(uid) {
        if (!this || !Array.isArray(this.dataApprovalLevels)) {
            throw new Error('This workflow does not have any approval levels');
        }

        var levelsOrderedByLevelNr = _.sortBy(this.dataApprovalLevels, 'level');

        var indexOfTheLevelToFind = _.findIndex(levelsOrderedByLevelNr, function (dataApprovalLevel) {
            return dataApprovalLevel.id === uid;
        });

        if ((indexOfTheLevelToFind - 1) >= 0) {
            return levelsOrderedByLevelNr[indexOfTheLevelToFind - 1];
        }

        throw new Error('There is no level above this level');
    }

    function getApprovalLevelBelowLevel(uid) {
        if (!this || !Array.isArray(this.dataApprovalLevels)) {
            throw new Error('This workflow does not have any approval levels');
        }

        var levelsOrderedByLevelNr = _.sortBy(this.dataApprovalLevels, 'level');

        var indexOfTheLevelToFind = _.findIndex(levelsOrderedByLevelNr, function (dataApprovalLevel) {
            return dataApprovalLevel.id === uid;
        });

        if ((indexOfTheLevelToFind + 1) < levelsOrderedByLevelNr.length) {
            return levelsOrderedByLevelNr[indexOfTheLevelToFind + 1];
        }

        throw new Error('There is no level below this level');
    }

    function setCurrentWorkflow(workflowToFind) {
        workflows$
            .flatMap(rx.helpers.identity)
            .filter(function (workflow) {
                return workflow && workflowToFind && (workflow.id === workflowToFind.id);
            })
            .take(1)
            .map(function (workflow) {
                // TODO: Rewrite helper methods to functional helpers
                // Add helper methods
                workflow.getApprovalLevelById = getApprovalLevelById;
                workflow.getApprovalLevelBeforeLevel = getApprovalLevelBeforeLevel;
                workflow.getApprovalLevelBelowLevel = getApprovalLevelBelowLevel;

                return workflow;
            })
            .subscribe(function (workflowWithHelperMethods) {
                currentWorkflow$.onNext(workflowWithHelperMethods);
            });
    }

    function setDefaultsWhenMissing(workflow) {
        if (!workflow.dataSets) {
            workflow.dataSets = [];
        }
                    
        return workflow;
    }

    function requestWorkflowsFromApi() {
        var workflowRequest = Restangular.all('dataApprovalWorkflows')
            .withHttpConfig({cache: true})
            .getList({
                fields: 'id,name,displayName,periodType,dataApprovalLevels[displayName,id,level],dataSets[name,shortName,id,periodType,workflow[id,periodType],categoryCombo[id,name,categories[id]]]',
                paging: false
            })
            .then(function (workflows) {
                return _.map(workflows, setDefaultsWhenMissing);
            })
            .then(function (workflows) {
                return $q.all(workflows.map(function (workflow) {
                    if (workflow && workflow.dataSets) {
                        return loadCategoryOptionCombosForDataSets(workflow.dataSets)
                            .then(function () {
                                return workflow;
                            });
                    } else {
                        return $q.when(workflow);
                    }
                }));
            })
            .catch(function (response) {
                return $q.reject(new Error(response.data));
            });

        var workflow$ = rx.Observable
            .fromPromise(workflowRequest)
            .publishLast();

        workflow$.connect();

        return workflow$;
    }

    function loadCategoryOptionCombosForDataSets(dataSets) {
        var categoryCombosForDataSets = _.map(dataSets, function (dataSet) {
            return Restangular
                .all('categoryCombos')
                .withHttpConfig({cache: true})
                .get(dataSet.categoryCombo.id, {fields: 'id,categoryOptionCombos[id,name]'})
                .then(function (categoryCombo) {
                    dataSet.categoryCombo.categoryOptionCombos = categoryCombo.categoryOptionCombos;
                });
        });

        return $q.all(categoryCombosForDataSets)
            .then(function () {
                return dataSets;
            });
    }

    return {
        currentWorkflow$: currentWorkflow$,
        workflows$: workflows$,
        setCurrentWorkflow: setCurrentWorkflow
    };
}

angular.module('PEPFAR.approvals').factory('workflowService', workflowService);
