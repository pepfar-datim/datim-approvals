import {MapOf, mockFetch} from "@approvals/service";
import {render, screen} from "@testing-library/react";
import {SearchPageContext} from "../../modules/search/components/searchPageContext.component.tsx";

export async function renderSearch(fetchUrls: MapOf<object>): Promise<void> {
    mockFetch(fetchUrls)
    render(<SearchPageContext/>)
    await screen.findByRole('menu')
}