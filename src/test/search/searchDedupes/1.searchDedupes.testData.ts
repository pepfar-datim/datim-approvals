import {SearchFilters} from "../../../modules/list/models/filters.model";

export type TestAction = {
    click?: string;
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
    name: '#1a - Global in Botswana 2020',
    asUser: 'superAdmin',
    filters: {
        workflow: 'MER Results',
        period: 'Oct - Dec 2020',
        ou: 'Botswana',
    },
    actions: [{
        noTexts: botswanaList,
        texts: ['Please click Go to search.']
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
    name: '#1b - Partner in SouthAfrica 2020Q3',
    asUser: 'partnerSouthAfrica',
    filters: {
        workflow: 'MER Results',
        period: 'Jul - Sep 2020',
        ou: 'South Africa',
    },
    actions: [{
        noTexts: ['Please click Go to search.'],
        texts: ['81891 - GH002187 - SiN (GH002187)', 'HHS/CDC', 'accepted by agency', 'SHOUT IT NOW']
    }]
}]
