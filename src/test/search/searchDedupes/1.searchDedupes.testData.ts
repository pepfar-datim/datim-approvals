import {SearchFilters} from "../../../modules/list/models/filters.model";

export type TestAction = {
    click?: string;
    clickByCss?:string;
    texts?: string[];
    noTexts?: string[]
}

export type TestCase = {
    name: string;
    asUser: string;
    filters: SearchFilters;
    actions: TestAction[];
}

const botswanaList = [
    '7320 - StateAFLaboratory - RPSO laboratory construction projects',
    '9915 - GH001116 - Capacity building assistance for global HIV/AIDS microbiological labs',
    'American Society For Microbiology',
    '17275 - GGH001314 - Voluntary Medical Male Circumcision',
    'accepted by global'
];

export const testCases:TestCase[] = [{
    name: '#1a - Global sees Go button',
    asUser: 'superAdmin',
    filters: {
        workflow: 'MER Results',
        period: 'Oct - Dec 2020',
        ou: 'Botswana',
    },
    actions: [{
        noTexts: botswanaList,
        texts: ['Please click Go to search']
    },{
        click: 'searchGo',
        texts: botswanaList
    },{
        click: 'resultTabs_submit',
        noTexts: botswanaList
    },{
        click: 'resultTabs_return',
        texts: botswanaList
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
// },{
//     name: `#1c - Partner can select mechanisms`,
//     asUser: 'partnerSouthAfrica',
//     filters: {
//         workflow: 'MER Results',
//         period: 'Jul - Sep 2020',
//         ou: 'South Africa',
//     },
//     actions: [{
//         texts: ['81891 - GH002187 - SiN (GH002187)', 'HHS/CDC', 'accepted by agency', 'SHOUT IT NOW']
//     },{
//         clickByCss: '[data-id="1"] input',
//         texts: ['1 selected mechanism(s)']
//     }]
}]
