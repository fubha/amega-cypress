import { login as data } from "../fixtures/login.data";

const loginButtons = {
	signIn: "[data-testid='test-submit']"
};

const loginInputs = {
	email: "input[name='email']",
	password: "input[name='password']"
};

export default class Login {

	openLoginPage() {
		cy.clearAllCookies();
		cy.visit("/login");
		cy.containsText(data.heading, "h1");
		cy.clickButtonWithText("Accept All Cookies");
		cy.clickButtonWithText("Email");
	}

	enterEmail(username) {
		cy.fillField(loginInputs.email, username);
	}

	enterPassword(password) {
		cy.fillField(loginInputs.password, password);
	}

	clickSignInButton() {
		cy.clickButtonWithText("Sign in", loginButtons.signIn);
	}

	login(username, password) {
		cy.assertAPIResponse("@getSession");
		this.enterEmail(username);
		this.enterPassword(password);
		this.clickSignInButton();
	}

	assertLoginSucces() {
		cy.assertAPIResponse("@postClientLogin");
		cy.assertAPIResponse("@postLogin");
		cy.assertAPIResponse("@postAccounts");
		cy.assertAPIResponse("@postTransactions");
		cy.assertAPIResponse("@getProfile");
		cy.assertAPIResponse("@getList");
	}

	assertLoginFailure(isEmailValid) {
		if(isEmailValid) {
			cy.containsText(data.emptyFieldError);
		} else {
			cy.containsText(data.invalidEmailError);
		}
	}
}