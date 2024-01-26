import {Dhis2Permissions, DhisApprovalStatus, PossibleActions} from "../types/approvalStatus.types";

function canRecall(dhis2Permissions: Dhis2Permissions): boolean {
    if (!dhis2Permissions.mayAccept && dhis2Permissions.mayUnapprove && !dhis2Permissions.mayUnaccept) return true;
    return false;
}

function canReturn(dhis2Permissions: Dhis2Permissions): boolean {
    if (dhis2Permissions.mayAccept && dhis2Permissions.mayUnapprove) return true;
    if (dhis2Permissions.mayUnaccept && dhis2Permissions.mayUnapprove) return true;
    return false;
}

function isAcceptedByGlobal(level: string, accepted: boolean): boolean {
    return level === '2' && accepted || level === '3' && accepted
}

export function getPossibleActions(approvalsItem: DhisApprovalStatus): PossibleActions {
    const {mayApprove, mayAccept} = approvalsItem.permissions
    const {accepted: isAccepted, level} = approvalsItem
    return {
        accept: mayAccept,
        submit: mayApprove && !isAcceptedByGlobal(level.level, isAccepted),
        return: canReturn(approvalsItem.permissions),
        recall: canRecall(approvalsItem.permissions),
    }
}