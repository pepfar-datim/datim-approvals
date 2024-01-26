export type PeriodInfo = {
    name:string;
    start:string;
    end:string;
    datasets: string[];
}

export type PeriodMap = {
    [periodName:string]:PeriodInfo
}
export type DataStore = {
    [workflowName:string]:PeriodMap
}