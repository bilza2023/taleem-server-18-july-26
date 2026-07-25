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

		throw new Error(
			"Not connected."
		);

	}

	const taleem =
		new TaleemAdminClient(
			server
		);

	await taleem.connection.login(

		email,

		password

	);

	await taleem.connection.verify();

	return taleem;

}