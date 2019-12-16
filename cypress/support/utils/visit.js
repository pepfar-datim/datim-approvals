Cypress.Commands.add('goHome', ()=>{
    cy.visit('/');
});


Cypress.Commands.add('gotoMechanism', (cocId, workflow, period, ou)=>{
    let coId;
    if (cocId==='ifIy3vjx3Xx') coId = 'HBArdtWFelX';
    if (cocId==='lMYMYFB2ybp') coId = 'G0MUqG3bRui';
    cy.visit(`/#/action?approvalCombos=${ou}:${cocId}:${coId}&period=${period}&workflow=${workflow}`);
});