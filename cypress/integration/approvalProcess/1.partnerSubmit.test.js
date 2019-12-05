describe('Approval Process #1 - Submitted by Partner', function() {

    it('_ return to pending at partner', ()=>{
        // cy.resetMerMechanism();
    });   

    it('Should see MER Results / India / Q1 / Pending', function () {
        cy.loginAs('approvals-partner');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','India');
        cy.get('.cy_list_results').containsAll([
            '2 mechanisms',
            '17350 - Laboratory Strengthening',
            '17286 - Care, Support and Treatment - HIV/TB Project',
            'SHARE INDIA',
            'HHS/CDC'
        ]);
    });

    it('Should redirect to action page when click on SUBMIT', ()=>{
        cy.mechanismAction('submit', '#cy_results_17350___Laboratory_Strengthening');
        cy.info().containsAll([
            'pending at partner',
            '17350 - Laboratory Strengthening'
        ]);
    });
    it('Should submit mechanism on SUBMIT click', ()=>{
        cy.get('#cy_mechanismAction_submit').click();
        cy.contains('Mechanism(s) successfully submitted');
        cy.info().containsAll([
            'submitted by partner',
            '17350 - Laboratory Strengthening'
        ]);
        cy.actions().contains('recall');
    });
    it('Should recall mechanism on RECALL click', ()=>{
        cy.get('#cy_mechanismAction_recall').click();
        cy.contains('Mechanism(s) successfully recalled');
        cy.info().containsAll([
            'pending at partner',
            '17350 - Laboratory Strengthening'
        ]);
        cy.actions().contains('submit');
    });
});