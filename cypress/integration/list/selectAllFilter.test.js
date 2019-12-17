describe('Select all filter', ()=>{
    it('Should prevent SUBMITTING different statuses', ()=>{
        cy.loginAs('approvals-global');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Global');
        cy.get('.MuiTableRow-head input').click();
        cy.containsAll(['All selected mechanisms must have the same status to proceed.']);
    });
});