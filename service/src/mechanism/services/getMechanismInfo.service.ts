import {CategoryOptionGroup, DhisMechanismInfo} from "../types/dhisMechanism.types";
import {MechanismInfo} from "../types/mechanism.types.ts";
import {DhisApprovalStatus} from "../../approvalStatus/types/approvalStatus.types.ts";

export function getMechanismInfoByApprovalsId(approvalsId:string, mechanismInfos:DhisMechanismInfo[]):DhisMechanismInfo{
    return mechanismInfos.find(({categoryOptionCombos}) => approvalsId === categoryOptionCombos[0]?.id)
}
export function getValueByGroupSetId(groupSetId:string, categoryOptionGroups: CategoryOptionGroup[]):string {
    const value = categoryOptionGroups.find(({groupSets})=>groupSets.find(({id})=>id===groupSetId))?.name
    if ([null, 'Dedupe adjustments Agency', 'Dedupe adjustments Partner', undefined].includes(value)) return 'N/A'
    return value;
}

export function parseMechanismInfo(categoryOptionCombo:DhisMechanismInfo, approvalsItem: DhisApprovalStatus):MechanismInfo{
    return {
        mechanismName: categoryOptionCombo.name,
        code: /[0-9]+/.exec(categoryOptionCombo.name)[0],
        agency: getValueByGroupSetId('bw8KHXzxd9i', categoryOptionCombo.categoryOptionGroups),
        partnerName: getValueByGroupSetId('BOyWrF33hiR', categoryOptionCombo.categoryOptionGroups),
        ouName: approvalsItem.ouName,
    }
}