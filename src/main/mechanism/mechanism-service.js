function mechanismService(d2Api, $log, $q) {
    var period;
    var categories = [];
    var deferred = $q.defer();

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

    Object.defineProperty(this, 'categories', {
        set: function (value) {
            if (!angular.isArray(value)) {
                $log.error('Mechanism Service: Period should be a string');
                return;
            }
            categories = value;
        },
        get: function () {
            return categories;
        }
    });

    this.getData = function () {
        var params = {
            paging: false,
            pe: period,
            filter: _.map(categories, function (category) {
                return 'id:eq:' + category;
            }),
            fields: 'id,name,categoryOptions[id,name,organisationUnits,groups[id,name,categoryOptionGroupSet[id]]'
        };

        if (this.areParamsCorrect(params)) {
            d2Api.getEndPoint('categories').getList(params).then(function (data) {
                deferred.resolve(data.getDataOnly());
            });
        } else {
            deferred.reject('Not all required params are set');
        }

        return deferred.promise;
    };

    this.areParamsCorrect = function (params) {
        if (!params.pe || (params.pe.length <= 0)) {
            $log.error('Mechanism Service: Period should set when trying to request mechanisms');
            return false;
        }
        if (params.filter.length <= 0) {
            $log.error('Mechanism Service: Categories should set when trying to request mechanisms');
            return false;
        }
        return true;
    };

    d2Api.addEndPoint('categories');
}

angular.module('PEPFAR.approvals').service('mechanismService', mechanismService);
