import { describe, it, expect } from "vitest";

const API = "http://127.0.0.1:9000/api";

async function loginAlice() {

	const response = await fetch(`${API}/user/login`, {

		method: "POST",

		headers: {

			"Content-Type": "application/json"

		},

		body: JSON.stringify({

			email: "alice@example.com",
			password: "12345678"

		})

	});

	expect(response.status).toBe(200);

	const data = await response.json();

	expect(data.token).toBeDefined();

	return data.token;

}

describe("My Communications", () => {

	it("should reject missing token", async () => {

		const response = await fetch(
			`${API}/communication/my`
		);

		expect(response.status).toBe(401);

	});

	it("should reject invalid token", async () => {

		const response = await fetch(
			`${API}/communication/my`,
			{

				headers: {

					Authorization: "Bearer invalid-token"

				}

			}
		);

		expect(response.status).toBe(401);

	});

	it("should return my communications", async () => {

		const token = await loginAlice();

		const response = await fetch(
			`${API}/communication/my`,
			{

				headers: {

					Authorization: `Bearer ${token}`

				}

			}
		);

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(Array.isArray(data)).toBe(true);

	});

});