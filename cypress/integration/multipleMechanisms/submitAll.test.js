describe('Submit All', ()=>{
    it('select all mechanisms', ()=>{
        cy.loginAs('superAdmin');
        cy.goHome();
        cy.searchMechanisms('MER Targets','2019Oct','Global');
        cy.get('.MuiTableRow-head').find('input').click();
        cy.get('#cy_selectSingleStatus').click();
    });
    it('should see form preview and mech info', ()=>{
        cy.get('#cy_list_mechanismAction').click();
        cy.containsAll([
            'Angola, Asia Region, Botswana',
            '81378 - TBDawardUSAID - [Placeholder - 81378 Sierra Leone USAID ]',
            'Loading aggregated dataset. This may take several minutes.',
            'accepted by global',
            'pending at partner',
            'MER Targets',
            'Oct 2019 - Sep 2020',
            'All Mechanisms Overview'
        ],{timeout: 20000});
        cy.contains('Number of males circumcised as part of the voluntary medical male circumcision', {timeout: 4*60*1000});
    });
});