import {
    Identifiers,
    Mechanism,
    MechanismInfo,
    MechanismState,
    SearchResults
} from "../types/mechanism.types.ts";
import {DhisApprovalStatus} from "../../approvalStatus/types/approvalStatus.types.ts";
import {getApprovalStatuses} from "../../approvalStatus/services/getApprovalStatuses.service.ts";
import {getMechanismInfoByApprovalsId, parseMechanismInfo} from "./getMechanismInfo.service.ts";
import {DhisMechanismInfo} from "../types/dhisMechanism.types.ts";
import {assert} from "../../misc/services/assert.service.ts";
import {getStatus} from "../../approvalStatus/services/getApprovalStatus.service.ts";
import {getPossibleActions} from "../../approvalStatus/services/getPossibleActions.service.ts";
import {getWorkflowType} from "../../misc/services/getWorkflowType.service.ts";
import {SelectedFilters} from "../../misc/types/misc.types.ts";
import {globalOuId} from "../../misc/const/misc.const.ts";
import {MechanismMetadata} from "../types/searchMechanism.types.ts";

function getMechanismInfoUrl(selectedFilters:SelectedFilters, selectedIds:MechanismMetadata[]=null):string{
    let filter:string
    if (selectedIds) filter = `filter=categoryOptionCombos.id:in:[${selectedIds.map(({categoryOptionComboId})=>categoryOptionComboId).join(',')}]`
    else filter = `filter=organisationUnits.id:eq:${selectedFilters.ouId}&filter=id:in:[xEzelmtHWPn,OM58NubPbx1,mXjFJEexCHJ,t6dWOH7W5Ml]&rootJunction=OR`
    const fields:string = `fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]`
    return `/api/categoryOptions.json?${filter}&${fields}&paging=false&`
}
export async function fetchMechanismsInfo(selectedFilters: SelectedFilters, selectedIds:MechanismMetadata[]=null){
    return fetch(getMechanismInfoUrl(selectedFilters, selectedIds)).then(res => res.json())
        .then(({categoryOptions})=>categoryOptions)
}
export async function searchMechanisms(selectedFilters:SelectedFilters, selectedIds:MechanismMetadata[]=null):Promise<SearchResults>{
    const dhisApprovalStatuses: DhisApprovalStatus[] = await getApprovalStatuses(selectedFilters, selectedIds)
    const mechanismInfos:DhisMechanismInfo[] = await fetchMechanismsInfo(selectedFilters, selectedIds)
    const mechanisms:Mechanism[] = dhisApprovalStatuses.map((approvalsItem) => {
        const categoryOption = getMechanismInfoByApprovalsId(approvalsItem.id, mechanismInfos)
        assert(!!categoryOption, `Mechanism info not found for ${approvalsItem.id}`)
        const identifiers:Identifiers = {
            approvalsId: approvalsItem.id,
            categoryOptionCombinationId: categoryOption.categoryOptionCombos[0].id,
            categoryOptionId: categoryOption.id,
            applicationId: `${approvalsItem.id}:${approvalsItem.ou}`,
            ouId: approvalsItem.ou
        }
        const info:MechanismInfo = parseMechanismInfo(categoryOption, approvalsItem)
        const state:MechanismState = {
            approvalStatus: getStatus(approvalsItem, getWorkflowType(selectedFilters.workflow)),
            possibleActions: getPossibleActions(approvalsItem),
            workflowType: getWorkflowType(selectedFilters.workflow)
        }
        return {
            identifiers,
            selectedFilters,
            info,
            state
        }
    });
    return {mechanisms, selectedFilters}
}