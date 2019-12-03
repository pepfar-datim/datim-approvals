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