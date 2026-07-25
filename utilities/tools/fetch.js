
// --------------------------------------------------
// API Fetch
// --------------------------------------------------

import { config }
	from "./config.js";

export default async function apiFetch(

	method,

	path,

	body = null

) {

	const options = {

		method,

		headers: {}

	};

	const token =
		localStorage.getItem(
			"taleem-token"
		);

	if (token) {

		options.headers.Authorization =
			`Bearer ${token}`;

	}

	if (body !== null) {

		options.headers[
			"Content-Type"
		] = "application/json";

		options.body =
			JSON.stringify(body);

	}

	let response;

	try {

		response = await fetch(

			config.serverUrl + path,

			options

		);

	}

	catch {

		throw new Error(
			"Unable to contact Taleem Server."
		);

	}

	let data = null;

	try {

		data =
			await response.json();

	}

	catch {

		// Response is not JSON.

	}

	if (!response.ok) {

		throw new Error(

			data?.message ??

			`HTTP ${response.status}`

		);

	}

	return data;

}