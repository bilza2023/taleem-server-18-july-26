import * as communicationService from "../services/communication.js";

export async function createCommunication(req, res) {

	try {

		const communication =
			await communicationService.create({

				userId: req.user.id,

				referenceId: req.body.referenceId,

				type: req.body.type,

				message: req.body.message

			});

		res.status(201).json(communication);

	}

	catch (error) {

		console.error(error);

		res.status(500).json({

			message: "Internal server error."

		});

	}

}

export async function getMyCommunications(req, res) {

	try {

		const communications =
			await communicationService.findMine(

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

export async function getCommunication(req, res) {

	try {

		const communication =
			await communicationService.findById(

				Number(req.params.id)

			);

		if (!communication) {

			return res.status(404).json({

				message: "Communication not found."

			});

		}

		res.status(200).json(communication);

	}

	catch (error) {

		console.error(error);

		res.status(500).json({

			message: "Internal server error."

		});

	}

}