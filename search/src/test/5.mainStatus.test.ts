import {renderSearch} from "./utils/renderSearch.tsx";
import {fireEvent, screen} from "@testing-library/react";
import {meGlobalUrls} from "./utils/fetchUrls.const.ts";
import {angolaSearchAtPartner, systemUrls} from '@approvals/service'

const urls = {
    ...systemUrls,
    ...meGlobalUrls,
    ...angolaSearchAtPartner,
}

test(`5 > Main status`, async ()=>{
    window.location.search = '?workflow=TsowbK0Ql3T&period=2022Oct&ouId=XOivy2uDpMF'
    await renderSearch(urls)
    await screen.findByText('50 mechanisms')

    // Select 5 mechs from 'submitted'
    fireEvent.click(screen.getByText('accept'))
    fireEvent.click(document.querySelector('input[type=checkbox]'))
    screen.getByText('5 selected mechanisms')

    // Select 1 mech from 'pending'
    fireEvent.click(screen.getByText('view'))
    fireEvent.click(document.querySelector(`[aria-rowindex="5"] input[type=checkbox]`))
    screen.getByText('6 selected mechanisms')

    // View button should be disabled & error should appear
    expect(screen.getByTestId('action').classList.contains('Mui-disabled')).toBeTruthy()
    screen.getByText('All selected mechanisms must have the same status to proceed.')

    // Select main status only
    fireEvent.click(screen.getByText('Select submitted by partner only'))
    screen.getByText('5 selected mechanisms')
    expect(screen.getByTestId('action').classList.contains('Mui-disabled')).toBeFalsy()
})