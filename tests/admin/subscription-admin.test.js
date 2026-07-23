// tests/admin/subscription-admin.test.js

import { describe, it, expect } from "vitest";

const API = "http://127.0.0.1:9000/api";

async function login() {

	const response = await fetch(`${API}/user/login`, {

		method: "POST",

		headers: {
			"Content-Type": "application/json"
		},

		body: JSON.stringify({

			email: "subscription-admin@example.com",
			password: "12345678"

		})

	});

	expect(response.status).toBe(200);

	const data = await response.json();

	expect(data.token).toBeDefined();

	return data.token;

}

describe("Subscription Admin", () => {

	it("should login", async () => {

		await login();

	});

	it("should access subscription admin", async () => {

		const token = await login();

		const response = await fetch(
			`${API}/admin/subscription`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		expect(response.status).toBe(200);

	});

	it("should not access library admin", async () => {

		const token = await login();

		const response = await fetch(
			`${API}/admin/library`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		expect(response.status).toBe(403);

	});

	it("should not access communication admin", async () => {

		const token = await login();

		const response = await fetch(
			`${API}/admin/communication`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		expect(response.status).toBe(403);

	});

	it("should not access course admin", async () => {

		const token = await login();

		const response = await fetch(
			`${API}/admin/course`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		expect(response.status).toBe(403);

	});

	it("should not access admins admin", async () => {

		const token = await login();

		const response = await fetch(
			`${API}/admin/admins`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		expect(response.status).toBe(403);

	});

});