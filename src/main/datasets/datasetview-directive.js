function datasetViewDirective() {
    //http://localhost:8080/dhis/dhis-web-reporting/generateDataSetReport.action
    //?ds=cIGsv0OBVi8&pe=201409&ou=HfVjCurKxh2&dimension=BOyWrF33hiR%3ABnjwQmbgK1b&cog=BnjwQmbgK1b

    //http://localhost:8080/dhis/dhis-web-reporting/generateDataSetReport.action
    //?ds=Zqg76KonUx1
    // &
    // pe=2014&ou=HfVjCurKxh2
    // &
    // selectedUnitOnly=false
    // &
    // dimension=SH885jaRe0o:LPeJEUjotaB        - Funding Mechanism C : 1000 - Apple USAID Mechanism CO
    // &
    // dimension=BOyWrF33hiR:CSPJnuxBAnz        - Implementing Partner COG : University of Washington CO
    // &
    // dimension=bw8KHXzxd9i:NLV6dy7BE2O        - Funding Agency COG : USAID CO


    function loadDataSetReport(details, element) {
        var dataSetReportUrl = '../dhis-web-reporting/generateDataSetReport.action';
        var params = {
            ds: 'cIGsv0OBVi8',
            pe: details.period,
            ou: 'HfVjCurKxh2',
            dimension: 'BOyWrF33hiR:BnjwQmbgK1b',
            cog: 'BnjwQmbgK1b'
        };
        var urlParams = _.map(params, function (value, key) {
            return [key, value].join('=');
        }).join('&');

        var reportUrl = [dataSetReportUrl, urlParams].join('?');

        jQuery.get(reportUrl).success(function (data) {
            var reportElement = jQuery('<div class="dataset-view"></div>').append(data);

            //Remove the hidden input fields
            reportElement.find('input[type="hidden"]').remove();

            //Remove the userinfo field
            reportElement.find('div#userInfo').remove();

            //Remove empty p element
            reportElement.find('div.cde p:last-child').remove();

            //Remove the share form
            reportElement.find('div#shareForm').remove();

            //Remove the background and color inline styles and add a class to the items that had a background
            reportElement.find('[style*="background"]').css('background', '').addClass('dataset-view-highlight');
            reportElement.find('[style*="color"]').css('color', '');

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
