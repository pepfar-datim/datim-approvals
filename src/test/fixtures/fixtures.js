(function (window) {
    var library = {};

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
    library.dataSetGroups = JSON.stringify([
        {
            "name": "MER",
            "dataSets": [
                "fx2HjpODE5y",
                "xXmmo2so2V8",
                "gpJ2TLXI3mY",
                "w9BiI08vABw"
            ]
        },
        {
            "name": "EA",
            "dataSets": [
                "eLRAaV32xH5",
                "kLPghhtGPvZ",
                "A4ivU53utt2",
                "wEKkfO7aAI3",
                "JmnzNK18klO"
            ]
        },
        {
            "name": "SIMS",
            "dataSets": [
                "nideTeYxXLu",
                "J9Yq8jDd3nF",
                "iqaWSeKDhS3",
                "M059pmNzZYE"
            ]
        }
    ]);
    library.dataSets = [
        {"id": "Zqg76KonUx1", "name": "DS: Dataset One", "shortName": "DS: Dataset One", "periodType": "Monthly", "categoryCombo": {"categories": [
            {"id": "SH885jaRe0o"}
        ]}},
        {"id": "cIGsv0OBVi8", "name": "DS: Dataset Two", "shortName": "DS: Dataset Two", "periodType": "Monthly", "categoryCombo": {"categories": [
            {"id": "SH885jaRe0o"}
        ]}},
        {"id": "lr508Rm7mHS", "name": "DS: Dataset Three", "shortName": "DS: Dataset Three", "periodType": "Monthly", "categoryCombo": {"categories": [
            {"id": "GLevLNI9wkl"}
        ]}},
        {"id": "xY5nwObRyi7", "name": "DS: Dataset Four", "shortName": "DS: Dataset Four", "periodType": "Yearly", "categoryCombo": {"categories": [
            {"id": "SH885jaRe0o"}
        ]}},
        {"id": "vX0MoAE7JfL", "name": "DS: Dataset Five", "shortName": "DS: Dataset Five", "periodType": "Monthly", "categoryCombo": {"categories": [
            {"id": "SH885jaRe0o"}
        ]}}
    ];
    library.categories = {"categories": [
        {
            "id": "SH885jaRe0o",
            "name": "Funding Mechanism",
            "categoryOptions": [
                {
                    "id": "IzVbuMzCCEe",
                    "name": "1234 - How...",
                    "organisationUnits": [
                        {
                            "id": "lZsCb6y0KDX",
                            "name": "Malawi",
                            "created": "2013-06-10T00:34:22.000+0000",
                            "lastUpdated": "2014-09-18T11:03:00.174+0000"
                        }
                    ],
                    categoryOptionCombos: [
                        {
                            id: "qS0ABIH66TS",
                            name: "(1234 - How....)"
                        }
                    ],
                    groups: [
                        {
                            id: "BnjwQmbgK1b",
                            name: "Partner 1",
                            categoryOptionGroupSet: {
                                id: "BOyWrF33hiR"
                            }
                        },
                        {
                            id: "FPUgmtt8HRi",
                            name: "Agency 1",
                            categoryOptionGroupSet: {
                                id: "bw8KHXzxd9i"
                            }
                        }
                    ]
                },
                {
                    "id": "KlqBLXUUwhW",
                    "name": "9876 - Nat...",
                    "organisationUnits": [
                        {
                            "id": "lZsCb6y0KDX",
                            "name": "Malawi",
                            "created": "2013-06-10T00:34:22.000+0000",
                            "lastUpdated": "2014-09-18T11:03:00.174+0000"
                        }
                    ],
                    categoryOptionCombos: [
                        {
                            id: "Oae8B8z5H5Y",
                            name: "(9876 - Nat...)"
                        }
                    ],
                    groups: [
                        {
                            id: "wxAh2TvsTUj",
                            name: "Partner 5",
                            categoryOptionGroupSet: {
                                id: "BOyWrF33hiR"
                            }
                        },
                        {
                            id: "FPUgmtt8HRi",
                            name: "Agency 1",
                            categoryOptionGroupSet: {
                                id: "bw8KHXzxd9i"
                            }
                        }
                    ]
                },
                {
                    "id": "F544HMM7tT7",
                    "name": "2342 - Wat..",
                    "organisationUnits": [
                        {
                            "id": "RZdCb6y0KRD",
                            "name": "Rwanda",
                            "created": "2013-06-10T00:34:22.000+0000",
                            "lastUpdated": "2014-09-18T11:03:00.174+0000"
                        }
                    ],
                    categoryOptionCombos: [
                        {
                            id: "RrjmU53u2Ls",
                            name: "(2342 - Wat...)"
                        }
                    ],
                    groups: [
                        {
                            id: "CSPJnuxBAnz",
                            name: "Partner 4",
                            categoryOptionGroupSet: {
                                id: "BOyWrF33hiR"
                            }
                        },
                        {
                            id: "RGC9tURSc3W",
                            name: "Agency 3",
                            categoryOptionGroupSet: {
                                id: "bw8KHXzxd9i"
                            }
                        }
                    ]
                },
                {
                    "id": "l32yP94G7HL",
                    "name": "5433 - JH...",
                    "organisationUnits": [
                        {
                            "id": "DRsCDEy0KDX",
                            "name": "Kenya",
                            "created": "2013-06-10T00:34:22.000+0000",
                            "lastUpdated": "2014-09-18T11:03:00.174+0000"
                        }
                    ],
                    categoryOptionCombos: [
                        {
                            id: "tJoZs2lVXFc",
                            name: "(5433 - JH...)"
                        }
                    ],
                    groups: [
                        {
                            id: "NLV6dy7BE2O",
                            name: "Agency 2",
                            categoryOptionGroupSet: {
                                id: "bw8KHXzxd9i"
                            }
                        },
                        {
                            id: "yrIYjIn0aom",
                            name: "Partner 3",
                            categoryOptionGroupSet: {
                                id: "BOyWrF33hiR"
                            }
                        }
                    ]
                },
                {
                    "id": "tQV5xTc2JYj",
                    "name": "7654 - Pre...",
                    "organisationUnits": [
                        {
                            "id": "lZsCb6y0KDX",
                            "name": "Malawi",
                            "created": "2013-06-10T00:34:22.000+0000",
                            "lastUpdated": "2014-09-18T11:03:00.174+0000"
                        }
                    ],
                    categoryOptionCombos: [
                        {
                            id: "qofeYTu7w0R",
                            name: "(7654 - Pre...)"
                        }
                    ],
                    groups: [
                        {
                            id: "vNQlvpUamTo",
                            name: "Partner 2",
                            categoryOptionGroupSet: {
                                id: "BOyWrF33hiR"
                            }
                        },
                        {
                            id: "NLV6dy7BE2O",
                            name: "Agency 2",
                            categoryOptionGroupSet: {
                                id: "bw8KHXzxd9i"
                            }
                        }
                    ]
                },
                {
                    "id": "GZIYLG1HWSW",
                    "name": "1233 - Mal...",
                    "organisationUnits": [
                        {
                            "id": "lZsCb6y0KDX",
                            "name": "Malawi",
                            "created": "2013-06-10T00:34:22.000+0000",
                            "lastUpdated": "2014-09-18T11:03:00.174+0000"
                        }
                    ],
                    categoryOptionCombos: [
                        {
                            id: "gJWUyJhnVBo",
                            name: "(1233 - Mal...)"
                        }
                    ],
                    groups: [
                        {
                            id: "iadd8tHFS9C",
                            name: "Partner 1",
                            categoryOptionGroupSet: {
                                id: "BOyWrF33hiR"
                            }
                        },
                        {
                            id: "FPUgmtt8HRi",
                            name: "Agency 1",
                            categoryOptionGroupSet: {
                                id: "bw8KHXzxd9i"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "GLevLNI9wkl",
            "name": "default",
            "categoryOptions": [
                {
                    "id": "xYerKDKCefk",
                    "name": "default",
                    "organisationUnits": [],
                    categoryOptionCombos: [
                        {
                            id: "HllvX50cXC0",
                            name: "(default)"
                        }
                    ],
                    groups: [ ]
                }
            ]
        }
    ]};
    library.orgUnitLevels =
    {"organisationUnitLevels": [
        {"level": 2, "displayName": "Country"},
        {"level": 1, "displayName": "Global"},
        {"level": 4, "displayName": "In-country level 3"},
        {"level": 5, "displayName": "In-country level 4"},
        {"level": 6, "displayName": "In-country level 5"},
        {"level": 7, "displayName": "In-country level 6"},
        {"level": 8, "displayName": "In-country level 7"},
        {"level": 3, "displayName": "Province / Region"}
    ]};
    library.cocApprovalStatus = [
        {
            "id": "qS0ABIH66TS",
            "dataApprovalLevel": {
                "id": "aypLtfWShE5",
                "level": 2
            },

            "period": "2014",
            "organisationUnit": {
                "id": "ybg3MO3hcf4"
            },
            "accepted": true,
            "mayApprove": true,
            "mayUnapprove": false,
            "mayUnaccept": true,
            "mayAccept": false
        },
        {
            "id": "Oae8B8z5H5Y",
            "dataApprovalLevel": {
                "id": "JNpaWdWCyDN",
                "level": 2
            },

            "period": "2014",
            "organisationUnit": {
                "id": "ybg3MO3hcf4"
            },
            "accepted": false,
            "mayApprove": false,
            "mayUnapprove": true,
            "mayUnaccept": false,
            "mayAccept": true
        },
        {
            "id": "RrjmU53u2Ls",
            "dataApprovalLevel": {
                "id": "vqWNeqjozr9",
                "level": 1
            },

            "period": "2014",
            "organisationUnit": {
                "id": "ybg3MO3hcf4"
            },
            "accepted": false,
            "mayApprove": false,
            "mayUnapprove": true,
            "mayUnaccept": false,
            "mayAccept": false
        },
        {
            "id": "qofeYTu7w0R",
            "dataApprovalLevel": {
                "id": "WccDi5x6FSp",
                "level": 4
            },

            "period": "2014",
            "organisationUnit": {
                "id": "ybg3MO3hcf4"
            },
            "accepted": true,
            "mayApprove": false,
            "mayUnapprove": false,
            "mayUnaccept": false,
            "mayAccept": false
        }
    ];

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
