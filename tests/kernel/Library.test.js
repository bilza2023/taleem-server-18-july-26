import { describe, it, expect } from "vitest";
import { ContentType } from "@prisma/client";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Library", () => {

	it("should list all library items", async () => {

		const items = await kernel.library.list();

		expect(Array.isArray(items)).toBe(true);
		expect(items.length).toBe(5);

	});

	it("should filter by course", async () => {

		const items = await kernel.library.list({
			course: "course-members"
		});

		expect(items.length).toBe(2);

	});

	it("should filter by access", async () => {

		const items = await kernel.library.list({
			access: "MEMBERS"
		});

		expect(items.length).toBe(2);

	});

	it("should filter by content type", async () => {

		const items = await kernel.library.list({
			type: ContentType.ARTICLE
		});

		expect(items.length).toBe(5);

	});

	it("should get a library item", async () => {

		const item = (await kernel.library.list())[0];

		const found = await kernel.library.get(item.id);

		expect(found).toBeDefined();
		expect(found.id).toBe(item.id);

	});

	it("should return null for an unknown library item", async () => {

		const item = await kernel.library.get(999999);

		expect(item).toBeNull();

	});

	it("should convert slug to id", async () => {

		const id = await kernel.library.slugToId(
			"members-page"
		);

		expect(id).toBeDefined();

	});

	it("should convert id to slug", async () => {

		const id = await kernel.library.slugToId(
			"members-page"
		);

		const slug = await kernel.library.idToSlug(id);

		expect(slug).toBe("members-page");

	});

	it("should reject an unknown slug", async () => {

		await expect(

			kernel.library.slugToId(
				"does-not-exist"
			)

		).rejects.toThrow(
			'Library "does-not-exist" not found.'
		);

	});

	it("should reject an unknown id", async () => {

		await expect(

			kernel.library.idToSlug(
				999999
			)

		).rejects.toThrow(
			'Library "999999" not found.'
		);

	});

	it("should create a library item", async () => {

		const courseId = await kernel.course.slugToId(
			"course-open"
		);

		const item = await kernel.library.create({

			slug: "test-page",
			title: "Test Page",
			description: "Created during testing.",
			type: ContentType.ARTICLE,
			thumbnail: "test.png",
			body: "<h1>Test</h1>",
			sortOrder: 10,
			status: "PUBLISHED",
			courseId

		});

		expect(item.slug).toBe("test-page");

	});

	it("should update a library item", async () => {

		const courseId = await kernel.course.slugToId(
			"course-open"
		);

		const item = await kernel.library.create({

			slug: "update-page",
			title: "Original",
			description: "Original",
			type: ContentType.ARTICLE,
			thumbnail: "test.png",
			body: "<h1>Original</h1>",
			sortOrder: 1,
			status: "PUBLISHED",
			courseId

		});

		const updated = await kernel.library.update(

			item.id,

			{
				title: "Updated"
			}

		);

		expect(updated.title).toBe("Updated");

	});

	it("should delete a library item", async () => {

		const courseId = await kernel.course.slugToId(
			"course-open"
		);

		const item = await kernel.library.create({

			slug: "delete-page",
			title: "Delete Me",
			description: "Temporary",
			type: ContentType.ARTICLE,
			thumbnail: "test.png",
			body: "<h1>Delete</h1>",
			sortOrder: 1,
			status: "PUBLISHED",
			courseId

		});

		await kernel.library.delete(item.id);

		const deleted = await kernel.library.get(item.id);

		expect(deleted).toBeNull();

	});

});