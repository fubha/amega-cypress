import User from "../pages/login.page";
import Dashboard from "../pages/dashboard.page";

const user = new User;
const dashboard = new Dashboard;

describe("Cashback Tab", () => {

	let username;
	let password;

	before(() => {
		username = Cypress.env("username");
		password = Cypress.env("password");
	});

	it("should open Cashback tab", () => {
		user.login(username, password);
		dashboard.openCashback();
	});
});