import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../../app.js";

describe("Admin Routes", () => {

	it("should login", async () => {

		const res = await request(app)
			.post("/api/admin/login")
			.send({

				email: "open@taleem.help",
				password: "12345678"

			});

		expect(res.status).toBe(200);
		expect(res.body.token).toBeDefined();

	});

	it("should reject an invalid password", async () => {

		const res = await request(app)
			.post("/api/admin/login")
			.send({

				email: "open@taleem.help",
				password: "wrong-password"

			});

		expect(res.status).toBe(401);

	});

	it("should reject an unknown email", async () => {

		const res = await request(app)
			.post("/api/admin/login")
			.send({

				email: "missing@taleem.help",
				password: "12345678"

			});

		expect(res.status).toBe(401);

	});

});