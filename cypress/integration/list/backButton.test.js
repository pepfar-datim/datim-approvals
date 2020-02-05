let url = '/#/search?ou=ptVxnBssua6&period=2019Q3&workflow=RwNpkAM7Hw7';

describe('List Back Button', ()=>{
    it('_ return to pending at partner', ()=>{
        cy.resetMerMechanism();
    });

    it('Should select WF/PE/OU', ()=>{
        cy.loginAs('approvals-partner');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Asia Region');
        cy.url().should('include',url);
    });

    it('Should redirect to action page when click on SUBMIT', ()=>{
        cy.mechanismAction('submit', '#cy_results_17350___6NU2GGH001462___Laboratory_Strengthening');
        cy.info().containsAll([
            'pending at partner',
            '17350 - 6NU2GGH001462 - Laboratory Strengthening'
        ]);
    });

    it('Should remember search after hitting Back', ()=>{
        cy.get('#cy_actionPage_back').click();
        cy.url().should('include',url);
    });
});