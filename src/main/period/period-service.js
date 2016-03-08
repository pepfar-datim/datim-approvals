/* global jQuery, dhis2 */
angular.module('PEPFAR.approvals').factory('periodService', periodService);

//FIXME: the service is not consistent with getters and setters
function periodService(Restangular, rx) {
    var currentPeriodType;
    var currentPeriod;
    var generatedPeriods;
    var calendarType;
    var dateFormat = 'yyyy-mm-dd';
    var periodTypes = [
        'Daily',
        'Weekly',
        'Monthly',
        'BiMonthly',
        'Quarterly',
        'SixMonthly',
        'SixMonthlyApril',
        'Yearly',
        'FinancialApril',
        'FinancialJuly',
        'FinancialOct'
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

    var periodTypes$ = new rx.BehaviorSubject(periodTypes);
    var period$ = new rx.ReplaySubject(1);

    function prepareCalendar() {
        var calendar = jQuery.calendars.instance(getCalendarType());
        dhis2.period.generator = new dhis2.period.PeriodGenerator(calendar, getDateFormat());
    }

    function getDateFormat() {
        return dateFormat;
    }

    function getCalendarType() {
        return calendarType;
    }

    function setPeriodType(periodType) {
        var periods;
        if (_(periodTypes).contains(periodType)) {
            currentPeriodType = periodType;
            periods = dhis2.period.generator.generateReversedPeriods(currentPeriodType, 0);

            //Only show One year ahead and the previous years
            if (/^Yearly|Financial/.test(currentPeriodType)) {
                generatedPeriods = removeFuturePeriodsExceptClosestOne(periods);
                return;
            }

            //Show this years and last years quarters
            if (/^Quarterly$/.test(currentPeriodType)) {
                var futureYear = [];
                var thisYear = dhis2.period.generator.generateReversedPeriods(currentPeriodType, 0);

                var currentQuarter = dhis2.period.generator.filterFuturePeriodsExceptCurrent(thisYear);
                thisYear = thisYear.slice((3 - currentQuarter.length >= 0) ? 3 - currentQuarter.length : 0);

                if (currentQuarter.length === 4) {
                    futureYear = [dhis2.period.generator.generateReversedPeriods(currentPeriodType, 1)[3]];
                }

                var oneYearAgo = dhis2.period.generator.generateReversedPeriods(currentPeriodType, -1);
                var twoYearsAgo = dhis2.period.generator.generateReversedPeriods(currentPeriodType, -2);
                var threeYearsAgo = dhis2.period.generator.generateReversedPeriods(currentPeriodType, -3);

                generatedPeriods = futureYear.concat(thisYear).concat(oneYearAgo).concat(twoYearsAgo).concat(threeYearsAgo);
                return;
            }

            //For other periods like month/day etc. show only the default generated
            generatedPeriods = periods;
        }
    };

    function removeFuturePeriodsExceptClosestOne(periods) {
        return periods.slice(5);
    }

    function loadCalendarScript(calendarType) {
        jQuery.getScript('../dhis-web-commons/javascripts/jQuery/calendars/jquery.calendars.' + calendarType + '.min.js',
            function () {
                prepareCalendar();
            }).error(function () {
                throw new Error('Unable to load ' + calendarType + ' calendar');
            });

    }

    function getPeriodTypesForDataSet(dataSetPeriodTypes) {
        var firstPeriodIndex = _(periodBaseList).findLastIndex(function (periodType) {
            return _(dataSetPeriodTypes).contains(periodType);
        });

        return _.rest(periodBaseList, firstPeriodIndex);
    }

    function setPeriod(newPeriod) {
        currentPeriod = newPeriod;
        period$.onNext(currentPeriod);
    }

    function getPeriodTypes() {
        return periodTypes;
    }

    function filterPeriodTypes(dataSetPeriodTypes) {
        periodTypes = getPeriodTypesForDataSet(dataSetPeriodTypes);

        periodTypes$.onNext(periodTypes);

        return periodTypes;
    }

    function getPastPeriodsRecentFirst() {
        return generatedPeriods;
    }

    var service = {
        setPeriodType: setPeriodType,
        setPeriod: setPeriod,
        getPeriodTypes: getPeriodTypes,
        filterPeriodTypes: filterPeriodTypes,
        getPastPeriodsRecentFirst: getPastPeriodsRecentFirst,
        periodTypes$: periodTypes$,
        period$: period$
    };

    Restangular
        .all('system')
        .get('info')
        .then(function (info) {
            dateFormat = info.dateFormat;

            if (info.calendar === 'iso8601') {
                calendarType = 'gregorian';
                prepareCalendar();
            } else {
                calendarType = info.calendar;

                if (_(calendarTypes).contains(calendarType)) {
                    loadCalendarScript(calendarType);
                }
            }
        });

    return service;
}
