import React from "react";
import Filters from "../../filters/components/filters.component";
import {FiltersModel} from "../../filters/models/filters.model";

export default class Main extends React.Component<{}, {
    selectedFilters:FiltersModel
}> {
    filtersSelected = (selectedFilters:FiltersModel):void=>{
        this.setState({selectedFilters});
    };

    render() {
        return <React.Fragment>
            <Filters
                selectedFilters={this.state.selectedFilters}
                filtersSelected={this.filtersSelected}
            />
        </React.Fragment>;
    }
}