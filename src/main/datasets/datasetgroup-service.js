function dataSetGroupService(d2Api, $q, periodService) {
    var service = this;
    var dataSetGroups = {};
    var dataSetGroupNames = [];

    this.getGroups = function () {
        return dataSetGroups;
    };

    this.filterDataSetsForUser = function (resultDataSetGroups) {
        var dataSetGroupsPromises = [];

        _.forEach(resultDataSetGroups, function (dataSetGroup) {
            var filteredGroup = {};

            var filters;

            filteredGroup.name = dataSetGroup.name;
            filteredGroup.dataSets = [];

            filters = _.map(dataSetGroup.dataSets, function (dataSetId) {
                return 'id:eq:' + dataSetId;
            });

            dataSetGroupsPromises.push(d2Api.dataSets.getList({
                fields: 'name,shortName,id,periodType,categoryCombo[id,name,categories[id]]',
                filter: filters,
                paging: 'false'
            }).then(function (dataSets) {
                filteredGroup.dataSets = dataSets.getDataOnly();

                var categoryComboIds = {};

                _.each(filteredGroup.dataSets, function (dataSet) {
                    if (dataSet.categoryCombo) {
                        if (categoryComboIds[dataSet.categoryCombo.id]) {
                            categoryComboIds[dataSet.categoryCombo.id].push(dataSet);
                        } else {
                            categoryComboIds[dataSet.categoryCombo.id] = [dataSet];
                        }
                    }
                });

                    _.each(categoryComboIds, function (dataSets, catCombo) {
                        d2Api.categoryCombos.get(catCombo,
                            {fields: 'id,categoryOptionCombos[id,name]'}).then(function (categoryCombo) {
                                _.each(dataSets, function (dataSet) {
                                    dataSet.categoryCombo.categoryOptionCombos = categoryCombo.categoryOptionCombos;
                                });
                            });
                    });


                return filteredGroup;
            }));
        });

        $q.all(dataSetGroupsPromises).then(function (datasetGroups) {
            var initialDataSets;

            _.forEach(datasetGroups, function (filteredGroup) {
                if (filteredGroup.dataSets.length > 0) {
                    dataSetGroups[filteredGroup.name] = filteredGroup;
                }

                dataSetGroupNames = _.map(dataSetGroups, function (dataSetGroup, key) {
                    return key;
                }).sort();
            });

            //TODO: this code is a bit confusing?
            initialDataSets = dataSetGroupFactory()(dataSetGroups[dataSetGroupNames[0]].dataSets);
            periodService.filterPeriodTypes(initialDataSets.getPeriodTypes());
        });
    };

    this.getDataSetGroupNames = function () {
        return dataSetGroupNames;
    };

    this.getDataSetsForGroup = function (dataSetGroupName) {
        if (dataSetGroups[dataSetGroupName]) {
            return dataSetGroups[dataSetGroupName].dataSets;
        }
    };

    // Configure the api endpoints we use
    d2Api.addEndPoint('systemSettings');
    d2Api.addEndPoint('dataSets');

    //Add combo endpoint for MER Hack
    d2Api.addEndPoint('categoryCombos');

    // Load the dataSetGroups that are available from system settings
    d2Api.systemSettings.get('keyApprovalDataSetGroups').then(function (resultDataSetGroups) {
        service.filterDataSetsForUser(resultDataSetGroups);
    });
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
