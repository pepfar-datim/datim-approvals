import {IdName} from '@approvals/service'

function fetchAll(workflowId:string):Promise<IdName[]>{
    const url = `/api/dataApprovalWorkflows.json?fields=id,name,dataSets[id,name]&paging=false&filter=id:eq:${workflowId}`
    return fetch(url)
        .then(res => res.json())
        .then(res => res.dataApprovalWorkflows[0].dataSets)
}

async function fetchAllowedIds(workflowName:string, periodId:string):Promise<string[]>{
    const dataStore = await fetch('/api/dataStore/approvals/periods').then(r=>r.json())
    return dataStore[workflowName][periodId].datasets
}

export async function getDatasetList(workflow:IdName, period: IdName):Promise<IdName[]>{
    const allDatasets:IdName[] = await fetchAll(workflow.id)
    const allowedDatasetIds:string[] = await fetchAllowedIds(workflow.name, period.id)
    if (allowedDatasetIds.length === 0) return allDatasets
    return allDatasets.filter(({id})=>allowedDatasetIds.includes(id))
}