import {ApprovalStatus, PossibleActions, WorkflowType} from "../../approvalStatus/types/approvalStatus.types.ts";
import {SelectedFilters} from "../../misc/types/misc.types.ts";

export type MechanismInfo = {
    mechanismName: string;
    partnerName: string;
    agency: string;
    code: string;
    ouName: string;
}

export type MechanismState = {
    approvalStatus: ApprovalStatus;
    possibleActions: PossibleActions;
    workflowType: WorkflowType;
}

export type Identifiers = {
    approvalsId: string;
    ouId: string;
    categoryOptionCombinationId: string;
    categoryOptionId: string;
    applicationId: string;
}

export type Mechanism = {
    identifiers: Identifiers;
    selectedFilters: SelectedFilters;
    info: MechanismInfo;
    state: MechanismState;
}

export type SearchResults = {
    selectedFilters: SelectedFilters;
    mechanisms: Mechanism[];
}