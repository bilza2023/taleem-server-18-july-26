// tests/kernel-stories/admin-library.test.js

import { describe, it, expect } from "vitest";
import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Kernel Story - Library Admin", () => {

	it("Library Admin can create a library item", async () => {

		// --------------------------------------------------
		// Login
		// --------------------------------------------------

		const token = await kernel.admin.login(
			"library@taleem.help",
			"12345678"
		);

		// --------------------------------------------------
		// Authenticate
		// --------------------------------------------------

		const admin = await kernel.auth.authenticate(token);

		expect(admin.email).toBe("library@taleem.help");

		// --------------------------------------------------
		// Lookup Course
		// --------------------------------------------------

		const course = await kernel.course.getBySlug(
			"course-public"
		);

		expect(course).toBeDefined();

		// --------------------------------------------------
		// Create
		// --------------------------------------------------

		const item = await kernel.library.create(admin, {
			slug: "kernel-story-library",
			title: "Kernel Story Library",
			description: "Created by kernel story.",
			type: "HTML",
			body: "<h1>Hello</h1>",
			courseId: course.id
		});

		expect(item.slug).toBe("kernel-story-library");

		// --------------------------------------------------
		// Read
		// --------------------------------------------------

		const found = await kernel.library.getBySlug(
			"kernel-story-library"
		);

		expect(found).toBeDefined();
		expect(found.id).toBe(item.id);

		// --------------------------------------------------
		// Delete
		// --------------------------------------------------

		await kernel.library.delete(admin, item.id);

		const deleted = await kernel.library.getBySlug(
			"kernel-story-library"
		);

		expect(deleted).toBeNull();

	});

});