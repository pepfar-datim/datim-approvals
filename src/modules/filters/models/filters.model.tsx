export type idName = {id:string, name:string}

export enum DedupeTypeModel {
    pure = 'pure',
    pureAndResolved = 'pureAndResolved',
    crosswalk = 'crosswalk'
}

export enum FilterType {
    organisationUnit = 'organisationUnit',
    dataType='dataType',
    period='period',
    agency='agency',
    technicalArea='technicalArea',
    dedupeType='dedupeType'
}

export type FiltersModel = {
    organisationUnit: idName,
    dataType: idName,
    period: idName,
    agency: idName,
    technicalArea: idName,
    dedupeType: DedupeTypeModel
}