function switchToOuLevel(){
    cy.get('#cy_formSelect_input').click();
    cy.get('#cy_formSelect_dataset_MER_Results__Operating_Unit_Level__IM__FY2019Q4').click();
}

describe('Form Render', ()=>{
    it('Should render form content (Laboratory Settings)', ()=>{
        cy.loginAs('approvals-partner-botswana');
        cy.gotoMechanism('lMYMYFB2ybp', 'RwNpkAM7Hw7', '2019Q3', 'l1KFEXKI4Dg');
        cy.contains('7320 - StateAFLaboratory - RPSO laboratory construction projects');
        switchToOuLevel();
        cy.containsAll([
            'Number of new health workers who graduated',
            'Disaggregated by Cadre Category',
        ], {timeout: 5000});
    });
    it('Should load entered data', ()=>{
        cy.get('[data-co="QPO0ZfoGC5D"]').contains('123456');
        cy.get('[data-co="l6gFAecb5ua"]').contains('1234567');
        cy.get('.total_YDmbQxna').contains('1358023');
    });
});

/*
* Steps to reproduce data for this test:
*
* 1. Go to Data Entry app and find `MER Results`, `Jul - Sep 2019`, `Botswana` (country level)
* 2. Select `MER Results: Operating Unit Level (IM)`
* 3. Put in the data in first two inputs. Save.
* 4. Run analytics on the server: `dhis_api_analytics --config-file=/opt/dhis2_jakub/dish.json`
* 5. Wait for couple of hours. The data should appear.
* */