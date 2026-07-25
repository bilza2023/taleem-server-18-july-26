// --------------------------------------------------
// Connector
// --------------------------------------------------

export class Connector {

	constructor(serverUrl) {

		this.serverUrl = serverUrl;

		this.serverKey =
			"taleem-admin-server";

		this.tokenKey =
			"taleem-admin-token";

	}

	// --------------------------------------------------
	// Login
	// --------------------------------------------------

	async login(

		email,

		password

	) {

		const response = await fetch(

			`${this.serverUrl}/api/user/login`,

			{

				method: "POST",

				headers: {

					"Content-Type":
						"application/json"

				},

				body: JSON.stringify({

					email,
					password

				})

			}

		);

		if (!response.ok) {

			throw new Error(

				"Login failed."

			);

		}

		const result =
			await response.json();

		localStorage.setItem(

			this.serverKey,

			this.serverUrl

		);

		localStorage.setItem(

			this.tokenKey,

			result.token

		);

		return result;

	}

}