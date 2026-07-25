import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// --------------------------------------------------
// GET /library
// Public library list
// --------------------------------------------------

router.get("/library", async (req, res) => {

	try {

		const page = Number(req.query.page ?? 1);
		const pageSize = Number(req.query.pageSize ?? 20);

		const items = await prisma.library.findMany({

			where: {

				// status: "PUBLISHED"

			},

			include: {

				course: {

					select: {

						slug: true,
						title: true

					}

				}

			},

			orderBy: {

				createdAt: "desc"

			},

			skip: (page - 1) * pageSize,

			take: pageSize

		});

		res.json(

			items.map(({ course, body, ...item }) => ({

				...item,

				courseSlug: course.slug,

				courseTitle: course.title

			}))

		);

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: "Internal server error."
		});

	}

});

// --------------------------------------------------
// GET /library/:slug
// Public library item
// --------------------------------------------------

router.get("/library/:slug", async (req, res) => {

	try {

		const item = await prisma.library.findFirst({

			where: {

				slug: req.params.slug,

				status: "PUBLISHED"

			},

			include: {

				course: {

					select: {

						slug: true,
						title: true

					}

				}

			}

		});

		if (!item) {

			return res.status(404).json({
				message: "Library item not found."
			});

		}

		res.json({

			...item,

			courseSlug: item.course.slug,

			courseTitle: item.course.title

		});

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: "Internal server error."
		});

	}

});

// --------------------------------------------------
// GET /course
// Public course list
// --------------------------------------------------

router.get("/course", async (req, res) => {

	try {

		const items = await prisma.course.findMany({

			orderBy: {

				title: "asc"

			}

		});

		res.json(items);

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: "Internal server error."
		});

	}

});

// --------------------------------------------------
// GET /course/:slug
// Public course
// --------------------------------------------------

router.get("/course/:slug", async (req, res) => {

	try {

		const item = await prisma.course.findUnique({

			where: {

				slug: req.params.slug

			}

		});

		if (!item) {

			return res.status(404).json({
				message: "Course not found."
			});

		}

		res.json(item);

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: "Internal server error."
		});

	}

});

export default router;