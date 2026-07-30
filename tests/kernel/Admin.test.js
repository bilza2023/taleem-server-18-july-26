import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Admin", () => {

	it("should list admins", async () => {

		const admins = await kernel.admin.list();

		expect(Array.isArray(admins)).toBe(true);
		expect(admins.length).toBe(3);

	});

	it("should get an admin", async () => {

		const admin = (await kernel.admin.list())[0];

		const found = await kernel.admin.get(admin.id);

		expect(found).toBeDefined();
		expect(found.id).toBe(admin.id);

	});

	it("should return null for an unknown admin", async () => {

		const admin = await kernel.admin.get(999999);

		expect(admin).toBeNull();

	});

	it("should login with valid credentials", async () => {

		const token = await kernel.admin.login(

			"open@taleem.help",
			"12345678"

		);

		expect(token).toBeTypeOf("string");

	});

	it("should reject invalid password", async () => {

		await expect(

			kernel.admin.login(

				"open@taleem.help",
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

	it("should create an admin", async () => {

		const admin = await kernel.admin.create({

			email: "new@taleem.help",
			password: "12345678"

		});

		expect(admin.id).toBeDefined();
		expect(admin.email).toBe("new@taleem.help");

	});

	it("should update an admin", async () => {

		const admin = await kernel.admin.create({

			email: "update@taleem.help",
			password: "12345678"

		});

		const updated = await kernel.admin.update(

			admin.id,

			{
				email: "updated@taleem.help"
			}

		);

		expect(updated.email).toBe("updated@taleem.help");

	});

	it("should delete an admin", async () => {

		const admin = await kernel.admin.create({

			email: "delete@taleem.help",
			password: "12345678"

		});

		await kernel.admin.delete(admin.id);

		const deleted = await kernel.admin.get(admin.id);

		expect(deleted).toBeNull();

	});

});