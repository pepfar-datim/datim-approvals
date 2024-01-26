import {renderSearch} from "./utils/renderSearch.tsx";
import {fireEvent, screen} from "@testing-library/react";
import {meGlobalUrls} from "./utils/fetchUrls.const.ts";
import {angolaSearchAtPartner, systemUrls} from '@approvals/service'

const urls = {
    ...systemUrls,
    ...meGlobalUrls,
    ...angolaSearchAtPartner,
}

test(`4 > Switch tabs`, async ()=>{
    window.location.search = '?workflow=TsowbK0Ql3T&period=2022Oct&ouId=XOivy2uDpMF'
    await renderSearch(urls)
    await screen.findByText('50 mechanisms')
    fireEvent.click(screen.getByText('accept'))
    screen.getByText('5 mechanisms')
})