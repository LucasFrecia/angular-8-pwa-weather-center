/**
 * Custom commands for this challenge
 * @author Lucas Frecia
 */

Cypress.Commands.add("selectMaterialDropDown", (formControlName, selectOption) => {
    cy.get(`[formcontrolname="${formControlName}"]`).click().then(() => {
        cy.get(`.mat-option-text`).should('contain', selectOption);
        cy.get(`.mat-option-text:contains("${selectOption}")`).first().click();
    });
});


Cypress.Commands.add("closeOverlayCdk", () => {
    cy.get(`.cdk-overlay-container`).click({force: true});
    cy.get(`.cdk-overlay-backdrop`).click({force: true});
    cy.get(`.cdk-overlay-transparent-backdrop`).click({force: true});
});

Cypress.Commands.add("selectMaterialMultipleDropDown", (formControlName) => {
    cy.get(`[formcontrolname="${formControlName}"]`).click().then(() => {
        cy.get(`.cdk-overlay-container .mat-select-panel .mat-option-text`).should('contain', selectOption);
        cy.get(`.cdk-overlay-container .mat-select-panel .mat-option-text:contains("${selectOption}")`).first().click().then(() => {
            // After click, mat-select should contain the text of the selected option
            cy.get(`[formcontrolname="${formControlName}"]`).contains(selectOption);
        });
    });
});
