import User from "../pages/login.page";

const user = new User;

describe("Amega Login", () => {

	let username;
	let password;

	before(() => {
		username = Cypress.env("username");
		password = Cypress.env("password");
	});

	beforeEach(() => {
		
	});

	it("should login to Amega successfully", () => {
		user.login(username, password);
	});
});