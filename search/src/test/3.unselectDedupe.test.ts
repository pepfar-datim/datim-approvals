import {renderSearch} from "./utils/renderSearch.tsx";
import {fireEvent, screen} from "@testing-library/react";
import {meGlobalUrls} from "./utils/fetchUrls.const.ts";
import {angolaSearchAtPartner, systemUrls} from '@approvals/service'

const urls = {
    ...systemUrls,
    ...meGlobalUrls,
    ...angolaSearchAtPartner,
}

test(`3 > Unselect dedupes`, async ()=>{
    window.location.search = '?workflow=TsowbK0Ql3T&period=2022Oct&ouId=XOivy2uDpMF'
    await renderSearch(urls)
    await screen.findByText('50 mechanisms')
    fireEvent.click(document.querySelector('input[type=checkbox]'))
    screen.getByText('50 selected mechanisms')
    screen.getByText('Dedupe mechanisms are selected.')
    fireEvent.click(screen.getByText('Unselect Dedupe mechanisms'))
    screen.getByText('48 selected mechanisms')
})