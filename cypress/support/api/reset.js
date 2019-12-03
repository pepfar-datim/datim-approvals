Cypress.Commands.add('resetMerMechanism', ()=>{
    cy.approvalsApiCall('global', 'recall', 'mer');
    cy.approvalsApiCall('inter-agency', 'recall', 'mer');
    cy.approvalsApiCall('agency', 'recall', 'mer');
    cy.approvalsApiCall('partner', 'recall', 'mer');
});

Cypress.Commands.add('resetMultipleMechanisms', ()=>{
    cy.approvalsApiCall('partner-botswana', 'recall', 'multiple1');
    cy.approvalsApiCall('partner-botswana', 'recall', 'multiple2');
});