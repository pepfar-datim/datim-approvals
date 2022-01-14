import {renderSearch} from "../../shared/setup.testServices";
import {click, noTexts, texts, textsWait} from "@pepfar-react-lib/jest-tools";
import {TestAction, TestCase, testCases} from "./1.searchDedupes.testData";

async function performTestAction(action:TestAction){
    if (action.click) click(action.click);
    if (action.texts) await textsWait(action.texts);
    if (action.noTexts) await noTexts(action.noTexts);
}

function searchDedupesTest(testCase:TestCase){
    test(`1 > Search Dedupes > ${testCase.name}`, async()=>{
        await renderSearch(testCase);
        for (var i=0;i++;i<testCase.actions.length){
            await performTestAction(testCase.actions[i]);
        }
    })
}

testCases.forEach(searchDedupesTest)