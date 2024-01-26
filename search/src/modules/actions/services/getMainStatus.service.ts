import {ApprovalStatus, Mechanism} from '@approvals/service'

export function getMainStatus(mechanisms:Mechanism[]):ApprovalStatus{
    const statuses = mechanisms.map(({state:{approvalStatus}})=>approvalStatus)
    const occurrences = Object.keys(ApprovalStatus).map((status:ApprovalStatus)=>{
        const occurrence = statuses.filter((s)=>s===status).length
        return {status, occurrence}
    })
    return occurrences.sort((a,b)=>b.occurrence-a.occurrence)[0].status
}