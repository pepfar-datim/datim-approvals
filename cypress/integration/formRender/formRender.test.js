describe('Form Render', ()=>{
    it('Should render form content (Laboratory Settings)', ()=>{
        cy.loginAs('approvals-partner');
        cy.gotoMechanism('ifIy3vjx3Xx', 'RwNpkAM7Hw7', '2019Q3', 'skj3e4YSiJY');
        cy.containsAll([
            'Number of new health workers who graduated',
            'Disaggregated by Cadre Category',
        ]);
    });
    it('Should collapse section', ()=>{
        cy.wait(3000);
        cy.contains('HRH_PRE').click();
        cy.containsNotAll([
            'Number of new health workers who graduated',
        ]);        
    })
});