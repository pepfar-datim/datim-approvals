Cypress.Commands.add('loadDone', ()=>{
    cy.get('.cy_loading').should('not.exist');
});

const workflowIdNameMap = {
    'MER Results':'RwNpkAM7Hw7',
    'MER Targets':'TAjCBkG6hl6',
    'ER Expenditures FYOct':'WUD8TApgOu1'
};

const ouIdNameMap = {
    'Asia Region':'ptVxnBssua6',
    'Global':'ybg3MO3hcf4',
    'Botswana':'l1KFEXKI4Dg',
};

Cypress.Commands.add('searchMechanisms', (workflow, period, ou)=>{
    cy.loadDone();
    cy.get('.cy_list_workflowSelect').select(workflowIdNameMap[workflow]);
    cy.loadDone();    
    cy.get('.cy_list_periodSelect').select(period);
    cy.loadDone();    
    cy.get('.cy_list_ouSelect').select(ouIdNameMap[ou]);
});

Cypress.Commands.overwrite('select', (x, subject, value)=>{
    cy.get(subject).click();
    cy.get(`[data-value="${value}"]`).click();
});

Cypress.Commands.add('mechanismAction', (action, css)=>{
    cy.get('#cy_mechanismListTab_'+action).click();
    cy.get(css).find('input').click();
    cy.get('#cy_list_mechanismAction').click();
});