describe('Approval Process #6 - Global ACCEPT', ()=>{

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
    
    it('_ accept by inter-agency', ()=>{
        cy.approvalsApiCall('inter-agency', 'accept', 'mer');
    }); 

    it('_ submit by inter-agency', ()=>{
        cy.approvalsApiCall('inter-agency', 'submit', 'mer');
    });    
    
    it('Global should see mechanism in List', ()=>{
        //TODO: See correct status
        cy.loginAs('approvals-global');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','India');
        cy.get('.cy_list_results').containsAll([    
            '15 mechanisms',
            '16566 - Orphans and Vulnerable Children Project',
            '18593 - HIV/AIDS Services for Key Populations Affected by HIV Project',
            'UNAIDS JOINT UNITED NATIONS PROGRAMME ON HIV/AIDS',
            'KARNATAKA HEALTH PROMOTION TRUST'
        ]);              
        cy.get('#cy_results_17350___Laboratory_Strengthening').contains('submitted by inter-agency');
        cy.mechanismAction('accept', '#cy_results_17350___Laboratory_Strengthening');
    });

    it('Should be able to RECALL mechanism', ()=>{
        cy.actions().containsAll(['recall', 'accept']);
        cy.info().containsAll(['submitted by inter-agency', '17350 - Laboratory Strengthening']);           
        cy.get('#cy_mechanismAction_recall').click();  
        cy.contains('Mechanism successfully recalled');        
        cy.actions().contains('No actions');
        cy.info().contains('accepted by inter-agency');        
    });    

    it('_ submit by inter-agency', ()=>{
        cy.approvalsApiCall('inter-agency', 'submit', 'mer');
    });        

    it('Should be able to ACCEPT mechanism as Global', ()=>{
        cy.loginAs('approvals-global');
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'skj3e4YSiJY');
        cy.actions().containsAll(['recall', 'accept']);
        cy.info().containsAll(['submitted by inter-agency', '17350 - Laboratory Strengthening']);   
        cy.get('#cy_mechanismAction_accept').click();  
        cy.contains('Mechanism successfully accepted');        
        cy.actions().containsAll(['recall', 'return']);
        cy.info().contains('accepted by global');           
    });
});