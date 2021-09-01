import {renderSearch} from "../../shared/setup.testServices";
import Filters from "../../../modules/list/models/filters.model";
import {texts} from "@pepfar-react-lib/jest-tools";

type TestCase = {
    name: string;
    filters: Filters;
    expected: string[];
}

const testCases:TestCase[] = [{
    name: 'MER Results > Oct - Dec 2020 > Botswana',
    filters: {
        workflow: 'MER Results',
        period: 'Oct - Dec 2020',
        ou: 'Botswana',
    },
    expected: [
        '7320 - StateAFLaboratory - RPSO laboratory construction projects',
        '9915 - GH001116 - Capacity building assistance for global HIV/AIDS microbiological labs',
        'American Society For Microbiology',
        '17275 - GGH001314 - Voluntary Medical Male Circumcision',
        'accepted by global'
    ]
}]

function searchDedupesTest(testCase:TestCase){
    test(`1 > Search Dedupes > ${testCase.name}`, async()=>{
        await renderSearch(testCase.filters);
        texts(testCase.expected);
    })
}

testCases.forEach(searchDedupesTest)