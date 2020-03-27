import React from "react";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {FilterType, idName} from "../models/filters.model";
import {camelCaseToHuman} from "../../shared/services/camelCase.service";

export default function SelectFilter({filterType, filterValue, onFilterSelect, filterOptions}:{
    filterType:FilterType,
    filterValue:idName,
    onFilterSelect:(idName)=>void,
    filterOptions: idName[]
}) {
    console.log(filterOptions);
    return <React.Fragment>
        <InputLabel id={`selectFilter_${filterType}`}>{camelCaseToHuman(filterType)}</InputLabel>
        <Select
            labelId={`selectFilter_${filterType}`}
            id={`cypress_filter_${filterType}`}
            value={filterValue?filterValue.id:null}
            onChange={onFilterSelect}
        >
            {filterOptions.map(option=><MenuItem value={option.id}>{option.name}</MenuItem>)}
        </Select>
    </React.Fragment>;
}