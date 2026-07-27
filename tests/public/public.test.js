// tests/kernel-stories/public.test.js

import { describe, it, expect } from "vitest";
import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Kernel Story - Public", () => {

	it("should list all courses", async () => {

		const courses = await kernel.course.list();

		expect(Array.isArray(courses)).toBe(true);
		expect(courses.length).toBeGreaterThan(0);

		expect(courses[0]).toHaveProperty("slug");
		expect(courses[0]).toHaveProperty("title");

	});

	it("should list library items for a course", async () => {

		const items = await kernel.library.listByCourse(
			"course-public"
		);

		expect(Array.isArray(items)).toBe(true);

		if (items.length > 0) {

			expect(items[0]).toHaveProperty("slug");
			expect(items[0]).toHaveProperty("title");
			expect(items[0].courseSlug).toBe("course-public");

		}

	});

	it("should return an empty list for an unknown course", async () => {

		const items = await kernel.library.listByCourse(
			"not-a-course"
		);

		expect(Array.isArray(items)).toBe(true);
		expect(items.length).toBe(0);

	});

});