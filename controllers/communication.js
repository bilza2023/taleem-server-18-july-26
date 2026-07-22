import * as communicationService from "../services/communication.js";

export async function createCommunication(req, res) {

	try {

		const communication =
			await communicationService.createCommunication({

				userId: req.user.id,

				librarySlug: req.body.librarySlug,

				message: req.body.message

			});

		res.status(201).json(communication);

	}

	catch (error) {

		if (error.message === "NOT_FOUND") {

			return res.status(404).json({

				message: "Library item not found."

			});

		}

		console.error(error);

		res.status(500).json({

			message: "Internal server error."

		});

	}

}

export async function getMyCommunications(req, res) {

	try {

		const communications =
			await communicationService.getMyCommunications(
				req.user.id
			);

		res.status(200).json(communications);

	}

	catch (error) {

		console.error(error);

		res.status(500).json({

			message: "Internal server error."

		});

	}

}

export async function getLibraryCommunications(req, res) {

	try {

		const communications =
			await communicationService.getLibraryCommunications(

				req.params.librarySlug

			);

		res.status(200).json(communications);

	}

	catch (error) {

		if (error.message === "NOT_FOUND") {

			return res.status(404).json({

				message: "Library item not found."

			});

		}

		console.error(error);

		res.status(500).json({

			message: "Internal server error."

		});

	}

}