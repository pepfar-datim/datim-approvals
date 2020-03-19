describe('Approval Process #2 - Agency ACCEPT', ()=>{
    it('_ return to pending at partner', ()=>{
        cy.resetMerMechanism();
    });   
    it('_ submit by partner', ()=>{
        cy.approvalsApiCall('partner', 'submit', 'mer');
    });

    it('Should display Mechanism 17350 as ready to accept', ()=>{
        cy.loginAs('approvals-agency');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Asia Region');
        cy.get('#cy_results_17350___6NU2GGH001462___Laboratory_Strengthening').contains('submitted by partner');
    });
    it('Should display mechanism detail with status ready to accept', ()=>{
        cy.mechanismAction('accept', '#cy_results_17350___6NU2GGH001462___Laboratory_Strengthening');
        cy.contains('Number of new health workers who graduated');
        cy.actions().containsAll(['recall','accept']);
        cy.info().contains('submitted by partner');
    });

    it('Should be able to return mechanism', ()=>{
        cy.get('#cy_mechanismAction_recall').click();        
        cy.containsAll([
            'Mechanism successfully recalled',
            'Number of new health workers who graduated'
        ]);
        cy.actions().contains('No actions');
        cy.info().contains('pending at partner');        
    }); 

    it('_ resubmitting mechanism via API', ()=>{
        cy.approvalsApiCall('partner','submit', 'mer');
    });

    it('Should be able to accept mechanism', ()=>{
        cy.loginAs('approvals-agency');
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'ptVxnBssua6');

        cy.actions().containsAll(['accept', 'recall']);
        cy.info().contains('submitted by partner');  

        cy.get('#cy_mechanismAction_accept').click();        
        cy.containsAll([
            'Mechanism successfully accepted',
            'Number of new health workers who graduated'
        ]);
        cy.actions().containsAll(['return', 'submit']);
        cy.info().contains('accepted by agency');          
    });         
});