import {Const} from '../../modules/search/const/search.const.ts';
import {testResponses} from "./testResponses.const.ts";
import {MapOf} from "../../modules/shared/types/shared.types.ts";


export function mockFetch(urlList:MapOf<object>):void{
    global.fetch = vitest.fn().mockImplementation((url:string)=>{
        if (!urlList[url]) throw new Error(`URL is not mocked ${url}`)
        // console.log(`Mocking: ${url}`)
        return Promise.resolve({json:()=>urlList[url]})
    })
}

const systemUrls = {
    '/api/organisationUnits?level=3&paging=false': testResponses.organisationUnits,
    '/api/dataApprovalWorkflows.json?fields=id,name':testResponses.dataApprovalWorkflows,
    '/api/dataStore/approvals/periodSettings': testResponses.dataStore,
}
export const globalUserUrls:MapOf<object> = {
    ...systemUrls,
    '/api/me.json?fields=organisationUnits[id,name],userCredentials[userRoles[id,name]]':{
        organisationUnits:[{id: Const.globalOuId, name: 'Global'}],
        userCredentials: {userRoles: [{id: Const.superUserRoleId, name: 'Superuser ALL authorities'}]}
    },
}

export const partnerUserUrls:MapOf<object> = {
    ...systemUrls,
    '/api/me.json?fields=organisationUnits[id,name],userCredentials[userRoles[id,name]]':{
        organisationUnits:[{id: 'XOivy2uDpMF', name: 'Angola'}],
        userCredentials: {userRoles: []}
    },
}

export const searchGlobalUrls:MapOf<object> = {
    '/api/dataApprovals/categoryOptionCombos?wf=TAjCBkG6hl6&pe=2023Oct&ouFilter=ds0ADyc9UCU':[],
    '/api/categoryOptions.json?paging=false&filter=organisationUnits.id:eq:ds0ADyc9UCU&filter=id:in:[xEzelmtHWPn,OM58NubPbx1,mXjFJEexCHJ,t6dWOH7W5Ml]&rootJunction=OR&fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]':[]
}