function dataSetGroupService($q, periodService, Restangular, workflowService, errorHandler, $log) {
    var service = this;
    var dataSetGroups = {};
    var dataSetGroupNames = [];

    this.getGroups = function () {
        return dataSetGroups;
    };

    this.filterDataSetsForUser = function (workflows) {
        function onlyWorkflowsWithDataSets(workflow) {
            return Array.isArray(workflow.dataSets) && workflow.dataSets.length > 0;
        }

        function toObjectByName(acc, workflow) {
            acc[workflow.name] = workflow;

            return acc;
        }

        dataSetGroups = workflows
            .filter(onlyWorkflowsWithDataSets)
            .reduce(toObjectByName, {});

        dataSetGroupNames = _.chain(dataSetGroups)
            .map(function (dataSetGroup, key) {
                return key;
            })
            .value()
            .sort();

        if (dataSetGroups && dataSetGroupNames[0] && dataSetGroups[dataSetGroupNames[0]]) {
            periodService.filterPeriodTypes([dataSetGroups[dataSetGroupNames[0]].periodType]);
        } else {
            errorHandler.warning('No dataset groups were found that your account can access. This could be the result of your account not having access to these datasets.', true);
        }
    };

    this.getDataSetGroupNames = function () {
        return dataSetGroupNames;
    };

    this.getDataSetsForGroup = function (dataSetGroupName) {
        if (dataSetGroups[dataSetGroupName]) {
            return dataSetGroups[dataSetGroupName].dataSets;
        }
    };

    function pickId(value) {
        return value.id;
    }

    function getWorkFlowIds(dataApprovalWorkflows) {
        return _.map(dataApprovalWorkflows, pickId);
    }

    function loadCategoryOptionCombosForDataSets(data) {
        var dataSets = data[1];

        var categoryCombosForDataSets = _.map(dataSets, function (dataSet) {
            return Restangular.all('categoryCombos').withHttpConfig({cache: true}).get(dataSet.categoryCombo.id, {fields: 'id,categoryOptionCombos[id,name]'})
                .then(function (categoryCombo) {
                    dataSet.categoryCombo.categoryOptionCombos = categoryCombo.categoryOptionCombos;
                });
        });

        return $q.all(categoryCombosForDataSets)
            .then(function () {
                return data;
            });
    }

    function loadDataSetsForWorkflows(dataApprovalWorkflows) {
        return Restangular
            .all('dataSets')
            .getList({
                fields: 'name,shortName,id,periodType,workflow[id,periodType],categoryCombo[id,name,categories[id]]',
                filter: 'workflow.id:in:[' + getWorkFlowIds(dataApprovalWorkflows).join(',') + ']',
                paging: false
            })
            .then(function (dataSets) {
                return [dataApprovalWorkflows, dataSets];
            })
            .then(loadCategoryOptionCombosForDataSets);
    }

    function addDataSetsToWorkflow(dataSetsForWorkflow, workflow) {
        workflow.dataSets = dataSetsForWorkflow[workflow.id] || [];

        return workflow;
    }

    function matchDataSetsToWorkflows(data) {
        var dataApprovalWorkflows = data[0];
        var dataSets = data[1];

        var dataSetsForWorkflow = _.groupBy(dataSets, function (ds) {return ds.workflow.id;});

        return dataApprovalWorkflows
            .map(addDataSetsToWorkflow.bind(null, dataSetsForWorkflow));
    }

    function setWorkflowsOntoService(workflows) {
        // Workflows including dataSets that belong to those workflows
        if (!Array.isArray(workflows)) {
            return $q.reject('Could not properly load the Workflows from the api.');
        }
        service.filterDataSetsForUser(workflows);
    }

    workflowService.workflows$
        .subscribe(
            function (workflows) {
                loadDataSetsForWorkflows(workflows)
                    .then(matchDataSetsToWorkflows)
                    .then(setWorkflowsOntoService);
            },
            function (error) {
                errorHandler.error(error.message);
            }
        );
}

function dataSetGroupFactory() {
    return function (dataSets) {
        return {
            get: function () {
                return dataSets;
            },
            getIds: function () {
                return _.pluck(dataSets, 'id');
            },
            getPeriodTypes: function () {
                return _.uniq(_.pluck(dataSets, 'periodType'));
            },
            getCategoryIds: function () {
                var categoriesFromCategoryCombos;

                categoriesFromCategoryCombos = _.pluck(_.pluck(dataSets, 'categoryCombo'), 'categories');
                categoriesFromCategoryCombos = _.flatten(categoriesFromCategoryCombos);
                categoriesFromCategoryCombos = _.pluck(categoriesFromCategoryCombos, 'id');

                return _.uniq(categoriesFromCategoryCombos);
            }
        };
    };
}

angular.module('PEPFAR.approvals').service('dataSetGroupService', dataSetGroupService);
angular.module('PEPFAR.approvals').factory('dataSetGroupFactory', dataSetGroupFactory);
