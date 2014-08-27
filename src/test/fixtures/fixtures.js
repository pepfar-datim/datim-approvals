(function (window) {
    var library = {}

    library.orgUnitLevel1 = {"organisationUnits":[{"id":"a9OHUtkxjO8","level":1,"name":"Eshu Dispensary"},{"id":"ybg3MO3hcf4","level":1,"name":"Global"},{"id":"tqOO4WrOA1L","level":1,"name":"Khalala Dispensary"},{"id":"UrRsO2NsxHZ","level":1,"name":"Kikoneni Health Centre"},{"id":"RYumT9hJ8Ss","level":1,"name":"Mafisini Dispensary"},{"id":"ksNfsN3CiNc","level":1,"name":"Majimoto Dispensary"},{"id":"PbgfcQ8jDQr","level":1,"name":"Mamba Dispensary (MSAMBWENI)"},{"id":"lf5XVTQP2Cp","level":1,"name":"Miendo Dispensary"},{"id":"IBO76lif4Fr","level":1,"name":"Mivumoni Catholic"},{"id":"cOgv5EHeFRj","level":1,"name":"Mwananyamala Dispensary (CDF)"},{"id":"Jfpsre91xXE","level":1,"name":"Webuye Health Centre"}]};
    library.approvalLevels = {"dataApprovalLevels":[{"id":"aypLtfWShE5","name":"1","level":1,"orgUnitLevel":1},{"id":"JNpaWdWCyDN","name":"2","level":2,"orgUnitLevel":2},{"id":"vqWNeqjozr9","name":"2 - Funding Agency","level":3,"orgUnitLevel":2,"categoryOptionGroupSet":{"id":"bw8KHXzxd9i","name":"Funding Agency","created":"2014-02-17T14:11:38.540+0000","lastUpdated":"2014-05-09T23:23:10.269+0000"}},{"id":"WccDi5x6FSp","name":"2 - Implementing Partner","level":4,"orgUnitLevel":2,"categoryOptionGroupSet":{"id":"BOyWrF33hiR","name":"Implementing Partner","created":"2014-02-17T15:15:15.978+0000","lastUpdated":"2014-05-28T19:50:32.003+0000"}}]};


    function getFixture(key) {
        return library[key];
    }

    function addFixture(key, fixture) {
        library[key] = fixture;
    }

    window.fixtures = {
        get: getFixture,
        add: addFixture
    };
})(window);
