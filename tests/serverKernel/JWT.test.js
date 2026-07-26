import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("JWT", () => {

	it("should sign a token", () => {

		const token = kernel.jwt.sign({

			id: 123

		});

		expect(token).toBeTypeOf("string");

	});

	it("should verify a token", () => {

		const token = kernel.jwt.sign({

			id: 123

		});

		const payload = kernel.jwt.verify(token);

		expect(payload.id).toBe(123);

	});

	it("should throw on an invalid token", () => {

		expect(() => {

			kernel.jwt.verify("invalid-token");

		}).toThrow();

	});

});