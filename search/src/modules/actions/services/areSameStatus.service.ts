import {ApprovalStatus, Mechanism} from '@approvals/service'

export function areSameStatus(mechanisms:Mechanism[]):boolean{
    const firstStatus:ApprovalStatus = mechanisms[0].state.approvalStatus
    return mechanisms.every(({state:{approvalStatus}})=>approvalStatus===firstStatus)
}