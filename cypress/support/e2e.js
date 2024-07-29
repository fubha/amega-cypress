// Import commands.js using ES2015 syntax:
import './commands';

beforeEach(() => {
	cy.interceptRoutes();
});

before(() => {
	Cypress.on('uncaught:exception', () => {
		// returning false here prevents Cypress from failing the test
		// For more details please visit; https://docs.cypress.io/api/cypress-api/catalog-of-events#Uncaught-Exceptions
		return false;
	});
});