import {searchMechanisms} from "../mechanism/services/searchMechanisms.service.ts";
import {SelectedFilters} from "../misc/types/misc.types.ts";
import {mockFetch} from "../testUtils/services/mockFetch.service.ts";
import {searchAsia} from "../testUtils/urls/searchUrls.const.ts";
import {ApprovalStatus} from "../approvalStatus/types/approvalStatus.types.ts";
import {expect} from "vitest";

test(`1 > Search mechanisms and get correct statuses`, async () => {
    const filters:SelectedFilters = {
        ouId: 'ptVxnBssua6',
        period: '2023Q2',
        workflow: 'RwNpkAM7Hw7'
    }
    mockFetch(searchAsia)
    const {mechanisms} = await searchMechanisms(filters)
    const statuses:Set<ApprovalStatus> = new Set(mechanisms.map(({state:{approvalStatus}})=>approvalStatus))
    // All mechanisms should be "accepted by global"
    expect(statuses.size).toBe(1)
    expect(mechanisms[0].state.approvalStatus).toBe(ApprovalStatus.acceptedByGlobal)

    // Only "return" action should be available
    const actions:Set<string> = new Set(mechanisms.map(({state:{possibleActions}})=>possibleActions).map((actions)=>JSON.stringify(actions)))
    expect(actions.size).toBe(1)
    expect(mechanisms[0].state.possibleActions).toStrictEqual({
        accept: false,
        recall: false,
        submit: false,
        return: true
    })
})