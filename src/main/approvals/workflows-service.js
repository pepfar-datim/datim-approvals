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
            .subscribe(function (workflow) {
                workflow.getApprovalLevelById = getApprovalLevelById;
                workflow.getApprovalLevelBeforeLevel = getApprovalLevelBeforeLevel;
                workflow.getApprovalLevelBelowLevel = getApprovalLevelBelowLevel;
                currentWorkflow$.onNext(workflow);
            });
    }

    function requestWorkflowsFromApi() {
        var workflowRequest = Restangular.all('dataApprovalWorkflows')
            .withHttpConfig({cache: true})
            .getList({
                fields: 'id,name,displayName,dataApprovalLevels[displayName,id,level]&paging=false',
                paging: false
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

    return {
        currentWorkflow$: currentWorkflow$,
        workflows$: workflows$,
        setCurrentWorkflow: setCurrentWorkflow
    };
}

angular.module('PEPFAR.approvals').factory('workflowService', workflowService);
