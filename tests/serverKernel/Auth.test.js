import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Auth", () => {

	it("should create a user token", () => {

		const token = kernel.auth.createUserToken({

			id: 1

		});

		expect(token).toBeTypeOf("string");

	});

	it("should create an admin token", () => {

		const token = kernel.auth.createAdminToken({

			id: 99

		});

		expect(token).toBeTypeOf("string");

	});

	it("should verify a user token", () => {

		const token = kernel.auth.createUserToken({

			id: 1

		});

		const payload = kernel.auth.verifyToken(token);

		expect(payload.id).toBe(1);

		expect(payload.type).toBe("user");

	});

	it("should verify an admin token", () => {

		const token = kernel.auth.createAdminToken({

			id: 99

		});

		const payload = kernel.auth.verifyToken(token);

		expect(payload.id).toBe(99);

		expect(payload.type).toBe("admin");

	});

});