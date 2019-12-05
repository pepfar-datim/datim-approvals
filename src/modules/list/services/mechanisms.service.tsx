import api from "../../shared/services/api.service";
import MechanismModel, {MechanismActions} from "../../shared/models/mechanism.model";
import getStatus from "../../shared/services/status.service";
import Filters from "../models/filters.model";
import {getWorkflowTypeById} from "../../shared/services/workflowService";

const agencyGroupSet = 'bw8KHXzxd9i';
const partnerGroupSet = 'BOyWrF33hiR';

export default class Data {
    static generateMechanismsUrl(filters){
        return `/dataApprovals/categoryOptionCombos?wf=${filters.workflow}&pe=${filters.period}&ou=${filters.ou}`;
    }

    static getMechanismInfoUrl(ids){
        let filter;
        if (ids.length < 500) filter = `filter=categoryOptionCombos.id:in:[${ids.join(',')}]`;
        else filter = 'filter=categories.id:eq:SH885jaRe0o';
        let fields = 'fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]';
        return `/categoryOptions.json?paging=false&${filter}&${fields}`;
    }

    static getActions(permissions):MechanismActions{
        if (!permissions) return {};
        return {
            accept: permissions.mayAccept,
            return: permissions.mayUnaccept,
            submit: permissions.mayApprove,
            recall: permissions.mayUnapprove,
        }
    }

    static getInfoByGroupSet(mechInfo, groupSetId):string{
        try {
            return mechInfo.categoryOptionGroups.filter(prop => prop.groupSets[0].id === groupSetId)[0].name;
        } catch (e){
            return null;
        }
    }

    static fetchMechanisms(filters:Filters):Promise<MechanismModel[]>{
        return api.get(this.generateMechanismsUrl(filters)).then(mechResp=>{
            if (mechResp.httpStatusCode===409) return;
            let mechanismIds = mechResp.map(m=>m.id);
            return api.get(this.getMechanismInfoUrl(mechanismIds)).then(infoResp=>{
                return mechResp.map(mech=>{
                    let mechInfo = infoResp.categoryOptions.filter(i=>i.categoryOptionCombos[0].id===mech.id)[0];
                    if (infoResp.categoryOptions.filter(i=>i.id===mech.id).length>1) console.log(`Two info records per mechanism ${mech.id} ${mechInfo.name}`);
                    if (!mechInfo.organisationUnits[0]) return console.log(`No OU info for Mechanism ${mech.id} ${mechInfo.name}. Mechanism filtered out.`, mech, mechInfo);
                    if (mechInfo.organisationUnits[0].id!==filters.ou && filters.ou!=='ybg3MO3hcf4') return console.log(`OU info not matching for Mechanism ${mech.id} ${mechInfo.name}. Mechanism filtered out.`, mech, mechInfo);
                    return {
                        info: {
                            name: mechInfo.name,
                            ou: mechInfo.organisationUnits[0].name,
                            partner: this.getInfoByGroupSet(mechInfo, partnerGroupSet),
                            agency: this.getInfoByGroupSet(mechInfo, agencyGroupSet),
                        },
                        state: {
                            status: getStatus(getWorkflowTypeById(filters.workflow), mech.level.level, mech.accepted),
                            actions: this.getActions(mech.permissions),
                            view: mech.permissions.mayReadData
                        },
                        meta: {
                            cocId: mech.id,
                            ou: mechInfo.organisationUnits[0].id
                        }
                    }
                }).filter(mech=>mech);
            }).catch(e=>{
                console.error(e);
            })
        });
    }
}