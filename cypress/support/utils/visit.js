Cypress.Commands.add('goHome', ()=>{
    cy.visit('/');
});


Cypress.Commands.add('gotoMechanism', (mechanismId, workflow, period, ou)=>{
    cy.visit(`/#/action?action=view&approvalCombos=${mechanismId}:${ou}&period=${period}&workflow=${workflow}`);
});