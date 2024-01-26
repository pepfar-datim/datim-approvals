import {loadingDone, select} from "@pepfar-react-lib/jest-tools";
import {SearchFilters} from "../../modules/list/models/filters.model";
// import {TestCase} from "../search/searchDedupes/1.searchDedupes.testData";

export const selectSearchFilters = async (filters:SearchFilters)=>{
    Object.keys(filters).forEach(key=>{
        select(`filter_${key}`,filters[key]);
    })
    await loadingDone();
}

// export const renderSearch = async ({filters, asUser}:TestCase)=>{
//     testAs(asUser);
//     await renderComponent(<List/>,['Workflow', 'Period']);
//     await selectSearchFilters(filters);
// }