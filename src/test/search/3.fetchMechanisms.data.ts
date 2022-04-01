import {SearchFilters} from "../../modules/list/models/filters.model";
import {SearchMechanism} from "../../modules/list/models/searchMechanism.model";

export type TestCase = {
    name: string;
    filters: SearchFilters;
    mechanisms: SearchMechanism[];
};

export const testCases:TestCase[] = [{
    name: `Results / 2020Q2 / Angola`,
    filters: {
        ou: 'XOivy2uDpMF',
        workflow: 'RwNpkAM7Hw7',
        period: '2020Q2',
    },
    mechanisms: [
        {
            "id": 0,
            "name": "18437 - AIDOAAI1500004AIDOAATO1500007 - GHSC-PSM",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Chemonics International, Inc.",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "18437 - AIDOAAI1500004AIDOAATO1500007 - GHSC-PSM",
                    "ou": "Angola",
                    "partner": "Chemonics International, Inc.",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "Nv8D9fP0IzS",
                    "ou": "XOivy2uDpMF",
                    "coId": "wgRTtrNpXx7"
                }
            },
            "selected": false
        },
        {
            "id": 1,
            "name": "00000 De-duplication adjustment",
            "ou": "Angola",
            "agency": "N/A",
            "partner": "N/A",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "00000 De-duplication adjustment",
                    "ou": "Angola",
                    "partner": "N/A",
                    "agency": "N/A"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "X8hrDf6bLDC",
                    "ou": "XOivy2uDpMF",
                    "coId": "xEzelmtHWPn"
                }
            },
            "selected": false
        },
        {
            "id": 2,
            "name": "17308 - AIDOAAA1400045 - Family Health International 360",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "FHI Development 360 LLC",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "17308 - AIDOAAA1400045 - Family Health International 360",
                    "ou": "Angola",
                    "partner": "FHI Development 360 LLC",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "lnSs5OhS8Bs",
                    "ou": "XOivy2uDpMF",
                    "coId": "eiLqJfVuWE9"
                }
            },
            "selected": false
        },
        {
            "id": 3,
            "name": "17848 - GH001918 - INLS",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "NATIONAL INSTITUTE OF AIDS",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "17848 - GH001918 - INLS",
                    "ou": "Angola",
                    "partner": "NATIONAL INSTITUTE OF AIDS",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "Wq5y73g38uV",
                    "ou": "XOivy2uDpMF",
                    "coId": "W1G4wE8ykTx"
                }
            },
            "selected": false
        },
        {
            "id": 4,
            "name": "17851 - GH001919 - SPH",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "NATIONAL SCHOOL OF PUBLIC HEALTH, GOVERNMENT OF REPUBLIC OF ANGOLA",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "17851 - GH001919 - SPH",
                    "ou": "Angola",
                    "partner": "NATIONAL SCHOOL OF PUBLIC HEALTH, GOVERNMENT OF REPUBLIC OF ANGOLA",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "oT63YM561k5",
                    "ou": "XOivy2uDpMF",
                    "coId": "D8xru5lzSUq"
                }
            },
            "selected": false
        },
        {
            "id": 5,
            "name": "17850 - GH000994 - ICAP",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Trustees Of Columbia University In The City Of New York",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "17850 - GH000994 - ICAP",
                    "ou": "Angola",
                    "partner": "Trustees Of Columbia University In The City Of New York",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "xhrPwhpnHxE",
                    "ou": "XOivy2uDpMF",
                    "coId": "kBOGStNzmpp"
                }
            },
            "selected": false
        },
        {
            "id": 6,
            "name": "00001 De-duplication adjustment (DSD-TA)",
            "ou": "Angola",
            "agency": "N/A",
            "partner": "N/A",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "00001 De-duplication adjustment (DSD-TA)",
                    "ou": "Angola",
                    "partner": "N/A",
                    "agency": "N/A"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "YGT1o7UxfFu",
                    "ou": "XOivy2uDpMF",
                    "coId": "OM58NubPbx1"
                }
            },
            "selected": false
        },
        {
            "id": 7,
            "name": "17397 - N002441510001 - CDU  Angola",
            "ou": "Angola",
            "agency": "DOD",
            "partner": "CHARLES DREW UNIVERSITY OF MEDICINE AND SCIENCE",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "17397 - N002441510001 - CDU  Angola",
                    "ou": "Angola",
                    "partner": "CHARLES DREW UNIVERSITY OF MEDICINE AND SCIENCE",
                    "agency": "DOD"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "GQXcFddMFIx",
                    "ou": "XOivy2uDpMF",
                    "coId": "WCHGpM6T7Va"
                }
            },
            "selected": false
        },
        {
            "id": 8,
            "name": "17490 - GH001097 - APHL",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Association of Public Health Laboratories, Inc. (THE)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "17490 - GH001097 - APHL",
                    "ou": "Angola",
                    "partner": "Association of Public Health Laboratories, Inc. (THE)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "V9BuRl1SwFT",
                    "ou": "XOivy2uDpMF",
                    "coId": "mGCsZNCZUDB"
                }
            },
            "selected": false
        },
        {
            "id": 9,
            "name": "18347 - AID654A1700003 - Health for All (HFA)",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Population Services International",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "18347 - AID654A1700003 - Health for All (HFA)",
                    "ou": "Angola",
                    "partner": "Population Services International",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "eEwKF0TAONC",
                    "ou": "XOivy2uDpMF",
                    "coId": "xHHV7LIc7xC"
                }
            },
            "selected": false
        },
        {
            "id": 10,
            "name": "00100 - PEPFAR-MOH align: MOH Data",
            "ou": "N/A",
            "agency": "N/A",
            "partner": "N/A",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "00100 - PEPFAR-MOH align: MOH Data",
                    "ou": "N/A",
                    "partner": "N/A",
                    "agency": "N/A"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "QCJpv5aDCJU",
                    "ou": "XOivy2uDpMF",
                    "coId": "mXjFJEexCHJ"
                }
            },
            "selected": false
        },
        {
            "id": 11,
            "name": "00200 - PEPFAR-MOH align: PEPFAR Data",
            "ou": "N/A",
            "agency": "N/A",
            "partner": "N/A",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "00200 - PEPFAR-MOH align: PEPFAR Data",
                    "ou": "N/A",
                    "partner": "N/A",
                    "agency": "N/A"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "TRX0yuTsJA9",
                    "ou": "XOivy2uDpMF",
                    "coId": "t6dWOH7W5Ml"
                }
            },
            "selected": false
        },
        {
            "id": 12,
            "name": "80060 - GH002140 - AFENET",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "AFRICAN FIELD EPIDEMIOLOGY NETWORK",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "80060 - GH002140 - AFENET",
                    "ou": "Angola",
                    "partner": "AFRICAN FIELD EPIDEMIOLOGY NETWORK",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "CMgy7OzrQAn",
                    "ou": "XOivy2uDpMF",
                    "coId": "MOTAokfjrME"
                }
            },
            "selected": false
        },
        {
            "id": 13,
            "name": "81000 - TBDawardDOD - [Placeholder - 81000 Angola  DOD ]",
            "ou": "Angola",
            "agency": "DOD",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81000 - TBDawardDOD - [Placeholder - 81000 Angola  DOD ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "DOD"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "GCrlcOBPp23",
                    "ou": "XOivy2uDpMF",
                    "coId": "HDbLP4iRUBe"
                }
            },
            "selected": false
        },
        {
            "id": 14,
            "name": "81001 - TBDawardDOD - [Placeholder - 81001 Angola  DOD ]",
            "ou": "Angola",
            "agency": "DOD",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81001 - TBDawardDOD - [Placeholder - 81001 Angola  DOD ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "DOD"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "WQaeF7teLGx",
                    "ou": "XOivy2uDpMF",
                    "coId": "SCFz4aMrjKI"
                }
            },
            "selected": false
        },
        {
            "id": 15,
            "name": "81003 - TBDawardHHSCDC - [Placeholder - 81003 Angola  HHS/CDC ]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81003 - TBDawardHHSCDC - [Placeholder - 81003 Angola  HHS/CDC ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "tFOBXSzN7U1",
                    "ou": "XOivy2uDpMF",
                    "coId": "Vu1qcM3EDSp"
                }
            },
            "selected": false
        },
        {
            "id": 16,
            "name": "81004 - TBDawardHHSCDC - [Placeholder - 81004 Angola  HHS/CDC ]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81004 - TBDawardHHSCDC - [Placeholder - 81004 Angola  HHS/CDC ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "qrVcX6I6ZOn",
                    "ou": "XOivy2uDpMF",
                    "coId": "j9hox6l4aYJ"
                }
            },
            "selected": false
        },
        {
            "id": 17,
            "name": "81005 - TBDawardHHSCDC - [Placeholder - 81005 Angola  HHS/CDC ]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81005 - TBDawardHHSCDC - [Placeholder - 81005 Angola  HHS/CDC ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "iYImcPXdxfS",
                    "ou": "XOivy2uDpMF",
                    "coId": "jwryDlO6HqU"
                }
            },
            "selected": false
        },
        {
            "id": 18,
            "name": "81006 - TBDawardHHSCDC - [Placeholder - 81006 Angola  HHS/CDC ]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81006 - TBDawardHHSCDC - [Placeholder - 81006 Angola  HHS/CDC ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "NsKjTw0Aezt",
                    "ou": "XOivy2uDpMF",
                    "coId": "jfm0CsQN4Dh"
                }
            },
            "selected": false
        },
        {
            "id": 19,
            "name": "81007 - TBDawardHHSCDC - [Placeholder - 81007 Angola  HHS/CDC ]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81007 - TBDawardHHSCDC - [Placeholder - 81007 Angola  HHS/CDC ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "G2m1tyhvQKE",
                    "ou": "XOivy2uDpMF",
                    "coId": "XrQZJmohA6Z"
                }
            },
            "selected": false
        },
        {
            "id": 20,
            "name": "81496 - TBDawardStateSGAC - [Placeholder - 81496 Angola State/SGAC]",
            "ou": "Angola",
            "agency": "State/SGAC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81496 - TBDawardStateSGAC - [Placeholder - 81496 Angola State/SGAC]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "State/SGAC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "UCtMOuRT6hr",
                    "ou": "XOivy2uDpMF",
                    "coId": "sn36aZT1jXM"
                }
            },
            "selected": false
        },
        {
            "id": 21,
            "name": "81009 - TBDawardUSAID - [Placeholder - 81009 Angola  USAID ]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81009 - TBDawardUSAID - [Placeholder - 81009 Angola  USAID ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "LRCTIldYHXy",
                    "ou": "XOivy2uDpMF",
                    "coId": "gXAQhb6RsdC"
                }
            },
            "selected": false
        },
        {
            "id": 22,
            "name": "81010 - 72067418CA00004 - Reducing Infections through Support and Education (RISE) II Project",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "MOTHERS2MOTHERS SOUTH AFRICA",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81010 - 72067418CA00004 - Reducing Infections through Support and Education (RISE) II Project",
                    "ou": "Angola",
                    "partner": "MOTHERS2MOTHERS SOUTH AFRICA",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "VwwJyrSIUoZ",
                    "ou": "XOivy2uDpMF",
                    "coId": "I7L4Tt4vVrx"
                }
            },
            "selected": false
        },
        {
            "id": 23,
            "name": "81011 - TBDawardUSAID - [Placeholder - 81011 Angola  USAID ]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81011 - TBDawardUSAID - [Placeholder - 81011 Angola  USAID ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "sp6HzaVzSFH",
                    "ou": "XOivy2uDpMF",
                    "coId": "PsyyPGHltlC"
                }
            },
            "selected": false
        },
        {
            "id": 24,
            "name": "81012 - TBDawardUSAID - [Placeholder - 81012 Angola  USAID ]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81012 - TBDawardUSAID - [Placeholder - 81012 Angola  USAID ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "JJ67qZTYuZj",
                    "ou": "XOivy2uDpMF",
                    "coId": "exFqa7lFLyi"
                }
            },
            "selected": false
        },
        {
            "id": 25,
            "name": "81013 - TBDawardUSAID - [Placeholder - 81013 Angola  USAID ]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81013 - TBDawardUSAID - [Placeholder - 81013 Angola  USAID ]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "rYkbsTDNTxA",
                    "ou": "XOivy2uDpMF",
                    "coId": "kMupPPoQ8O2"
                }
            },
            "selected": false
        },
        {
            "id": 26,
            "name": "81008 - AIDOAAI1500002AIDOAATO1500004 - GHSC-RTK",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Remote Medicine Inc.",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81008 - AIDOAAI1500002AIDOAATO1500004 - GHSC-RTK",
                    "ou": "Angola",
                    "partner": "Remote Medicine Inc.",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "ZPm9ShakgkZ",
                    "ou": "XOivy2uDpMF",
                    "coId": "oy1tsfa8WTS"
                }
            },
            "selected": false
        },
        {
            "id": 27,
            "name": "81002 - GH002216 - ICAP",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Trustees Of Columbia University In The City Of New York",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "81002 - GH002216 - ICAP",
                    "ou": "Angola",
                    "partner": "Trustees Of Columbia University In The City Of New York",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "eouPVGemcrh",
                    "ou": "XOivy2uDpMF",
                    "coId": "eTnd6UeNUep"
                }
            },
            "selected": false
        },
        {
            "id": 28,
            "name": "84001 - TBDawardDOD - [Placeholder - 84001 Angola DOD]",
            "ou": "Angola",
            "agency": "DOD",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84001 - TBDawardDOD - [Placeholder - 84001 Angola DOD]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "DOD"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "Ya9PItFPKW7",
                    "ou": "XOivy2uDpMF",
                    "coId": "mAdpb0tySPL"
                }
            },
            "selected": false
        },
        {
            "id": 29,
            "name": "84002 - TBDawardDOD - [Placeholder - 84002 Angola DOD]",
            "ou": "Angola",
            "agency": "DOD",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84002 - TBDawardDOD - [Placeholder - 84002 Angola DOD]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "DOD"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "HOY3yv8PdFt",
                    "ou": "XOivy2uDpMF",
                    "coId": "SEXR61edkOW"
                }
            },
            "selected": false
        },
        {
            "id": 30,
            "name": "84004 - TBDawardHHSCDC - [Placeholder - 84004 Angola HHS/CDC]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84004 - TBDawardHHSCDC - [Placeholder - 84004 Angola HHS/CDC]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "JDti5UBlHgn",
                    "ou": "XOivy2uDpMF",
                    "coId": "oTNQ7fuLgEk"
                }
            },
            "selected": false
        },
        {
            "id": 31,
            "name": "84005 - TBDawardHHSCDC - [Placeholder - 84005 Angola HHS/CDC]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84005 - TBDawardHHSCDC - [Placeholder - 84005 Angola HHS/CDC]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "Mt8MBmkSpTq",
                    "ou": "XOivy2uDpMF",
                    "coId": "CRGqmQiOUrV"
                }
            },
            "selected": false
        },
        {
            "id": 32,
            "name": "84006 - TBDawardHHSCDC - [Placeholder - 84006 Angola HHS/CDC]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84006 - TBDawardHHSCDC - [Placeholder - 84006 Angola HHS/CDC]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "ueF5aqQlRwt",
                    "ou": "XOivy2uDpMF",
                    "coId": "YKwoPjYV674"
                }
            },
            "selected": false
        },
        {
            "id": 33,
            "name": "84007 - TBDawardHHSCDC - [Placeholder - 84007 Angola HHS/CDC]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84007 - TBDawardHHSCDC - [Placeholder - 84007 Angola HHS/CDC]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "OcKRBsfjWWg",
                    "ou": "XOivy2uDpMF",
                    "coId": "RDKXVc7QjA0"
                }
            },
            "selected": false
        },
        {
            "id": 34,
            "name": "84008 - TBDawardHHSCDC - [Placeholder - 84008 Angola HHS/CDC]",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84008 - TBDawardHHSCDC - [Placeholder - 84008 Angola HHS/CDC]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "KaUNc7Wlofh",
                    "ou": "XOivy2uDpMF",
                    "coId": "m9fmbdCGzcE"
                }
            },
            "selected": false
        },
        {
            "id": 35,
            "name": "84009 - TBDawardUSAID - [Placeholder - 84009 Angola USAID]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84009 - TBDawardUSAID - [Placeholder - 84009 Angola USAID]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "f6Q8XOMoSZo",
                    "ou": "XOivy2uDpMF",
                    "coId": "Itqlt1Dsd83"
                }
            },
            "selected": false
        },
        {
            "id": 36,
            "name": "84010 - TBDawardUSAID - [Placeholder - 84010 Angola USAID]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84010 - TBDawardUSAID - [Placeholder - 84010 Angola USAID]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "xX1qacD9SEO",
                    "ou": "XOivy2uDpMF",
                    "coId": "nx2Sn1RgQle"
                }
            },
            "selected": false
        },
        {
            "id": 37,
            "name": "84011 - TBDawardUSAID - [Placeholder - 84011 Angola USAID]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84011 - TBDawardUSAID - [Placeholder - 84011 Angola USAID]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "tlT3S4f91bS",
                    "ou": "XOivy2uDpMF",
                    "coId": "KWHEhNxG5ZI"
                }
            },
            "selected": false
        },
        {
            "id": 38,
            "name": "84003 - GH002093 - Public Health Institute",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "PUBLIC HEALTH INSTITUTE",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84003 - GH002093 - Public Health Institute",
                    "ou": "Angola",
                    "partner": "PUBLIC HEALTH INSTITUTE",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "NglUlEUR5Rl",
                    "ou": "XOivy2uDpMF",
                    "coId": "LuYzBpnUHiF"
                }
            },
            "selected": false
        },
        {
            "id": 39,
            "name": "84012 - TBDawardUSAID - [Placeholder - 84012 Angola USAID]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84012 - TBDawardUSAID - [Placeholder - 84012 Angola USAID]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "uIaa9mBwJD7",
                    "ou": "XOivy2uDpMF",
                    "coId": "H4xSuUYERV3"
                }
            },
            "selected": false
        },
        {
            "id": 40,
            "name": "84013 - TBDawardUSAID - [Placeholder - 84013 Angola USAID]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84013 - TBDawardUSAID - [Placeholder - 84013 Angola USAID]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "TLhWmqkbJTV",
                    "ou": "XOivy2uDpMF",
                    "coId": "m2uPCTEeEVi"
                }
            },
            "selected": false
        },
        {
            "id": 41,
            "name": "84014 - TBDawardUSAID - [Placeholder - 84014 Angola USAID]",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "accepted by global",
            "_originalMechanism": {
                "info": {
                    "name": "84014 - TBDawardUSAID - [Placeholder - 84014 Angola USAID]",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by global",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": true
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "QjAOT0lpyyR",
                    "ou": "XOivy2uDpMF",
                    "coId": "xodpSfFc1mw"
                }
            },
            "selected": false
        }
    ]
},{
    name: `ER / 2017Oct / Angola`,
    filters: {
        ou: 'XOivy2uDpMF',
        workflow: 'WUD8TApgOu1',
        period: '2017Oct',
    },
    mechanisms: [
        {
            "id": 0,
            "name": "11981 - MOH/National Blood Center (CNS)",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Ministry of Health, Angola",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "11981 - MOH/National Blood Center (CNS)",
                    "ou": "Angola",
                    "partner": "Ministry of Health, Angola",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "ZPGrAJVI45V",
                    "ou": "XOivy2uDpMF",
                    "coId": "mDLiARTjHRD"
                }
            },
            "selected": false
        },
        {
            "id": 1,
            "name": "11985 - APHL (Lab)",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Association of Public Health Laboratories, Inc. (THE)",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "11985 - APHL (Lab)",
                    "ou": "Angola",
                    "partner": "Association of Public Health Laboratories, Inc. (THE)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "Rd4tyqg5Zj7",
                    "ou": "XOivy2uDpMF",
                    "coId": "lGx0F2vOvHZ"
                }
            },
            "selected": false
        },
        {
            "id": 2,
            "name": "12943 - AFENET-LAB",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "AFRICAN FIELD EPIDEMIOLOGY NETWORK",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "12943 - AFENET-LAB",
                    "ou": "Angola",
                    "partner": "AFRICAN FIELD EPIDEMIOLOGY NETWORK",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "PlEYBuEu9yu",
                    "ou": "XOivy2uDpMF",
                    "coId": "N1EBBjMng5O"
                }
            },
            "selected": false
        },
        {
            "id": 3,
            "name": "12953 - FELTP MOH/National School of Public Health",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Ministry of Health, Angola",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "12953 - FELTP MOH/National School of Public Health",
                    "ou": "Angola",
                    "partner": "Ministry of Health, Angola",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "qk3FFGeWJv4",
                    "ou": "XOivy2uDpMF",
                    "coId": "ARQO3RAiV1e"
                }
            },
            "selected": false
        },
        {
            "id": 4,
            "name": "13163 - Gender Based Violence",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "EngenderHealth, Inc.",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "13163 - Gender Based Violence",
                    "ou": "Angola",
                    "partner": "EngenderHealth, Inc.",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "PE1aHhEkGSF",
                    "ou": "XOivy2uDpMF",
                    "coId": "RkZ0TmD19MM"
                }
            },
            "selected": false
        },
        {
            "id": 5,
            "name": "13528 - FELTP/UAN",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "MINISTRY OF HIGHER EDUCATION AND SCIENCE AND TECHNOLOGY / UNIVERSITY AGOSTINHO NETO",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "13528 - FELTP/UAN",
                    "ou": "Angola",
                    "partner": "MINISTRY OF HIGHER EDUCATION AND SCIENCE AND TECHNOLOGY / UNIVERSITY AGOSTINHO NETO",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "gNbFZ1ejaIO",
                    "ou": "XOivy2uDpMF",
                    "coId": "FNvZDBbe1No"
                }
            },
            "selected": false
        },
        {
            "id": 6,
            "name": "13531 - AFENET/FELTP",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "AFRICAN FIELD EPIDEMIOLOGY NETWORK",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "13531 - AFENET/FELTP",
                    "ou": "Angola",
                    "partner": "AFRICAN FIELD EPIDEMIOLOGY NETWORK",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "TlTwPwWIUOd",
                    "ou": "XOivy2uDpMF",
                    "coId": "oDUr0TlbhVx"
                }
            },
            "selected": false
        },
        {
            "id": 7,
            "name": "13559 - Strengthening Angolan Systems for Health (SASH)",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "JHPIEGO CORPORATION",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "13559 - Strengthening Angolan Systems for Health (SASH)",
                    "ou": "Angola",
                    "partner": "JHPIEGO CORPORATION",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "nYb1tJnit15",
                    "ou": "XOivy2uDpMF",
                    "coId": "Es9gK0tkPaQ"
                }
            },
            "selected": false
        },
        {
            "id": 8,
            "name": "13572 - Ouakula (Social Marketing for Health)",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Population Services International",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "13572 - Ouakula (Social Marketing for Health)",
                    "ou": "Angola",
                    "partner": "Population Services International",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "erSKYS7GYKQ",
                    "ou": "XOivy2uDpMF",
                    "coId": "fErafACQXNC"
                }
            },
            "selected": false
        },
        {
            "id": 9,
            "name": "13625 - PROACTIVO",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Population Services International",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "13625 - PROACTIVO",
                    "ou": "Angola",
                    "partner": "Population Services International",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "ZzQ0hBMKJFE",
                    "ou": "XOivy2uDpMF",
                    "coId": "dekexSto6kd"
                }
            },
            "selected": false
        },
        {
            "id": 10,
            "name": "13773 - Next Generation BSS Truckers Study",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Health and Development Africa",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "13773 - Next Generation BSS Truckers Study",
                    "ou": "Angola",
                    "partner": "Health and Development Africa",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "B07CeVv20Xd",
                    "ou": "XOivy2uDpMF",
                    "coId": "zuX8jdYPbPk"
                }
            },
            "selected": false
        },
        {
            "id": 11,
            "name": "14245 - Next Generation BSS Prisoners Study",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Health and Development Africa",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "14245 - Next Generation BSS Prisoners Study",
                    "ou": "Angola",
                    "partner": "Health and Development Africa",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "xSFIoGnAJDj",
                    "ou": "XOivy2uDpMF",
                    "coId": "aTMVDFYwouA"
                }
            },
            "selected": false
        },
        {
            "id": 12,
            "name": "14382 - Civil-Military alliance",
            "ou": "Angola",
            "agency": "DOD",
            "partner": "CHARLES DREW UNIVERSITY OF MEDICINE AND SCIENCE",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "14382 - Civil-Military alliance",
                    "ou": "Angola",
                    "partner": "CHARLES DREW UNIVERSITY OF MEDICINE AND SCIENCE",
                    "agency": "DOD"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "U4vu2ZTZFOJ",
                    "ou": "XOivy2uDpMF",
                    "coId": "FEWQjo9YNPJ"
                }
            },
            "selected": false
        },
        {
            "id": 13,
            "name": "14568 - Project Evaluations",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "14568 - Project Evaluations",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "w6Y0pHOOkPa",
                    "ou": "XOivy2uDpMF",
                    "coId": "Is0yzewsbIr"
                }
            },
            "selected": false
        },
        {
            "id": 14,
            "name": "16172 - Kamba de Verdade",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Search for Common Ground",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "16172 - Kamba de Verdade",
                    "ou": "Angola",
                    "partner": "Search for Common Ground",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "pytks5emaqO",
                    "ou": "XOivy2uDpMF",
                    "coId": "HSqa1pYU1Ne"
                }
            },
            "selected": false
        },
        {
            "id": 15,
            "name": "16173 - Building Local Capacity (BLC)",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Management Sciences For Health, Inc.",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "16173 - Building Local Capacity (BLC)",
                    "ou": "Angola",
                    "partner": "Management Sciences For Health, Inc.",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "szgSUK9xU1T",
                    "ou": "XOivy2uDpMF",
                    "coId": "h38uPVtWTQ8"
                }
            },
            "selected": false
        },
        {
            "id": 16,
            "name": "16720 - Nkento Wa Biza",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "S.O.S. Cedia",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "16720 - Nkento Wa Biza",
                    "ou": "Angola",
                    "partner": "S.O.S. Cedia",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "qxnKAAGAX0e",
                    "ou": "XOivy2uDpMF",
                    "coId": "dY5qkxEZQrB"
                }
            },
            "selected": false
        },
        {
            "id": 17,
            "name": "16721 - Cross Border/Ports, Cuenene Epi HIV/TB Surveillance",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "16721 - Cross Border/Ports, Cuenene Epi HIV/TB Surveillance",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "b5fO34TieSb",
                    "ou": "XOivy2uDpMF",
                    "coId": "CU6cFaGd5Qm"
                }
            },
            "selected": false
        },
        {
            "id": 18,
            "name": "16913 - Supply Chain Management System (SCMS)",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Partnership for Supply Chain Management",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "16913 - Supply Chain Management System (SCMS)",
                    "ou": "Angola",
                    "partner": "Partnership for Supply Chain Management",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "afJppVbWbgm",
                    "ou": "XOivy2uDpMF",
                    "coId": "U3n9zUTKVg4"
                }
            },
            "selected": false
        },
        {
            "id": 19,
            "name": "16914 - ConSaude",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "ConSaude",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "16914 - ConSaude",
                    "ou": "Angola",
                    "partner": "ConSaude",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "Mtxj0F1FEuE",
                    "ou": "XOivy2uDpMF",
                    "coId": "YfGf72RRIP3"
                }
            },
            "selected": false
        },
        {
            "id": 20,
            "name": "00000 De-duplication adjustment",
            "ou": "Angola",
            "agency": "N/A",
            "partner": "N/A",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "00000 De-duplication adjustment",
                    "ou": "Angola",
                    "partner": "N/A",
                    "agency": "N/A"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "X8hrDf6bLDC",
                    "ou": "XOivy2uDpMF",
                    "coId": "xEzelmtHWPn"
                }
            },
            "selected": false
        },
        {
            "id": 21,
            "name": "17787 - APHL",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Association of Public Health Laboratories, Inc. (THE)",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "17787 - APHL",
                    "ou": "Angola",
                    "partner": "Association of Public Health Laboratories, Inc. (THE)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "IOFeDzyP98V",
                    "ou": "XOivy2uDpMF",
                    "coId": "zp39cgnFtaL"
                }
            },
            "selected": false
        },
        {
            "id": 22,
            "name": "17306 - Comité Empresarial Contra VIH/SIDA  (CEC-HIV/AIDS)",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "World Learning Inc.",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "17306 - Comité Empresarial Contra VIH/SIDA  (CEC-HIV/AIDS)",
                    "ou": "Angola",
                    "partner": "World Learning Inc.",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "A8tjqn4OZor",
                    "ou": "XOivy2uDpMF",
                    "coId": "ffQyQApKIw9"
                }
            },
            "selected": false
        },
        {
            "id": 23,
            "name": "17786 - Comité Empresarial Contra VIH/SIDA  (CEC-HIV/AIDS)",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "CEC-HIV/AIDS",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "17786 - Comité Empresarial Contra VIH/SIDA  (CEC-HIV/AIDS)",
                    "ou": "Angola",
                    "partner": "CEC-HIV/AIDS",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "zirMbgk2wrZ",
                    "ou": "XOivy2uDpMF",
                    "coId": "yt0kzEGjOOc"
                }
            },
            "selected": false
        },
        {
            "id": 24,
            "name": "17308 - AIDOAAA1400045 - Family Health International 360",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "FHI Development 360 LLC",
            "status": "accepted by agency hq",
            "_originalMechanism": {
                "info": {
                    "name": "17308 - AIDOAAA1400045 - Family Health International 360",
                    "ou": "Angola",
                    "partner": "FHI Development 360 LLC",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by agency hq",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "lnSs5OhS8Bs",
                    "ou": "XOivy2uDpMF",
                    "coId": "eiLqJfVuWE9"
                }
            },
            "selected": false
        },
        {
            "id": 25,
            "name": "17848 - GH001918 - INLS",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "NATIONAL INSTITUTE OF AIDS",
            "status": "accepted by agency hq",
            "_originalMechanism": {
                "info": {
                    "name": "17848 - GH001918 - INLS",
                    "ou": "Angola",
                    "partner": "NATIONAL INSTITUTE OF AIDS",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by agency hq",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "Wq5y73g38uV",
                    "ou": "XOivy2uDpMF",
                    "coId": "W1G4wE8ykTx"
                }
            },
            "selected": false
        },
        {
            "id": 26,
            "name": "17851 - GH001919 - SPH",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "NATIONAL SCHOOL OF PUBLIC HEALTH, GOVERNMENT OF REPUBLIC OF ANGOLA",
            "status": "accepted by agency hq",
            "_originalMechanism": {
                "info": {
                    "name": "17851 - GH001919 - SPH",
                    "ou": "Angola",
                    "partner": "NATIONAL SCHOOL OF PUBLIC HEALTH, GOVERNMENT OF REPUBLIC OF ANGOLA",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by agency hq",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "oT63YM561k5",
                    "ou": "XOivy2uDpMF",
                    "coId": "D8xru5lzSUq"
                }
            },
            "selected": false
        },
        {
            "id": 27,
            "name": "17850 - GH000994 - ICAP",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Trustees Of Columbia University In The City Of New York",
            "status": "accepted by agency hq",
            "_originalMechanism": {
                "info": {
                    "name": "17850 - GH000994 - ICAP",
                    "ou": "Angola",
                    "partner": "Trustees Of Columbia University In The City Of New York",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by agency hq",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "xhrPwhpnHxE",
                    "ou": "XOivy2uDpMF",
                    "coId": "kBOGStNzmpp"
                }
            },
            "selected": false
        },
        {
            "id": 28,
            "name": "00001 De-duplication adjustment (DSD-TA)",
            "ou": "Angola",
            "agency": "N/A",
            "partner": "N/A",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "00001 De-duplication adjustment (DSD-TA)",
                    "ou": "Angola",
                    "partner": "N/A",
                    "agency": "N/A"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "YGT1o7UxfFu",
                    "ou": "XOivy2uDpMF",
                    "coId": "OM58NubPbx1"
                }
            },
            "selected": false
        },
        {
            "id": 29,
            "name": "13607 - SIAPS - OLD",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Management Sciences For Health, Inc.",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "13607 - SIAPS - OLD",
                    "ou": "Angola",
                    "partner": "Management Sciences For Health, Inc.",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "GuzCwq6jPCX",
                    "ou": "XOivy2uDpMF",
                    "coId": "ZZhkC623rYS"
                }
            },
            "selected": false
        },
        {
            "id": 30,
            "name": "17397 - N002441510001 - CDU  Angola",
            "ou": "Angola",
            "agency": "DOD",
            "partner": "CHARLES DREW UNIVERSITY OF MEDICINE AND SCIENCE",
            "status": "accepted by agency hq",
            "_originalMechanism": {
                "info": {
                    "name": "17397 - N002441510001 - CDU  Angola",
                    "ou": "Angola",
                    "partner": "CHARLES DREW UNIVERSITY OF MEDICINE AND SCIENCE",
                    "agency": "DOD"
                },
                "state": {
                    "status": "accepted by agency hq",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "GQXcFddMFIx",
                    "ou": "XOivy2uDpMF",
                    "coId": "WCHGpM6T7Va"
                }
            },
            "selected": false
        },
        {
            "id": 31,
            "name": "17490 - GH001097 - APHL",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "Association of Public Health Laboratories, Inc. (THE)",
            "status": "accepted by agency hq",
            "_originalMechanism": {
                "info": {
                    "name": "17490 - GH001097 - APHL",
                    "ou": "Angola",
                    "partner": "Association of Public Health Laboratories, Inc. (THE)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by agency hq",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "V9BuRl1SwFT",
                    "ou": "XOivy2uDpMF",
                    "coId": "mGCsZNCZUDB"
                }
            },
            "selected": false
        },
        {
            "id": 32,
            "name": "18348 - DHS 7",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "ICF Macro",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "18348 - DHS 7",
                    "ou": "Angola",
                    "partner": "ICF Macro",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "KlaBJ0MH9wj",
                    "ou": "XOivy2uDpMF",
                    "coId": "kOuJuWjlGur"
                }
            },
            "selected": false
        },
        {
            "id": 33,
            "name": "18347 - AID654A1700003 - Health for All (HFA)",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Population Services International",
            "status": "accepted by agency hq",
            "_originalMechanism": {
                "info": {
                    "name": "18347 - AID654A1700003 - Health for All (HFA)",
                    "ou": "Angola",
                    "partner": "Population Services International",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by agency hq",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "eEwKF0TAONC",
                    "ou": "XOivy2uDpMF",
                    "coId": "xHHV7LIc7xC"
                }
            },
            "selected": false
        },
        {
            "id": 34,
            "name": "18437 - AIDOAAI1500004AIDOAATO1500007 - GHSC-PSM",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Chemonics International, Inc.",
            "status": "accepted by agency hq",
            "_originalMechanism": {
                "info": {
                    "name": "18437 - AIDOAAI1500004AIDOAATO1500007 - GHSC-PSM",
                    "ou": "Angola",
                    "partner": "Chemonics International, Inc.",
                    "agency": "USAID"
                },
                "state": {
                    "status": "accepted by agency hq",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "Nv8D9fP0IzS",
                    "ou": "XOivy2uDpMF",
                    "coId": "wgRTtrNpXx7"
                }
            },
            "selected": false
        },
        {
            "id": 35,
            "name": "00100 - PEPFAR-MOH align: MOH Data",
            "ou": "N/A",
            "agency": "N/A",
            "partner": "N/A",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "00100 - PEPFAR-MOH align: MOH Data",
                    "ou": "N/A",
                    "partner": "N/A",
                    "agency": "N/A"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "QCJpv5aDCJU",
                    "ou": "XOivy2uDpMF",
                    "coId": "mXjFJEexCHJ"
                }
            },
            "selected": false
        },
        {
            "id": 36,
            "name": "00200 - PEPFAR-MOH align: PEPFAR Data",
            "ou": "N/A",
            "agency": "N/A",
            "partner": "N/A",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "00200 - PEPFAR-MOH align: PEPFAR Data",
                    "ou": "N/A",
                    "partner": "N/A",
                    "agency": "N/A"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "TRX0yuTsJA9",
                    "ou": "XOivy2uDpMF",
                    "coId": "t6dWOH7W5Ml"
                }
            },
            "selected": false
        },
        {
            "id": 37,
            "name": "17471 - African Society for Laboratory Medicine",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "AFRICAN SOCIETY FOR LABORATOR Y MEDICINE",
            "status": "accepted by agency hq",
            "_originalMechanism": {
                "info": {
                    "name": "17471 - African Society for Laboratory Medicine",
                    "ou": "Angola",
                    "partner": "AFRICAN SOCIETY FOR LABORATOR Y MEDICINE",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "accepted by agency hq",
                    "actions": {
                        "submit": false,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "xUnrfZaBnvP",
                    "ou": "XOivy2uDpMF",
                    "coId": "Q7siedwztHK"
                }
            },
            "selected": false
        },
        {
            "id": 38,
            "name": "16659 - to be completed",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "16659 - to be completed",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "aoLicccxLGt",
                    "ou": "XOivy2uDpMF",
                    "coId": "I3RYhdRfAMG"
                }
            },
            "selected": false
        },
        {
            "id": 39,
            "name": "17290 - TALYA TEST - ANGOLA 01",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "TBD (000000000)",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "17290 - TALYA TEST - ANGOLA 01",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "dAKRirBxWwA",
                    "ou": "XOivy2uDpMF",
                    "coId": "JZULJRJcjX9"
                }
            },
            "selected": false
        },
        {
            "id": 40,
            "name": "17315 - Angola Laboratory Association",
            "ou": "Angola",
            "agency": "HHS/CDC",
            "partner": "New Partner",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "17315 - Angola Laboratory Association",
                    "ou": "Angola",
                    "partner": "New Partner",
                    "agency": "HHS/CDC"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "X2Fv6h0b7ev",
                    "ou": "XOivy2uDpMF",
                    "coId": "xYFgdICHQj8"
                }
            },
            "selected": false
        },
        {
            "id": 41,
            "name": "17307 - Community Mobilization for HIV",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "TBD (000000000)",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "17307 - Community Mobilization for HIV",
                    "ou": "Angola",
                    "partner": "TBD (000000000)",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "vI4uJwboQ6C",
                    "ou": "XOivy2uDpMF",
                    "coId": "mXumn4kzOIb"
                }
            },
            "selected": false
        },
        {
            "id": 42,
            "name": "17319 - Ampla Saude",
            "ou": "Angola",
            "agency": "USAID",
            "partner": "Abt Associates Inc.",
            "status": "pending at partner",
            "_originalMechanism": {
                "info": {
                    "name": "17319 - Ampla Saude",
                    "ou": "Angola",
                    "partner": "Abt Associates Inc.",
                    "agency": "USAID"
                },
                "state": {
                    "status": "pending at partner",
                    "actions": {
                        "submit": true,
                        "accept": false,
                        "recall": false,
                        "return": false
                    },
                    "view": true
                },
                "meta": {
                    "cocId": "OzrqZkBbprI",
                    "ou": "XOivy2uDpMF",
                    "coId": "DoP69EZVhgL"
                }
            },
            "selected": false
        }
    ]
}];
