import {renderSearch} from "../../shared/setup.testServices";
import {click, clickByCss, debug, noTexts, texts, textsWait} from "@pepfar-react-lib/jest-tools";
import {TestAction, TestCase, testCases} from "./1.searchDedupes.testData";
import {screen} from "@testing-library/react";

jest.mock('react-router-dom', () => ({Link:({to,children}:{to:string,children:any})=><a href={to} data-testid="listActionLink">{children}</a>}));

async function performTestAction(action:TestAction){
    if (action.click) click(action.click);
    if (action.clickByCss) clickByCss(action.clickByCss);
    if (action.texts) await textsWait(action.texts);
    if (action.noTexts) await noTexts(action.noTexts);
    if (action.custom) action.custom();
}

function searchDedupesTest(testCase:TestCase){
    test(`1 > Search Dedupes > ${testCase.name}`, async()=>{
        await renderSearch(testCase);
        for (let i=0;i<testCase.actions.length;i++){
            await performTestAction(testCase.actions[i]);
        }
    })
}

testCases.forEach(searchDedupesTest)