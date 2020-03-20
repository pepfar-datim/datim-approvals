function switchToOuLevel(){
    cy.get('#cy_formSelect_input').click();
    cy.get('#cy_formSelect_dataset_MER_Results__Operating_Unit_Level__IM__FY2019Q4').click();
}

describe('Form Render', ()=>{
    it('Should render form content (Laboratory Settings)', ()=>{
        cy.loginAs('approvals-partner');
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'ptVxnBssua6');
        cy.contains('17350 - 6NU2GGH001462 - Laboratory Strengthening');
        switchToOuLevel();
        cy.containsAll([
            'Number of new health workers who graduated',
            'Disaggregated by Cadre Category',
        ], {timeout: 5000});
    });
    it('Should collapse section', ()=>{
        cy.wait(3000);
        cy.contains('HRH_PRE').click();
        cy.containsNotAll([
            'Number of new health workers who graduated',
        ]);        
    })
});