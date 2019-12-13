const baseUrl = require('../../../src/config/serverConfig.dev').baseUrl;
const userPassword = require('../../../src/config/testConfig.dev').userPassword;

Cypress.Commands.add('loginAs', (userType)=>{
    cy.request({
        method: 'POST', 
        url: `${baseUrl}dhis-web-commons-security/login.action`,
        body: `j_username=cypress-${userType}&j_password=${userPassword}`,
        headers: {
            'authority': baseUrl,
            'origin': baseUrl,
            'referer': `${baseUrl}dhis-web-commons-security/login.action`,
            'content-type': 'application/x-www-form-urlencoded',
        }
    }).then((response)=>{ 
        console.log(response);
    });
});