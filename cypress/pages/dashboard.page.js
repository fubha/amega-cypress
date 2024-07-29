import { dashboard as data } from "../fixtures/dashboard.data";

const tabs = {
	cashback: "#button-cashback",
	hub: "#button-hub",
	hubInfo: "#section-hub-info",
	hubLogout: "#section-hub-logout"
};

const username = Cypress.env("username");

export default class Dashboard {

	openCashback() {
		cy.clickButtonWithText(data.cashbackTab, tabs.cashback);
		cy.assertAPIResponse("@postCashbackBreakdown");
		cy.containsText(data.cashbackHeader);
	}

	openHub() {
		cy.clickButtonWithText(data.hubTab, tabs.hub);
		cy.assertAPIResponse("@getHub");
		cy.containsText(username, tabs.hubInfo);
		cy.containsText(data.logout, tabs.hubLogout);
	}
}