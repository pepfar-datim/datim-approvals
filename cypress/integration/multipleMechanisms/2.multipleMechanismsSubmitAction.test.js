describe('Multiple Mechanisms SUBMIT #2 (Action)', function() {
    it('_ return all mechanisms to pending at partner', ()=>{
        cy.loginAs('approvals-partner-botswana');
        cy.resetMultipleMechanisms();
    });
    it('_ go to action page for two mechanisms',()=>{
        cy.visit('/#/action?action=view&approvalCombos=l1KFEXKI4Dg%3ATKBbV46WUX3%3AiRbiBYQuiNZ%3A&approvalCombos=l1KFEXKI4Dg%3AVdSh1pgKSLp%3AXTVSZlHG6Ux%3A&period=2019Q3&workflow=RwNpkAM7Hw7');
        cy.wait(5000);
    });

    it('should have the right content', ()=>{
        cy.containsAll([
            '14707 - Ambassador\'s PEPFAR Small Grants Program',
            'DEPARTMENT OF STATE',
            'Number of new health workers who graduated from a pre-service training institution or program as a result of PEPFAR-supported strengthening efforts, within the reporting period, by select cadre. Numerator will auto-calculate from cadre disaggregates.',
            '14790 - Public Affairs/Public Diplomacy (PA/PD) Outreach'
        ]);
    });

    it('should be able to submit both', ()=>{
        cy.get('#cy_mechanismAction_submit').click();
        cy.contains('Mechanism(s) successfully submitted');
        cy.info().containsAll([
            'submitted by partner',
        ]);
        cy.actions().contains('recall');
    });

    it('should have appropriate statuses in list', ()=>{
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Botswana');
        cy.get('#cy_results_14707___Ambassador_s_PEPFAR_Small_Grants_Program').contains('submitted by partner');
        cy.get('#cy_results_14790___Public_Affairs_Public_Diplomacy__PA_PD__Outreach').contains('submitted by partner');
        cy.get('#cy_results_7320___RPSO_laboratory_construction_projects').contains('pending at partner');
    });
});