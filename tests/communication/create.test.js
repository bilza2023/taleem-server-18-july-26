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

describe("Create Communication", () => {

	it("should reject missing token", async () => {

		const response = await fetch(`${API}/communication`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json"

			},

			body: JSON.stringify({

				libraryId: 1,
				message: "Hello"

			})

		});

		expect(response.status).toBe(401);

	});

	it("should reject invalid token", async () => {

		const response = await fetch(`${API}/communication`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json",
				Authorization: "Bearer invalid-token"

			},

			body: JSON.stringify({

				libraryId: 1,
				message: "Hello"

			})

		});

		expect(response.status).toBe(401);

	});

	it("should reject unknown library", async () => {

		const token = await loginAlice();

		const response = await fetch(`${API}/communication`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`

			},

			body: JSON.stringify({

				libraryId: 999999,
				message: "Hello"

			})

		});

		expect(response.status).toBe(404);

	});

	it("should create communication", async () => {

		const token = await loginAlice();

		const response = await fetch(`${API}/communication`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`

			},

			body: JSON.stringify({

				libraryId: 1,
				message: "I don't understand this lesson."

			})

		});

		expect(response.status).toBe(201);

		const data = await response.json();

		expect(data.id).toBeDefined();
		expect(data.message).toBe("I don't understand this lesson.");

	});

});