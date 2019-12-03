import api from "../../shared/services/api.service";
import MechanismModel, {
    MechanismInfo,
    MechanismMeta,
    MechanismState
} from "../../shared/models/mechanism.model";
import getStatus from "../../shared/services/status.service";
import {getWorkflowTypeById} from "../../shared/services/workflowService";

function mechanismStatesUrl(workflow: string, period: string){
    return `/dataApprovals/categoryOptionCombos?wf=${workflow}`
        +`&pe=${period}`;
}

function mechanismsInfoUrl(mechanismIds:string[]){
    return `/categoryOptions.json?filter=categoryOptionCombos.id:in:[${mechanismIds.join(',')}]`
        + `&fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]`;
}

function getActionUrl(action){
    switch(action){
        case "submit": return '/dataApprovals/approvals';
        case "accept": return '/dataAcceptances/acceptances';
        case "recall": return '/dataApprovals/unapprovals';
        case "return": return '/dataApprovals/unapprovals';
    }
}

const agencyGroupSet = 'bw8KHXzxd9i';
const partnerGroupSet = 'BOyWrF33hiR';

function getInfoByGroupSet(mechInfo, groupSetId){
    return mechInfo.categoryOptionGroups.filter(prop=>prop.groupSets[0].id===groupSetId)[0] || {};
}


export function performAction(action: string, workflow: string, period: string, mechanismsMeta: MechanismMeta[]){
    return api.post(getActionUrl(action), {
        "approvals": mechanismsMeta.map(m=>{return {"aoc": m.id, "ou": m.ou}}),
        "pe": [period],
        "wf": [workflow]
    });
}
function transformCategoryOptionToMechanismInfo(categoryOption:any){
    return {
        name: categoryOption.name,
        ou: categoryOption.organisationUnits[0].name || {},
        partner: getInfoByGroupSet(categoryOption, partnerGroupSet).name,
        agency: getInfoByGroupSet(categoryOption, agencyGroupSet).name,
    };
}

export function getMechanismsInfo(mechanismIds:string[]):Promise<MechanismInfo[]>{
    return api.get(mechanismsInfoUrl(mechanismIds))
        .then(res=>res.categoryOptions)
        .then(categoryOptions=>categoryOptions.map(transformCategoryOptionToMechanismInfo));
}

function transformCOCToMechanismState(workflow, combo){
    return {
        status: getStatus(getWorkflowTypeById(workflow), combo.level.level, combo.accepted),
        actions: {
            submit: combo.permissions.mayApprove,
            recall: combo.permissions.mayUnapprove,
            accept: combo.permissions.mayAccept,
            return: combo.permissions.mayUnaccept,
        },
        view: combo.permissions.mayReadData
    }
}

export function getMechanismStates(workflow: string, period: string, mechanisms: MechanismModel[]):Promise<MechanismState>{
    return api.get(mechanismStatesUrl(workflow, period))
        .then(res => res.filter(categoryOptionCombo=>mechanisms.map(m=>m.meta.id).includes(categoryOptionCombo.id)))
        .then(categoryOptionCombos=>categoryOptionCombos.map(coc=>transformCOCToMechanismState(workflow, coc)))
        .then(mechanismStates=>{
            if (mechanismStates.every((val, i, arr)=>JSON.stringify(val)===JSON.stringify(arr[0]))) return mechanismStates[0];
            else throw new Error("Mechanisms have different statuses.");
        });
}