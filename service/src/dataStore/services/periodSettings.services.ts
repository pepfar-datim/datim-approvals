import {PeriodInfo} from "../types/dataStore.types.ts";

export function isPeriodExpired(periodInfo:PeriodInfo):boolean{
    const now = new Date().getTime();
    const start = new Date(periodInfo.start).getTime();
    const end = new Date(periodInfo.end).getTime();
    return now<start || now>end;
}