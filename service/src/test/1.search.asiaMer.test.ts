import {SelectedFilters} from "../misc/types/misc.types.ts";
import {mockFetch} from "../testUtils/services/mockFetch.service.ts";
import {searchMechanisms} from "../mechanism/services/searchMechanisms.service.ts";
import {ApprovalStatus} from "../approvalStatus/types/approvalStatus.types.ts";
import {expect} from "vitest";
import {allAsiaMerData} from "./data/1.search.asiaMer.data.ts";

test(`1 > Search > MER Results > Asia Region`, async () => {
    const filters:SelectedFilters = {
        ouId: 'ptVxnBssua6',
        period: '2023Q2',
        workflow: 'RwNpkAM7Hw7'
    }
    mockFetch(allAsiaMerData)
    const {mechanisms} = await searchMechanisms(filters,null, true)

    // 386 results
    expect(mechanisms.length).toBe(386)

    // All accepted by global
    expect(mechanisms.every(({state:{approvalStatus }})=>approvalStatus===ApprovalStatus.acceptedByGlobal)).toBeTruthy()

    // Only "return" action should be available
    mechanisms.forEach(({state:{possibleActions}})=>expect(possibleActions).toStrictEqual({
        accept: false,
        recall: false,
        submit: false,
        return: true
    }));

    // Should include internal mechanisms
    [
        '00000 De-duplication adjustment',
        '00001 De-duplication adjustment (DSD-TA)',
        '00100 - PEPFAR-MOH align: MOH Data',
        '00200 - PEPFAR-MOH align: PEPFAR Data'
    ].forEach((mechName)=>{
        expect(mechanisms.map(({info:{mechanismName}})=>mechanismName).includes(mechName))
    })
})