import {globalOuId, MapOf} from "@approvals/service";
import {Const} from "../../modules/search/const/search.const.ts";

export const meGlobalUrls:MapOf<object> = {
    '/api/me.json?fields=organisationUnits[id,name],userCredentials[userRoles[id,name]]':{
        organisationUnits:[{id: globalOuId, name: 'Global'}],
        userCredentials: {userRoles: [{id: Const.superUserRoleId, name: 'Superuser ALL authorities'}]}
    },
}

export const mePartnerUrls:MapOf<object> = {
    '/api/me.json?fields=organisationUnits[id,name],userCredentials[userRoles[id,name]]':{
        organisationUnits:[{id: 'XOivy2uDpMF', name: 'Angola'}],
        userCredentials: {userRoles: []}
    },
}

export const emptySearchGlobalUrls:MapOf<object> = {
    '/api/dataApprovals/categoryOptionCombos?wf=TAjCBkG6hl6&pe=2023Oct&ouFilter=ds0ADyc9UCU':[],
    '/api/categoryOptions.json?paging=false&filter=organisationUnits.id:eq:ds0ADyc9UCU&filter=id:in:[xEzelmtHWPn,OM58NubPbx1,mXjFJEexCHJ,t6dWOH7W5Ml]&rootJunction=OR&fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]':[]
}