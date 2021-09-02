import {renderSearch} from "../../shared/setup.testServices";
import Filters from "../../../modules/list/models/filters.model";
import {click, noTexts, texts} from "@pepfar-react-lib/jest-tools";

type TestAction = {
    click?: string;
    texts?: string[];
    noTexts?: string[]
}

type TestCase = {
    name: string;
    filters: Filters;
    actions: TestAction[];
}

const botswanaViewPage = [
    '7320 - StateAFLaboratory - RPSO laboratory construction projects',
    '9915 - GH001116 - Capacity building assistance for global HIV/AIDS microbiological labs',
    'American Society For Microbiology',
    '17275 - GGH001314 - Voluntary Medical Male Circumcision',
    'accepted by global'
];

const testCases:TestCase[] = [{
    name: 'MER Results > Oct - Dec 2020 > Botswana',
    filters: {
        workflow: 'MER Results',
        period: 'Oct - Dec 2020',
        ou: 'Botswana',
    },
    actions: [{
        texts: botswanaViewPage
    },{
        click: 'resultTabs_submit',
        noTexts: botswanaViewPage
    }]
}]


function performTestAction(action:TestAction){
    if (action.click) click(action.click);
    if (action.texts) texts(action.texts);
    if (action.noTexts) noTexts(action.noTexts);
}

function searchDedupesTest(testCase:TestCase){
    test(`1 > Search Dedupes > ${testCase.name}`, async()=>{
        await renderSearch(testCase.filters);
        testCase.actions.forEach(performTestAction);
    })
}

testCases.forEach(searchDedupesTest)