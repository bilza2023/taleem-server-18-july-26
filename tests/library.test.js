// tests/library.test.js

import { describe, it, expect } from "vitest";

import kernel from "../src/serverKernel/ServerKernel.js";

describe("Library", () => {

	it("should list library items", async () => {

		const items = await kernel.library.list();

		expect(Array.isArray(items)).toBe(true);
		expect(items.length).toBeGreaterThan(0);

	});

	it("should find library item by slug", async () => {

		const item = await kernel.library.getBySlug(
			"public-page"
		);

		expect(item).toBeDefined();
		expect(item.slug).toBe("public-page");

	});

	it("should get library item by id", async () => {

		const item = await kernel.library.getBySlug(
			"public-page"
		);

		const found = await kernel.library.getById(
			item.id
		);

		expect(found).toBeDefined();
		expect(found.id).toBe(item.id);

	});

	it("should list library items for a course", async () => {

		const items = await kernel.library.listByCourse(
			"course-public"
		);

		expect(Array.isArray(items)).toBe(true);

		if (items.length > 0) {

			expect(items[0].courseSlug).toBe(
				"course-public"
			);

		}

	});

	it("should create update and delete a library item", async () => {

		// Login as library admin

		const token = await kernel.admin.login(
			"library@taleem.help",
			"12345678"
		);

		const admin = await kernel.auth.authenticate(
			token
		);

		// Create

		const created = await kernel.library.createBySlug(
			admin,
			{
				slug: "library-test-item",
				title: "Library Test Item",
				type: "HTML",
				body: "<h1>Hello</h1>",
				courseSlug: "course-public"
			}
		);

		expect(created.slug).toBe("library-test-item");

		// Update

		await kernel.library.updateBySlug(
			admin,
			"library-test-item",
			{
				slug: "library-test-item",
				title: "Updated Library Item",
				type: "HTML",
				body: "<h1>Updated</h1>",
				courseSlug: "course-public"
			}
		);

		const updated = await kernel.library.getBySlug(
			"library-test-item"
		);

		expect(updated.title).toBe(
			"Updated Library Item"
		);

		// Delete

		await kernel.library.deleteBySlug(
			admin,
			"library-test-item"
		);

		const deleted = await kernel.library.getBySlug(
			"library-test-item"
		);

		expect(deleted).toBeNull();

	});

});