export type IdName = {
    id: string;
    name: string;
}

export type MapOf<T> = {[key:string]:T}

export type Trigger = () => void

export type SetFunction<T> = (value:T)=>void

export type SelectedFilters = {
    workflow: string;
    period: string;
    ouId: string;
}