import {MapOf, mockFetch} from '@approvals/service'
import {render, screen} from "@testing-library/react";
import {ViewPageContext} from "../../modules/viewPage/components/viewPageContext.component.tsx";
import {expect} from "vitest";


export async function renderView(urls:MapOf<MapOf<string>>):Promise<void>{
    mockFetch(urls)
    render(<ViewPageContext/>)
    await screen.findByRole('toolbar')
}

const selectedFilters = '2022Oct.TsowbK0Ql3T.XOivy2uDpMF'
const mechanismsMoh = 'XOivy2uDpMF.QCJpv5aDCJU.QCJpv5aDCJU_XOivy2uDpMF.TRX0yuTsJA9.TRX0yuTsJA9'
export const angolaMoh = `#selectedFilters=${selectedFilters}&mechanisms=${mechanismsMoh}`
export const angolaEr = `#selectedFilters=${selectedFilters}&mechanisms=XOivy2uDpMF.lnSs5OhS8Bs.lnSs5OhS8Bs_XOivy2uDpMF.Wq5y73g38uV.Wq5y73g38uV_XOivy2uDpMF.xhrPwhpnHxE.xhrPwhpnHxE_XOivy2uDpMF.GQXcFddMFIx.GQXcFddMFIx_XOivy2uDpMF.V9BuRl1SwFT.V9BuRl1SwFT`
export function setUrl(url:string):void{
    window.location.hash = url
}

export const actionButtonTextShouldBe = (text:string) => expect(screen.getByRole('toolbar').textContent).toContain(text)

export const texts = (texts:string[])=>texts.forEach(t=>screen.getByText(t))