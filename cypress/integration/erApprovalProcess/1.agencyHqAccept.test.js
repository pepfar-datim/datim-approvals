describe('ER Approval Process #1 - Agency HQ ACCEPT', ()=>{

    it('_ return to submitted by agency', ()=>{
        cy.approvalsApiCall('agency-hq', 'recall', 'er');
        cy.approvalsApiCall('agency', 'submit', 'er');
    });


    it('Should find Mechanism 17286 submitted by Agency', ()=>{
        cy.loginAs('approvals-agency-hq');
        cy.goHome();
        cy.searchMechanisms('ER Expenditures FYOct','2018Oct','India');
        cy.get('.cy_list_results').containsAll([
            '9 mechanisms',
            '17286 - Care, Support and Treatment - HIV/TB Project',
            'submitted by agency',
        ]);
        cy.get('#cy_results_17286___Care__Support_and_Treatment___HIV_TB_Project').contains('submitted by agency');
    });

    it('Should see Agency HQ on action page', ()=>{
        cy.mechanismAction('accept', '#cy_results_17286___Care__Support_and_Treatment___HIV_TB_Project');
        cy.stepper().containsAll(['accepted by agency hq', 'accepted by global']);
        cy.actions().containsAll(['recall','accept']);
        cy.info().containsAll(['submitted by agency', '17286 - Care, Support and Treatment - HIV/TB Project']);
        cy.form().containsAll(['Expenditure Upload', 'Expenditure Report']);
    });

    it('Should be able to accept mechanism', ()=>{
        cy.get('#cy_mechanismAction_accept').click();
        cy.containsAll([
            'Mechanism successfully accepted',
        ]);
        cy.actions().containsAll(['submit', 'recall', 'return']);
        cy.info().containsAll([
            '17286 - Care, Support and Treatment - HIV/TB Project',
            'accepted by agency hq'
        ]);
    });
});