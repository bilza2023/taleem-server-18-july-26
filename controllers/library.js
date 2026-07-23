// /home/bilal-tariq/00--TALEEM/taleem-server/controllers/library.js
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

export async function index(req, res) {

	try {

		const result = await libraryService.index({

			userId: req.user.id,

			courseId: req.query.courseId,

			page: Number(req.query.page ?? 1),

			pageSize: Number(req.query.pageSize ?? 20)

		});

		res.status(200).json(result);

	}

	catch (error) {

		console.error(error);

		res.status(500).json({
			message: "Internal server error."
		});

	}

}