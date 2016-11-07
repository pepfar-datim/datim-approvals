/* global jQuery */
function datasetViewDirective(AppManifest, $translate, workflowService) {
    var dataSetReportWrapSelector = '.dataset-report-wrap';

    /**
     * Creates the events as they exist in data entry so they can be subscribed to.
     * This is needed so that subscriptions to these events in custom forms do not cause the
     * form to behave differently between reports and approvals.
     */
    (function createDataEntryEvents() {
        window.dhis2 = window.dhis2 || {};
        dhis2.de = dhis2.de || {};

        dhis2.de.event = {
            // Fired
            formLoaded        : "dhis2.de.event.formLoaded",
            dataValuesLoaded  : "dhis2.de.event.dataValuesLoaded",
            formReady         : "dhis2.de.event.formReady",
            // Never fired in approvals (but can be subscribed to in custom form)
            dataValueSaved    : "dhis2.de.event.dataValueSaved",
            completed         : "dhis2.de.event.completed",
            uncompleted       : "dhis2.de.event.uncompleted",
            validationSucces  : "dhis2.de.event.validationSuccess",
            validationError   : "dhis2.de.event.validationError"
        };
    }());

    /**
     * Fire a subset of the data entry events, just like in Data Set Report.
     */
    function fireDataEntryEvents() {
        var $document = $(document);

        $document.trigger(dhis2.de.event.formLoaded);
        $document.trigger(dhis2.de.event.dataValuesLoaded);
        $document.trigger(dhis2.de.event.formReady);
    }

    function loadDataSetReport(details, ds, element, scope) {
        var dataSetReportUrl = AppManifest.activities.dhis.href + '/dhis-web-reporting/generateDataSetReport.action';
        var params = {
            ds: ds.id,
            pe: details.period,
            ou: details.orgUnit
        };

        //Dimensions should be based on the mechanisms that are assigned
        //The category should be based on the result of the selection that is done
        //Leave off the dimension if the category is `default`
        //If the dataset has a category(or multiple, in this case one) get the currentSelection items that have that category
        //If the dataset has the category default don't add the dimension
        var datasetCOCNames = _.pluck(ds.categoryCombo.categoryOptionCombos, 'name');
        var hasDefaultCOC = _.contains(datasetCOCNames, '(default)');
        var datasetCOCIds;

        var COsForReport;
        if (!hasDefaultCOC) {
            datasetCOCIds = _.pluck(ds.categoryCombo.categoryOptionCombos, 'id');
            //Filter out the ones that have default as COG
            COsForReport = _.filter(details.currentSelection, function (mechanism) {
                if (_.contains(datasetCOCIds, mechanism.catComboId)) {
                    return true;
                }
                return false;
            });
            // TODO: This picks the first category and assumes that all the other COs have the same category
            // which might not be true
            params.dimension = COsForReport[0].category + ':' + _.pluck(COsForReport, 'id').join(';');
        }

        jQuery.post(dataSetReportUrl, params).success(function (data) {
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
            //reportElement.find('div.cde p:last-child').remove();

            //Remove the share form
            reportElement.find('div#shareForm').remove();

            //Remove the comment boxes for EA forms
            reportElement.find('.ea-comment').parentsUntil('div').remove();

            //Remove the background and color inline styles and add a class to the items that had a background
            //reportElement.find('[style*="background"]').css('background', '').addClass('dataset-view-highlight');
            //reportElement.find('[style*="color"]').css('color', '');

            scope.reportView[ds.id].content = reportElement;
            scope.updateCurrentViewIfNeeded(ds);
        });
    }

    //TODO: Take this into it's own directive (could be usable for reuse
    function addBackToTop(translation) {
        var backToTop = jQuery('<div class="back-to-top"><i class="fa fa-angle-double-up"></i><span>&nbsp;' + translation + '</span></div>');

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
            scope.reportView = {
                actions: {
                    approve: {count: 0},
                    unapprove: {count: 0},
                    accept: {count: 0},
                    unaccept: {count: 0}
                }
            };

            scope.$on('DATAVIEW.update', function (event, details) {
                scope.details = details;
                scope.checkValues();
            });

            var currentWorkflow$disposable;
            scope.checkValues = function () {
                var details = scope.details;

                // Clean up old subscription
                if (currentWorkflow$disposable && currentWorkflow$disposable.dispose) {
                    currentWorkflow$disposable.dispose();
                }

                workflowService.currentWorkflow$
                    .subscribe(function (workflow) {
                            if (details.orgUnit &&
                                details.period &&
                                details.dataSets &&
                                details.currentSelection &&
                                details.actions) {

                                scope.loadReports(workflow);

                        }
                    });
            };

            scope.hasUnreadableMechanisms = 0;
            scope.loadReports = function (workflow) {
                var details = scope.details;

                // Reset the report section to empty
                jQuery(dataSetReportWrapSelector).html('');

                // Reviewing SIMS workflow items this can only be done in the Genie. Therefore display a message for the
                // data to be reviewed in the genie.
                if (workflow.name === 'SIMS') {
                    // SIMS Reports / Redirect to Genie
                    var simsReviewHtml = angular.element(
                        '<div class="report-loading-message">' +
                        'Please review the SIMS data in the Genie at <a href="https://www.datim.org/api/apps/Genie_v1.1.7/index.html?v=1.0.0#/" target="_blank">https://www.datim.org/api/apps/Genie_v1.1.7/index.html?v=1.0.0#/</a></span>' +
                        '</div>');

                    // Set the amount of loaded items to one to hide the loading message.
                    scope.details.loaded += 1;

                    // Append the created message to the reports element
                    element.find(dataSetReportWrapSelector).append(simsReviewHtml);
                    return;
                }

                scope.details.dataSetsFilteredByMechanisms = _.filter(details.dataSets, function (dataSet) {
                    var result = false;
                    var categoryOptionComboIds;

                    if (!dataSet.categoryCombo || !angular.isArray(dataSet.categoryCombo.categoryOptionCombos)) {
                        return false;
                    }

                    categoryOptionComboIds = _.pluck(dataSet.categoryCombo.categoryOptionCombos, 'id');

                    _.each(scope.details.currentSelection, function (mechanism) {
                        if (mechanism.mayReadData === false) {
                            scope.hasUnreadableMechanisms += 1;
                        }

                        if (_.contains(categoryOptionComboIds, mechanism.catComboId)) {
                            result = true;
                        }
                    });
                    return result;
                });

                $translate('Go to top').then(function (translation) {
                    addBackToTop(translation);
                });

                scope.details.loaded = 0;
                scope.reportView.currentDataSet = scope.details.dataSetsFilteredByMechanisms[0];
                scope.details.dataSetsFilteredByMechanisms.forEach(function (item) {
                    loadDataSetReport(scope.details, item, element.find(dataSetReportWrapSelector), scope);
                    scope.reportView[item.id] = {};
                    scope.reportView[item.id].content = angular.element(
                        '<div class="report-loading-message">' +
                        '<i class="fa fa-circle-o-notch fa-spin"></i> Loading report: <span class="report-name">' + item.name + '</span>' +
                        '</div>');
                });

                // When reports are available add the first element to the screen
                if (scope.reportView &&
                    angular.isArray(scope.details.dataSetsFilteredByMechanisms) &&
                    scope.details.dataSetsFilteredByMechanisms.length > 0 &&
                    scope.reportView[scope.details.dataSetsFilteredByMechanisms[0]]) {
                    element.find(dataSetReportWrapSelector).append(scope.reportView[scope.details.dataSetsFilteredByMechanisms[0].id].content);
                }
            };

            scope.onChange = function ($event, $item) {
                try {
                    if (scope.reportView[$item.id].content) {
                        if (element.find(dataSetReportWrapSelector).children().length > 0) {
                            element.find(dataSetReportWrapSelector).children().replaceWith(scope.reportView[$item.id].content);
                        } else {
                            element.find(dataSetReportWrapSelector).append(scope.reportView[$item.id].content);
                        }

                        fireDataEntryEvents();
                    }
                } catch (e) {
                    if (window.console && window.console.error) {
                        window.console.error(e);
                    }
                }
            };

            scope.updateCurrentViewIfNeeded = function (dataSet) {
                if (scope.reportView.currentDataSet &&
                    scope.reportView.currentDataSet.id === dataSet.id) {
                    scope.onChange({}, dataSet);
                }
            };
        }
    };
}

angular.module('PEPFAR.approvals').directive('datasetView', datasetViewDirective);
