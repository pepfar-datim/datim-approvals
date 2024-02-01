import {SelectedFilters} from "../../misc/types/misc.types.ts";
import {MechanismMetadata} from "../../mechanism/types/searchMechanism.types.ts";

export function getApprovalsUrl(selectedFilters: SelectedFilters, selectedIds:MechanismMetadata[]): string {
    const {workflow, period, ouId} = selectedFilters
    const ouFilter = ouId !== 'ybg3MO3hcf4' ? `&ouFilter=${ouId}` : '' // no ou filter for global
    const mechanismFilter = selectedIds ? `&aoc=${selectedIds.map(({approvalsId})=>approvalsId).join(',')}` : ''
    return `/api/dataApprovals/categoryOptionCombos?wf=${workflow}&pe=${period}${ouFilter}${mechanismFilter}`
}
export function getApprovalStatuses(selectedFilters: SelectedFilters, selectedIds:MechanismMetadata[]){
    return fetch(getApprovalsUrl(selectedFilters, selectedIds)).then(res => res.json())
}