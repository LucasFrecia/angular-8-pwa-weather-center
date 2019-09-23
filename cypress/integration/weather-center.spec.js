/**
 * Tests for this challenge
 * @author Lucas Frecia
 */


describe('Weather Center', () => {

    beforeEach(() => {
        cy.visit('/').wait(2000);
    });

    it('SETS DIFFERENT MAIN IMAGA FOR MOBILE', () => {

        cy.viewport('iphone-6');

        cy.get('[data-test-id=main-image]')
            .should('be.visible')
            .wait(1000);

        cy.get('[data-test-id=main-image]')
            .invoke('attr', 'src')
            .should('contain', './assets/main-mobile.gif');
    });

    it('SELECT FIRST ITEM FROM DROPDOWN AND SUBMIT FORM', () => {


        /** Call our custom command to select 'Amsterdam' in our city select form */
        cy.selectMaterialDropDown('cityIds', 'Amsterdam')
            .wait(1000);

        /** Call our custom command thac closes material overlays that detects user clicks to close dropdown */
        cy.closeOverlayCdk();

        /** Check everything is ready and submit form */
        cy.get('[data-test-id=submit-landing-form-btn]')
            .should('be.visible')
            .and('be.enabled')
            .click()
            .wait(500);

        /** Check we received correct city data from service 1/2 */
        cy.get('[data-test-id=weather-item-card]')
            .should('have.length', 1);

        /** .... and click on card 2/2 */
        cy.get('[data-test-id=item-card-name]')
            .should('be.visible')
            .contains('Amsterdam')
            .click();

    });

    it('GETS TO FIVE DAY FORECAST AND SHOWS FORECAST AND CURRENT WEATHER CARDS WITH CORRECT DATA', () => {
        cy.selectMaterialDropDown('cityIds', 'Buenos Aires');
        cy.closeOverlayCdk();
        cy.get('[data-test-id=submit-landing-form-btn]')
            .should('be.visible')
            .and('be.enabled')
            .click();

        cy.get('[data-test-id=weather-item-card]')
            .should('have.length', 1)
            .contains('Buenos Aires').click();

        /** Is at correct url */
        cy.url().should('include', '/forecasts/city/3435910');

        /** It shows correct current weather card */
        cy.get('[data-test-id=item-card-name]')
            .should('be.visible')
            .contains('Buenos Aires').click()
            .wait(1000);

        /** Forecasts table has 6 rows, since virtual scroll will show only first 6 rows of the total 40 */
        cy.get('[data-test-id=selected-item-forecast-row]')
            .should('be.visible')
            .should('have.length', 6);

    });


    it('LOADS 5 COUNTRY CARDS BY DEFAULT WHEN NAVIGATING BY URL TO LIST', () => {
        cy.visit('/forecasts/list').wait(2000);

        /** Check that the 5 cards are loaded and displayed */
        cy.get('[data-test-id=weather-item-card]')
            .should('have.length', 5);

    });

});