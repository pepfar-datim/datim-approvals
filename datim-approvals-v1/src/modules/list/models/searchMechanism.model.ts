import MechanismModel from "../../shared/models/mechanism.model";
import {SearchFilters} from "./filters.model";

export type SearchMechanism = {
    id: number;
    name:string;
    ou:string;
    agency:string;
    partner:string;
    status:string;
    _originalMechanism: MechanismModel;
    selected:boolean;
}

export type SearchResults = {
    filters: SearchFilters;
    mechanisms: SearchMechanism[];
}

export function tranformMechanisms(allMechanisms:MechanismModel[]):SearchMechanism[]{
    return allMechanisms.map((mechanism,i)=>{
        return {
            id: i,
            name: mechanism.info.name,
            ou: mechanism.info.ou,
            agency: mechanism.info.agency,
            partner: mechanism.info.partner,
            status: mechanism.state.status,
            _originalMechanism: mechanism,
            selected: false
        }
    })
}