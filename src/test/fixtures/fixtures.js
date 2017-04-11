(function (window) {
    var library = {};

    library.orgUnitLevel1 = {
        "organisationUnits": [
            {
                "id": "a9OHUtkxjO8", "level": 1, "name": "Eshu Dispensary", "children": [
                    { "id": "XCOuSJUVman", "level": 2, "name": "Hekima Community Health Unit" }
                ]
            },
            {
                "id": "ybg3MO3hcf4", "level": 1, "name": "Global", "children": [
                    { "id": "XtxUYCsDWrR", "level": 2, "name": "Rwanda" },
                    { "id": "h11OyvlPxpJ", "level": 2, "name": "Mozambique" },
                    { "id": "lZsCb6y0KDX", "level": 2, "name": "Malawi" },
                    { "id": "HfVjCurKxh2", "level": 2, "name": "Kenya" },
                    { "id": "cDGPF739ZZr", "level": 2, "name": "South Africa" },
                    { "id": "f5RoebaDLMx", "level": 2, "name": "Zambia" },
                    { "id": "PqlFzhuPcF1", "level": 2, "name": "Nigeria" },
                    { "id": "l1KFEXKI4Dg", "level": 2, "name": "Botswana" },
                    { "id": "a71G4Gtcttv", "level": 2, "name": "Zimbabwe" },
                    { "id": "FFVkaV9Zk1S", "level": 2, "name": "Namibia" },
                    { "id": "FETQ6OmnsKB", "level": 2, "name": "Uganda" }
                ]
            },
            {
                "id": "tqOO4WrOA1L", "level": 1, "name": "Khalala Dispensary", "children": [
                    { "id": "h33zAuVtyST", "level": 2, "name": "Khalala Community Health Unit" },
                    { "id": "C8xF4yCjvIc", "level": 2, "name": "Sitikho Community Health Unit" }
                ]
            },
            {
                "id": "UrRsO2NsxHZ", "level": 1, "name": "Kikoneni Health Centre", "children": [
                    { "id": "yjKOwzXkcOX", "level": 2, "name": "Bumbani Community Health Unit" },
                    { "id": "baXgVdyKY8Q", "level": 2, "name": "Central Community Health Unit" },
                    { "id": "gKlqGghOXB5", "level": 2, "name": "Jitahidi Community Health Unit" }
                ]
            },
            {
                "id": "RYumT9hJ8Ss", "level": 1, "name": "Mafisini Dispensary", "children": [
                    { "id": "WBkMP1NTove", "level": 2, "name": "Uzima Self Help Group Community Health Unit" }
                ]
            },
            {
                "id": "ksNfsN3CiNc", "level": 1, "name": "Majimoto Dispensary", "children": [
                    { "id": "DN2hCg5uQKR", "level": 2, "name": "Majimoto Commnity Unit" }
                ]
            },
            { "id": "PbgfcQ8jDQr", "level": 1, "name": "Mamba Dispensary (MSAMBWENI)", "children": [] },
            {
                "id": "lf5XVTQP2Cp", "level": 1, "name": "Miendo Dispensary", "children": [
                    { "id": "HVR2Og2MspE", "level": 2, "name": "Miendo Community Health Unit" }
                ]
            },
            { "id": "IBO76lif4Fr", "level": 1, "name": "Mivumoni Catholic", "children": [] },
            {
                "id": "cOgv5EHeFRj", "level": 1, "name": "Mwananyamala Dispensary (CDF)", "children": [
                    { "id": "ZImy6KUXwBi", "level": 2, "name": "Morning Star Community Health Unit" },
                    { "id": "P9RSVjkLleV", "level": 2, "name": "Majimoto Community Unit" }
                ]
            },
            {
                "id": "Jfpsre91xXE", "level": 1, "name": "Webuye Health Centre", "children": [
                    { "id": "NLi3hET8BdJ", "level": 2, "name": "Nang'eni Community Unit" }
                ]
            }
        ]
    };
    library.approvalLevels = {
        "dataApprovalLevels": [
            { "id": "aypLtfWShE5", "name": "1", "level": 1, "orgUnitLevel": 1 },
            { "id": "MROYE5CmsDF", "name": "2 - Global Funding Agency", "level": 2, "orgUnitLevel": 1 },
            { "id": "JNpaWdWCyDN", "name": "3", "level": 3, "orgUnitLevel": 2 },
            { "id": "vqWNeqjozr9", "name": "2 - Funding Agency", "level": 4, "orgUnitLevel": 2, "categoryOptionGroupSet": { "id": "bw8KHXzxd9i", "name": "Funding Agency", "displayName": "Funding Agency" } },
            { "id": "WccDi5x6FSp", "name": "2 - Implementing Partner", "level": 5, "orgUnitLevel": 2, "categoryOptionGroupSet": { "id": "BOyWrF33hiR", "name": "Implementing Partner", "displayName": "Implementing Partner" } }
        ]
    };
    library.fundingAgenciesCOG = {
        "categoryOptionGroups": [
            { "id": "OO5qyDIwoMk", "name": "DOD" },
            { "id": "FPUgmtt8HRi", "name": "HHS/CDC" },
            { "id": "RGC9tURSc3W", "name": "HHS/HRSA" },
            { "id": "m4mzzwVQOUi", "name": "U.S. Peace Corps" },
            { "id": "m4mzzwVQOUi", "name": "U.S. Peace Corps" },
            { "id": "NLV6dy7BE2O", "name": "USAID" },
            { "id": "ICxISjHPJF4", "name": "USDOS/BAA" },
            { "id": "MWmqTPSvhD1", "name": "USDOS/BPRM" }
        ]
    };
    library.implementingPartnersCOG = {
        "categoryOptionGroups": [
            { "id": "Cs2c30KKxg6", "name": "Apple" },
            { "id": "pBimh5znu2H", "name": "Banana" }
        ]
    };
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
        {
            "id": "Zqg76KonUx1", "name": "DS: Dataset One", "shortName": "DS: Dataset One", "periodType": "Monthly", "categoryCombo": {
                "categories": [
                    { "id": "SH885jaRe0o" }
                ]
            }
        },
        {
            "id": "cIGsv0OBVi8", "name": "DS: Dataset Two", "shortName": "DS: Dataset Two", "periodType": "Monthly", "categoryCombo": {
                "categories": [
                    { "id": "SH885jaRe0o" }
                ]
            }
        },
        {
            "id": "lr508Rm7mHS", "name": "DS: Dataset Three", "shortName": "DS: Dataset Three", "periodType": "Monthly", "categoryCombo": {
                "categories": [
                    { "id": "GLevLNI9wkl" }
                ]
            }
        },
        {
            "id": "xY5nwObRyi7", "name": "DS: Dataset Four", "shortName": "DS: Dataset Four", "periodType": "Yearly", "categoryCombo": {
                "categories": [
                    { "id": "SH885jaRe0o" }
                ]
            }
        },
        {
            "id": "vX0MoAE7JfL", "name": "DS: Dataset Five", "shortName": "DS: Dataset Five", "periodType": "Monthly", "categoryCombo": {
                "categories": [
                    { "id": "SH885jaRe0o" }
                ]
            }
        }
    ];
    library.categories = {
        "categories": [
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
                        groups: []
                    }
                ]
            }
        ]
    };
    library.orgUnitLevels =
        {
            "organisationUnitLevels": [
                { "level": 2, "displayName": "Country" },
                { "level": 1, "displayName": "Global" },
                { "level": 4, "displayName": "In-country level 3" },
                { "level": 5, "displayName": "In-country level 4" },
                { "level": 6, "displayName": "In-country level 5" },
                { "level": 7, "displayName": "In-country level 6" },
                { "level": 8, "displayName": "In-country level 7" },
                { "level": 3, "displayName": "Province / Region" }
            ]
        };
    library.cocApprovalStatus = [
        {
            "id": "qS0ABIH66TS",
            "level": {
                "id": "JNpaWdWCyDN",
                "level": 2
            },

            "pe": "2014",
            "ou": "ybg3MO3hcf4",
            "accepted": true,
            "permissions": {
                "mayApprove": true,
                "mayUnapprove": false,
                "mayUnaccept": true,
                "mayAccept": false,
                "mayReadData": true
            }
        },
        {
            "id": "Oae8B8z5H5Y",
            "level": {
                "id": "JNpaWdWCyDN",
                "level": 2
            },

            "pe": "2014",
            "ou": "ybg3MO3hcf4",
            "accepted": false,
            "permissions": {
                "mayApprove": false,
                "mayUnapprove": true,
                "mayUnaccept": false,
                "mayAccept": true,
                "mayReadData": true
            }
        },
        {
            "id": "RrjmU53u2Ls",
            "level": {
                "id": "vqWNeqjozr9",
                "level": 1
            },
            "pe": "2014",
            "ou": "ybg3MO3hcf4",
            "accepted": false,
            "permissions": {
                "mayApprove": false,
                "mayUnapprove": true,
                "mayUnaccept": false,
                "mayAccept": false,
                "mayReadData": true
            }
        },
        {
            "id": "qofeYTu7w0R",
            "level": {},
            "pe": "2014",
            "ou": "ybg3MO3hcf4",
            "accepted": true,
            "permissions": {
                "mayApprove": false,
                "mayUnapprove": false,
                "mayUnaccept": false,
                "mayAccept": false,
                "mayReadData": false
            }
        },
        {
            "id": "tJoZs2lVXFc",
            "level": {},
            "pe": "2014",
            "ou": "ybg3MO3hcf4",
            "accepted": true,
            "permissions": {
                "mayApprove": false,
                "mayUnapprove": false,
                "mayUnaccept": false,
                "mayAccept": false,
                "mayReadData": false
            }
        }
    ];

    library.organisationUnitsForLevelThree = { "organisationUnits": [{ "id": "XOivy2uDpMF", "name": "Angola" }, { "id": "iD2i0aynOGm", "name": "Asia Regional Program" }, { "id": "l1KFEXKI4Dg", "name": "Botswana" }, { "id": "wChmwjpXOw2", "name": "Burma" }, { "id": "Qh4XMQJhbk8", "name": "Burundi" }, { "id": "XWZK2nop7pM", "name": "Cambodia" }, { "id": "bQQJe0cC1eD", "name": "Cameroon" }, { "id": "nBo9Y4yZubB", "name": "Caribbean Region" }, { "id": "vSu0nPMbq7b", "name": "Central America Region" }, { "id": "t25400wXrNB", "name": "Central Asia Region" }, { "id": "CZ9ysPg2dSk", "name": "China" }, { "id": "ds0ADyc9UCU", "name": "Cote d'Ivoire" }, { "id": "ANN4YCOufcP", "name": "Democratic Republic of the Congo" }, { "id": "NzelIFhEv3C", "name": "Dominican Republic" }, { "id": "IH1kchw86uA", "name": "Ethiopia" }, { "id": "y3zhsvdXlhN", "name": "Ghana" }, { "id": "PeOHqAwdtez", "name": "Guyana" }, { "id": "JTypsdEUNPw", "name": "Haiti" }, { "id": "skj3e4YSiJY", "name": "India" }, { "id": "W73PRZcjFIU", "name": "Indonesia" }, { "id": "HfVjCurKxh2", "name": "Kenya" }, { "id": "qllxzIjjurr", "name": "Lesotho" }, { "id": "lZsCb6y0KDX", "name": "Malawi" }, { "id": "h11OyvlPxpJ", "name": "Mozambique" }, { "id": "FFVkaV9Zk1S", "name": "Namibia" }, { "id": "PqlFzhuPcF1", "name": "Nigeria" }, { "id": "cl7jVQOW3Ks", "name": "Papua New Guinea" }, { "id": "XtxUYCsDWrR", "name": "Rwanda" }, { "id": "cDGPF739ZZr", "name": "South Africa" }, { "id": "WLG0z5NxQs8", "name": "South Sudan" }, { "id": "V0qMZH29CtN", "name": "Swaziland" }, { "id": "mdXu6iCbn2G", "name": "Tanzania" }, { "id": "FETQ6OmnsKB", "name": "Uganda" }, { "id": "ligZVIYs2rL", "name": "Ukraine" }, { "id": "YM6xn5QxNpY", "name": "Vietnam" }, { "id": "f5RoebaDLMx", "name": "Zambia" }, { "id": "a71G4Gtcttv", "name": "Zimbabwe" }] };

    library['system/info'] =
        { "contextPath": "http://localhost:8080/dhis", "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.82 Safari/537.36 OPR/29.0.1795.41 (Edition beta)", "calendar": "iso8601", "dateFormat": "yyyy-mm-dd", "serverDate": "2015-04-25T11:39:39.109+0000", "lastAnalyticsTableSuccess": "2015-03-14T23:03:27.809+0000", "intervalSinceLastAnalyticsTableSuccess": "996 h, 36 m, 11 s", "version": "2.19-SNAPSHOT", "revision": "19021", "buildTime": "2015-04-25T10:57:02.000+0000", "environmentVariable": "DHIS2_HOME", "javaVersion": "1.7.0_25", "javaVendor": "Oracle Corporation", "javaHome": "/Library/Java/JavaVirtualMachines/jdk1.7.0_25.jdk/Contents/Home/jre", "javaIoTmpDir": "/usr/local/apache-tomcat-8.0.5/temp", "javaOpts": "-Xms512m -Xmx1024m -XX:MaxPermSize=256M", "osName": "Mac OS X", "osArchitecture": "x86_64", "osVersion": "10.9.4", "externalDirectory": "/Work/UIO/dhis", "databaseInfo": { "type": "PostgreSQL", "name": "dedupe", "user": "postgres" }, "memoryInfo": "Mem Total in JVM: 757 Free in JVM: 484 Max Limit: 989", "cpuCores": 4, "systemId": "4892b46d-b5dd-4d41-9a8b-2e39d8e445de" };

    library.fundingMechanismCategory = {
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
    };

    library.defaultCategory = {
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
                groups: []
            }
        ]
    };

    library.categoryCombos = {
                "id": "wUpfppgjEza",
                "categoryOptionCombos": [
                    {
                        "id": "hCBvGswtVQc",
                        "name": "11 - Some mechanism ",
                    },
                    {
                        "id": "FIB6cf0GnUE",
                        "name": "12 - Some other mechanism ",
                    }
                ]
            };

    library.workflowsWithDatasets = {
        "dataApprovalWorkflows": [
            {
                "name": "MER Results",
                "id": "RwNpkAM7Hw7",
                "periodType": "Quarterly",
                "displayName": "MER Results",
                "dataApprovalLevels": [
                    {
                        "id": "aypLtfWShE5",
                        "level": 1,
                        "displayName": "Global"
                    }, {
                        "id": "fsIo8vU2VFZ",
                        "level": 4,
                        "displayName": "Implementing Partner"
                    }, {
                        "id": "rImhZfF6RKy",
                        "level": 2,
                        "displayName": "Inter-Agency"
                    }, {
                        "id": "jtLSx6a19Ps",
                        "level": 3,
                        "displayName": "Funding Agency"
                    }],
                "dataSets": [
                    { "name": "MER Results: Medical Store FY2016Q3", "id": "hIm0HGCKiPv", "shortName": "MER R: Medical Store FY2016Q3", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Community Based - DoD ONLY FY2016Q4", "id": "j9bKklpTDBZ", "shortName": "MER R: Community Based - DoD ONLY FY2016Q4", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Narratives (IM)", "id": "LWE9GdlygD5", "shortName": "MER R: Narratives (IM)", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Facility Based FY2017Q1", "id": "hgOW2BSUDaN", "shortName": "MER R: Facility Based FY2017Q1", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Operating Unit Level (IM) FY2017Q1", "id": "KwkuZhKulqs", "shortName": "MER R: Operating Unit Level (IM) FY2017Q1", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Facility Based - DoD ONLY FY2017Q1", "id": "CS958XpDaUf", "shortName": "MER R: Facility Based - DoD ONLY FY2017Q1", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Operating Unit Level (IM) FY2016Q3", "id": "ovYEbELCknv", "shortName": "MER R: Operating Unit Level (IM) FY2016Q3", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Community Based - DoD ONLY", "id": "UZ2PLqSe5Ri", "shortName": "MER R: Community Based - DoD ONLY", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Narratives (IM) FY2016Q4", "id": "xBRAscSmemV", "shortName": "MER R: Narratives (IM) FY2016Q4", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Facility Based - DoD ONLY FY2016Q4", "id": "vvHCWnhULAf", "shortName": "MER R: Facility Based - DoD ONLY FY2016Q4", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Community Based FY2017Q1", "id": "Awq346fnVLV", "shortName": "MER R: Community Based FY2017Q1", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Community Based FY2016Q3", "id": "STL4izfLznL", "shortName": "MER R: Community Based FY2016Q3", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Narratives (IM) FY2016Q3", "id": "NJlAVhe4zjv", "shortName": "MER R: Narratives (IM) FY2016Q3", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Medical Store", "id": "CGoi5wjLHDy", "shortName": "MER R: Medical Store", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Operating Unit Level (IM)", "id": "tG2hjDIaYQD", "shortName": "MER R: Operating Unit Level (IM)", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Operating Unit Level (IM) FY2016Q4", "id": "VWdBdkfYntI", "shortName": "MER R: Operating Unit Level (IM) FY2016Q4", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Facility Based - DoD ONLY", "id": "K7FMzevlBAp", "shortName": "MER R: Facility Based - DoD ONLY", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Facility Based FY2016Q3", "id": "i29foJcLY9Y", "shortName": "MER R: Facility Based FY2016Q3", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Medical Store FY2016Q4", "id": "gZ1FgiGUlSj", "shortName": "MER R: Medical Store FY2016Q4", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Community Based - DoD ONLY FY2016Q3", "id": "asHh1YkxBU5", "shortName": "MER R: Community Based - DoD ONLY FY2016Q3", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Facility Based - DoD ONLY FY2016Q3", "id": "j1i6JjOpxEq", "shortName": "MER R: Facility Based - DoD ONLY FY2016Q3", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Community Based - DoD ONLY FY2017Q1", "id": "ovmC3HNi4LN", "shortName": "MER R: Community Based - DoD ONLY FY2017Q1", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Community Based", "id": "MqNLEXmzIzr", "shortName": "MER R: Community Based", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Facility Based", "id": "kkXf2zXqTM0", "shortName": "MER R: Facility Based", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Facility Based FY2016Q4", "id": "ZaV4VSLstg7", "shortName": "MER R: Facility Based FY2016Q4", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Narratives (IM) FY2017Q1", "id": "zTgQ3MvHYtk", "shortName": "MER R: Narratives (IM) FY2017Q1", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Results: Community Based FY2016Q4", "id": "sCar694kKxH", "shortName": "MER R: Community Based FY2016Q4", "periodType": "Quarterly", "workflow": { "id": "RwNpkAM7Hw7", "periodType": "Quarterly" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }]
            }, {
                "name": "MER Targets",
                "id": "TAjCBkG6hl6",
                "periodType": "FinancialOct",
                "displayName": "MER Targets",
                "dataApprovalLevels": [
                    { "id": "aypLtfWShE5", "level": 1, "displayName": "Global" },
                    { "id": "fsIo8vU2VFZ", "level": 4, "displayName": "Implementing Partner" },
                    { "id": "rImhZfF6RKy", "level": 2, "displayName": "Inter-Agency" },
                    { "id": "jtLSx6a19Ps", "level": 3, "displayName": "Funding Agency" }
                ],
                "dataSets": [
                    {
                        "name": "MER Targets: Operating Unit Level (IM) FY2016",
                        "id": "PHyD22loBQH",
                        "shortName": "MER T: Operating Unit Level (IM) FY2016",
                        "periodType": "FinancialOct",
                        "workflow": {
                            "id": "TAjCBkG6hl6",
                            "periodType": "FinancialOct"
                        },
                        "categoryCombo": {
                            "name": "Funding Mechanism",
                            "id": "wUpfppgjEza",
                            "categories": [
                                { "id": "SH885jaRe0o" }
                            ]
                        }
                    }, {
                        "name": "MER Targets: Facility Based - DoD ONLY",
                        "id": "jEzgpBt5Icf",
                        "shortName": "MER T: Facility Based - DoD ONLY",
                        "periodType": "FinancialOct",
                        "workflow": {
                            "id": "TAjCBkG6hl6",
                            "periodType": "FinancialOct"
                        },
                        "categoryCombo": {
                            "name": "Funding Mechanism",
                            "id": "wUpfppgjEza",
                            "categories": [
                                { "id": "SH885jaRe0o" }
                            ]
                        }
                    }, {
                        "name": "MER Targets: Narratives (IM) FY2017",
                        "id": "AyFVOGbAvcH",
                        "shortName": "MER T: Narratives (IM) FY2017",
                        "periodType": "FinancialOct",
                        "workflow": {
                            "id": "TAjCBkG6hl6",
                            "periodType": "FinancialOct"
                        },
                        "categoryCombo": {
                            "name": "Funding Mechanism",
                            "id": "wUpfppgjEza",
                            "categories": [
                                { "id": "SH885jaRe0o" }
                            ]
                        }
                    }, {
                        "name": "MER Targets: Community Based - DoD ONLY FY2017",
                        "id": "lbwuIo56YoG",
                        "shortName": "MER T: Community Based - DoD ONLY FY2017",
                        "periodType": "FinancialOct",
                        "workflow": {
                            "id": "TAjCBkG6hl6",
                            "periodType": "FinancialOct"
                        }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] }
                    }, { "name": "MER Targets: Operating Unit Level (IM)", "id": "bqiB5G6qgzn", "shortName": "MER T: Operating Unit Level (IM)", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Operating Unit Level (IM) FY2017", "id": "xxo1G5V1JG2", "shortName": "MER T: Operating Unit Level (IM) FY2017", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Community Based FY2016", "id": "xJ06pxmxfU6", "shortName": "MER T: Community Based FY2016", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Narratives (IM) FY2016", "id": "VjGqATduoEX", "shortName": "MER T: Narratives (IM) FY2016", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Facility Based FY2016", "id": "rDAUgkkexU1", "shortName": "MER T: Facility Based FY2016", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Facility Based - DoD ONLY FY2016", "id": "IOarm0ctDVL", "shortName": "MER T: Facility Based - DoD ONLY FY2016", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Facility Based FY2017", "id": "qRvKHvlzNdv", "shortName": "MER T: Facility Based FY2017", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Community Based FY2017", "id": "tCIW2VFd8uu", "shortName": "MER T: Community Based FY2017", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Community Based - DoD ONLY", "id": "ePndtmDbOJj", "shortName": "MER T: Community Based - DoD ONLY", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Facility Based - DoD ONLY FY2017", "id": "JXKUYJqmyDd", "shortName": "MER T: Facility Based - DoD ONLY FY2017", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Narratives (IM)", "id": "AvmGbcurn4K", "shortName": "MER T: Narratives (IM)", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Facility Based", "id": "AitXBHsC7RA", "shortName": "MER T: Facility Based", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Community Based", "id": "BuRoS9i851o", "shortName": "MER T: Community Based", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Medical Store FY2017", "id": "Om3TJBRH8G8", "shortName": "MER T: Medical Store FY2017", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }, { "name": "MER Targets: Community Based - DoD ONLY FY2016", "id": "LBSk271pP7J", "shortName": "MER T: Community Based - DoD ONLY FY2016", "periodType": "FinancialOct", "workflow": { "id": "TAjCBkG6hl6", "periodType": "FinancialOct" }, "categoryCombo": { "name": "Funding Mechanism", "id": "wUpfppgjEza", "categories": [{ "id": "SH885jaRe0o" }] } }]
            }, {
                "name": "Custom workflow",
                "id": "AAAAAAAAAAA",
                "periodType": "FinancialOct",
            }]
    }
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
