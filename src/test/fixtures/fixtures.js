(function (window) {
    var library = {}

    library.orgUnitLevel1 = {"organisationUnits": [
        {"id": "a9OHUtkxjO8", "level": 1, "name": "Eshu Dispensary", "children": [
            {"id": "XCOuSJUVman", "level": 2, "name": "Hekima Community Health Unit"}
        ]},
        {"id": "ybg3MO3hcf4", "level": 1, "name": "Global", "children": [
            {"id": "XtxUYCsDWrR", "level": 2, "name": "Rwanda"},
            {"id": "h11OyvlPxpJ", "level": 2, "name": "Mozambique"},
            {"id": "lZsCb6y0KDX", "level": 2, "name": "Malawi"},
            {"id": "HfVjCurKxh2", "level": 2, "name": "Kenya"},
            {"id": "cDGPF739ZZr", "level": 2, "name": "South Africa"},
            {"id": "f5RoebaDLMx", "level": 2, "name": "Zambia"},
            {"id": "PqlFzhuPcF1", "level": 2, "name": "Nigeria"},
            {"id": "l1KFEXKI4Dg", "level": 2, "name": "Botswana"},
            {"id": "a71G4Gtcttv", "level": 2, "name": "Zimbabwe"},
            {"id": "FFVkaV9Zk1S", "level": 2, "name": "Namibia"},
            {"id": "FETQ6OmnsKB", "level": 2, "name": "Uganda"}
        ]},
        {"id": "tqOO4WrOA1L", "level": 1, "name": "Khalala Dispensary", "children": [
            {"id": "h33zAuVtyST", "level": 2, "name": "Khalala Community Health Unit"},
            {"id": "C8xF4yCjvIc", "level": 2, "name": "Sitikho Community Health Unit"}
        ]},
        {"id": "UrRsO2NsxHZ", "level": 1, "name": "Kikoneni Health Centre", "children": [
            {"id": "yjKOwzXkcOX", "level": 2, "name": "Bumbani Community Health Unit"},
            {"id": "baXgVdyKY8Q", "level": 2, "name": "Central Community Health Unit"},
            {"id": "gKlqGghOXB5", "level": 2, "name": "Jitahidi Community Health Unit"}
        ]},
        {"id": "RYumT9hJ8Ss", "level": 1, "name": "Mafisini Dispensary", "children": [
            {"id": "WBkMP1NTove", "level": 2, "name": "Uzima Self Help Group Community Health Unit"}
        ]},
        {"id": "ksNfsN3CiNc", "level": 1, "name": "Majimoto Dispensary", "children": [
            {"id": "DN2hCg5uQKR", "level": 2, "name": "Majimoto Commnity Unit"}
        ]},
        {"id": "PbgfcQ8jDQr", "level": 1, "name": "Mamba Dispensary (MSAMBWENI)", "children": []},
        {"id": "lf5XVTQP2Cp", "level": 1, "name": "Miendo Dispensary", "children": [
            {"id": "HVR2Og2MspE", "level": 2, "name": "Miendo Community Health Unit"}
        ]},
        {"id": "IBO76lif4Fr", "level": 1, "name": "Mivumoni Catholic", "children": []},
        {"id": "cOgv5EHeFRj", "level": 1, "name": "Mwananyamala Dispensary (CDF)", "children": [
            {"id": "ZImy6KUXwBi", "level": 2, "name": "Morning Star Community Health Unit"},
            {"id": "P9RSVjkLleV", "level": 2, "name": "Majimoto Community Unit"}
        ]},
        {"id": "Jfpsre91xXE", "level": 1, "name": "Webuye Health Centre", "children": [
            {"id": "NLi3hET8BdJ", "level": 2, "name": "Nang'eni Community Unit"}
        ]}
    ]};
    library.approvalLevels = {"dataApprovalLevels": [
        {"id": "aypLtfWShE5", "name": "1", "level": 1, "orgUnitLevel": 1},
        {"id": "JNpaWdWCyDN", "name": "2", "level": 2, "orgUnitLevel": 2},
        {"id": "vqWNeqjozr9", "name": "2 - Funding Agency", "level": 3, "orgUnitLevel": 2, "categoryOptionGroupSet": {"id": "bw8KHXzxd9i", "name": "Funding Agency", "displayName": "Funding Agency"}},
        {"id": "WccDi5x6FSp", "name": "2 - Implementing Partner", "level": 4, "orgUnitLevel": 2, "categoryOptionGroupSet": {"id": "BOyWrF33hiR", "name": "Implementing Partner", "displayName": "Implementing Partner"}}
    ]};
    library.fundingAgenciesCOG = {"categoryOptionGroups": [
        {"id": "OO5qyDIwoMk", "name": "DOD"},
        {"id": "FPUgmtt8HRi", "name": "HHS/CDC"},
        {"id": "RGC9tURSc3W", "name": "HHS/HRSA"},
        {"id": "m4mzzwVQOUi", "name": "U.S. Peace Corps"},
        {"id": "m4mzzwVQOUi", "name": "U.S. Peace Corps"},
        {"id": "NLV6dy7BE2O", "name": "USAID"},
        {"id": "ICxISjHPJF4", "name": "USDOS/BAA"},
        {"id": "MWmqTPSvhD1", "name": "USDOS/BPRM"}
    ]};
    library.implementingPartnersCOG = {"categoryOptionGroups": [
        {"id": "Cs2c30KKxg6", "name": "Apple"},
        {"id": "pBimh5znu2H", "name": "Banana"}
    ]};


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
