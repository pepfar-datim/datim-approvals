function dataSetGroupService($rootScope, $q, periodService, Restangular, workflowService, rx, errorHandler) {
    var dataSetGroups$;
    var currentDataSetGroup$ = new rx.ReplaySubject(1);

    dataSetGroups$ = workflowService.workflows$
        .flatMap(function (workflows) {
            return rx.Observable
                .fromArray(workflows)
                .flatMap(function (workflow) {
                    return rx.Observable.combineLatest(
                        rx.Observable.just(workflow),
                        periodService.getPeriodsForWorkflow(workflow),
                        function (workflow, periodsForWorkflow) {
                            return {
                                workflow: workflow,
                                periods: periodsForWorkflow
                            };
                        }
                    );
                })
                .safeApply($rootScope);
        })
        // Only use workflows that actually have periods
        .filter(function (workflowAndPeriods) {
            return workflowAndPeriods.periods.length && workflowAndPeriods.workflow;
        })
        // Combine the workflows back into an array
        .reduce(function (acc, value) {
            return acc.concat(value.workflow);
        }, [])
        .tap(function (workflows) {
            // Show an error when there are no available workflows
            if (workflows.length === 0) {
                errorHandler.error('Could not not find any workflows (Data Streams)');
            }
        });

    return {
        setCurrentDataSetGroup: setCurrentDataSetGroup,
        dataSetGroups$: dataSetGroups$,
        currentDataSetGroup$: currentDataSetGroup$,
    };

    function setCurrentDataSetGroup(workflow) {
        var dataSetGroup = dataSetGroupFactory(workflow.dataSets);

        currentDataSetGroup$.onNext(dataSetGroup);
    }
}

function dataSetGroupFactory(dataSets) {
    return {
        get: function () {
            return dataSets;
        },
        getIds: function () {
            return _.map(dataSets, 'id');
        },
        getPeriodTypes: function () {
            return _.uniq(_.map(dataSets, 'periodType'));
        },
        getCategoryIds: function () {
            var categoriesFromCategoryCombos;

            categoriesFromCategoryCombos = _.map(_.map(dataSets, 'categoryCombo'), 'categories');
            categoriesFromCategoryCombos = _.flatten(categoriesFromCategoryCombos);
            categoriesFromCategoryCombos = _.map(categoriesFromCategoryCombos, 'id');

            return _.uniq(categoriesFromCategoryCombos);
        }
    };
}

angular.module('PEPFAR.approvals').factory('dataSetGroupService', dataSetGroupService);
