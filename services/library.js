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