import { ContactSupportOutlined } from "@material-ui/icons";
import {getData} from "@pepfar-react-lib/http-tools";
import {idNameList} from "../models/idNameList.model";
import getWorkflows from "./workflowService";

export type WorkflowPeriods = {
   id: string;
   name:string;
   type: string;
   periods: idNameList;
}[];

type periodList = {name: string, id:string, startDate: Date, endDate:Date}[];

function filterPeriods(isSuperUser, periods:periodList):idNameList{
        return periods.filter(period=>{
            let today = new Date();
            if(isSuperUser) {
                if (!(today>period.startDate && today<period.endDate)){
                    period.name = period.name + " (closed)"          
                };
                return period
            }
            else {
                return today>period.startDate && today<period.endDate;
            }
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

function transformDatastore(response, isSuperUser):WorkflowPeriods{
    return Object.keys(response).map(workflowName=>{
        let periods:any = getPeriods(response[workflowName]);
        periods = filterPeriods(isSuperUser,periods);
        return {
            id: null,
            name: workflowName,
            periods: periods,
            type: null
        }
    });
}

export default class WorkflowPeriodService{
    private workflowPeriods:WorkflowPeriods;
    async init(isSuperUser:boolean):Promise<WorkflowPeriods>{
        let wfPromise = getWorkflows();
        let wfPeriodPromise = this.fetchDatastorePeriods(isSuperUser);
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
            this.workflowPeriods.forEach(wfp=>{
                wfp.periods = wfp.periods.sort((a,b)=>a.id>b.id?-1:1);
            })
            return this.workflowPeriods;
        });
    }

    private fetchDatastorePeriods(isSuperUser: boolean){
        return getData('/dataStore/approvals/periodSettings').then((result)=>transformDatastore(result, isSuperUser));
    }

    getPeriods(workflowId: string):idNameList{
        if (!workflowId) return [];
        return this.workflowPeriods.filter(wf =>wf.id===workflowId)[0].periods;
    }
    getPeriodNameById(workflowId: string, periodId: string):string{
        return this.getPeriods(workflowId).filter(p=>p.id===periodId)[0].name;
    }
}


