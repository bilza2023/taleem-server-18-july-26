// --------------------------------------------------
// App
// --------------------------------------------------

import { Connector } from "./connector.js";

const server =
	document.getElementById("server");

const email =
	document.getElementById("email");

const password =
	document.getElementById("password");

const login =
	document.getElementById("login");

const status =
	document.getElementById("status");

// --------------------------------------------------
// Login
// --------------------------------------------------

login.addEventListener(

	"click",

	async () => {

		status.textContent =
			"Logging in...";

		try {

			const connector =
				new Connector(

					server.value.trim()

				);

			await connector.login(

				email.value.trim(),

				password.value

			);

			status.textContent =
				"Login successful.";

		}

		catch (err) {

			status.textContent =
				err.message;

		}

	}

);

// --------------------------------------------------
// Restore Server
// --------------------------------------------------

const savedServer =

	localStorage.getItem(

		"taleem-admin-server"

	);

if (savedServer) {

	server.value = savedServer;

}
// --------------------------------------------------
// Utilities
// --------------------------------------------------

document
	.getElementById("utilities")
	.addEventListener(

		"click",

		() => {

			window.location.href =

				"http://127.0.0.1:9000/api/utilities/index.html";

		}

	);

// --------------------------------------------------
// Logout
// --------------------------------------------------

document
	.getElementById("logout")
	.addEventListener(

		"click",

		() => {

			localStorage.removeItem(
				"taleem-admin-token"
			);

			localStorage.removeItem(
				"taleem-admin-server"
			);

			document.getElementById(
				"status"
			).textContent =

				"Logged out.";

		}

	);