import {FilterType, idName} from "../models/filters.model";
import {getData} from "../../shared/services/dataApi.service";

function transformIdNameList(list:{id:string, displayName}[]):idName[]{
    return list.map(item=>{return{id:item.id, name:item.displayName}});
}

function extractAgencyName(groupName:string):string{
    return groupName
        .replace(/OU .+ Agency /,'')
        .replace('Global Agency ','')
        .replace(' users','')
}

export default class FilterOptionsProvider {
    private orgUnitList: idName[];
    private agencyList: idName[];
    private technicalAreaList: idName[];

    init():Promise<any>{
        return Promise.all([
            this.getOrganisationUnits(),
            this.getAgencies(),
            this.getTechnicalAreas()
        ]);
    }

    private getOrganisationUnits(){
        return getData('/organisationUnits.json?filter=level:eq:3')
            .then(res=>transformIdNameList(res.organisationUnits))
            .then((orgUnits)=>{
                this.orgUnitList = orgUnits;
        });
    }

    private getAgencies(){
        return getData('/categoryOptionGroups.json?filter=groupSets.id:eq:bw8KHXzxd9i&paging=false')
            .then(res=>transformIdNameList(res.categoryOptionGroups))
            .then((agencyList)=>{
                this.agencyList = agencyList;
        });
    }

    private getTechnicalAreas(){

    }

    getFilterOptions(type:FilterType){
        switch(type){
            case FilterType.agency: return this.agencyList;
            case FilterType.organisationUnit: return this.orgUnitList;
            //throw new Error('Unknown filter option')
            default: return [];
        }
    }
}

