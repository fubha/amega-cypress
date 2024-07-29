import { defineConfig } from "cypress";

import development from "./cypress/config/development.config.js";
import staging from "./cypress/config/staging.config.js";
import sandbox from "./cypress/config/sandbox.config.js";
import production from "./cypress/config/production.config.js";

let environment;

if (process.env.ENV === "development") {
	environment = development;
} else if (process.env.ENV === "staging") {
	environment = staging;
} else if (process.env.ENV === "sandbox") {
	environment = sandbox;
} else if (process.env.ENV === "production") {
	environment = production;
} else {
	environment = staging; // default
}

export default defineConfig({
	e2e: {
		// e2e: https://docs.cypress.io/guides/references/configuration#e2e
		...environment,
		specPattern: [ 
			"cypress/e2e/login.spec.js",
			"cypress/e2e/**/*.spec.js"
		],
		excludeSpecPattern: [],
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},

		// Global: https://docs.cypress.io/guides/references/configuration#Global

		retries: {
			runMode: 1, // dafault is 0
			openMode: 0 // dafault is 0
		},
		env: {
			...environment
		},

		// Timeouts: https://docs.cypress.io/guides/references/configuration#Timeouts

		defaultCommandTimeout:   30000, // dafault is 4000
		requestTimeout: 30000, // dafault is 5000
		responseTimeout: 30000, // dafault is 30000

		// Viewport: https://docs.cypress.io/guides/references/configuration#Viewport

		viewportWidth: 1920, // dafault is 1000
		viewportHeight: 1080, // dafault is 660
    
		// Browser: https://docs.cypress.io/guides/references/configuration#Browser

		chromeWebSecurity: true, // dafault is true
		testIsolation: false // Allow multiple tests to run in the same browser instance.
	}
});