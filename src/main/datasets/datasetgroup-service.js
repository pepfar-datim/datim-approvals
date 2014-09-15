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
                fields: 'name,shortName,id,periodType',
                filter: filters,
                paging: 'false'
            }).then(function (dataSets) {
                filteredGroup.dataSets = dataSets.getDataOnly();
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
            }
        }
    }
}

angular.module('PEPFAR.approvals').service('dataSetGroupService', dataSetGroupService);
angular.module('PEPFAR.approvals').factory('dataSetGroupFactory', dataSetGroupFactory);
