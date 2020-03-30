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
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'ptVxnBssua6');
        cy.permittedActions(['submit','return']);
        cy.info().contains('accepted by agency');          
    });

    it('Should be able to RETURN accepted mechanism', ()=>{
        cy.get('#cy_mechanismAction_return').click();
        cy.contains('Mechanism successfully returned');
        cy.permittedActions(['No actions']);
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
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'ptVxnBssua6');
        cy.permittedActions(['submit','return']);
        cy.info().contains('accepted by agency');           

        cy.get('#cy_mechanismAction_submit').click();  
        cy.contains('Mechanism successfully submitted');
        cy.permittedActions(['recall']);
        cy.info().contains('submitted by agency');           
    });    

    it('Should be able to RECALL submitted mechanism', ()=>{
        cy.get('#cy_mechanismAction_recall').click();  
        cy.contains('Mechanism successfully recalled');
        cy.permittedActions(['submit','return']);
        cy.info().contains('accepted by agency');         
    });
});