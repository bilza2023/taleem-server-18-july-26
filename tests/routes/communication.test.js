import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";

import app from "../../app.js";
import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Communication Routes", () => {

	let token;
	let librarySlug;

	beforeAll(async () => {

		token = await kernel.user.login(
			"test@example.com",
			"12345678"
		);

		librarySlug = "open-page";

	});

	it("should require login to create communication", async () => {

		const res = await request(app)
			.post("/api/communication")
			.send({
				librarySlug,
				type: "comment",
				message: "Hello"
			});

		expect(res.status).toBe(401);

	});

	it("should create communication", async () => {

		const res = await request(app)
			.post("/api/communication")
			.set("Authorization", `Bearer ${token}`)
			.send({
				librarySlug,
				type: "comment",
				message: "Route test message"
			});

		expect(res.status).toBe(201);
		expect(res.body.message).toBe("Route test message");

	});

	it("should require login to list my communications", async () => {

		const res = await request(app)
			.get("/api/communication/me");

		expect(res.status).toBe(401);

	});

	it("should list my communications", async () => {

		const res = await request(app)
			.get("/api/communication/me")
			.set("Authorization", `Bearer ${token}`);

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

	});

});