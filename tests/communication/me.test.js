
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

		const token = await loginAlice();

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

		if (data.length > 0) {
			expect(data[0]).toHaveProperty("id");
			expect(data[0]).toHaveProperty("referenceId");
			expect(data[0]).toHaveProperty("type");
			expect(data[0]).toHaveProperty("message");
			expect(data[0]).toHaveProperty("createdAt");
		}

	});

});