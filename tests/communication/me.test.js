///home/bilal-tariq/00--TALEEM/taleem-server/tests/communication/me.test.js
import { describe, it, expect } from "vitest";

const API = "http://127.0.0.1:9000/api";

async function login() {

	const response = await fetch(`${API}/user/login`, {

		method: "POST",

		headers: {

			"Content-Type": "application/json"

		},

		body: JSON.stringify({

			email: "test@example.com",
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
			`${API}/communication/me`
		);

		expect(response.status).toBe(401);

	});

	it("should reject invalid token", async () => {

		const response = await fetch(
			`${API}/communication/me`,
			{
				headers: {
					Authorization: "Bearer invalid-token"
				}
			}
		);

		expect(response.status).toBe(401);

	});

it("should return my communications", async () => {

	const token = await login();

	const response = await fetch(
		`${API}/communication/me`,
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);

	expect(response.status).toBe(200);

	const data = await response.json();

	expect(Array.isArray(data)).toBe(true);

	// Should return at least one communication
	expect(data.length).toBeGreaterThan(0);

	for (const item of data) {

		expect(item).toHaveProperty("id");
		expect(item).toHaveProperty("referenceId");
		expect(item).toHaveProperty("type");
		expect(item).toHaveProperty("message");
		expect(item).toHaveProperty("createdAt");

	}

});

});