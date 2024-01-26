import {getData} from "@pepfar-react-lib/http-tools";

/**
 * get all the level 3 OUs which 
 * @param workflow string
 * @param period string
 */
 function getLevelThreeOusUrl(){
    return `/organisationUnits/?level=3&paging=false`;
}

export function getLevel3OUs():Promise<[]>{
    return getData(getLevelThreeOusUrl()).then(response=>response.organisationUnits);
}
