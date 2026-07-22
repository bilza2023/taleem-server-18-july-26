import { describe, it, expect } from "vitest";

describe("User Registration", () => {

	it("should register a new user", async () => {

		const email =
			`test-${Date.now()}@example.com`;

		const password = "12345678";

		const response = await fetch(

			"http://127.0.0.1:9000/api/user/register",

			{

				method: "POST",

				headers: {

					"Content-Type": "application/json"

				},

				body: JSON.stringify({

					email,
					password

				})

			}

		);

		expect(response.status).toBe(201);

		const data = await response.json();

		expect(data.message)
			.toBe("User registered.");

		expect(data.token)
			.toBeDefined();

	});

	it("should reject duplicate email", async () => {

		const email =
			`duplicate-${Date.now()}@example.com`;

		const password = "12345678";

		await fetch(

			"http://127.0.0.1:9000/api/user/register",

			{

				method: "POST",

				headers: {

					"Content-Type": "application/json"

				},

				body: JSON.stringify({

					email,
					password

				})

			}

		);

		const response = await fetch(

			"http://127.0.0.1:9000/api/user/register",

			{

				method: "POST",

				headers: {

					"Content-Type": "application/json"

				},

				body: JSON.stringify({

					email,
					password

				})

			}

		);

		expect(response.status).toBe(409);

		const data = await response.json();

		expect(data.message)
			.toBe("Email already exists.");

	});

	it("should reject missing email", async () => {

		const response = await fetch(

			"http://127.0.0.1:9000/api/user/register",

			{

				method: "POST",

				headers: {

					"Content-Type": "application/json"

				},

				body: JSON.stringify({

					password: "12345678"

				})

			}

		);

		expect(response.status).toBe(400);

	});

	it("should reject missing password", async () => {

		const response = await fetch(

			"http://127.0.0.1:9000/api/user/register",

			{

				method: "POST",

				headers: {

					"Content-Type": "application/json"

				},

				body: JSON.stringify({

					email: "someone@example.com"

				})

			}

		);

		expect(response.status).toBe(400);

	});

});