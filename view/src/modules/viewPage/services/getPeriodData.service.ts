import {DataStore, isPeriodExpired, PeriodInfo} from '@approvals/service'
import {Period} from "../type/viewPage.types.ts";

export async function getPeriodIdName(workflowName: string, periodId: string): Promise<Period> {
    const dataStore: DataStore = await fetch('/api/dataStore/approvals/periodSettings').then(r => r.json());
    const periodInfo:PeriodInfo = dataStore[workflowName][periodId]
    const expired:boolean = isPeriodExpired(periodInfo)
    return {
        id: periodId,
        name: periodInfo.name,
        expired,
    }
}