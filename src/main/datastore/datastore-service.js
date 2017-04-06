function dataStore(Restangular, errorHandler) {
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
                return response.plain();
            })
            .catch(function () {
                errorHandler.error('Could not load the period settings from the dataStore.', true);
            });

        return periodSettings;
    }

    return {
        getPeriodSettings: getPeriodSettings
    };
}

angular.module('PEPFAR.approvals').factory('dataStore', dataStore);
