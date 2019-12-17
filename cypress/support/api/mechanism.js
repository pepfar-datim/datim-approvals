const baseUrl = require('../../../src/config/serverConfig.dev').baseUrl;
const submitUrl = `api/dataApprovals/approvals`;
const recallUrl = `api/dataApprovals/unapprovals`;
const acceptUrl = `api/dataAcceptances/acceptances`;
const requestBodyTemplate = {"approvals":[],"pe":[],"wf":[]};

function generateRequestBody(workflow, period, ou, mechanism){
    let requestBody = JSON.parse(JSON.stringify(requestBodyTemplate));
    requestBody.wf.push(workflow);
    requestBody.pe.push(period);
    requestBody.approvals.push({aoc: mechanism, ou: ou});
    return requestBody;
}

function getUrl(action){
    switch (action){
        case 'recall': return recallUrl;
        case 'submit': return submitUrl;
        case 'accept': return acceptUrl;
    }
}

function apiRequest(userType, action, body){
    cy.request({
        method: 'POST',
        failOnStatusCode: false,
        url: baseUrl+getUrl(action),
        body: body,
        auth: {
            'user': `cypress-approvals-${userType}`,
            'pass': 'Cypress1!',
        }
    }).then((res)=>{
        console.log(`sent api request as ${userType} to ${action} mechanism ${body.approvals[0].aoc}`);
    });
}

Cypress.Commands.add('approvalsApiCall', (userType, action, workflowName)=>{
    let requestBody;
    if (workflowName==='mer') requestBody = generateRequestBody('RwNpkAM7Hw7','2019Q3','skj3e4YSiJY','ifIy3vjx3Xx');
    if (workflowName==='er') requestBody = generateRequestBody('WUD8TApgOu1','2018Oct', 'skj3e4YSiJY', 'm0NndYanyMR');
    if (workflowName==='multiple1') requestBody = generateRequestBody('RwNpkAM7Hw7','2019Q3','l1KFEXKI4Dg', 'TKBbV46WUX3');
    if (workflowName==='multiple2') requestBody = generateRequestBody('RwNpkAM7Hw7','2019Q3','l1KFEXKI4Dg', 'VdSh1pgKSLp');
    apiRequest(userType, action, requestBody);
});