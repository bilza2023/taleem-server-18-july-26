import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Course", () => {

	it("should list all courses", async () => {

		const courses = await kernel.course.list();

		expect(Array.isArray(courses)).toBe(true);
		expect(courses.length).toBe(3);

	});

	it("should filter courses by access", async () => {

		const courses = await kernel.course.list({
			access: "MEMBERS"
		});

		expect(courses.length).toBe(1);
		expect(courses[0].slug).toBe("course-members");

	});

	it("should get a course", async () => {

		const course = (await kernel.course.list())[0];

		const found = await kernel.course.get(course.id);

		expect(found).toBeDefined();
		expect(found.id).toBe(course.id);

	});

	it("should return null for an unknown course", async () => {

		const course = await kernel.course.get(999999);

		expect(course).toBeNull();

	});

	it("should convert slug to id", async () => {

		const id = await kernel.course.slugToId(
			"course-members"
		);

		expect(id).toBeDefined();

	});

	it("should convert id to slug", async () => {

		const id = await kernel.course.slugToId(
			"course-members"
		);

		const slug = await kernel.course.idToSlug(id);

		expect(slug).toBe("course-members");

	});

	it("should reject an unknown slug", async () => {

		await expect(

			kernel.course.slugToId(
				"does-not-exist"
			)

		).rejects.toThrow(
			'Course "does-not-exist" not found.'
		);

	});

	it("should reject an unknown id", async () => {

		await expect(

			kernel.course.idToSlug(
				999999
			)

		).rejects.toThrow(
			'Course "999999" not found.'
		);

	});

	it("should create a course", async () => {

		const course = await kernel.course.create({

			slug: "course-test",
			title: "Test Course",
			description: "Created during testing.",
			thumbnail: "test.png",
			access: "OPEN",
			price: 0

		});

		expect(course.slug).toBe("course-test");

	});

	it("should update a course", async () => {

		const course = await kernel.course.create({

			slug: "course-update",
			title: "Original",
			description: "Original",
			thumbnail: "test.png",
			access: "OPEN",
			price: 0

		});

		const updated = await kernel.course.update(

			course.id,

			{
				title: "Updated"
			}

		);

		expect(updated.title).toBe("Updated");

	});

	it("should delete a course", async () => {

		const course = await kernel.course.create({

			slug: "course-delete",
			title: "Delete Me",
			description: "Temporary",
			thumbnail: "test.png",
			access: "OPEN",
			price: 0

		});

		await kernel.course.delete(course.id);

		const deleted = await kernel.course.get(course.id);

		expect(deleted).toBeNull();

	});

});