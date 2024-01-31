import {assert, DataStore, globalOuId, IdName, isPeriodExpired} from "@approvals/service";
import {MenuOptions, User, Workflow} from "../types/search.types.ts";
import {Const} from "../const/search.const.ts";

type DhisUser = {
    organisationUnits: {
        id: string,
        name: string
    }[],
    userCredentials: {
        userRoles:IdName[]
    }
}
async function getUser():Promise<User>{
    const dhisUser:DhisUser = await fetch('/api/me.json?fields=organisationUnits[id,name],userCredentials[userRoles[id,name]]').then(res=>res.json())
    return {
        ou: dhisUser.organisationUnits[0],
        isSuperUser: dhisUser.userCredentials.userRoles.some((role:IdName)=>role.id===Const.superUserRoleId)
    }
}
async function getOuList():Promise<IdName[]>{
    const response = await fetch('/api/organisationUnits?level=3&paging=false').then(r=>r.json());
    return [{id: globalOuId, name: 'Global'}, ...response.organisationUnits.map(item=>({id:item.id,name:item.displayName}))]
}



function filterExpired(workflows:Workflow[]):Workflow[]{
    workflows.forEach(workflow=>{
        workflow.periods = workflow.periods.filter(period=>!period.expired)
    })
    return workflows.filter(workflow=>workflow.periods.length>0)
}
async function getWorkflows(superUser:boolean):Promise<Workflow[]>{
    const allWorkflows:IdName[] = (await fetch('/api/dataApprovalWorkflows.json?fields=id,name').then(r=>r.json()))['dataApprovalWorkflows'];
    const dataStore:DataStore = await fetch('/api/dataStore/approvals/periods').then(r=>r.json());

    assert(allWorkflows.length>1,`Must have at least one workflow`)
    assert(dataStore[allWorkflows[0].name],`Worfklow must be present in datastore`)

    const workflows: Workflow[] = Object.entries(dataStore).map(([workflowName, periodMap])=>({
        name: workflowName,
        id: allWorkflows.find(({name})=>name===workflowName)?.id,
        periods: Object.entries(periodMap).map(([periodCode, periodInfo])=>({
            name: periodInfo.name,
            id: periodCode,
            expired: isPeriodExpired(periodInfo)
        })).reverse()
    })).filter(({id})=>id)

    if (superUser) return workflows
    return filterExpired(workflows)
}

export async function getMenuOptions():Promise<MenuOptions>{
    const user:User = await getUser();
    return {
        ouList: user.ou.id!==globalOuId?[user.ou]:await getOuList(),
        workflows: await getWorkflows(user.isSuperUser)
    }
}