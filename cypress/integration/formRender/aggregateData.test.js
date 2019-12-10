function checkField(de, co, data){
    cy.get(`[data-de='${de}'][data-co='${co}']`).contains(data);
}

function switchToFacility(){
    cy.get('#cy_formSelect_input').click();
    cy.get('#cy_formSelect_dataset_MER_Results__Facility_Based').click();
}

describe('Aggregate Data', ()=> {
    it('login', () => {
        cy.loginAs('superAdmin');
    });
    it('Should see All Mechanisms Overview', ()=>{
        cy.visit('/#/action?action=view&approvalCombos=f5RoebaDLMx%3ABOKwiEdAMzQ%3AJPmbX9ZfXmd%3A&approvalCombos=f5RoebaDLMx%3ABaAWvLUBS9a%3Ao9IHCJEfiXL%3A&period=2019Q3&workflow=RwNpkAM7Hw7');
        cy.containsAll([
            'All Mechanisms Overview',
            'USAID, HHS/CDC',
            'RIGHT TO CARE, JHPIEGO CORPORATION',
        ]);
    });
    it('Should be able to switch to `MER Results: Facility based`', ()=>{
        switchToFacility();
    });

    it('Should have the right aggregated data', ()=>{
        checkField('RhkU5KjtAi6','xjIOzgKKqaE','14');
        checkField('RhkU5KjtAi6','srbCCscTJaK','655');
        checkField('RhkU5KjtAi6','nsATUhYrzYh','1958');
    });

    it('Should be able to switch to 18304', ()=>{
        cy.contains('18304 - EQUIP').click();
        switchToFacility();
    });

    it('Should have the right for 18304', ()=>{
        checkField('RhkU5KjtAi6','xjIOzgKKqaE','14');
        checkField('RhkU5KjtAi6','srbCCscTJaK','54');
        checkField('RhkU5KjtAi6','nsATUhYrzYh','911');
    });

    it('Should be able to switch to 17514', ()=>{
        cy.contains('17514 - Jhpiego Follow-On').click();
        switchToFacility();
    });

    it('Should have the right for 17514', ()=>{
        checkField('RhkU5KjtAi6','srbCCscTJaK','601');
        checkField('RhkU5KjtAi6','nsATUhYrzYh','1047');
    });
});