// --------------------------------------------------
// Taleem Library Utility
// Main
// --------------------------------------------------

import { TaleemAdminClient } from "../tools/taleem-admin-client.js";

let taleem = null;

// --------------------------------------------------
// Create Connection
// --------------------------------------------------

export async function connect(
	server,
	email,
	password
) {

	taleem = new TaleemAdminClient(
		server
	);

	await taleem.connection.login(
		email,
		password
	);

	localStorage.setItem(
		"server",
		server
	);

	localStorage.setItem(
		"email",
		email
	);

	return taleem;

}

// --------------------------------------------------
// Existing Connection
// --------------------------------------------------

export function client() {

	return taleem;

}

// --------------------------------------------------
// Restore Connection
// --------------------------------------------------

export async function restore() {

	const server =
		localStorage.getItem("server");

	const token =
		localStorage.getItem("token");

	if (!server || !token) {

		return null;

	}

	taleem = new TaleemAdminClient(
		server
	);

	taleem.connection.setToken(
		token
	);

	try {

		await taleem.connection.verify();

		return taleem;

	}

	catch {

		localStorage.removeItem("token");

		return null;

	}

}