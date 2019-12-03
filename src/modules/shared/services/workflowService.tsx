import api from './api.service';
import {idNameList} from "../models/idNameList.model";
import workflowData from "../../../config/workflows.json";

type WorkflowList = {name:string, id:string, type:string}[];

let workflows = workflowData as WorkflowList;

export function getWorkflowNameById(workflowId: string):string{
    return workflows.filter(w=>w.id===workflowId)[0].name;
}

export function getWorkflowTypeById(workflowId: string):string{
    return workflows.filter(w=>w.id===workflowId)[0].type;
}

export default function getWorkflows():Promise<idNameList> {
    return api.get('/dataApprovalWorkflows.json').then(result=>{
        return result.dataApprovalWorkflows.map(wf=>{
            return {id: wf.id, name: wf.displayName};
        });
    });
}