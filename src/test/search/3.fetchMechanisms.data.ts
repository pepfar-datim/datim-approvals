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
}];
