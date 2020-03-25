import React from "react";
import {Drawer} from "@material-ui/core";
import {FiltersModel, FilterType} from "../models/filters.model";
import SelectFilter from "./selectFilter.component";

function renderSelectFilters(selectedFilters: FiltersModel, onFiltersSelect: (FiltersModel)=>void) {
    return Object.keys(selectedFilters).map((filterType:string)=>{
        return <SelectFilter
            filterType={filterType as FilterType}
            filterValue={selectedFilters[filterType]}
            onFilterSelect={onFiltersSelect}
        />
    });
}

export default function Filters({selectedFilters, onFiltersSelect}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (FiltersModel)=>void
}) {
    return <Drawer
        anchor='left'
        variant="persistent"
        open={true}
    >
        {renderSelectFilters(selectedFilters, onFiltersSelect)}
    </Drawer>;
}