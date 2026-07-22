import { describe, it, expect } from "vitest";

describe("User Login", () => {

	it("should login with valid credentials", async () => {

		const response = await fetch(

			"http://127.0.0.1:9000/api/user/login",

			{

				method: "POST",

				headers: {

					"Content-Type": "application/json"

				},

				body: JSON.stringify({

					email: "alice@example.com",
					password: "12345678"

				})

			}

		);

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(data.message)
			.toBe("Login successful.");

		expect(data.token)
			.toBeDefined();

	});

	it("should reject invalid email", async () => {

		const response = await fetch(

			"http://127.0.0.1:9000/api/user/login",

			{

				method: "POST",

				headers: {

					"Content-Type": "application/json"

				},

				body: JSON.stringify({

					email: "unknown@example.com",
					password: "12345678"

				})

			}

		);

		expect(response.status).toBe(401);

	});

	it("should reject invalid password", async () => {

		const response = await fetch(

			"http://127.0.0.1:9000/api/user/login",

			{

				method: "POST",

				headers: {

					"Content-Type": "application/json"

				},

				body: JSON.stringify({

					email: "alice@example.com",
					password: "wrong-password"

				})

			}

		);

		expect(response.status).toBe(401);

	});

	it("should reject missing email", async () => {

		const response = await fetch(

			"http://127.0.0.1:9000/api/user/login",

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

			"http://127.0.0.1:9000/api/user/login",

			{

				method: "POST",

				headers: {

					"Content-Type": "application/json"

				},

				body: JSON.stringify({

					email: "alice@example.com"

				})

			}

		);

		expect(response.status).toBe(400);

	});

});