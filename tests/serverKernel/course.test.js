import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Course", () => {

	it("should list courses", async () => {

		const courses = await kernel.course.list();

		expect(Array.isArray(courses)).toBe(true);
		expect(courses.length).toBeGreaterThan(0);

	});

	it("should get course by slug", async () => {

		const course = await kernel.course.getBySlug(
			"course-public"
		);

		expect(course).toBeDefined();
		expect(course.slug).toBe("course-public");

	});

	it("should get course by id", async () => {

		const course = await kernel.course.getBySlug(
			"course-public"
		);

		const found = await kernel.course.get(course.id);

		expect(found).toBeDefined();
		expect(found.id).toBe(course.id);

	});

	it("should return null for unknown slug", async () => {

		const course = await kernel.course.getBySlug(
			"does-not-exist"
		);

		expect(course).toBeNull();

	});

	it("should return null for unknown id", async () => {

		const course = await kernel.course.get(
			"does-not-exist"
		);

		expect(course).toBeNull();

	});

});