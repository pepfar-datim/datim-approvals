function datasetViewDirective() {
    //http://localhost:8080/dhis/dhis-web-reporting/generateDataSetReport.action
    //?ds=cIGsv0OBVi8&pe=201409&ou=HfVjCurKxh2&dimension=BOyWrF33hiR%3ABnjwQmbgK1b&cog=BnjwQmbgK1b

    function loadDataSetReport(details, element) {
        var dataSetReportUrl = '../dhis-web-reporting/generateDataSetReport.action';
        var params = {
            ds: 'cIGsv0OBVi8',
            pe: '201409',
            ou: 'HfVjCurKxh2',
            dimension: 'BOyWrF33hiR:BnjwQmbgK1b',
            cog: 'BnjwQmbgK1b'
        };
        var urlParams = _.map(params, function (value, key) {
            return [key, value].join('=');
        }).join('&');

        var reportUrl = [dataSetReportUrl, urlParams].join('?');

        console.log(reportUrl);

        jQuery.get(reportUrl).success(function (data) {
            var reportElement = jQuery(data);

            reportElement = reportElement.remove('#shareForm');

            element.append(reportElement);
        });
    }


    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'datasets/datasetsview.html',
        scope: {
            details: '='
        },
        link: function (scope, element) {
            scope.$watch(function () {
                return scope.details;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    scope.checkValues();
                }
            }, true);

            scope.checkValues = function () {
                var details = scope.details;

                if (details.orgUnit &&
                    details.period &&
                    details.dataSets &&
                    details.cog &&
                    details.cogs) {
                    loadDataSetReport(scope.details, element);
                }
            };
        }
    };
}

angular.module('PEPFAR.approvals').directive('datasetView', datasetViewDirective);
