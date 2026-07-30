import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("User", () => {

	it("should list users", async () => {

		const users = await kernel.user.list();

		expect(Array.isArray(users)).toBe(true);
		expect(users.length).toBe(1);

	});

	it("should get the seeded user", async () => {

		const user = (await kernel.user.list())[0];

		const found = await kernel.user.get(user.id);

		expect(found).toBeDefined();
		expect(found.id).toBe(user.id);
		expect(found.email).toBe("test@example.com");

	});

	it("should get user by email", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		expect(user).toBeDefined();
		expect(user.name).toBe("Test User");

	});

	it("should return null for unknown id", async () => {

		const user = await kernel.user.get(999999);

		expect(user).toBeNull();

	});

	it("should return null for unknown email", async () => {

		const user = await kernel.user.getByEmail(
			"missing@example.com"
		);

		expect(user).toBeNull();

	});

	it("should register a new user", async () => {

		const user = await kernel.user.register({

			name: "Bilal",
			email: "bilal@example.com",
			password: "12345678"

		});

		expect(user.id).toBeDefined();
		expect(user.email).toBe("bilal@example.com");

	});

	it("should update a user", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		const updated = await kernel.user.update(

			user.id,

			{
				name: "Updated User"
			}

		);

		expect(updated.name).toBe("Updated User");

	});

	it("should delete a user", async () => {

		const user = await kernel.user.register({

			name: "Delete Me",
			email: "delete@example.com",
			password: "12345678"

		});

		await kernel.user.delete(user.id);

		const deleted = await kernel.user.get(user.id);

		expect(deleted).toBeNull();

	});

});