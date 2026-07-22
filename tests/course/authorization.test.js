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

describe("Library Authorization", () => {

	it("should return 404 for unknown library item", async () => {

		const token = await login();

		const response = await fetch(
			`${API}/library/does-not-exist`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		expect(response.status).toBe(404);

	});

	it("should reject missing token", async () => {

		const response = await fetch(
			`${API}/library/public-page`
		);

		expect(response.status).toBe(401);

	});

	it("should reject invalid token", async () => {

		const response = await fetch(
			`${API}/library/public-page`,
			{
				headers: {
					Authorization: "Bearer invalid-token"
				}
			}
		);

		expect(response.status).toBe(401);

	});

	it("should reject empty bearer token", async () => {

		const response = await fetch(
			`${API}/library/public-page`,
			{
				headers: {
					Authorization: "Bearer "
				}
			}
		);

		expect(response.status).toBe(401);

	});

	it("should allow public content", async () => {

		const token = await login();

		const response = await fetch(
			`${API}/library/public-page`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		expect(response.status).toBe(200);

	});

	it("should allow subscribed members content", async () => {

		const token = await login();

		const response = await fetch(
			`${API}/library/members-page`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		expect(response.status).toBe(200);

	});

});