import React from "react";
import Filters from "../../filters/components/filters.component";
import {DedupeTypeModel, FiltersModel, idName} from "../../filters/models/filters.model";

export default class Main extends React.Component<{}, {
    selectedFilters:FiltersModel
}> {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: {
                organisationUnit: {id:'1',name:'angola'},
                dataType: {id:'1',name:'angola'},
                period: {id:'1',name:'angola'},
                agency: {id:'1',name:'angola'},
                technicalArea: {id:'1',name:'angola'},
                dedupeType: 'crosswalk' as DedupeTypeModel
            }
        };
    }

    onFiltersSelect = (selectedFilters:FiltersModel):void=>{
        this.setState({selectedFilters});
    };

    render() {
        return <React.Fragment>
            <Filters
                selectedFilters={this.state.selectedFilters}
                onFiltersSelect={this.onFiltersSelect}
            />
        </React.Fragment>;
    }
}