// --------------------------------------------------
// Connector
// --------------------------------------------------

export class Connector {

	constructor(serverUrl) {

		this.serverUrl = serverUrl;
		this.tokenKey = "taleem.token";

	}

	// --------------------------------------------------
	// Token
	// --------------------------------------------------

	token() {

		return localStorage.getItem(
			this.tokenKey
		);

	}

	setToken(token) {

		localStorage.setItem(
			this.tokenKey,
			token
		);

	}

	clearToken() {

		localStorage.removeItem(
			this.tokenKey
		);

	}

	// --------------------------------------------------
	// Login
	// --------------------------------------------------

	async login(email, password) {

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

		this.setToken(
			result.token
		);

		return result;

	}

	// --------------------------------------------------
	// Verify
	// --------------------------------------------------

	async verify() {

		try {

			await this.fetch(
				"/api/user/verify"
			);

			return true;

		}

		catch {

			return false;

		}

	}

	// --------------------------------------------------
	// Fetch
	// --------------------------------------------------

	async fetch(

		path,

		options = {}

	) {

		const headers = {

			...(options.headers ?? {}),

			Authorization:
				`Bearer ${this.token()}`

		};

		if (

			options.body &&
			!headers["Content-Type"]

		) {

			headers["Content-Type"] =
				"application/json";

		}

		const response = await fetch(

			`${this.serverUrl}${path}`,

			{

				...options,

				headers

			}

		);

		if (!response.ok) {

			const message =
				await response.text();

			throw new Error(

				message ||

				`HTTP ${response.status}`

			);

		}

		if (

			response.status === 204

		) {

			return null;

		}

		const contentType =
			response.headers.get(
				"content-type"
			);

		if (

			contentType?.includes(
				"application/json"
			)

		) {

			return await response.json();

		}

		return await response.text();

	}

}