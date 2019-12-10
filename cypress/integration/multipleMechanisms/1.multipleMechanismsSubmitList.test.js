describe('Multiple Mechanisms SUBMIT #1 (List)', function() {
    it('_ return all mechanisms to pending at partner', ()=>{
        cy.loginAs('approvals-partner-botswana');
        cy.resetMultipleMechanisms();
    });

    it('Should see 3 mechanisms for MER Results / Botswana', function () {
        cy.loginAs('approvals-partner-botswana');
        cy.goHome();
        cy.searchMechanisms('MER Results','2019Q3','Botswana');
        cy.containsAll([
            '14707 - Ambassador\'s PEPFAR Small Grants Program',
            '14790 - Public Affairs/Public Diplomacy (PA/PD) Outreach',
            '7320 - RPSO laboratory construction projects'
        ]);
    });
    it('Should be able to select multiple mechanisms',()=>{
        cy.get('#cy_mechanismListTab_submit').click();
        cy.get('#cy_results_14707___Ambassador_s_PEPFAR_Small_Grants_Program').find('input').click();
        cy.get('#cy_results_14790___Public_Affairs_Public_Diplomacy__PA_PD__Outreach').find('input').click();
        cy.containsAll([
            '2 mechanism(s) selected',
            '2 selected mechanism(s)'
        ]);
    });
    it('Should redirect to action page with the right url', ()=>{
        cy.get('#cy_list_mechanismAction').click();
        cy.url().should('include','/action?action=submit&approvalCombos=l1KFEXKI4Dg%3ATKBbV46WUX3%3AiRbiBYQuiNZ%3A&approvalCombos=l1KFEXKI4Dg%3AVdSh1pgKSLp%3AXTVSZlHG6Ux%3A&period=2019Q3&workflow=RwNpkAM7Hw7');
    });
    it('should have the right content', ()=>{
        cy.wait(10000);
        cy.containsAll([
            '14707 - Ambassador\'s PEPFAR Small Grants Program',
            'DEPARTMENT OF STATE',
            'Number of new health workers who graduated from a pre-service training institution or program as a result of PEPFAR-supported strengthening efforts, within the reporting period, by select cadre. Numerator will auto-calculate from cadre disaggregates.',
            '14790 - Public Affairs/Public Diplomacy (PA/PD) Outreach'
        ]);
    });
});