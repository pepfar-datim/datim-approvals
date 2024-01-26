import {globalUserUrls, mockFetch, searchGlobalUrls} from "./utils/mockFetch.service.ts";
import {render, screen} from "@testing-library/react";
import {SearchPageContext} from "../modules/search/components/searchPageContext.component.tsx";

test(`2 > Menu Options from URL`, async ()=> {
    window.location.search = '?ouId=ds0ADyc9UCU&period=2023Oct&workflow=TAjCBkG6hl6'
    mockFetch({...globalUserUrls,...searchGlobalUrls})
    render(<SearchPageContext/>)
    await screen.findByRole('menu')

    const workflow = screen.getByTestId('select Workflow')
    expect(workflow.textContent).toBe('MER Targets')

    // Matching period (latest)
    const periodSelect = screen.getByTestId('select Period')
    expect(periodSelect.textContent).toBe('Oct 2023 - Sep 2024 (closed)')

    // Global is pre-selected
    const ou = screen.getByTestId('select Operating Unit')
    expect(ou.textContent).toBe('Cote d\'Ivoire')
})