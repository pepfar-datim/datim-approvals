import {renderSearch} from "./utils/renderSearch.tsx";
import {screen} from "@testing-library/react";
import {meGlobalUrls} from "./utils/fetchUrls.const.ts";
import {angolaSearchAtPartner, systemUrls} from '@approvals/service'

const urls = {
    ...systemUrls,
    ...meGlobalUrls,
    ...angolaSearchAtPartner,
}

test(`6> Default sort`, async ()=>{
    window.location.search = '?workflow=TsowbK0Ql3T&period=2022Oct&ouId=XOivy2uDpMF'
    await renderSearch(urls)
    await screen.findByText('50 mechanisms')
    const mechanismNames = [
        '00000 De-duplication adjustment',
        '00001 De-duplication adjustment (DSD-TA)'
    ]
    mechanismNames.forEach((mechanismName, index)=>{
        const row = document.querySelector(`[data-rowindex=${index}] [data-field="info.mechanismName"]`)
        expect(row.textContent).toBe(mechanismName)
    })
})