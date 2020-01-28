const baseUrl = require('../../../src/config/serverConfig.dev').baseUrl;
const testPassword = Cypress.env('TEST_PASSWORD');
if (!testPassword) throw new Error('Test password environment variable not set: CYPRESS_TEST_PASSWORD');

Cypress.Commands.add('loginAs', (userType)=>{
    cy.request({
        method: 'POST', 
        url: `${baseUrl}dhis-web-commons-security/login.action`,
        body: `j_username=cypress-${userType}&j_password=${testPassword}`,
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