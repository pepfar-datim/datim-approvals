import api from "../../shared/services/api.service";
import MechanismModel from "../../shared/models/mechanism.model";
import getStatus from "../../shared/services/status.service";
import Filters from "../models/filters.model";
import {getWorkflowTypeById} from "../../shared/services/workflowService";
import getPermittedActions from "../../shared/services/permittedActions.service";

const agencyGroupSet = 'bw8KHXzxd9i';
const partnerGroupSet = 'BOyWrF33hiR';

function generateMechanismsUrl(filters){
    return `/dataApprovals/categoryOptionCombos?wf=${filters.workflow}&pe=${filters.period}&ou=${filters.ou}`;
}

function getMechanismInfoUrl(ids){
    let filter;
    if (ids.length < 500) filter = `filter=categoryOptionCombos.id:in:[${ids.join(',')}]`;
    else filter = 'filter=categories.id:eq:SH885jaRe0o';
    let fields = 'fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]';
    return `/categoryOptions.json?paging=false&${filter}&${fields}`;
}

function getInfoByGroupSet(mechInfo, groupSetId):string{
    try {
        return mechInfo.categoryOptionGroups.filter(prop => prop.groupSets[0].id === groupSetId)[0].name;
    } catch (e){
        return null;
    }
}

export function fetchMechanisms(filters:Filters):Promise<MechanismModel[]>{
    return api.get(generateMechanismsUrl(filters)).then(mechResp=>{
        if (mechResp.httpStatusCode===409) return;
        let mechanismIds = mechResp.map(m=>m.id);
        return api.get(getMechanismInfoUrl(mechanismIds)).then(infoResp=>{
            return mechResp.map(mech=>{
                let mechInfo = infoResp.categoryOptions.filter(i=>i.categoryOptionCombos[0].id===mech.id)[0];
                if (!mechInfo) return console.log(`No Mechanism Info for mech.id ${mech.id}. Skipping.`);
                if (infoResp.categoryOptions.filter(i=>i.id===mech.id).length>1) console.log(`Two info records per mechanism ${mech.id} ${mechInfo.name}`);
                if (!mechInfo.organisationUnits[0]) return console.log(`No OU info for Mechanism ${mech.id} ${mechInfo.name}. Mechanism filtered out.`, mech, mechInfo);
                if (mechInfo.organisationUnits[0].id!==filters.ou && filters.ou!=='ybg3MO3hcf4') return console.log(`OU info not matching for Mechanism ${mech.id} ${mechInfo.name}. Mechanism filtered out.`, mech, mechInfo);
                let status = getStatus(getWorkflowTypeById(filters.workflow), mech.level.level, mech.accepted);
                return {
                    info: {
                        name: mechInfo.name,
                        ou: mechInfo.organisationUnits[0].name,
                        partner: getInfoByGroupSet(mechInfo, partnerGroupSet),
                        agency: getInfoByGroupSet(mechInfo, agencyGroupSet),
                    },
                    state: {
                        status: status,
                        actions: getPermittedActions(mech.permissions, status),
                        view: mech.permissions.mayReadData
                    },
                    meta: {
                        cocId: mech.id,
                        ou: mech.ou,
                        coId: mechInfo.id
                    }
                }
            }).filter(mech=>mech);
        }).catch(e=>{
            console.error(e);
        })
    });
}