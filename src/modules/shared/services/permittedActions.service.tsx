import {MechanismActions} from "../models/mechanism.model";

type Dhis2Permissions = {
    mayApprove:boolean;
    mayUnapprove:boolean;
    mayAccept:boolean;
    mayUnaccept:boolean;
};

function canRecall(dhis2Permissions:Dhis2Permissions):boolean{
    if (!dhis2Permissions.mayAccept && dhis2Permissions.mayUnapprove && !dhis2Permissions.mayUnaccept) return true;
    return false;
}

function canReturn(dhis2Permissions:Dhis2Permissions):boolean{
    if (dhis2Permissions.mayAccept && dhis2Permissions.mayUnapprove) return true;
    if (dhis2Permissions.mayUnaccept && dhis2Permissions.mayUnapprove) return true;
    return false;
}

export default function getPermittedActions(dhis2permissions:Dhis2Permissions, currentStatus:string):MechanismActions {
    if (!dhis2permissions) return {};
    if (currentStatus==='accepted by global') dhis2permissions.mayApprove = false;
    return {
        submit: dhis2permissions.mayApprove,
        accept: dhis2permissions.mayAccept,
        recall: canRecall(dhis2permissions),
        return: canReturn(dhis2permissions),
    }
}