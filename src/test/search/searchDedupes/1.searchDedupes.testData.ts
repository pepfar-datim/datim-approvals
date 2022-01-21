import {SearchFilters} from "../../../modules/list/models/filters.model";
import {checkAttribute} from "@pepfar-react-lib/jest-tools";
import {get} from "@pepfar-react-lib/jest-tools";

export type TestAction = {
    click?: string;
    clickByCss?:string;
    texts?: string[];
    noTexts?: string[]
    custom?: ()=>void
}

export type TestCase = {
    name: string;
    asUser: string;
    filters: SearchFilters;
    actions: TestAction[];
}

const botswanaPage1 = [
    '7320 - StateAFLaboratory - RPSO laboratory construction projects',
    '9915 - GH001116 - Capacity building assistance for global HIV/AIDS microbiological labs',
    'American Society For Microbiology',
    '17275 - GGH001314 - Voluntary Medical Male Circumcision',
    'accepted by global',
    '1–20 of 87'
];

const botswanaPage2 = [
    '18253 - 6NU2GGH002070 - Community HIV Testing and Counseling and KP Support',
    '18458 - GH002027 - Botswana Combination Prevention Program (BCPP)',
    '81543 - TBDawardDOD - [Placeholder - 81543 Botswana DOD]',
    '21–40 of 87'
]

export const testCases:TestCase[] = [{
    name: '#1a - Global sees Go button',
    asUser: 'superAdmin',
    filters: {
        workflow: 'MER Results',
        period: 'Oct - Dec 2020',
        ou: 'Botswana',
    },
    actions: [{
        noTexts: botswanaPage1,
        texts: ['Please click Go to search']
    },{
        click: 'searchGo',
        texts: botswanaPage1
    },{
        click: 'resultTabs_submit',
        noTexts: botswanaPage1,
        texts: ['1–4 of 4']
    },{
        click: 'resultTabs_view',
        texts: botswanaPage1
    },{
        clickByCss: '[title="Go to next page"]',
        texts:botswanaPage2
    }]
},{
    name: `#1b - Partner doesn't see Go button`,
    asUser: 'partnerSouthAfrica',
    filters: {
        workflow: 'MER Results',
        period: 'Jul - Sep 2020',
        ou: 'South Africa',
    },
    actions: [{
        noTexts: ['Please click Go to search'],
        texts: ['81891 - GH002187 - SiN (GH002187)', 'HHS/CDC', 'accepted by agency', 'SHOUT IT NOW']
    }]
},{
    name: `#1c - Partner can select mechanisms`,
    asUser: 'partnerSouthAfrica',
    filters: {
        workflow: 'MER Results',
        period: 'Jul - Sep 2020',
        ou: 'South Africa',
    },
    actions: [{
        texts: ['81891 - GH002187 - SiN (GH002187)', 'HHS/CDC', 'accepted by agency', 'SHOUT IT NOW']
    },{
        clickByCss: '[data-id="0"] input',
        texts: ['1 selected mechanism(s)']
    },{
        custom: ()=>{
            checkAttribute('listActionLink','href','/action?approvalCombos=cDGPF739ZZr%3Ac8eyZgNfGfB%3AJJMwJ8r9weR%3A&period=2020Q3&workflow=RwNpkAM7Hw7')
        }
    }]
}]

