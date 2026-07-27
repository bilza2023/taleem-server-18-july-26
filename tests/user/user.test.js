// tests/kernel-stories/user.test.js

import { describe, it, expect } from "vitest";
import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Kernel Story - User", () => {

	it("User can login and authenticate", async () => {

		// --------------------------------------------------
		// Login
		// --------------------------------------------------

		const token = await kernel.user.login(
			"test@example.com",
			"12345678"
		);

		expect(token).toBeTypeOf("string");

		// --------------------------------------------------
		// Authenticate
		// --------------------------------------------------

		const user = await kernel.auth.authenticate(token);

		expect(user).toBeDefined();
		expect(user.email).toBe("test@example.com");
		expect(user.name).toBe("Test User");

	});

	it("User can register", async () => {

		const user = await kernel.user.register({

			name: "Another User",
			email: "another@example.com",
			password: "12345678"

		});

		expect(user).toBeDefined();
		expect(user.email).toBe("another@example.com");
		expect(user.name).toBe("Another User");

	});

	it("User rejects invalid password", async () => {

		await expect(

			kernel.user.login(
				"test@example.com",
				"wrong-password"
			)

		).rejects.toThrow(
			"User.login(): Invalid password."
		);

	});

	it("User rejects unknown email", async () => {

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