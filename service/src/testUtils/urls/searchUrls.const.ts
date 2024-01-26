import {MapOf} from "../../misc/types/misc.types.ts";
import {angolaApprovalsAtPartnerResponse} from "./data/searchAngolaHrh/angolaApprovalsAtPartner.response.ts";
import {angolaApprovalsAtGlobalResponse} from "./data/searchAngolaHrh/angolaApprovalsAtGlobal.response.ts";
import {angolaMechanismsResponse} from "./data/searchAngolaHrh/angolaMechanisms.response.ts";
import {asiaApprovalsResponse} from "./data/searchAsiaMer/asiaApprovals.response.ts";
import {asiaMechanismsResponse} from "./data/searchAsiaMer/asiaMechanisms.response.ts";

const angolaApprovalsUrl = '/api/dataApprovals/categoryOptionCombos?wf=TsowbK0Ql3T&pe=2022Oct&ouFilter=XOivy2uDpMF'
const angolaMechanismsUrl = '/api/categoryOptions.json?paging=false&filter=organisationUnits.id:eq:XOivy2uDpMF&filter=id:in:[xEzelmtHWPn,OM58NubPbx1,mXjFJEexCHJ,t6dWOH7W5Ml]&rootJunction=OR&fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]'
export const angolaSearchAtPartner:MapOf<object> = {
    [angolaApprovalsUrl]: angolaApprovalsAtPartnerResponse,
    [angolaMechanismsUrl]: angolaMechanismsResponse,
}

export const angolaSearchAtGlobal:MapOf<object> = {
    [angolaApprovalsUrl]: angolaApprovalsAtGlobalResponse,
    [angolaMechanismsUrl]: angolaMechanismsResponse,
}

const asiaApprovalsUrl = '/api/dataApprovals/categoryOptionCombos?wf=RwNpkAM7Hw7&pe=2023Q2&ouFilter=ptVxnBssua6'
const asiaMechanismsUrl = '/api/categoryOptions.json?paging=false&filter=organisationUnits.id:eq:ptVxnBssua6&filter=id:in:[xEzelmtHWPn,OM58NubPbx1,mXjFJEexCHJ,t6dWOH7W5Ml]&rootJunction=OR&fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]'
export const searchAsia = {
    [asiaApprovalsUrl]: asiaApprovalsResponse,
    [asiaMechanismsUrl]: asiaMechanismsResponse
}