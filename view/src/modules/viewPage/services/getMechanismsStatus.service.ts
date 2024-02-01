import {ApprovalStatus, MechanismMetadata} from '@approvals/service'

export async function getMechanismsStatus(periodId:string, workflowId: string, mechanismsMetadata:MechanismMetadata[]):Promise<ApprovalStatus>{
    let ou = '';
    if (mechanismsMetadata.map(({ou})=>ou).every(ouId => ouId === mechanismsMetadata[0].ou)) ou = `&ouFilter=${mechanismsMetadata[0].ou}`
    const approvalsData = await fetch(`/api/dataApprovals/categoryOptionCombos?wf=${workflowId}&pe=${periodId}${ou}`).then(res => res.json())
    console.log(approvalsData)
    return ApprovalStatus.acceptedByAgency
}