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

async function createCommunication(token) {

	const response = await fetch(`${API}/communication`, {

		method: "POST",

		headers: {

			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`

		},

		body: JSON.stringify({

			referenceId: "hub",
			type: "query",
			message: "Reference test"

		})

	});

	expect(response.status).toBe(201);

	return await response.json();

}

describe("Reference Communication", () => {

	it("should reject missing token", async () => {

		const response = await fetch(
			`${API}/communication/1`
		);

		expect(response.status).toBe(401);

	});

	it("should reject invalid token", async () => {

		const response = await fetch(
			`${API}/communication/1`,
			{

				headers: {

					Authorization: "Bearer invalid-token"

				}

			}
		);

		expect(response.status).toBe(401);

	});

	it("should return 404 for unknown communication", async () => {

		const token = await loginAlice();

		const response = await fetch(
			`${API}/communication/999999`,
			{

				headers: {

					Authorization: `Bearer ${token}`

				}

			}
		);

		expect(response.status).toBe(404);

	});

	it("should return a communication by id", async () => {

		const token = await loginAlice();

		const created = await createCommunication(token);

		const response = await fetch(
			`${API}/communication/${created.id}`,
			{

				headers: {

					Authorization: `Bearer ${token}`

				}

			}
		);

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(data.id).toBe(created.id);
		expect(data.referenceId).toBe("hub");
		expect(data.type).toBe("query");
		expect(data.message).toBe("Reference test");

	});

});