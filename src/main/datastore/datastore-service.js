function dataStore(Restangular) {
    var periodSettings;

    function getPeriodSettings() {
        if (periodSettings) {
            return periodSettings;
        }

        periodSettings = Restangular
            .all('dataStore')
            .all('approvals')
            .get('periodSettings')
            .then(function (response) {
                return response.plain().getDataOnly();
            });

        return periodSettings;
    }

    return {
        getPeriodSettings: getPeriodSettings
    };
}

angular.module('PEPFAR.approvals').factory('dataStore', dataStore);
