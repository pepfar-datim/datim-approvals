import {SelectedFilters} from "../../misc/types/misc.types.ts";

export function getApprovalsUrl(selectedFilters: SelectedFilters): string {
    const {workflow, period, ouId} = selectedFilters
    const ouFilter = ouId !== 'ybg3MO3hcf4' ? `&ouFilter=${ouId}` : '' // no ou filter for global
    return `/api/dataApprovals/categoryOptionCombos?wf=${workflow}&pe=${period}${ouFilter}`
}
export function getApprovalStatuses(selectedFilters: SelectedFilters){
    return fetch(getApprovalsUrl(selectedFilters)).then(res => res.json())
}