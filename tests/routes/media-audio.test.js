
import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";

import app from "../../app.js";
import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Media Audio Routes", () => {

	let token;

	beforeAll(async () => {

		token = await kernel.admin.login(
			"open@taleem.help",
			"12345678"
		);

	});

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

	it("should upload audio", async () => {

		const res = await request(app)
			.post("/api/media/audio")
			.set("Authorization", `Bearer ${token}`)
			.field("description", "Test audio")
			.attach("file", "tests/assets/test-audio.mp3");

		expect(res.status).toBe(201);
		expect(res.body.filename).toBe("test-audio.mp3");
		expect(res.body.description).toBe("Test audio");

	});

});