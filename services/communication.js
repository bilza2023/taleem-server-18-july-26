import * as communicationRepository from "../repositories/communication.js";

export async function create({

	userId,
	referenceId,
	type,
	message

}) {

	return await communicationRepository.create({

		userId,
		referenceId,
		type,
		message

	});

}

export async function findMine(userId) {

	return await communicationRepository.findMine(

		userId

	);

}

export async function findById(id) {

	return await communicationRepository.findById(

		id

	);

}