// tests/middleware/requireResource.test.js

import { describe, it, expect, vi } from "vitest";
import requireResource from "../../middleware/requireResource.js";

function createRes() {

	const res = {};

	res.status = vi.fn().mockReturnValue(res);
	res.json = vi.fn().mockReturnValue(res);

	return res;

}

describe("requireResource middleware", () => {

	it("should allow Super Admin", () => {

		const req = {
			user: {
				role: "SUPER_ADMIN",
				resource: null
			}
		};

		const res = createRes();
		const next = vi.fn();

		requireResource("library")(req, res, next);

		expect(next).toHaveBeenCalledOnce();
		expect(res.status).not.toHaveBeenCalled();

	});

	it("should allow matching resource", () => {

		const req = {
			user: {
				role: "ADMIN",
				resource: "library"
			}
		};

		const res = createRes();
		const next = vi.fn();

		requireResource("library")(req, res, next);

		expect(next).toHaveBeenCalledOnce();
		expect(res.status).not.toHaveBeenCalled();

	});

	it("should reject wrong resource", () => {

		const req = {
			user: {
				role: "ADMIN",
				resource: "communication"
			}
		};

		const res = createRes();
		const next = vi.fn();

		requireResource("library")(req, res, next);

		expect(next).not.toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(403);

	});

	it("should reject student", () => {

		const req = {
			user: {
				role: "student",
				resource: null
			}
		};

		const res = createRes();
		const next = vi.fn();

		requireResource("library")(req, res, next);

		expect(next).not.toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(403);

	});

});