/**
 * The following is period code taken from the core to give me an idea
 * of how to implement this.
 *
 * We should be able to remove this soon.
 */

//var periods = dhis2.period.generator.generateReversedPeriods('Monthly', 0);
//periods = dhis2.period.generator.filterFuturePeriodsExceptCurrent( periods );

//// calendar
//(function() {
//    var dhis2PeriodUrl = '../dhis-web-commons/javascripts/dhis2/dhis2.period.js',
//        defaultCalendarId = 'gregorian',
//        calendarIdMap = {'iso8601': defaultCalendarId},
//        calendarId = calendarIdMap[init.systemInfo.calendar] || init.systemInfo.calendar || defaultCalendarId,
//        calendarIds = ['coptic', 'ethiopian', 'islamic', 'julian', 'nepali', 'thai'],
//        calendarScriptUrl,
//        createGenerator;
//
//    // calendar
//    createGenerator = function() {
//        init.calendar = $.calendars.instance(calendarId);
//        init.periodGenerator = new dhis2.period.PeriodGenerator(init.calendar, init.systemInfo.dateFormat);
//    };
//
//    if (Ext.Array.contains(calendarIds, calendarId)) {
//        calendarScriptUrl = '../dhis-web-commons/javascripts/jQuery/calendars/jquery.calendars.' + calendarId + '.min.js';
//
//        Ext.Loader.injectScriptElement(calendarScriptUrl, function() {
//            Ext.Loader.injectScriptElement(dhis2PeriodUrl, createGenerator);
//        });
//    }
//    else {
//        Ext.Loader.injectScriptElement(dhis2PeriodUrl, createGenerator);
//    }
//}());

//var periods = dhis2.period.generator.generateReversedPeriods('Monthly', 0);
//periods = dhis2.period.generator.filterFuturePeriodsExceptCurrent( periods );

//console.log(periods);

function periodService(d2Api) {
    var service = this;

    var currentPeriodType;
    var generatedPeriods;
    var calendarType;
    var dateFormat = 'yyyy-mm-dd';
    var periodTypes = [
        "Daily",
        "Weekly",
        "Monthly",
        "BiMonthly",
        "Quarterly",
        "SixMonthly",
        "SixMonthlyApril",
        "Yearly",
        "FinancialApril",
        "FinancialJuly",
        "FinancialOct"
    ];
    var periodBaseList = periodTypes;

    var calendarTypes = [
        'coptic',
        'ethiopian',
        'islamic',
        'julian',
        'nepali',
        'thai'
    ];

    this.prepareCalendar = function () {
        var calendar = $.calendars.instance(service.getCalendarType());
        dhis2.period.generator = new dhis2.period.PeriodGenerator(calendar, this.getDateFormat());
    }

    this.getDateFormat = function () {
        return dateFormat;
    };

    this.getPeriodTypes = function () {
        return periodTypes;
    };

    this.getCalendarTypes = function () {
        return calendarTypes;
    };

    this.getCalendarType = function () {
        return calendarType;
    };

    this.getPastPeriodsRecentFirst = function () {
        return generatedPeriods;
    };

    this.setCurrentPeriodType = function (periodType) {
    };

    this.setPeriodType = function (periodType) {
        var periods;
        if (_(periodTypes).contains(periodType)) {
            currentPeriodType = periodType;
            periods = dhis2.period.generator.generateReversedPeriods(currentPeriodType, 0);
            generatedPeriods =  dhis2.period.generator.filterFuturePeriodsExceptCurrent(periods);
        }
    }

    this.loadCalendarScript = function (calendarType) {
        jQuery.getScript('../dhis-web-commons/javascripts/jQuery/calendars/jquery.calendars.' + calendarType + '.min.js',
            function () {
                service.prepareCalendar();
            }).error(function () {
                throw new Error('Unable to load ' + calendarType + ' calendar');
            });

    };

    this.filterPeriodTypes = function (dataSetPeriodTypes) {
        var firstPeriodIndex = _(periodBaseList).findLastIndex(function (periodType) {
            return _(dataSetPeriodTypes).contains(periodType);
        });
        periodTypes = _.rest(periodBaseList, firstPeriodIndex);
        return periodTypes;
    };

    d2Api.addEndPoint('system/info', true);
    d2Api.getEndPoint('system/info').get().then(function (info) {
        dateFormat = info.dateFormat;

        if (info.calendar === 'iso8601') {
            calendarType = 'gregorian';
            service.prepareCalendar();
        } else {
            calendarType = info.calendar;

            if (_(calendarTypes).contains(calendarType)) {
                service.loadCalendarScript(calendarType);
            }
        }
    });
}

angular.module('PEPFAR.approvals').service('periodService', periodService);
