import {SelectedFilters} from "../misc/types/misc.types.ts";
import {mockFetch} from "../testUtils/services/mockFetch.service.ts";
import {searchMechanisms} from "../mechanism/services/searchMechanisms.service.ts";
import {ApprovalStatus} from "../approvalStatus/types/approvalStatus.types.ts";
import {expect} from "vitest";
import {searchGlobalHrh} from "./data/2.search.globalHrh.data.ts";

test(`2 > HRH > Global`, async () => {
    const filters:SelectedFilters = {
        ouId: 'ybg3MO3hcf4',
        period: '2022Oct',
        workflow: 'TsowbK0Ql3T'
    }
    mockFetch(searchGlobalHrh)
    const {mechanisms} = await searchMechanisms(filters,null, true)

    // 4278 results
    expect(mechanisms.length).toBe(4278)

    // 4277 at global
    expect(mechanisms.filter(({state:{approvalStatus}})=>approvalStatus===ApprovalStatus.acceptedByGlobal).length).toBe(4277)

})