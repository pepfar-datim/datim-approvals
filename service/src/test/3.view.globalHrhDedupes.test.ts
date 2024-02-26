import {SelectedFilters} from "../misc/types/misc.types.ts";
import {mockFetch} from "../testUtils/services/mockFetch.service.ts";
import {searchMechanisms} from "../mechanism/services/searchMechanisms.service.ts";
import {ApprovalStatus} from "../approvalStatus/types/approvalStatus.types.ts";
import {expect} from "vitest";
import {searchGlobalHrh} from "./data/2.search.globalHrh.data.ts";
import {MechanismMetadata} from "../mechanism/types/searchMechanism.types.ts";
import {viewGlobalHrhDedupes} from "./data/3.view.globalHrhDedupes.data.ts";

test(`3 > HRH > Global > 3 selected dedupes`, async () => {
    const filters:SelectedFilters = {
        "period": "2022Oct",
        "workflow": "TsowbK0Ql3T",
        "ouId": "ybg3MO3hcf4"
    }
    const selectedIds:MechanismMetadata[] = [
        {
            "ou": "l1KFEXKI4Dg",
            "approvalsId": "X8hrDf6bLDC",
            "categoryOptionComboId": "X8hrDf6bLDC"
        },
        {
            "ou": "ptVxnBssua6",
            "approvalsId": "X8hrDf6bLDC",
            "categoryOptionComboId": "X8hrDf6bLDC"
        },
        {
            "ou": "XOivy2uDpMF",
            "approvalsId": "X8hrDf6bLDC",
            "categoryOptionComboId": "X8hrDf6bLDC"
        }
    ]
    mockFetch(viewGlobalHrhDedupes)
    const {mechanisms} = await searchMechanisms(filters,selectedIds, true)

    // 3 results
    expect(mechanisms.length).toBe(3)

    expect(mechanisms[0].info.partnerName).toBe('Dedupe adjustments Partner')
    expect(mechanisms[0].info.agency).toBe('Dedupe adjustments Agency')
})