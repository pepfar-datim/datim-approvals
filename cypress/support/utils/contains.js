function getContext(subject){
    let s;
    if (subject) s = cy.wrap(subject);
    else s = cy;
    return s;
}

Cypress.Commands.add('containsAll', { prevSubject: 'optional'}, (subject, texts, options) => {
    texts.forEach(t=>{
        getContext(subject).contains(t, options);
    });
});

Cypress.Commands.add('containsNot', { prevSubject: 'optional'}, (subject, text)=>{
    getContext(subject).contains(text).should('not.visible');
});


Cypress.Commands.add('containsNotAll', { prevSubject: 'optional'}, (subject, texts)=>{
    texts.forEach(t=>{
        getContext(subject).containsNot(t);
    });
});