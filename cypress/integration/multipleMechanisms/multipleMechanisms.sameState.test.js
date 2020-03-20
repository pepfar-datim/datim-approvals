describe('Multiple Mechanisms ~ Same Status', ()=>{
    it('should be able to view 100 mechanisms', ()=>{
        cy.loginAs('approvals-global');
        cy.goHome();
        cy.searchMechanisms('MER Targets','2019Oct','Global');
        cy.get('.MuiTablePagination-select').click();
        cy.get('[data-value="100"]').click();
    });
    it('should not be able to view multiple mechanisms', ()=>{
        cy.get('#cy_results_00200___PEPFAR_MOH_align__PEPFAR_Data').find('input').click();
        cy.get('#cy_results_10000___NU2GGH001140___HAIVN').find('input').click();
        cy.get('#cy_list_mechanismAction').should('be.disabled');
        cy.contains('All selected mechanisms must have the same status to proceed');
    });
});