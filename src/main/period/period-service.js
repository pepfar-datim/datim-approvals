angular.module('PEPFAR.approvals').factory('periodService', periodService);

function periodService(dataStore, rx, $rootScope) {
    var period$ = new rx.ReplaySubject(1);

    return {
        period$: period$,
        getPeriodsForWorkflow: getPeriodsForWorkflow,
        setPeriod: setPeriod
    };

    ///////////////////////////////////////////////////////////////////////
    function getPeriodsForWorkflow(workflow) {
        return rx.Observable.fromPromise(dataStore.getPeriodSettings())
            .map(onlyPeriodsForWorkflow(workflow))
            .map(periodSettingsToArray)
            .map(onlyOpenPeriods)
            .map(onlyNameAndIdProperties)
            .safeApply($rootScope);
    }

    function setPeriod(newPeriod) {
        period$.onNext(newPeriod);
    }

    function onlyPeriodsForWorkflow(workflow) {
        return function (periodSettings) {
            return periodSettings[workflow.name];
        };
    }

    function onlyOpenPeriods(periods) {
        return periods
            .filter(function (period) {
                return todayIsBetweenDates(period.start, period.end);
            });
    }

    function todayIsBetweenDates(startDate, endDate) {
        var start = Date.parse(startDate);
        var end = Date.parse(endDate);
        var now = Date.now();

        if (isNumber(start) && isNumber(end)) {
            return (start < now) && (now < end);
        }

        return false;
    }

    function isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    function periodSettingsToArray(periodSettings) {
        return Object.keys(periodSettings)
            .reduce(function (acc, periodKey) {
                return acc.concat([ _.extend({ id: periodKey }, periodSettings[periodKey]) ]);
            }, []);
    }

    function onlyNameAndIdProperties(periods) {
        return _.map(periods, pickIdAndNameFromPeriod);
    }

    function pickIdAndNameFromPeriod(period) { 
        return _.pick(period, ['id', 'name']);
    }
}
