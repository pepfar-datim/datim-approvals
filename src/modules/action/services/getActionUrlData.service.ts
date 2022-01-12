import {ApprovalsCombo} from "../../shared/models/mechanism.model";
import queryString from "query-string";

class urlParams {ou: string; workflow: string; period: string; approvalCombos: (string|string[])};

export type ActionUrlData = {
    workflow: string;
    period:string;
    approvalCombos: ApprovalsCombo[];
}



function getQueryParams():urlParams{
    return queryString.parse(window.location.hash.replace(/#.+\?/,'')) as any;
}

function enforceArray(value:(string|string[])):string[]{
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value;
    throw Error("unknown type: expected string or array");
}

function assembleMechanismCombos(mechanisms: string[]):ApprovalsCombo[]{
    return mechanisms.map(mech=>{
        let [ou, cocId, coId] = mech.split(':');
        return {ou: ou, cocId: cocId, coId: coId};
    });
}


export function getActionUrlData():ActionUrlData{
    let location = window.location;
    return {
        approvalCombos: assembleMechanismCombos(enforceArray(getQueryParams().approvalCombos)),
        workflow:getQueryParams().workflow,
        period:getQueryParams().period
    }
}