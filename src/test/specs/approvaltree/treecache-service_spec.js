describe('Tree Cache Service', function () {
    var service;
    var givenOrgUnits, expectedLevelOneOrgUnits, expectedLevelTwoOrgUnits;

    beforeEach(module('PEPFAR.approvals'));
    beforeEach(inject(function (treeCacheService) {
        service = treeCacheService;
    }));
    beforeEach(function () {
        givenOrgUnits = [
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
            ]}
        ];
        expectedLevelOneOrgUnits = [
            {id: 'a9OHUtkxjO8', level: 1, name: 'Eshu Dispensary'},
            {id: 'ybg3MO3hcf4', level: 1, name: 'Global'}
        ];

        expectedLevelTwoOrgUnits = [
            {"id": "XCOuSJUVman", "level": 2, "name": "Hekima Community Health Unit", parent: 'a9OHUtkxjO8'},
            {"id": "XtxUYCsDWrR", "level": 2, "name": "Rwanda", parent: 'ybg3MO3hcf4'},
            {"id": "h11OyvlPxpJ", "level": 2, "name": "Mozambique", parent: 'ybg3MO3hcf4'},
            {"id": "lZsCb6y0KDX", "level": 2, "name": "Malawi", parent: 'ybg3MO3hcf4'},
            {"id": "HfVjCurKxh2", "level": 2, "name": "Kenya", parent: 'ybg3MO3hcf4'},
            {"id": "cDGPF739ZZr", "level": 2, "name": "South Africa", parent: 'ybg3MO3hcf4'},
            {"id": "f5RoebaDLMx", "level": 2, "name": "Zambia", parent: 'ybg3MO3hcf4'},
            {"id": "PqlFzhuPcF1", "level": 2, "name": "Nigeria", parent: 'ybg3MO3hcf4'},
            {"id": "l1KFEXKI4Dg", "level": 2, "name": "Botswana", parent: 'ybg3MO3hcf4'},
            {"id": "a71G4Gtcttv", "level": 2, "name": "Zimbabwe", parent: 'ybg3MO3hcf4'},
            {"id": "FFVkaV9Zk1S", "level": 2, "name": "Namibia", parent: 'ybg3MO3hcf4'},
            {"id": "FETQ6OmnsKB", "level": 2, "name": "Uganda", parent: 'ybg3MO3hcf4'}
        ];
    });

    it('should be defined', function () {
        expect(service).toBeAnObject();
    });

    it('should contain a list of orgUnitLevels', function () {
        expect(service.orgUnitsPerLevel).toBeAnObject();
    });

    it('should contain an object of category', function () {
        expect(service.categoryOptionGroupsPerLevels)
    });

    it('should have a function for adding orgUnits', function () {
        expect(service.addOrgUnits).toBeAFunction();
    });

    it('should add the orgUnits for the first level', function () {
        service.addOrgUnits(givenOrgUnits);

        expect(service.orgUnitsPerLevel.level_1).toEqual(expectedLevelOneOrgUnits);
    });

    it('should add the orgUnits for the second level', function () {
        service.addOrgUnits(givenOrgUnits);

        expect(service.orgUnitsPerLevel.level_2).toEqual(expectedLevelTwoOrgUnits);
    });

    it('should return the orgUnits that are asked for', function () {
        service.addOrgUnits(givenOrgUnits);

        expect(service.getOrgUnitsForLevel(1)).toEqual(expectedLevelOneOrgUnits);
    });

    describe('getCategory', function () {
        var fundingPartners = [
            {"id": "OO5qyDIwoMk", "created": "2014-05-09T23:23:09.013+0000", "name": "DOD", "lastUpdated": "2014-05-28T19:50:35.546+0000"},
            {"id": "FPUgmtt8HRi", "created": "2014-05-09T23:23:06.953+0000", "name": "HHS/CDC", "lastUpdated": "2014-05-28T19:50:35.140+0000"},
            {"id": "RGC9tURSc3W", "created": "2014-05-09T23:23:07.143+0000", "name": "HHS/HRSA", "lastUpdated": "2014-05-28T19:50:34.398+0000"},
            {"id": "m4mzzwVQOUi", "created": "2014-05-09T23:23:07.533+0000", "name": "U.S. Peace Corps", "lastUpdated": "2014-05-28T19:50:32.568+0000"},
            {"id": "NLV6dy7BE2O", "created": "2014-05-09T23:23:07.254+0000", "name": "USAID", "lastUpdated": "2014-05-28T19:50:35.483+0000"},
            {"id": "ICxISjHPJF4", "created": "2014-05-09T23:23:08.038+0000", "name": "USDOS/BAA", "lastUpdated": "2014-05-28T19:50:32.986+0000"},
            {"id": "MWmqTPSvhD1", "created": "2014-05-09T23:23:10.199+0000", "name": "USDOS/BPRM", "lastUpdated": "2014-05-28T19:50:34.890+0000"}
        ];

        it('should return the categoryOptions for the category', function () {
            service.categoryOptionGroupsPerLevels['vqWNeqjozr9'] = fundingPartners;

            expect(service.getCategory('vqWNeqjozr9')).toEqual(fundingPartners);
        });
    });

    describe('addCategory', function () {
        var fundingPartners = [
            {"id": "OO5qyDIwoMk", "created": "2014-05-09T23:23:09.013+0000", "name": "DOD", "lastUpdated": "2014-05-28T19:50:35.546+0000"},
            {"id": "FPUgmtt8HRi", "created": "2014-05-09T23:23:06.953+0000", "name": "HHS/CDC", "lastUpdated": "2014-05-28T19:50:35.140+0000"},
            {"id": "RGC9tURSc3W", "created": "2014-05-09T23:23:07.143+0000", "name": "HHS/HRSA", "lastUpdated": "2014-05-28T19:50:34.398+0000"},
            {"id": "m4mzzwVQOUi", "created": "2014-05-09T23:23:07.533+0000", "name": "U.S. Peace Corps", "lastUpdated": "2014-05-28T19:50:32.568+0000"},
            {"id": "NLV6dy7BE2O", "created": "2014-05-09T23:23:07.254+0000", "name": "USAID", "lastUpdated": "2014-05-28T19:50:35.483+0000"},
            {"id": "ICxISjHPJF4", "created": "2014-05-09T23:23:08.038+0000", "name": "USDOS/BAA", "lastUpdated": "2014-05-28T19:50:32.986+0000"},
            {"id": "MWmqTPSvhD1", "created": "2014-05-09T23:23:10.199+0000", "name": "USDOS/BPRM", "lastUpdated": "2014-05-28T19:50:34.890+0000"}
        ];

        it('should add a list of category options to the cache', function () {
            service.addCategory(fundingPartners, 'vqWNeqjozr9');

            expect(service.categoryOptionGroupsPerLevels['vqWNeqjozr9']).toEqual(fundingPartners);
        });
    });
});
