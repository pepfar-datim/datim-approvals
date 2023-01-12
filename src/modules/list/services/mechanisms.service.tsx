import {getData} from "@pepfar-react-lib/http-tools";
import MechanismModel from "../../shared/models/mechanism.model";
import getStatus from "../../shared/services/status.service";
import {getWorkflowTypeById} from "../../shared/services/workflowService";
import getPermittedActions from "../../shared/services/permittedActions.service";
import {checkSuperUser} from "../../shared/services/superuser.service"
import {idName} from "../../action/models/idName";
import {SearchMechanism, tranformMechanisms} from "../models/searchMechanism.model";
import {SearchFilters} from "../models/filters.model";

const agencyGroupSet = 'bw8KHXzxd9i';
const partnerGroupSet = 'BOyWrF33hiR';

function generateMechanismsUrl(filters){
    return `/dataApprovals/categoryOptionCombos?wf=${filters.workflow}&pe=${filters.period}`;
}

function getMechanismInfoUrl(filters){
    let filter;
    let fields = 'fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]';
    
    if(filters.ou === 'ybg3MO3hcf4') return `/categoryOptions.json?paging=false&${fields}`;
    else filter = `filter=organisationUnits.id:eq:${filters.ou}`;
    return `/categoryOptions.json?paging=false&${filter}&${fields}`;
}

const isInternalMechanism = (info)=>['Dedupe adjustments Agency','Dedupe adjustments Partner'].includes(info);

function getInfoByGroupSet(mechInfo, groupSetId):string{
    try {
        const info = mechInfo.categoryOptionGroups.filter(prop => prop.groupSets[0].id === groupSetId)[0].name;
        if (!info||isInternalMechanism(info)) return 'N/A';
        else return info;
    } catch (e){
        // console.error(e);
        return 'N/A'
    }
}

// Function to ensure OU id exists in case of superuser (deduplication adjustments)
function getOu(mech, mechInfo, isSuperUser:boolean):idName{
    let localOU = {...mechInfo.organisationUnits[0]};
    if (!localOU.id) {
        //Only add in the two dedupe mechs
        if (isSuperUser && (mech.id === 'X8hrDf6bLDC' || mech.id === 'YGT1o7UxfFu')) {
            localOU = { id: mech.ou, name: mech.ouName };
        }
    }
    return localOU;
}

function filterSystemMechs(isSuperUser:boolean){
    return (mech:MechanismModel)=>{
        if (isSuperUser) return true;
        try {
            let code = mech.info.name.match(/^\d+/)[0];
            return !['00000', '00001', '00100', '00200'].includes(code);
        }catch(e) {
            console.error(e);
            return true;
        }
    }
}

export async function fetchMechanisms(filters:SearchFilters):Promise<SearchMechanism[]>{
    let isSuperUser:boolean = await checkSuperUser();
    let getMechData = await getData(generateMechanismsUrl(filters))
    let  getMechinfoData = await getData(getMechanismInfoUrl(filters))
    if (getMechData.httpStatusCode===409) return [];
    let mechanisms:MechanismModel[] = await getMechData.map(mech=>{
        let mechInfo = getMechinfoData.categoryOptions.filter(i=>i.categoryOptionCombos[0].id===mech.id)[0];
        if (getMechinfoData.categoryOptions.filter(i=>i.id===mech.id).length>1) console.log(`Two info records per mechanism ${mech.id} ${mechInfo.name}`);
        if (mechInfo){
        let localOU = getOu(mech, mechInfo, isSuperUser);   
        let status = getStatus(getWorkflowTypeById(filters.workflow), mech.level.level, mech.accepted);
        return {
            info: {
                name: mechInfo.name,
                ou: localOU.name||'N/A',
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
        };
    }
    }).filter(mech=>mech).filter(filterSystemMechs(isSuperUser))
    return tranformMechanisms(mechanisms);

}