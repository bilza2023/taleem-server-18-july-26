// tests/serverKernel/user.test.js

import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("User", () => {

	it("should list users", async () => {

		const users = await kernel.user.list();

		expect(Array.isArray(users)).toBe(true);
		expect(users.length).toBeGreaterThan(0);

	});

	it("should find user by email", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		expect(user).toBeDefined();
		expect(user.email).toBe("test@example.com");

	});

	it("should get user by id", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		const found = await kernel.user.getById(user.id);

		expect(found).toBeDefined();
		expect(found.id).toBe(user.id);

	});

	it("should login with valid credentials", async () => {

		const token = await kernel.user.login(

			"test@example.com",
			"12345678"

		);

		expect(token).toBeTypeOf("string");

	});

	it("should reject invalid password", async () => {

		await expect(

			kernel.user.login(
				"test@example.com",
				"wrong-password"
			)

		).rejects.toThrow(
			"User.login(): Invalid password."
		);

	});

	it("should reject unknown email", async () => {

		await expect(

			kernel.user.login(
				"missing@example.com",
				"12345678"
			)

		).rejects.toThrow(
			"User.login(): User 'missing@example.com' not found."
		);

	});

});