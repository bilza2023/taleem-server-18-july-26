import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../../app.js";

describe("Public Routes", () => {

	it("should list courses", async () => {

		const res = await request(app)
			.get("/api/public/course");

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

	});

	it("should filter courses by access", async () => {

		const res = await request(app)
			.get("/api/public/course")
			.query({
				access: "OPEN"
			});

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

	});

	it("should list library items", async () => {

		const res = await request(app)
			.get("/api/public/library");

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

	});

	it("should filter library by course", async () => {

		const res = await request(app)
			.get("/api/public/library")
			.query({
				course: "course-open"
			});

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

	});

	it("should filter library by type", async () => {

		const res = await request(app)
			.get("/api/public/library")
			.query({
				type: "ARTICLE"
			});

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

	});

	it("should filter library by access", async () => {

		const res = await request(app)
			.get("/api/public/library")
			.query({
				access: "OPEN"
			});

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

	});

});