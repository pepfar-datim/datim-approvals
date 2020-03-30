const actionPageAreas = [
    {name: 'info', css: '.cy_mechanismInfo'},
    {name: 'actions', css: '#cy_mechanismActions'},
    {name: 'stepper', css: '#cy_actionPage_stepper'},
    {name: 'form', css: '#cy_actionPage_form'},
];

function generateAreaCommand(commandName, cssSelector){
    Cypress.Commands.add(commandName, ()=>{
        return cy.get(cssSelector)
    });
}

actionPageAreas.forEach(area=>generateAreaCommand(area.name, area.css));

const allActions = ['submit', 'accept', 'recall', 'return', 'No actions'];

function getOtherActions(permittedActions){
    return allActions.filter(action=>permittedActions.indexOf(action)==-1)
}

Cypress.Commands.add('permittedActions', (permittedActions)=>{
    cy.actions().containsAll(permittedActions);
    cy.actions().containsNotAll(getOtherActions(permittedActions))
});