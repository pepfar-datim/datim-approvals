import {getViewPageData} from "../modules/viewPage/services/getViewPageData.service.ts";
import {ViewPageModel} from "../modules/viewPage/type/viewPage.types.ts";
import {
    angolaSearchAtGlobal,
    angolaSearchAtPartner,
    ApprovalStatus,
    clone,
    MechanismState,
    mockFetch,
    systemUrls,
    WorkflowType
} from '@approvals/service'
import {angolaMoh, setUrl} from "./utils/view.testUtils.tsx";

const expectedDataTemplate:ViewPageModel = {
    state: null,
    period: {id: "2022Oct", name: "October 2022 - September 2023", expired: false},
    workflow: {name: "HRH FYOct", id: "TsowbK0Ql3T"},
    mechanisms: [{
        identifiers: {
            approvalsId: "QCJpv5aDCJU",
            "ouId": "XOivy2uDpMF",
            categoryOptionCombinationId: "QCJpv5aDCJU",
            categoryOptionId: "mXjFJEexCHJ",
            applicationId: "QCJpv5aDCJU:XOivy2uDpMF",
        },
        selectedFilters: {period: "2022Oct", workflow: "TsowbK0Ql3T", ouId: "XOivy2uDpMF"},
        info: {
            mechanismName: "00100 - PEPFAR-MOH align: MOH Data",
            code: "00100",
            agency: "N/A",
            partnerName: "N/A",
            ouName: "Angola"
        },
        state: null,
    }, {
        identifiers: {
            approvalsId: "TRX0yuTsJA9",
            "ouId": "XOivy2uDpMF",
            categoryOptionCombinationId: "TRX0yuTsJA9",
            categoryOptionId: "t6dWOH7W5Ml",
            applicationId: "TRX0yuTsJA9:XOivy2uDpMF"
        },
        selectedFilters: {period: "2022Oct", workflow: "TsowbK0Ql3T", ouId: "XOivy2uDpMF"},
        info: {
            mechanismName: "00200 - PEPFAR-MOH align: PEPFAR Data",
            code: "00200",
            agency: "N/A",
            partnerName: "N/A",
            ouName: "Angola"
        },
        state: null
    }]
}

const partnerState:MechanismState = {
    approvalStatus: ApprovalStatus.pendingAtPartner,
    possibleActions: {accept: false, submit: true, return: false, recall: false},
    workflowType: WorkflowType.er
}
const globalState:MechanismState = {
    approvalStatus: ApprovalStatus.acceptedByGlobal,
    possibleActions: {accept: false, submit: false, return: true, recall: false},
    workflowType: WorkflowType.er
}

setUrl(angolaMoh)

test(`1a > Get Data @ Partner`, async () => {
    mockFetch({...systemUrls, ...angolaSearchAtPartner})
    const receivedData:ViewPageModel = await getViewPageData()
    const expectedData = clone({
        ...expectedDataTemplate,
        state: partnerState,
    })
    expectedData.mechanisms[0].state = partnerState
    expectedData.mechanisms[1].state = partnerState
    expect(receivedData).toStrictEqual(expectedData)
})



test(`1b > Get Data @ Global`, async () => {
    mockFetch({...systemUrls, ...angolaSearchAtGlobal})
    const receivedData:ViewPageModel = await getViewPageData()
    const expectedData = clone({
        ...expectedDataTemplate,
        state: globalState,
    })
    expectedData.mechanisms[0].state = globalState
    expectedData.mechanisms[1].state = globalState
    expect(receivedData).toStrictEqual(expectedData)
})

