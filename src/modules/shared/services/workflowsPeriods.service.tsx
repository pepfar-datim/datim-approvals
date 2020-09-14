import api from './api.service';
import {idNameList} from "../models/idNameList.model";
import getWorkflows from "./workflowService";

export type WorkflowPeriods = {
   id: string;
   name:string;
   type: string;
   periods: idNameList;
}[];

type periodList = {name: string, id:string, startDate: Date, endDate:Date}[];

function filterPeriods(periods:periodList):idNameList{
    return periods.filter(period=>{
        let today = new Date();
        return today>period.startDate && today<period.endDate;
    });
}

function getPeriods(workflow):periodList{
    return Object.keys(workflow).map(periodId=>{
        let period = workflow[periodId];
        return {
            name: period.name,
            id: periodId,
            startDate: new Date(period.start),
            endDate: new Date(period.end)
        }
    });
}

function transformDatastore(response):WorkflowPeriods{
    return Object.keys(response).map(workflowName=>{
        return {
            id: null,
            name: workflowName,
            periods: filterPeriods(getPeriods(response[workflowName])),
            type: null
        }
    });
}

export default class WorkflowPeriodService {
    private workflowPeriods:WorkflowPeriods;
    init():Promise<WorkflowPeriods>{
        let wfPromise = getWorkflows();
        let wfPeriodPromise = this.fetchDatastorePeriods();
        return Promise.all([wfPromise, wfPeriodPromise]).then(results=>{
            let workflows:idNameList = results[0];
            let workflowPeriods:WorkflowPeriods = results[1];
            this.workflowPeriods = workflowPeriods.filter(wfp=>{
                return workflows.map(wf=>wf.name).includes(wfp.name);
            }).map(wfp=>{
                wfp.id = workflows.filter(wf=>wf.name===wfp.name)[0].id;
                return wfp;
            }).filter(wfp=>{
                return wfp.periods.length>0;
            });
            return this.workflowPeriods;
        });
    }

    private fetchDatastorePeriods(){
        return api.get('/dataStore/approvals/periodSettings').then(transformDatastore);
    }

    getPeriods(workflowId: string):idNameList{
        if (!workflowId) return [];
        return this.workflowPeriods.filter(wf =>wf.id===workflowId)[0].periods;
    }
    getPeriodNameById(workflowId: string, periodId: string):string{
        return this.getPeriods(workflowId).filter(p=>p.id===periodId)[0].name;
    }
}


