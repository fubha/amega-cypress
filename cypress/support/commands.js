/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("clickButton", (selector, index) => {
	/* 
		[Important]
		If we use the expression if(index) to check if an argument is not initialized, 
		then we would find that the empty string or zero would be treated as undefined.
	*/
	if (index !== undefined) {
		cy.get(selector).eq(index)
			.click();
	} else {
		cy.get(selector)
			.click();
	}
});

Cypress.Commands.add("doubleClickButton", (selector, index) => {
	if (index !== undefined) {
		cy.get(selector).eq(index)
			.dblclick();
	} else {
		cy.get(selector)
			.dblclick();
	}
});

Cypress.Commands.add("clickButtonWithText", (text, selector) => {
	if(selector) {
		cy.get(selector).contains(text)
			.click();
	} else {
		cy.contains(text)
			.click();
	}
});

Cypress.Commands.add("fillField", (selector, text, isUnique, index) => {
	const position = index || 0;
	cy.get(selector).eq(position)
		.clear();
	if (isUnique) {
		cy.get(selector).eq(position)
			.type(text, { parseSpecialCharSequences: true });
	} else {
		cy.get(selector).eq(position)
			.type(text, { parseSpecialCharSequences: false });
	}
});

Cypress.Commands.add("isElementVisible", (selector, index, scroll) => {
	const position = index || 0;
	if(scroll) {
		cy.get(selector).eq(position)
			.scrollIntoView();
		cy.get(selector).eq(position)
			.should("be.visible");
	} else {
		cy.get(selector).eq(position)
			.should("be.visible");
	}
});

Cypress.Commands.add("isElementEnabled", (selector, index) => {
	const position = index || 0;
	cy.get(selector).eq(position)
		.should("be.enabled");
});

Cypress.Commands.add("isElementDisabled", (selector, index) => {
	const position = index || 0;
	cy.get(selector).eq(position)
		.should("be.disabled");
});

Cypress.Commands.add("assertText", (selector, text, index) => {
	const position = index || 0;
	cy.get(selector).eq(position)
		.should("have.text", text);
});

Cypress.Commands.add("assertValue", (selector, text, index) => {
	const position = index || 0;
	cy.get(selector).eq(position)
		.should("have.value", text);
});

Cypress.Commands.add("containsText", (text, selector) => {
	if(selector) {
		cy.get(selector).should('contain', text)
			.and('be.visible');
	} else {
		cy.contains(text).should('be.visible');
	}
});

Cypress.Commands.add("interceptRoutes", () => {
	cy.intercept("GET", Cypress.env("apiUrl") + "/auth/session").as("getSession");
	cy.intercept("POST", Cypress.env("apiUrl") + "/auth/callback/login").as("postLogin");
	cy.intercept("POST", Cypress.env("baseUrl") + "/client-api/login").as("postClientLogin");
	cy.intercept("POST", Cypress.env("clientUrl") + "/accounts").as("postAccounts");
	cy.intercept("POST", Cypress.env("clientUrl") + "/transactions").as("postTransactions");
	cy.intercept("GET", Cypress.env("clientUrl") + "/profile").as("getProfile");
	cy.intercept("GET", Cypress.env("clientUrl") + "/contest/list").as("getList");
	cy.intercept("POST", Cypress.env("clientUrl") + "/cashback-breakdown").as("postCashbackBreakdown");
	cy.intercept("POST", Cypress.env("clientUrl") + "/logout").as("postClientLogout");
	cy.intercept("POST", Cypress.env("apiUrl") + "/auth/signout").as("postLogout");
});

Cypress.Commands.add("assertAPIResponse", (route, statusCode) => {
	const status = statusCode || 200;
	cy.wait(route).its("response.statusCode")
		.should("eq", status);
});

Cypress.Commands.add("pollAPIRequest", (route, key, value) => {
	cy.wait(route).then((interception) => {
		const result = interception.response.body[key];
		if (result === value) {
			return;
		}
		cy.pollAPIRequest(route, key, value);
	});
	// For more details please visit; https://docs.cypress.io/api/commands/request#Request-Polling
});

Cypress.Commands.add("uploadFile", (filePath, index, selector) => {
	const position = index || 0;
	const locator = selector || "input[type='file']";
	/* 
		{ force: true } is added because it's a hidden input
		For more details please visit; https://docs.cypress.io/api/commands/selectfile#On-a-hidden-input
	*/
	cy.get(locator).eq(position)
		.selectFile(filePath, { force: true });
});