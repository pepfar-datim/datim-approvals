function mechanismService(d2Api, $log) {
    var period;
    var datasets = [];

    Object.defineProperty(this, 'period', {
        set: function (value) {
            if (!angular.isString(value)) {
                $log.error('Mechanism Service: Period should be a string');
                return;
            }
            period = value;
        },
        get: function () {
            return period;
        }
    });

    Object.defineProperty(this, 'datasets', {
        set: function (value) {
            if (!angular.isArray(value)) {
                $log.error('Mechanism Service: Period should be a string');
                return;
            }
            datasets = value;
        },
        get: function () {
            return datasets;
        }
    });

    this.getData = function () {
        var params = {
            pe: period,
            ds: datasets
        };

        return d2Api.getEndPoint('../dhis-web-pepfar-approvals/mechanisms.json').getList(params).then(function (data) {
            return data.getDataOnly();
        });
    };

    d2Api.addEndPoint('../dhis-web-pepfar-approvals/mechanisms.json');
}

angular.module('PEPFAR.approvals').service('mechanismService', mechanismService);
