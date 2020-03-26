import React from "react";
import Filters from "../../filters/components/filters.component";
import {DedupeTypeModel, FiltersModel, idName} from "../../filters/models/filters.model";
import FilterOptionsProvider from "../../filters/services/filterOptionsProvider.service";
import Loading from "../../shared/components/loading.component";

export default class Main extends React.Component<{}, {
    selectedFilters:FiltersModel,
    loadingFilterOptions: boolean
}> {
    filterOptionsProvider:FilterOptionsProvider = new FilterOptionsProvider();
    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: {
                organisationUnit: null,
                dataType: null,
                period: null,
                agency: null,
                technicalArea: null,
                dedupeType: null,
            },
            loadingFilterOptions: true
        };
        this.filterOptionsProvider.init().then(()=>{
            this.setState({loadingFilterOptions:false});
        });
    }

    onFiltersSelect = (selectedFilters:FiltersModel):void=>{
        this.setState({selectedFilters});
    };

    render() {
        if (this.state.loadingFilterOptions) return <Loading message={'Loading filters'}/>;
        return <React.Fragment>
            <Filters
                selectedFilters={this.state.selectedFilters}
                onFiltersSelect={this.onFiltersSelect}
                filterOptionsProvider={this.filterOptionsProvider}
            />
        </React.Fragment>;
    }
}