function dataSetGroupService(d2Api, $q) {
    var service = this;
    var dataSetGroups = {};
    var dataSetGroupNames = [];

    this.getGroups = function () {
        return dataSetGroups;
    };

    this.filterDataSetsForUser = function (resultDataSetGroups) {
        var dataSetGroupsPromises = [];

        function getDataSetData(dataSetId) {
            var deferred = $q.defer();
            d2Api.dataSets.get(dataSetId, {
                fields: 'name,shortName,id'
            }).then(function (dataSet) {
                deferred.resolve({
                    id: dataSet.id,
                    name: dataSet.name,
                    shortName: dataSet.shortName
                });
            }, function () {
                deferred.resolve();
            });

            return deferred.promise;
        }

        _.forEach(resultDataSetGroups, function (dataSetGroup) {
            var filteredGroup = {};
            var promises = [];

            filteredGroup.name = dataSetGroup.name;
            filteredGroup.dataSets = [];
            _.forEach(dataSetGroup.dataSets, function (dataSetId) {
                promises.push(getDataSetData(dataSetId));
            });

            dataSetGroupsPromises.push($q.all(promises).then(function (dataSets) {
                filteredGroup.dataSets = _.filter(dataSets, function (dataSet) {
                    if (dataSet) {
                        return true;
                    }
                    return false;
                });

               return filteredGroup;
            }));
        });

        $q.all(dataSetGroupsPromises).then(function (datasetGroups) {
            _.each(datasetGroups, function (filteredGroup) {
                if (filteredGroup.dataSets.length > 0) {
                    dataSetGroups[filteredGroup.name] = filteredGroup;
                }

                dataSetGroupNames = _.map(dataSetGroups, function (dataSetGroup, key) {
                    return key;
                });
            });
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

angular.module('PEPFAR.approvals').service('dataSetGroupService', dataSetGroupService);
