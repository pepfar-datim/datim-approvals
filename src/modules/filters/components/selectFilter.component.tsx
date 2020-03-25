import React from "react";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {FilterType, idName} from "../models/filters.model";
import {camelCaseToHuman} from "../../shared/services/camelCase.service";

export default function SelectFilter({filterType, filterValue, onFilterSelect}:{
    filterType:FilterType,
    filterValue:idName,
    onFilterSelect:(idName)=>void
}) {
    return <React.Fragment>
        <InputLabel id={`selectFilter_${filterType}`}>{camelCaseToHuman(filterType)}</InputLabel>
        <Select
            labelId={`selectFilter_${filterType}`}
            id={`cypress_filter_${filterType}`}
            value={filterValue.id}
            onChange={onFilterSelect}
        >
            <MenuItem value={10}>Ten</MenuItem>
        </Select>
    </React.Fragment>;
}