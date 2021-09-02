import {debug, loadingDone, renderComponent, select, texts} from "@pepfar-react-lib/jest-tools";
import Filters from "../../modules/list/models/filters.model";
import {testAs} from "@pepfar-react-lib/http-tools";
import ThemeWrapper from "../../modules/main/components/themeWrapper.component";

export const selectSearchFilters = async (filters:Filters)=>{
    Object.keys(filters).forEach(key=>{
        select(`filter_${key}`,filters[key]);
    })
    await loadingDone();
}

export const renderSearch = async (filters:Filters)=>{
    testAs('cypress-superAdmin');
    await renderComponent(<ThemeWrapper/>,['DATIM Approvals']);
    await selectSearchFilters(filters);
}