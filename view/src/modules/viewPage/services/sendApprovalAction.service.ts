import {MechanismActions, WorkflowType, ApprovalStatus} from '@approvals/service'
import {ViewPageModel} from "../type/viewPage.types.ts"
import {Config} from "../../../config/config.const.ts";

type MechId = {aoc: string, ou: string}

type ApprovalsBody = {
    approvals: MechId[],
    pe: string[],
    wf: string[],
}

function getUrl(action:MechanismActions):string{
    let urlAction
    switch(action){
        case 'accept':
            urlAction = '/dataAcceptances/acceptances'
            break;
        case 'submit':
            urlAction = '/dataApprovals/approvals'
            break;
        case 'recall':
        case 'return':
            urlAction = '/dataApprovals/unapprovals'
            break;
    }
    return `/api${urlAction}`
}

function movingUp(action:MechanismActions):boolean{
    return [MechanismActions.submit, MechanismActions.accept].includes(action);
}

function movingDown(action:MechanismActions):boolean{
    return [MechanismActions.return, MechanismActions.recall].includes(action);
}
function isGlobalAgency(action:MechanismActions, {state:{workflowType, approvalStatus}}:ViewPageModel):boolean{
    if (workflowType!==WorkflowType.er) return false
    if (![ApprovalStatus.acceptedByGlobalAgency, ApprovalStatus.submittedByGlobalAgency, ApprovalStatus.acceptedByGlobal].includes( approvalStatus)) return false
    if (movingDown(action)&&approvalStatus===ApprovalStatus.acceptedByGlobalAgency) return false
    return true
}

function upgradeToGlobal(approvals:MechId[]):void {
    approvals.forEach(approval => approval.ou = Config.globalOuId)
}
function prepareBody(action: MechanismActions, viewPageModel:ViewPageModel):ApprovalsBody{
    const approvals:MechId[] = viewPageModel.mechanisms.map(({identifiers:{approvalsId, ouId}})=>({
        aoc: approvalsId,
        ou: ouId
    }))
    if (isGlobalAgency(action, viewPageModel)) upgradeToGlobal(approvals)
    return {
        approvals,
        pe: [viewPageModel.period.id],
        wf: [viewPageModel.workflow.id],
    }
}
export function sendApprovalAction(action:MechanismActions, viewPageModel:ViewPageModel):Promise<Response>{
    return fetch(getUrl(action), {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(prepareBody(action, viewPageModel))
    })
}