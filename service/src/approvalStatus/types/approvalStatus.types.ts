export type ApprovalLevel = {
    id: string;
    level: string;
}
export type Dhis2Permissions = {
    mayApprove: boolean;
    mayUnapprove: boolean;
    mayAccept: boolean;
    mayUnaccept: boolean;
    mayReadData: boolean;
}
export type DhisApprovalStatus = {
    id: string;
    ouName: string;
    ou: string; // ou id
    level: ApprovalLevel;
    accepted: boolean;
    permissions: Dhis2Permissions;
}

export enum ApprovalStatus {
    pendingAtPartner = 'pendingAtPartner',
    submittedByPartner = 'submittedByPartner',
    acceptedByAgency = 'acceptedByAgency',
    submittedByAgency = 'submittedByAgency',
    acceptedByGlobal = 'acceptedByGlobal',

    acceptedByGlobalAgency = 'acceptedByGlobalAgency',
    submittedByGlobalAgency = 'submittedByGlobalAgency',

    acceptedByInterAgency = 'acceptedByInterAgency',
    submittedByInterAgency = 'submittedByInterAgency',
}

export enum WorkflowType {
    mer = 'mer',
    er = 'er'
}

export type PossibleActions = {
    accept: boolean;
    submit: boolean;
    return: boolean;
    recall: boolean;
}

export enum MechanismActions {
    view = 'view',
    accept = 'accept',
    submit = 'submit',
    recall = 'recall',
    return = 'return',
}