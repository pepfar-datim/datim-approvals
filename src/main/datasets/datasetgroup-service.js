function dataSetGroupService(d2Api, $q) {
    var service = this;
    var dataSetGroups = {};

    this.getGroups = function () {
        return dataSetGroups;
    };

    this.filterDataSetsForUser = function (resultDataSetGroups) {
        function getDataSetData(dataSetId) {
            var deferred = $q.defer();
            d2Api.dataSets.get(dataSetId).then(function (dataSet) {
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

            $q.all(promises).then(function (dataSets) {
                filteredGroup.dataSets = _.filter(dataSets, function (dataSet) {
                    if (dataSet) {
                        return true;
                    }
                    return false;
                });
                if (filteredGroup.dataSets.length > 0) {
                    dataSetGroups[filteredGroup.name] = filteredGroup;
                }
            });
        });
    };

    this.getDataSetGroupNames = function () {
        return _.map(dataSetGroups, function (dataSetGroup, key) {
            return key;
        });
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
