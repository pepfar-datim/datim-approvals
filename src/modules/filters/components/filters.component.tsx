import React from "react";
import {Drawer} from "@material-ui/core";
import {FiltersModel} from "../models/filters.model";

export default function Filters({selectedFilters, selectFilters}:{
    selectedFilters: FiltersModel,
    selectFilters: (FiltersModel)=>void
}) {
    return <Drawer
        anchor='left'
        variant="persistent"
        open={true}
    >

    </Drawer>;
}