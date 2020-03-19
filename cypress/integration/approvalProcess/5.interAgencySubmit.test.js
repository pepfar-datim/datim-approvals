describe('Approval Process #5 - Inter-Agency SUBMIT', ()=>{

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

    it('Should be able to SUBMIT mechanism as Inter-Agency', ()=>{
        cy.loginAs('approvals-inter-agency');
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'ptVxnBssua6');
        cy.get('#cy_mechanismAction_submit').click();  
        cy.contains('Mechanism successfully submitted');        
        cy.actions().containsAll(['recall']);
        cy.info().contains('submitted by inter-agency');               
    });   
    
    //TODO: Recall submitted
    
});