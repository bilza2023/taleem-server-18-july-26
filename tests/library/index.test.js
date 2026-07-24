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

	return data.token;

}

describe("Library Index", () => {

	it("should return library index", async () => {

		const token = await login();

		const response = await fetch(`${API}/library/index`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(Array.isArray(data.items)).toBe(true);
		expect(data.items.length).toBeGreaterThan(0);

		for (const item of data.items) {

			expect(item).not.toHaveProperty("body");

			expect(item).toHaveProperty("slug");
			expect(item).toHaveProperty("title");
			expect(item).toHaveProperty("courseId");

		}

	});

});