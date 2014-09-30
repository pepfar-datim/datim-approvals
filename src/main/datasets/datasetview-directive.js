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


    function loadDataSetReport(details, ds, element, scope) {
        var dataSetReportUrl = '../dhis-web-reporting/generateDataSetReport.action';
        var params = {
            ds: ds.id,
            pe: details.period,
            ou: details.orgUnit,
            dimension: details.currentSelection[0].category + ':' + _.pluck(details.currentSelection, 'id').join(';'),
//            cog: 'BnjwQmbgK1b'
        };
        var urlParams = _.map(params, function (value, key) {
            return [key, value].join('=');
        }).join('&');

        var reportUrl = [dataSetReportUrl, urlParams].join('?');

        jQuery.get(reportUrl).success(function (data) {
            scope.$apply(function () {
                scope.details.loaded += 1;
            });
            var reportElement = jQuery('<div class="dataset-view"></div>').append(data);

            var h3Elements = reportElement.find('h3');
            var toRemoveElements = [];

            h3Elements.first().html(ds.name)
                .attr('id', ds.id);

            if (h3Elements.length > 1) {
                h3Elements.each(function (index, element) {
                    if (index > 0) {
                        toRemoveElements.push(element);
                    }
                });
            }

            _.each(toRemoveElements, function (element) {
                jQuery(element).remove();
            });

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

    function addLinksToReports(dataSets, element) {
        var linkElement = jQuery('<div class="data-set-report-links"><ul></ul></div>');
        var ulElement = linkElement.children('ul');

        _.each(dataSets, function (dataSet) {
            var linkElement = jQuery('<li><i class="fa fa-file"></i> ' + dataSet.name + '</li>');

            linkElement.on('click', function (event) {
                var element = jQuery('#' + dataSet.id);
                var position;

                if(element.length <= 0) { return; }
                position = element.position();

                window.scrollTo(0, position.top);
            });

            ulElement.append(linkElement);
        });

        element.prepend(linkElement);
    }

    //TODO: Take this into it's own directive (could be usable for reuse
    function addBackToTop() {
        var backToTop = jQuery('<div class="back-to-top"><i class="fa fa-angle-double-up"></i> Back to top</div>');

        backToTop.on('click', function () {
            window.scrollTo(0, 0);
        });

        jQuery('.view-wrap').append(backToTop);
    }


    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'datasets/datasetsview.html',
        scope: {},
        link: function (scope, element) {
            scope.$on('DATAVIEW.update', function (event, details) {
                scope.details = details;
                scope.checkValues();
            });

            scope.checkValues = function () {
                var details = scope.details;

                if (details.orgUnit &&
                    details.period &&
                    details.dataSets &&
                    details.currentSelection &&
                    details.actions) {

                    //Move this out
                    jQuery('.dataset-view-wrap').html('');

                    addBackToTop();

                    addLinksToReports(details.dataSets, element);

                    scope.details.loaded = 0;
                    details.dataSets.forEach(function (item) {
                        loadDataSetReport(scope.details, item, element, scope);
                    });
                }
            };
        }
    };
}

angular.module('PEPFAR.approvals').directive('datasetView', datasetViewDirective);
