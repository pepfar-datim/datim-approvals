import MechanismModel from "../../shared/models/mechanism.model";

export type SearchMechanism = {
    name:string;
    ou:string;
    agency:string;
    partner:string;
    status:string;
    _originalMechanism: MechanismModel;
    tableData:{checked?:boolean}
}

export function tranformMechanisms(allMechanisms:MechanismModel[]):SearchMechanism[]{
    return allMechanisms.map(mechanism=>{
        return {
            name: mechanism.info.name,
            ou: mechanism.info.ou,
            agency: mechanism.info.agency,
            partner: mechanism.info.partner,
            status: mechanism.state.status,
            _originalMechanism: mechanism,
            tableData:{}
        }
    })
}