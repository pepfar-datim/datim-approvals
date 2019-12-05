describe('Approval Process #3 - Agency SUBMIT', ()=>{

    it('_ return to pending at partner', ()=>{
        cy.resetMerMechanism();
    });   
    it('_ submit by partner', ()=>{
        cy.approvalsApiCall('partner', 'submit', 'mer');
    });

    it('_ accept by agency', ()=>{
        cy.approvalsApiCall('agency', 'accept', 'mer');
    });    

    it('Should display Mechanism 17350 as ready to SUBMIT', ()=>{
        cy.loginAs('approvals-agency');
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'skj3e4YSiJY');
        cy.actions().containsAll(['return', 'submit']);
        cy.info().contains('accepted by agency');          
    });

    it('Should be able to RETURN accepted mechanism', ()=>{
        cy.get('#cy_mechanismAction_recall').click();  
        cy.contains('Mechanism(s) successfully recalled');        
        cy.actions().contains('No actions');
        cy.info().contains('pending at partner');          
    });

    it('_ submit by partner', ()=>{
        cy.approvalsApiCall('partner', 'submit', 'mer');
    });

    it('_ accept by agency', ()=>{
        cy.approvalsApiCall('agency', 'accept', 'mer');
    });  
    
    it('Should be able to SUBMIT accepted mechanism', ()=>{
        cy.loginAs('approvals-agency');
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'skj3e4YSiJY');
        cy.actions().containsAll(['return','submit']);
        cy.info().contains('accepted by agency');           

        cy.get('#cy_mechanismAction_submit').click();  
        cy.contains('Mechanism(s) successfully submitted');       
        cy.actions().contains('recall');
        cy.info().contains('submitted by agency');           
    });    

    it('Should be able to RECALL submitted mechanism', ()=>{
        cy.get('#cy_mechanismAction_recall').click();  
        cy.contains('Mechanism(s) successfully recalled');       
        cy.actions().contains('recall');
        cy.info().contains('accepted by agency');         
    });
});