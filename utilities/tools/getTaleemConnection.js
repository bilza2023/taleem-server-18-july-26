// --------------------------------------------------
// Get Taleem Connection
// --------------------------------------------------

import { TaleemAdminClient } from "./taleem-admin-client.js";

export async function getTaleemConnection() {

	const server =
		localStorage.getItem(
			"taleem-server-url"
		);

	const email =
		localStorage.getItem(
			"taleem-server-email"
		);

	const password =
		localStorage.getItem(
			"taleem-server-password"
		);

	if (
		!server ||
		!email ||
		!password
	) {

		showLoginToolbar();

		throw new Error(
			"Not connected."
		);

	}

	const taleem =
		new TaleemAdminClient(
			server
		);

	try {

		await taleem.connection.login(

			email,

			password

		);

		const ok =
			await taleem.connection.verify();

		if (!ok) {

			showLoginToolbar();

			throw new Error(
				"Not connected."
			);

		}

		return taleem;

	}

	catch (err) {

		console.error(err);

		showLoginToolbar();

		throw err;

	}

}

// --------------------------------------------------
// Login Toolbar
// --------------------------------------------------

function showLoginToolbar() {

	if (
		document.getElementById(
			"login-toolbar"
		)
	) {

		return;

	}

	document.body.insertAdjacentHTML(

		"afterbegin",

		`
		<div
			id="login-toolbar"
			style="
				padding:10px;
				background:#eee;
				border-bottom:1px solid #ccc;
			"
		>

			Server<br>

			<input
				id="server"
				style="width:100%"
				value="${localStorage.getItem("taleem-server-url") ?? "http://127.0.0.1:9000"}"
			>

			<br><br>

			Email<br>

			<input
				id="email"
				style="width:100%"
				value="${localStorage.getItem("taleem-server-email") ?? ""}"
			>

			<br><br>

			Password<br>

			<input
				id="password"
				type="password"
				style="width:100%"
				value="${localStorage.getItem("taleem-server-password") ?? ""}"
			>

			<br><br>

			<button id="connect">

				Connect

			</button>

		</div>
		`

	);

	document
		.getElementById(
			"connect"
		)
		.onclick = () => {

			localStorage.setItem(

				"taleem-server-url",

				document.getElementById(
					"server"
				).value

			);

			localStorage.setItem(

				"taleem-server-email",

				document.getElementById(
					"email"
				).value

			);

			localStorage.setItem(

				"taleem-server-password",

				document.getElementById(
					"password"
				).value

			);

			location.reload();

		};

}