describe('Approval Process #1 - Submitted by Partner', function() {

    it('_ return to pending at partner', ()=>{
        cy.resetMerMechanism();
    });   

    it('Should see MER Results / Asia Region / Q3 / Pending', function () {
        cy.loginAs('approvals-partner');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Asia Region');
        cy.get('.cy_list_results').containsAll([
            '2 mechanisms',
            '17350 - 6NU2GGH001462 - Laboratory Strengthening',
            '17286 - 6NU2GGH001346 - Care, Support and Treatment - HIV/TB Project',
            'SHARE INDIA',
            'HHS/CDC'
        ]);
    });

    it('Should redirect to action page when click on SUBMIT', ()=>{
        cy.mechanismAction('submit', '#cy_results_17350___6NU2GGH001462___Laboratory_Strengthening');
        cy.info().containsAll([
            'pending at partner',
            '17350 - 6NU2GGH001462 - Laboratory Strengthening'
        ]);
    });
    it('Should submit mechanism on SUBMIT click', ()=>{
        cy.permittedActions(['submit']);
        cy.get('#cy_mechanismAction_submit').click();
        cy.contains('Mechanism successfully submitted');
        cy.info().containsAll([
            'submitted by partner',
            '17350 - 6NU2GGH001462 - Laboratory Strengthening'
        ]);
    });
    it('Should recall mechanism on RECALL click', ()=>{
        cy.permittedActions(['recall']);
        cy.get('#cy_mechanismAction_recall').click();
        cy.contains('Mechanism successfully recalled');
        cy.info().containsAll([
            'pending at partner',
            '17350 - 6NU2GGH001462 - Laboratory Strengthening'
        ]);
        cy.actions().contains('submit');
    });
});