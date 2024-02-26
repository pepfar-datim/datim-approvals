import {UrlData, ViewPageModel} from "../type/viewPage.types.ts";
import {getPeriodIdName} from "./getPeriodData.service.ts";
import {IdName, Mechanism, MechanismState, searchMechanisms, SelectedFilters, MechanismMetadata} from '@approvals/service'


async function getWorkflowIdName(workflowId:string):Promise<IdName>{
    const workflows:IdName[] = await fetch('/api/dataApprovalWorkflows.json?fields=id,name').then(res => res.json()).then(res=>res.dataApprovalWorkflows)
    return workflows.find(({id})=>id===workflowId);
}

function parseSelectedFilters(filters:string):SelectedFilters{
    const [period,workflow,ouId] = filters.split('.')
    return {period,workflow,ouId}
}

function parseUrlData():UrlData{
    const query = new URLSearchParams(window.location.hash.replace('#',''))
    const selectedFilters = parseSelectedFilters(query.get('selectedFilters'))
    const mechanismIds:MechanismMetadata[] = query.get('mechanisms').split('_').map(entry => {
        const [ou, approvalsId, categoryOptionComboId] = entry.split('.');
        return {ou, approvalsId, categoryOptionComboId}
    })
    return {selectedFilters, mechanismIds}
}

export async function getViewPageData():Promise<ViewPageModel>{
    const {selectedFilters, mechanismIds} = parseUrlData()
    const {mechanisms} = await searchMechanisms(selectedFilters, mechanismIds.length<30&&mechanismIds)

    const filteredMechanisms:Mechanism[] = mechanisms.filter(({identifiers: {approvalsId, ouId}})=>{
        return mechanismIds.map(({ou, approvalsId})=>`${ou}.${approvalsId}`).includes(`${ouId}.${approvalsId}`)
    })

    filteredMechanisms.sort(function(mechanism1:Mechanism, mechanism2:Mechanism){
        return mechanism1.info.code>mechanism2.info.code?1:-1
    })

    filteredMechanisms.filter(({info:{code}})=>code!=='000000').forEach(({info})=>info.ouName='N/A')

    const state:MechanismState = {
        approvalStatus: filteredMechanisms[0].state.approvalStatus,
        possibleActions: filteredMechanisms[0].state.possibleActions,
        workflowType: filteredMechanisms[0].state.workflowType,
    }
    const workflow = await getWorkflowIdName(selectedFilters.workflow)
    return {
        state,
        period: await getPeriodIdName(workflow.name, selectedFilters.period),
        workflow,
        mechanisms: filteredMechanisms,
    }
}