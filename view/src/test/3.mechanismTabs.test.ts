import {actionButtonTextShouldBe, angolaEr, renderView, setUrl, texts} from "./utils/view.testUtils.tsx";
import {angolaSearchAtGlobal, hrhDatasetListUrls, systemUrls, waitAndDebugText} from '@approvals/service'
import {fireEvent, screen} from '@testing-library/react'

setUrl(angolaEr)

test(`3 > Mechanism tabs`, async () => {
    await renderView({...systemUrls, ...angolaSearchAtGlobal, ...hrhDatasetListUrls})
    actionButtonTextShouldBe('return 5 mechanisms')
    texts([
        '17308, 17397, 17490, 17848, 17850',
        'DOD, HHS/CDC, USAID',
        'Association of Public Health Laboratories, Inc. (THE), CHARLES DREW UNIVERSITY OF MEDICINE AND SCIENCE, FHI Development 360 LLC, NATIONAL INSTITUTE OF AIDS, Trustees Of Columbia University In The City Of New York'
    ])
    fireEvent.click(screen.getByText('17308 - AIDOAAA1400045 - Family Health International 360'))
    screen.getByText('FHI Development 360 LLC')
    await waitAndDebugText()
    await screen.findByText(`Please use the HRH Processor App for uploading or reviewing HRH templates.`)
})