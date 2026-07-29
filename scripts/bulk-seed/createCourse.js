// /scripts/bulk-seed/createCourse.js

import { ContentType } from "@prisma/client";

import { randomImage, slugify } from "./utils.js";
import * as lorem from "./lorem.js";

/**
 * Creates a course and generates library items for it.
 *
 * @param {PrismaClient} prisma
 * @param {Object} options
 * @param {string} options.slug
 * @param {string} options.title
 * @param {string} [options.description]
 * @param {string} [options.access="OPEN"]
 * @param {number} [options.price=0]
 * @param {number} [options.lessons=0]
 * @param {boolean} [options.allowCommunication=true]
 *
 * @returns {Promise<Object>} Created course
 */
export default async function createCourse(
	prisma,
	{
		slug,
		title,
		description = lorem.paragraph(1),
		access = "OPEN",
		price = 0,
		lessons = 0,
		allowCommunication = true
	}
) {
	const course = await prisma.course.create({
		data: {
			slug,
			title,
			description,
			thumbnail: randomImage(),
			access,
			price
		}
	});

	for (let i = 1; i <= lessons; i++) {
		const lessonTitle = `${title} Lesson ${i}`;

		await prisma.library.create({
			data: {
				slug: `${slugify(slug)}-lesson-${i}`,
				title: lessonTitle,
				description: lorem.sentence(),
				body: lorem.html(),
				type: ContentType.ARTICLE,
				thumbnail: randomImage(),
				sortOrder: i,
				allowCommunication,
				courseId: course.id
			}
		});
	}

	return course;
}