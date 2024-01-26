import {IdName, Mechanism, MechanismState, SelectedFilters} from '@approvals/service'

export type MechanismMetadata = {
    ou: string;
    approvalsId: string;
    categoryOptionComboId: string;
}

export type Period = {expired: boolean} & IdName;

export type ViewPageModel = {
    state: MechanismState;
    workflow: IdName;
    period: Period;
    mechanisms: Mechanism[];
}

export type UrlData = {
    selectedFilters: SelectedFilters;
    mechanismIds: MechanismMetadata[];
}