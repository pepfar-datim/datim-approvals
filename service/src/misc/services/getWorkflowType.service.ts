import {WorkflowType} from "../../approvalStatus/types/approvalStatus.types.ts";

export function getWorkflowType(id:string):WorkflowType {
    switch (id) {
        case 'RwNpkAM7Hw7': //MER Results
        case 'TAjCBkG6hl6': // MER Targets
            return WorkflowType.mer
        case 'TsowbK0Ql3T': //HRH
        case 'WUD8TApgOu1': //ER
        case 'e8F8M6leZjj': //Budgets
            return WorkflowType.er
    }
}