describe('Multiple Mechanisms RECALL', function() {
    it('_ make sure mechanisms are submitted', () => {
        cy.loginAs('approvals-partner-botswana');
        cy.approvalsApiCall('partner-botswana', 'submit', 'multiple1');
        cy.approvalsApiCall('partner-botswana', 'submit', 'multiple2');
    });

    it('should have appropriate statuses in list', ()=>{
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Botswana');
        cy.get('#cy_results_14707___Ambassador_s_PEPFAR_Small_Grants_Program').contains('submitted by partner');
        cy.get('#cy_results_14790___Public_Affairs_Public_Diplomacy__PA_PD__Outreach').contains('submitted by partner');
        cy.get('#cy_results_7320___RPSO_laboratory_construction_projects').contains('pending at partner');
    });

    it('should be able to select two mechanisms for recall',()=>{
        cy.get('#cy_mechanismListTab_recall').click();
        cy.get('#cy_results_14707___Ambassador_s_PEPFAR_Small_Grants_Program').find('input').click();
        cy.get('#cy_results_14790___Public_Affairs_Public_Diplomacy__PA_PD__Outreach').find('input').click();
        cy.containsAll([
            '2 mechanism(s) selected',
            '2 selected mechanism(s)'
        ]);
    });

    it('Should redirect to action page with the right url', ()=>{
        cy.get('#cy_list_mechanismAction').click();
        cy.url().should('include','/action?action=recall&approvalCombos=TKBbV46WUX3%3Al1KFEXKI4Dg&approvalCombos=VdSh1pgKSLp%3Al1KFEXKI4Dg&period=2019Q3&workflow=RwNpkAM7Hw7');
    });

    it('should have the right content', ()=>{
        cy.wait(5000);
        cy.containsAll([
            '14707 - Ambassador\'s PEPFAR Small Grants Program',
            'DEPARTMENT OF STATE',
            'Number of new health workers who graduated from a pre-service training institution or program as a result of PEPFAR-supported strengthening efforts, within the reporting period, by select cadre. Numerator will auto-calculate from cadre disaggregates.',
            '14790 - Public Affairs/Public Diplomacy (PA/PD) Outreach'
        ]);
    });

    it('should be able to recall both', ()=>{
        cy.get('#cy_mechanismAction_recall').click();
        cy.contains('Mechanism(s) successfully recalled');
        cy.info().containsAll([
            'pending at partner',
        ]);
        cy.actions().contains('submit');
    });

    it('should have appropriate statuses in list', ()=>{
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Botswana');
        cy.get('#cy_results_14707___Ambassador_s_PEPFAR_Small_Grants_Program').contains('pending at partner');
        cy.get('#cy_results_14790___Public_Affairs_Public_Diplomacy__PA_PD__Outreach').contains('pending at partner');
        cy.get('#cy_results_7320___RPSO_laboratory_construction_projects').contains('pending at partner');
    });
});