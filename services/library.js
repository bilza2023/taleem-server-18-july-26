import * as libraryRepository from "../repositories/library.js";

export async function getLibraryItem({ userId, slug }) {

	// Find library item
	const library =
		await libraryRepository.findBySlug(slug);

	if (!library) {

		throw new Error("NOT_FOUND");

	}

	// Public course?
	if (library.course.access === "PUBLIC") {

		return library;

	}

	// Check active subscription
	const subscription =
		await libraryRepository.findActiveSubscription(
			userId,
			library.courseId
		);

	if (!subscription) {

		throw new Error("FORBIDDEN");

	}

	return library;

}

export async function index({
	userId,
	courseId,
	page = 1,
	pageSize = 20
}) {

	const result = await libraryRepository.index({

		courseId,
		page,
		pageSize

	});

	const items = [];

	for (const library of result.items) {

		if (library.course.access === "PUBLIC") {

			items.push(library);
			continue;

		}

		const subscription =
			await libraryRepository.findActiveSubscription(
				userId,
				library.courseId
			);

		if (subscription) {

			items.push(library);

		}

	}

	return {

		page: result.page,
		pageSize: result.pageSize,
		totalItems: items.length,
		totalPages: result.totalPages,
		items

	};

}