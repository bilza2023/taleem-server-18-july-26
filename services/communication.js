import * as communicationRepository from "../repositories/communication.js";

export async function createCommunication({

	userId,
	librarySlug,
	message

}) {

	const library =
		await communicationRepository.findLibraryBySlug(
			librarySlug
		);

	if (!library) {

		throw new Error("NOT_FOUND");

	}

	return await communicationRepository.create({

		userId,
		libraryId: library.id,
		message

	});

}

export async function getMyCommunications(userId) {

	return await communicationRepository.findByUser(
		userId
	);

}

export async function getLibraryCommunications(librarySlug) {

	const library =
		await communicationRepository.findLibraryBySlug(
			librarySlug
		);

	if (!library) {

		throw new Error("NOT_FOUND");

	}

	return await communicationRepository.findPublicByLibrary(
		library.id
	);

}