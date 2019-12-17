describe('List Back Button', ()=>{
    it('_ return to pending at partner', ()=>{
        cy.resetMerMechanism();
    });

    it('Should select WF/PE/OU', ()=>{
        cy.loginAs('approvals-partner');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','India');
    });

    it('Should redirect to action page when click on SUBMIT', ()=>{
        cy.mechanismAction('submit', '#cy_results_17350___Laboratory_Strengthening');
        cy.info().containsAll([
            'pending at partner',
            '17350 - Laboratory Strengthening'
        ]);
    });

    
});