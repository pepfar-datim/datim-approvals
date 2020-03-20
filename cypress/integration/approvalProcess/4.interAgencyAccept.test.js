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
            '61 mechanisms',
            '16566 - AID386A1400007 - Orphans and Vulnerable Children Project',
            '17111 - AIDGHIO1200001 - Joint U.N. Programme on HIV/AIDS (UNAIDS III)',
            'UNAIDS JOINT UNITED NATIONS PROGRAMME ON HIV/AIDS',
        ]);
        cy.get('[placeholder="Search"]').type('17350');
        cy.get('#cy_results_17350___6NU2GGH001462___Laboratory_Strengthening').contains('submitted by agency');
        cy.mechanismAction('accept', '#cy_results_17350___6NU2GGH001462___Laboratory_Strengthening');
    });

    it('Should display Mechanism 17350 as ready to ACCEPT', ()=>{
        cy.actions().containsAll(['recall','accept']);
        cy.info().contains('submitted by agency');             
    });    

    it('Should be able to RECALL mechanism', ()=>{
        cy.get('#cy_mechanismAction_recall').click();  
        cy.contains('Mechanism successfully recalled');        
        cy.actions().contains('No actions');
        cy.info().contains('accepted by agency');        
    });

    it('_ submit by agency', ()=>{
        cy.approvalsApiCall('agency', 'submit', 'mer');
    });       


    it('Should be able to ACCEPT mechanism', ()=>{
        cy.loginAs('approvals-inter-agency');
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'ptVxnBssua6');
        cy.get('#cy_mechanismAction_accept').click();  
        cy.contains('Mechanism successfully accepted');        
        cy.actions().containsAll(['submit', 'recall', 'return']);
        cy.info().contains('accepted by inter-agency');               
    });    

    it('Should be able to RECALL ACCEPTED mechanism', ()=>{
        cy.get('#cy_mechanismAction_recall').click();  
        cy.contains('Mechanism successfully recalled');        
        cy.actions().contains('No actions');
        cy.info().contains('accepted by agency');                    
    });        
});