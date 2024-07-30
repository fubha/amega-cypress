import User from "../../pages/login.page";
import Dashboard from "../../pages/dashboard.page";

const user = new User;
const dashboard = new Dashboard;

describe("Hub Tab", () => {

	let username;
	let password;

	before(() => {
		username = Cypress.env("username");
		password = Cypress.env("password");
	});

	it("should open Hub tab", () => {
		user.login(username, password);
		dashboard.openHub();
	});

	it("should logout successfully", () => {
		dashboard.logout();
	});
});