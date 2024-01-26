import {automatedTest, TestCase} from "@pepfar-react-lib/jest-tools";
import React from "react";
import Action from "../../modules/action/components/action.component";

export const testCases:TestCase[] = [{
    name: '#1a - Global sees Go button, pagination works, switching tabs works',
    asUser: 'superAdmin',
    component: <Action/>,
    preRender: ()=>{
        window.location.hash = '/action?approvalCombos=l1KFEXKI4Dg%3AlMYMYFB2ybp%3AG0MUqG3bRui%3A&approvalCombos=l1KFEXKI4Dg%3ApVkEOqie8Qi%3AwWv3tfpWQA5%3A&approvalCombos=l1KFEXKI4Dg%3ATKBbV46WUX3%3AiRbiBYQuiNZ%3A&approvalCombos=l1KFEXKI4Dg%3AVdSh1pgKSLp%3AXTVSZlHG6Ux%3A&period=2020Q4&workflow=RwNpkAM7Hw7';
    },
    actions: [{
        texts:[
            '7320, 9915, 14707, 14790',
            'American Society For Microbiology, DEPARTMENT OF STATE',
            'HHS/CDC, State/AF',
            'accepted by global',
            'Number of males circumcised as part of the voluntary medical male circumcision (VMMC) for HIV prevention program within the preporting period.',
            'Number of individuals who have been newly enrolled on oral antiretroviral pre-exposure prophylaxis (PrEP) in the reporting period to prevent HIV infection.',
            'Quarterly Reporting'
        ]
    },{
        clickByText: '14707 - StateAFSmallGrants - Ambassador\'s PEPFAR Small Grants Program',
    }, {
        click: 'actionButton_return',
        expectPost: {
            url: '/dataApprovals/unapprovals',
            body: {"approvals":[{"aoc":"TKBbV46WUX3","ou":"l1KFEXKI4Dg"},{"aoc":"VdSh1pgKSLp","ou":"l1KFEXKI4Dg"},{"aoc":"lMYMYFB2ybp","ou":"l1KFEXKI4Dg"},{"aoc":"pVkEOqie8Qi","ou":"l1KFEXKI4Dg"}],"pe":["2020Q4"],"wf":["RwNpkAM7Hw7"]}
        }
    }]
}];

testCases.forEach((testCase:TestCase)=>{
    test(`#2 > Action test ${testCase.name}`, async ()=>{
        await automatedTest(testCase);
    })
});