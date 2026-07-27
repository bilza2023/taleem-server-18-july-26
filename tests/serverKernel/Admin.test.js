// tests/serverKernel/Admin.test.js

import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Admin", () => {

	it("should find admin by email", async () => {

		const admin = await kernel.admin.getByEmail(
			"library@taleem.help"
		);

		expect(admin).toBeDefined();
		expect(admin.email).toBe("library@taleem.help");

	});

	it("should find admin by id", async () => {

		const admin = await kernel.admin.getByEmail(
			"library@taleem.help"
		);

		const found = await kernel.admin.getById(admin.id);

		expect(found).toBeDefined();
		expect(found.id).toBe(admin.id);

	});

	it("should login with valid credentials", async () => {

		const token = await kernel.admin.login(

			"library@taleem.help",
			"12345678"

		);

		expect(token).toBeTypeOf("string");

	});

	it("should reject invalid password", async () => {

		await expect(

			kernel.admin.login(

				"library@taleem.help",
				"wrong-password"

			)

		).rejects.toThrow(
			"Admin.login(): Invalid password."
		);

	});

	it("should reject unknown email", async () => {

		await expect(

			kernel.admin.login(

				"missing@taleem.help",
				"12345678"

			)

		).rejects.toThrow(
			"Admin.login(): Admin 'missing@taleem.help' not found."
		);

	});

});