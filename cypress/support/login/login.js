const serverUrl = require('../../../src/config/serverConfig.dev').cy_serverUrl;
const userPassword = require('../../../src/config/testConfig.dev').userPassword;

Cypress.Commands.add('loginAs', (userType)=>{
    cy.request({
        method: 'POST', 
        url: `${serverUrl}dhis-web-commons-security/login.action`,
        body: `j_username=cypress-${userType}&j_password=${userPassword}`,
        headers: {
            'authority': serverUrl,
            'origin': serverUrl,
            'referer': `${serverUrl}dhis-web-commons-security/login.action`,
            'content-type': 'application/x-www-form-urlencoded',
        }
    }).then((response)=>{ 
        console.log(response);
    });
});