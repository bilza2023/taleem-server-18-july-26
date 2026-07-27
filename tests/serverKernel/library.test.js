// tests/serverKernel/library.test.js

import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Library", () => {

	it("should list library items", async () => {

		const items = await kernel.library.list();

		expect(Array.isArray(items)).toBe(true);
		expect(items.length).toBeGreaterThan(0);

	});

	it("should get library item by slug", async () => {

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

	it("should return null for unknown slug", async () => {

		const item = await kernel.library.getBySlug(
			"does-not-exist"
		);

		expect(item).toBeNull();

	});

	it("should return null for unknown id", async () => {

		const item = await kernel.library.getById(
			999999
		);

		expect(item).toBeNull();

	});

});