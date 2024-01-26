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

function getMechanismsInfoUrl(selectedFilters:SelectedFilters):string{
    const {ouId} = selectedFilters
    const ouFilter = ouId!==globalOuId ? `&filter=organisationUnits.id:eq:${ouId}&filter=id:in:[xEzelmtHWPn,OM58NubPbx1,mXjFJEexCHJ,t6dWOH7W5Ml]&rootJunction=OR` : ''
    return `/api/categoryOptions.json?paging=false${ouFilter}&fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]`
}
export async function fetchMechanismsInfo(selectedFilters: SelectedFilters){
    return fetch(getMechanismsInfoUrl(selectedFilters)).then(res => res.json())
        .then(({categoryOptions})=>categoryOptions)
}
export async function searchMechanisms(selectedFilters:SelectedFilters):Promise<SearchResults>{
    const dhisApprovalStatuses: DhisApprovalStatus[] = await getApprovalStatuses(selectedFilters)
    const mechanismInfos:DhisMechanismInfo[] = await fetchMechanismsInfo(selectedFilters)
    const mechanisms:Mechanism[] = dhisApprovalStatuses.map((approvalsItem) => {
        const categoryOption = getMechanismInfoByApprovalsId(approvalsItem.id, mechanismInfos)
        assert(categoryOption, `Mechanism info not found for ${approvalsItem.id}`)
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