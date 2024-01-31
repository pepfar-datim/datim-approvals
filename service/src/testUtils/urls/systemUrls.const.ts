import {organisationUnitsRespone} from "./data/system/organisationUnits.response.ts";
import {dataApprovalWorkflowsResponse} from "./data/system/dataApprovalWorkflows.response.ts";
import {dataStoreResponse} from "./data/system/dataStore.response.ts";
import {MapOf} from "../../misc/types/misc.types.ts";
import {userGroupsResponse} from "./data/system/userGroups.response.ts";

const dataApprovalWorkflowsUrl = '/api/dataApprovalWorkflows.json?fields=id,name'
const dataStoreUrl = '/api/dataStore/approvals/periods'
const organisationUnitsUrl = '/api/organisationUnits?level=3&paging=false'
const userGroups = '/api/me.json?fields=userGroups[id,name]'
export const systemUrls:MapOf<any> = {
    [organisationUnitsUrl]: organisationUnitsRespone,
    [dataApprovalWorkflowsUrl]: dataApprovalWorkflowsResponse,
    [dataStoreUrl]: dataStoreResponse,
    [userGroups]: userGroupsResponse,
}