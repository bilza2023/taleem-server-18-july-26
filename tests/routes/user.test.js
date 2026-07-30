import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import app from "../../app.js";

describe("User Routes", () => {


	it("should register a user", async () => {

		const res = await request(app)
			.post("/api/user/register")
			.send({

				name: "Bilal",
				email: "bilal@example.com",
				password: "12345678"

			});

		expect(res.status).toBe(201);
		expect(res.body.email).toBe("bilal@example.com");

	});

	it("should reject duplicate registration", async () => {

		const res = await request(app)
			.post("/api/user/register")
			.send({

				name: "Test User",
				email: "test@example.com",
				password: "12345678"

			});

		expect(res.status).toBe(400);

	});

	it("should login", async () => {

		const res = await request(app)
			.post("/api/user/login")
			.send({

				email: "test@example.com",
				password: "12345678"

			});

		expect(res.status).toBe(200);
		expect(res.body.token).toBeDefined();

	});

	it("should reject an invalid password", async () => {

		const res = await request(app)
			.post("/api/user/login")
			.send({

				email: "test@example.com",
				password: "wrong-password"

			});

		expect(res.status).toBe(401);

	});

	it("should verify a token", async () => {

		const login = await request(app)
			.post("/api/user/login")
			.send({

				email: "test@example.com",
				password: "12345678"

			});

		const verify = await request(app)
			.post("/api/user/verify")
			.send({

				token: login.body.token

			});

		expect(verify.status).toBe(200);
		expect(verify.body.email).toBe("test@example.com");

	});

	it("should reject an invalid token", async () => {

		const res = await request(app)
			.post("/api/user/verify")
			.send({

				token: "invalid-token"

			});

		expect(res.status).toBe(401);

	});

});