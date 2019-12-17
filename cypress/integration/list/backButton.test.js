describe('List Back Button', ()=>{
    it('_ return to pending at partner', ()=>{
        cy.resetMerMechanism();
    });
    
    it('Should select WF/PE/OU', ()=>{
        cy.loginAs('approvals-partner');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','India');
    });
});