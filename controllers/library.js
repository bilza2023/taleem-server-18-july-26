

import * as libraryService from "../services/library.js";

export async function getLibraryItem(req, res) {

	try {

		const result = await libraryService.getLibraryItem({

			userId: req.user.id,

			slug: req.params.slug

		});

		res.status(200).json(result);

	}

	catch (error) {

		if (error.message === "NOT_FOUND") {

			return res.status(404).json({
				message: "Library item not found."
			});

		}

		if (error.message === "FORBIDDEN") {

			return res.status(403).json({
				message: "Access denied."
			});

		}

		console.error(error);

		res.status(500).json({
			message: "Internal server error."
		});

	}

}