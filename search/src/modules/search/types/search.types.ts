import {IdName, MechanismActions} from "@approvals/service";

export type Period = {expired: boolean} & IdName;

export type Workflow = {
    id: string;
    name: string;
    periods: Period[];
}

export type MenuOptions = {
    workflows: Workflow[]
    ouList: IdName[]
}
export type User = {
    ou: {
        id: string,
        name: string
    },
    isSuperUser: boolean,
}

export function getActionIndex(action:MechanismActions){
    return Object.values(MechanismActions).indexOf(action)
}

export function getActionName(index:number):MechanismActions{
    return Object.keys(MechanismActions)[index] as MechanismActions
}