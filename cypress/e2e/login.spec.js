import User from "../pages/login.page";
import { login as data } from "../fixtures/login.data";

const user = new User;

describe("Amega Login", () => {

	let username;
	let password;

	before(() => {
		username = Cypress.env("username");
		password = Cypress.env("password");
	});

	beforeEach(() => {
		user.openLoginPage();
	});

	it("should display error message if email is invalid", () => {
		user.enterEmail(data.invalidEmail);
		user.clickSignInButton();
		user.assertLoginFailure(false);
	});

	it("should display error message if email is not entered", () => {
		user.enterPassword(password);
		user.clickSignInButton();
		user.assertLoginFailure(true);
	});

	it("should display error message if password is not entered", () => {
		user.enterEmail(username);
		user.clickSignInButton();
		user.assertLoginFailure(true);
	});

	it("should display error message if both email and password are not entered", () => {
		user.clickSignInButton();
		user.assertLoginFailure(true);
		user.assertLoginFailure(true);
	});

	it("should login to Amega successfully", () => {
		user.login(username, password);
		user.assertLoginSucces();
	});
});