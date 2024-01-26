import {IdName} from "../../misc/types/misc.types";

export type CategoryOptionGroup = {
    id: string;
    name: string;
    groupSets: [{id: string}],
}

export type DhisMechanismInfo = {
    id: string;
    name: string;
    organisationUnits: IdName[],
    categoryOptionCombos: IdName[],
    categoryOptionGroups: CategoryOptionGroup[]
}