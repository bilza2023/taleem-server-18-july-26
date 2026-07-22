import * as communicationRepository from "../repositories/communication.js";

export async function createCommunication({

	userId,
	libraryId,
	message

}) {

	const library =
		await communicationRepository.libraryExists(
			libraryId
		);

	if (!library) {

		throw new Error("NOT_FOUND");

	}

	return await communicationRepository.create({

		userId,
		libraryId,
		message

	});

}

export async function getMyCommunications(userId) {

	return await communicationRepository.findByUser(
		userId
	);

}

export async function getLibraryCommunications(libraryId) {

	const library =
		await communicationRepository.libraryExists(
			libraryId
		);

	if (!library) {

		throw new Error("NOT_FOUND");

	}

	return await communicationRepository.findPublicByLibrary(
		libraryId
	);

}