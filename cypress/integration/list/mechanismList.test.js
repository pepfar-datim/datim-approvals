describe('Mechanism List', function() {

    it('_ submit by partner', ()=>{
        cy.approvalsApiCall('partner', 'submit', 'mer');
    });

    it('_ accept by agency', ()=>{
        cy.approvalsApiCall('agency', 'accept', 'mer');
    });

    it('_ submit by agency', ()=>{
        cy.approvalsApiCall('agency', 'submit', 'mer');
    });

    it('_ accept by inter-agency', ()=>{
        cy.approvalsApiCall('inter-agency', 'accept', 'mer');
    });

    it('_ submit by inter-agency', ()=>{
        cy.approvalsApiCall('inter-agency', 'submit', 'mer');
    });


    it('Should see MER Results for Asia Region', function () {
        cy.loginAs('approvals-agency');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Asia Region');
        cy.get('.cy_list_results').containsAll([
            '29 mechanisms',
            '16681 - National Center for Tuberculosis and Leprosy Control (CENAT) Phase II',
        ]);
    });

    it('Should see all mechanisms as Global', function () {
        cy.loginAs('approvals-global');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Global');
        cy.get('.cy_list_results').containsAll([
            /16.. mechanisms/,
            'Global',
        ],{timeout: 15000});
    });  

    it('Should have tabs', ()=>{
        cy.get('#cy_mechanismListTab_return').click();
        cy.get('.cy_list_results').containsAll([
            '17350 - 6NU2GGH001462 - Laboratory Strengthening',
        ]);
        cy.get('.cy_list_results').containsNotAll([
            '11040 - HIV in Refugee Camps'
        ]);
        cy.get('#cy_mechanismListTab_view').click();
    });

    it('Should have pagination', ()=>{
        cy.get('[title="Next Page"]').click();
        cy.get('.cy_list_results').containsAll([
            /21-40 of 16../,
            '00200 - PEPFAR-MOH align: PEPFAR Data'
        ]);
        cy.get('[title="Previous Page"]').click();
    });
    it('Should search',()=>{
        cy.get('[placeholder="Search"]').type('Accelerating');
        cy.get('.cy_list_results').containsAll([
            'Accelerating Progress in Communities (APC 2.0)'
        ]);
        cy.get('.cy_list_results').containsNotAll([
            '11040 - HIV in Refugee Camps'
        ]);
        
    });
});