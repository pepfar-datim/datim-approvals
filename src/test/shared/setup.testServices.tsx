import {loadingDone, renderComponent, select} from "@pepfar-react-lib/jest-tools";
import {testAs} from "@pepfar-react-lib/http-tools";
import List from "../../modules/list/components/list.component";
import {SearchFilters} from "../../modules/list/models/filters.model";

export const selectSearchFilters = async (filters:SearchFilters)=>{
    Object.keys(filters).forEach(key=>{
        select(`filter_${key}`,filters[key]);
    })
    await loadingDone();
}

export const renderSearch = async (filters:SearchFilters)=>{
    testAs('cypress-superAdmin');
    await renderComponent(<List/>,['DATIM Approvals']);
    await selectSearchFilters(filters);
}