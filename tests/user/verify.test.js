import { describe, it, expect } from "vitest";

const API = "http://127.0.0.1:9000/api/user";

async function login() {

	const response = await fetch(`${API}/login`, {

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

describe("User Verify", () => {

	it("should verify a valid token", async () => {

		const token = await login();

		const response = await fetch(`${API}/verify`, {

			headers: {

				Authorization: `Bearer ${token}`

			}

		});

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(data.user).toBeDefined();
		expect(data.user.id).toBeDefined();
		expect(data.user.email).toBe("alice@example.com");
		expect(data.user.role).toBe("student");

	});

	it("should reject missing token", async () => {

		const response = await fetch(`${API}/verify`);

		expect(response.status).toBe(401);

		const data = await response.json();

		expect(data.message).toBeDefined();

	});

	it("should reject invalid token", async () => {

		const response = await fetch(`${API}/verify`, {

			headers: {

				Authorization: "Bearer invalid-token"

			}

		});

		expect(response.status).toBe(401);

		const data = await response.json();

		expect(data.message).toBeDefined();

	});

	it("should reject malformed bearer header", async () => {

		const response = await fetch(`${API}/verify`, {

			headers: {

				Authorization: "invalid"

			}

		});

		expect(response.status).toBe(401);

		const data = await response.json();

		expect(data.message).toBeDefined();

	});

	it("should reject empty bearer token", async () => {

		const response = await fetch(`${API}/verify`, {

			headers: {

				Authorization: "Bearer "

			}

		});

		expect(response.status).toBe(401);

		const data = await response.json();

		expect(data.message).toBeDefined();

	});

});