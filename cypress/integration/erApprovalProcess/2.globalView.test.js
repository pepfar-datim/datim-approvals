describe('ER Approval Process #2 - Global', ()=>{

    it('_ return to submitted by agency', ()=>{
        cy.approvalsApiCall('agency-hq', 'recall', 'er');
        cy.approvalsApiCall('agency', 'submit', 'er');
        cy.approvalsApiCall('agency-hq', 'accept', 'er');
    });

    it('Should find Mechanism 17286 accepted by Agency HQ in LIST', ()=>{
        cy.loginAs('approvals-global');
        cy.goHome();
        cy.searchMechanisms('ER Expenditures FYOct','2018Oct','Asia Region');
        cy.get('.cy_list_results').containsAll([
            '75 mechanisms',
        ]);
        cy.get('[placeholder="Search"]').type('17286');
        cy.get('.cy_list_results').containsAll([
            '17286 - 6NU2GGH001346 - Care, Support and Treatment - HIV/TB Project',
            'accepted by agency hq',
        ]);
    });

    it('Should find Mech 17286 accepted by Agency HQ in ACTION', ()=>{
        cy.mechanismAction('view', '#cy_results_17286___6NU2GGH001346___Care__Support_and_Treatment___HIV_TB_Project');
        cy.stepper().containsAll(['accepted by agency hq', 'accepted by global']);
        cy.info().containsAll(['accepted by agency hq', '17286 - 6NU2GGH001346 - Care, Support and Treatment - HIV/TB Project']);
    });


    // it('Should find Mechanism 17286 as accepted by global for MER Results', ()=>{
    //     cy.goHome();
    //     cy.searchMechanisms('MER Results','2019Q3','Asia Region');
    //     cy.get('[placeholder="Search"]').type('17286');
    //     cy.get('.cy_list_results').containsAll([
    //         '75 mechanisms',
    //         '17286 - 6NU2GGH001346 - Care, Support and Treatment - HIV/TB Project',
    //     ]);
    //     cy.get('#cy_results_17286___6NU2GGH001346___Care__Support_and_Treatment___HIV_TB_Project').containsAll([
    //         'pending at partner',
    //     ]);
    // });
});