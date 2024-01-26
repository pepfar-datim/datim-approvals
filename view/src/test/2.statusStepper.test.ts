import {actionButtonTextShouldBe, angolaMoh, renderView, setUrl} from "./utils/view.testUtils.tsx";
import {angolaSearchAtGlobal, angolaSearchAtPartner, hrhDatasetListUrls, systemUrls} from '@approvals/service'
import {expect} from "vitest";
import {getStepData} from "./utils/step.testUtils.ts";

setUrl(angolaMoh)

test(`2a > Status Stepper @ Partner`, async () => {
    await renderView({...systemUrls, ...angolaSearchAtPartner, ...hrhDatasetListUrls})
    actionButtonTextShouldBe('submit 2 mechanisms')
    expect(getStepData(1).completed).toBe(true)
    for (let i=2; i<=7; i++) expect(getStepData(i).completed).toBe(false)
})

test(`2b > Status Stepper @ Global`, async () => {
    await renderView({...systemUrls, ...angolaSearchAtGlobal, ...hrhDatasetListUrls})
    actionButtonTextShouldBe('return 2 mechanisms')
    for (let i=1; i<=7; i++) expect(getStepData(i).completed).toBe(true)
})