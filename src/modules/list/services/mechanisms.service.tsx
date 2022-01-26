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
    return `/dataApprovals/categoryOptionCombos?wf=${filters.workflow}&pe=${filters.period}&ou=${filters.ou}`;
}

function getMechanismInfoUrl(ids){
    let filter;
    if (ids.length < 500) filter = `filter=categoryOptionCombos.id:in:[${ids.join(',')}]`;
    else filter = 'filter=categories.id:eq:SH885jaRe0o';
    let fields = 'fields=id,name,organisationUnits[id,name],categoryOptionGroups[id,name,groupSets[id]],categoryOptionCombos[id,name]';
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
    return getData(generateMechanismsUrl(filters)).then(mechResp=>{
        if (mechResp.httpStatusCode===409) return [];
        // this will remove our knowledge of the OUs on dedupe records
        let mechanismIds = mechResp.map(m=>m.id);
        return getData(getMechanismInfoUrl(mechanismIds)).then(categoryOptionsResp=>{
            let mechanisms:MechanismModel[] = mechResp.map(mech=>{
                let mechInfo = categoryOptionsResp.categoryOptions.filter(i=>i.categoryOptionCombos[0].id===mech.id)[0];
                // if (!mechInfo) return console.log(`No Mechanism Info for mech.id ${mech.id}. Skipping.`);
                if (categoryOptionsResp.categoryOptions.filter(i=>i.id===mech.id).length>1) console.log(`Two info records per mechanism ${mech.id} ${mechInfo.name}`);
                // Make a local copy so that the map/filter doesn't ignore our superAdmin override
                let localOU = getOu(mech, mechInfo, isSuperUser);
                // if(!localOU.id) return console.log(`No OU info for Mechanism ${mech.id} ${mechInfo.name}. Mechanism filtered out.`, mech, mechInfo);
                // if (localOU.id!==filters.ou && filters.ou!=='ybg3MO3hcf4') return console.log(`OU info not matching for Mechanism ${mech.id} ${mechInfo.name}. Mechanism filtered out.`, mech, mechInfo);
                let status = getStatus(getWorkflowTypeById(filters.workflow), mech.level.level, mech.accepted);
                return {
                    info: {
                        name: mechInfo.name,
                        ou: localOU.name,
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
            }).filter(mech=>mech).filter(filterSystemMechs(isSuperUser))
            mechanisms.sort((a,b)=>{
                let m1Id = parseInt(a.info.name);
                let m2Id = parseInt(b.info.name);
                if (m1Id===m2Id) return a.info['ou']>b.info['ou']?1:-1
                return m1Id>m2Id?1:-1;
                // a.info['ou']>b.info['ou']?1:-1
            })
            return tranformMechanisms(mechanisms);
        }).catch(e=>{
            console.error(e);
            return [];
        })
    }).catch(e=>{return []});

}