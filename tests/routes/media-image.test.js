import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";

import app from "../../app.js";
import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Media Routes", () => {

	let token;

	beforeAll(async () => {

		token = await kernel.admin.login(
			"open@taleem.help",
			"12345678"
		);

	});

	// --------------------------------------------------
	// Image
	// --------------------------------------------------

	it("should require login to list images", async () => {

		const res = await request(app)
			.get("/api/media/image");

		expect(res.status).toBe(401);

	});

	it("should list images", async () => {

		const res = await request(app)
			.get("/api/media/image")
			.set("Authorization", `Bearer ${token}`);

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

	});

	it("should upload an image", async () => {

		const res = await request(app)
			.post("/api/media/image")
			.set("Authorization", `Bearer ${token}`)
			.field("description", "Test image")
			.field("alt", "Test Alt")
			.attach("file", "tests/assets/test-image.png");

		expect(res.status).toBe(201);
		expect(res.body.filename).toBe("test-image.png");
		expect(res.body.description).toBe("Test image");
		expect(res.body.alt).toBe("Test Alt");

	});

	// --------------------------------------------------
	// Audio
	// --------------------------------------------------

	it("should require login to list audio", async () => {

		const res = await request(app)
			.get("/api/media/audio");

		expect(res.status).toBe(401);

	});

	it("should list audio", async () => {

		const res = await request(app)
			.get("/api/media/audio")
			.set("Authorization", `Bearer ${token}`);

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

	});

});