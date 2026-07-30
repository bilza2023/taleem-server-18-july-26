import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../../app.js";

describe("Library Route", () => {

	it("should return an open library item", async () => {

		const res = await request(app)
			.get("/api/library/open-page");

		expect(res.status).toBe(200);
		expect(res.body.slug).toBe("open-page");
		expect(res.body.course.access).toBe("OPEN");

	});

	it("should return 404 for unknown library item", async () => {

		const res = await request(app)
			.get("/api/library/does-not-exist");

		expect(res.status).toBe(404);
		expect(res.body.error).toBe("library_not_found");

	});

	it("should require login for members content", async () => {

		const res = await request(app)
			.get("/api/library/members-page");

		expect(res.status).toBe(401);
		expect(res.body.error).toBe("login_required");

	});

	it("should require login for subscription content", async () => {

		const res = await request(app)
			.get("/api/library/subscription-page");

		expect(res.status).toBe(401);
		expect(res.body.error).toBe("login_required");

	});

});