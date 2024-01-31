import {IdName, Mechanism, MechanismState, SelectedFilters, MechanismMetadata} from '@approvals/service'

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