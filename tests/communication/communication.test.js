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

describe("Communication API", () => {

	let token;
	let first;
	let second;

	it("should authenticate", async () => {

		token = await login();

	});

	it("should reject missing token", async () => {

		const response = await fetch(`${API}/communication`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json"

			},

			body: JSON.stringify({

				referenceId: "public-page",
				type: "query",
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

				referenceId: "public-page",
				type: "query",
				message: "Hello"

			})

		});

		expect(response.status).toBe(401);

	});

	it("should create first communication", async () => {

		const response = await fetch(`${API}/communication`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`

			},

			body: JSON.stringify({

				referenceId: "public-page",
				type: "query",
				message: "First communication"

			})

		});

		expect(response.status).toBe(201);

		first = await response.json();

		expect(first.id).toBeDefined();

	});

	it("should create second communication", async () => {

		const response = await fetch(`${API}/communication`, {

			method: "POST",

			headers: {

				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`

			},

			body: JSON.stringify({

				referenceId: "members-page",
				type: "query",
				message: "Second communication"

			})

		});

		expect(response.status).toBe(201);

		second = await response.json();

		expect(second.id).toBeDefined();

	});

	it("should return all my communications", async () => {

		const response = await fetch(`${API}/communication/me`, {

			headers: {

				Authorization: `Bearer ${token}`

			}

		});

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(Array.isArray(data)).toBe(true);

		// 3 from seed + 2 created above
		expect(data.length).toBe(5);

		for (const item of data) {

			expect(item).toHaveProperty("id");
			expect(item).toHaveProperty("referenceId");
			expect(item).toHaveProperty("type");
			expect(item).toHaveProperty("message");
			expect(item).toHaveProperty("createdAt");

		}

	});

	it("should return first communication by id", async () => {

		const response = await fetch(

			`${API}/communication/${first.id}`,

			{

				headers: {

					Authorization: `Bearer ${token}`

				}

			}

		);

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(data.id).toBe(first.id);
		expect(data.referenceId).toBe("public-page");
		expect(data.type).toBe("query");
		expect(data.message).toBe("First communication");

	});

	it("should return second communication by id", async () => {

		const response = await fetch(

			`${API}/communication/${second.id}`,

			{

				headers: {

					Authorization: `Bearer ${token}`

				}

			}

		);

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(data.id).toBe(second.id);
		expect(data.referenceId).toBe("members-page");
		expect(data.type).toBe("query");
		expect(data.message).toBe("Second communication");

	});

	it("should return 404 for unknown communication", async () => {

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

	it("should reject missing token for /me", async () => {

		const response = await fetch(`${API}/communication/me`);

		expect(response.status).toBe(401);

	});

	it("should reject invalid token for /me", async () => {

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

});