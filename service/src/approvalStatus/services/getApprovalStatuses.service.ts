import {SelectedFilters} from "../../misc/types/misc.types.ts";
import {MechanismMetadata} from "../../mechanism/types/searchMechanism.types.ts";
import {DhisApprovalStatus} from "../types/approvalStatus.types.ts";

export function getApprovalsUrl(selectedFilters: SelectedFilters, selectedIds:MechanismMetadata[]): string {
    const {workflow, period, ouId} = selectedFilters
    const ouFilter = ouId !== 'ybg3MO3hcf4' ? `&ouFilter=${ouId}` : '' // no ou filter for global
    const mechanismFilter = selectedIds ? `&aoc=${selectedIds.map(({approvalsId})=>approvalsId).join(',')}` : ''
    return `/api/dataApprovals/categoryOptionCombos?wf=${workflow}&pe=${period}${ouFilter}${mechanismFilter}`
}
export async function getApprovalStatuses(selectedFilters: SelectedFilters, selectedIds:MechanismMetadata[]):Promise<DhisApprovalStatus[]>{
    const dhisApprovalStatuses:DhisApprovalStatus[] = await fetch(getApprovalsUrl(selectedFilters, selectedIds)).then(res => res.json())
    if (!selectedIds||selectedIds.length===0) return dhisApprovalStatuses
    return dhisApprovalStatuses.filter(({id, ou})=>{
        return selectedIds.map(({approvalsId, ou:ouId})=>approvalsId+ouId).includes(id+ou)
    })
}