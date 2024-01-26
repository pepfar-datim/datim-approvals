import {ApprovalStatus} from "../types/approvalStatus.types.ts";
import {fromCamelCase} from "../../misc/services/misc.service.ts";

export function getHumanReadableStatus(status:ApprovalStatus):string{
    return fromCamelCase(status).replace('inter agency', 'inter-agency')
}