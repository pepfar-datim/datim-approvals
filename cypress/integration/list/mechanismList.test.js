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


    it('Should see MER Results for India', function () {
        cy.loginAs('agency-india');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','India');
        cy.get('.cy_list_results').containsAll([
            '5 mechanisms',
            '16566 - Orphans and Vulnerable Children Project',
            '18593 - HIV/AIDS Services for Key Populations Affected by HIV Project',
            'UNAIDS JOINT UNITED NATIONS PROGRAMME ON HIV/AIDS',
            'KARNATAKA HEALTH PROMOTION TRUST'
        ]);
    });

    it('Should see all mechanisms as Global', function () {
        cy.loginAs('approvals-global');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Global');
        cy.get('.cy_list_results').containsAll([
            '1620 mechanisms',
            'Global',
        ],{timeout: 15000});
    });  

    it('Should have tabs', ()=>{
        cy.get('#cy_mechanismListTab_recall').click();
        cy.get('.cy_list_results').containsAll([
            '17350 - Laboratory Strengthening',
        ]);
        cy.get('.cy_list_results').containsNotAll([
            '11040 - HIV in Refugee Camps'
        ]);
        cy.get('#cy_mechanismListTab_view').click();
    });

    it('Should have pagination', ()=>{
        cy.get('[title="Next Page"]').click();
        cy.get('.cy_list_results').containsAll([
            '21-40 of 1620',
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