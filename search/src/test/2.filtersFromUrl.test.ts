import {screen} from "@testing-library/react";
import {emptySearchGlobalUrls, meGlobalUrls} from "./utils/fetchUrls.const.ts";
import {systemUrls} from '@approvals/service'
import {renderSearch} from "./utils/renderSearch.tsx";

const urls = {
    ...systemUrls,
    ...meGlobalUrls,
    ...emptySearchGlobalUrls
}

test(`2 > Menu Options from URL`, async ()=> {
    window.location.search = '?ouId=ds0ADyc9UCU&period=2023Oct&workflow=TAjCBkG6hl6'
    await renderSearch(urls)

    const workflow = screen.getByTestId('select Workflow')
    expect(workflow.textContent).toBe('MER Targets')

    // Matching period (latest)
    const periodSelect = screen.getByTestId('select Period')
    expect(periodSelect.textContent).toBe('Oct 2023 - Sep 2024 (closed)')

    // Global is pre-selected
    const ou = screen.getByTestId('select Operating Unit')
    expect(ou.textContent).toBe('Cote d\'Ivoire')
})