import {MechanismActions} from "../models/mechanism.model";

type Dhis2Permissions = {
    mayApprove:boolean;
    mayUnapprove:boolean;
    mayAccept:boolean;
    mayUnaccept:boolean;
};

export default function getPermittedActions(dhis2permissions:Dhis2Permissions):MechanismActions {
    if (!dhis2permissions) return {};
    return {
        submit: dhis2permissions.mayApprove,
        recall: dhis2permissions.mayUnapprove,
        accept: dhis2permissions.mayAccept,
        return: dhis2permissions.mayUnaccept,
    }
}