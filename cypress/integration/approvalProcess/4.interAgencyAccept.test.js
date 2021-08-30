describe('Approval Process #4 - Inter-Agency ACCEPT', ()=>{

    it('_ return to pending at partner', ()=>{
        cy.resetMerMechanism();
    });   
    it('_ submit by partner', ()=>{
        cy.approvalsApiCall('partner', 'submit', 'mer');
    });

    it('_ accept by agency', ()=>{
        cy.approvalsApiCall('agency', 'accept', 'mer');
    });   
    
    it('_ submit by agency', ()=>{
        cy.approvalsApiCall('agency', 'submit', 'mer');
    });       

    it('Should display Mechanism 17350 as ready to ACCEPT in list', ()=>{
        //TODO: See correct status
        cy.loginAs('approvals-inter-agency');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Asia Region');
        cy.get('.cy_list_results').containsAll([
            '65 mechanisms',
            '16566 - AID386A1400007 - Orphans and Vulnerable Children Project',
        ]);
        cy.get('[placeholder="Search"]').type('17350');
        cy.get('#cy_results_17350___6NU2GGH001462___Laboratory_Strengthening').contains('submitted by agency');
        cy.mechanismAction('accept', '#cy_results_17350___6NU2GGH001462___Laboratory_Strengthening');
    });

    it('Should display Mechanism 17350 as ready to ACCEPT', ()=>{
        cy.permittedActions(['accept','return']);
        cy.info().contains('submitted by agency');             
    });    

    it('Should be able to RETURN mechanism', ()=>{
        cy.get('#cy_mechanismAction_return').click();
        cy.contains('Mechanism successfully returned');
        cy.permittedActions(['No actions']);
        cy.info().contains('accepted by agency');        
    });

    it('_ submit by agency', ()=>{
        cy.approvalsApiCall('agency', 'submit', 'mer');
    });       


    it('Should be able to ACCEPT mechanism', ()=>{
        cy.loginAs('approvals-inter-agency');
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'ptVxnBssua6');
        cy.permittedActions(['accept','return']);
        cy.get('#cy_mechanismAction_accept').click();  
        cy.contains('Mechanism successfully accepted');        
        cy.permittedActions(['submit','return']);
        cy.info().contains('accepted by inter-agency');               
    });    

    it('Should be able to RETURN ACCEPTED mechanism', ()=>{
        cy.permittedActions(['submit','return']);
        cy.get('#cy_mechanismAction_return').click();
        cy.contains('Mechanism successfully returned');
        cy.permittedActions(['No actions']);
        cy.info().contains('accepted by agency');                    
    });        
});