import { login as data } from "../fixtures/login.data";

const loginButtons = {
	signIn: "[data-testid='test-submit']"
};

const loginInputs = {
	email: "input[name='email']",
	password: "input[name='password']"
};

export default class Login {

	login(username, password) {
		cy.clearAllCookies();
		cy.visit("/login");
		cy.assertAPIResponse("@getSession");
		cy.containsText(data.heading, "h1");
		cy.clickButtonWithText("Accept All Cookies");
		cy.clickButtonWithText("Email");
		cy.fillField(loginInputs.email, username);
		cy.fillField(loginInputs.password, password);
		cy.clickButtonWithText("Sign in", loginButtons.signIn);
		cy.assertAPIResponse("@postClientLogin");
		cy.assertAPIResponse("@postLogin");
		cy.assertAPIResponse("@postAccounts");
		cy.assertAPIResponse("@postTransactions");
		cy.assertAPIResponse("@getProfile");
		cy.assertAPIResponse("@getList");
	}
}