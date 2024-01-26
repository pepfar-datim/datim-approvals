import {ApprovalStatus, DhisApprovalStatus, WorkflowType} from "../types/approvalStatus.types";

export function getStatus(approvalsItem: DhisApprovalStatus, workflow: WorkflowType): ApprovalStatus {
    const {accepted: isAccepted, level: approvalLevel} = approvalsItem
    const level = parseInt(approvalLevel.level)
    if (level === 5 && !isAccepted) return ApprovalStatus.submittedByPartner
    if (level === 5 && isAccepted) return ApprovalStatus.acceptedByAgency

    if (level === 4 && !isAccepted) return ApprovalStatus.submittedByAgency
    if (level === 4 && isAccepted && workflow === WorkflowType.er) return ApprovalStatus.acceptedByGlobalAgency
    if (level === 4 && isAccepted && workflow === WorkflowType.mer) return ApprovalStatus.acceptedByInterAgency

    if (level===3 && !isAccepted)  return ApprovalStatus.submittedByInterAgency
    if (level===3 && isAccepted)  return ApprovalStatus.acceptedByGlobal;

    if (level === 2 && !isAccepted && workflow === WorkflowType.er) return ApprovalStatus.submittedByGlobalAgency
    if (level === 2 && !isAccepted && workflow === WorkflowType.mer) return ApprovalStatus.submittedByInterAgency
    if (level === 2 && isAccepted) return ApprovalStatus.acceptedByGlobal

    return ApprovalStatus.pendingAtPartner
}
