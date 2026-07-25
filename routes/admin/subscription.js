// routes/admin/subscription.js

import express from "express";
import { PrismaClient } from "@prisma/client";

import authenticate from "../../middleware/authenticate.js";
import requireResource from "../../middleware/requireResource.js";

const prisma = new PrismaClient();
const router = express.Router();

// --------------------------------------------------
// Middleware
// --------------------------------------------------

router.use(
	authenticate,
	requireResource("subscription")
);

// --------------------------------------------------
// GET /
// List
// --------------------------------------------------

router.get("/", async (req, res) => {

	try {

		const items = await prisma.subscription.findMany({

			include: {

				user: {

					select: {

						email: true

					}

				},

				course: {

					select: {

						slug: true,
						title: true

					}

				}

			}

		});

		res.json(items);

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: err.message
		});

	}

});

// --------------------------------------------------
// GET /:id
// Read
// --------------------------------------------------

router.get("/:id", async (req, res) => {

	try {

		const item = await prisma.subscription.findUnique({

			where: {

				id: Number(req.params.id)

			},

			include: {

				user: {

					select: {

						email: true

					}

				},

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

				message: "Not found."

			});

		}

		res.json(item);

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: err.message
		});

	}

});

// --------------------------------------------------
// POST /
// Create
// --------------------------------------------------

router.post("/", async (req, res) => {

	try {

		const {

			email,
			courseSlug,
			startsAt,
			endsAt

		} = req.body;

		const user = await prisma.user.findUnique({

			where: {

				email

			}

		});

		if (!user) {

			return res.status(404).json({

				message: "User not found."

			});

		}

		const course = await prisma.course.findUnique({

			where: {

				slug: courseSlug

			}

		});

		if (!course) {

			return res.status(404).json({

				message: "Course not found."

			});

		}

		const item = await prisma.subscription.create({

			data: {

				userId: user.id,

				courseId: course.id,

				startsAt: new Date(startsAt),

				endsAt: endsAt
					? new Date(endsAt)
					: null

			}

		});

		res.status(201).json(item);

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: err.message
		});

	}

});

// --------------------------------------------------
// PUT /:id
// Update
// --------------------------------------------------

router.put("/:id", async (req, res) => {

	try {

		const {

			email,
			courseSlug,
			startsAt,
			endsAt

		} = req.body;

		const user = await prisma.user.findUnique({

			where: {

				email

			}

		});

		if (!user) {

			return res.status(404).json({

				message: "User not found."

			});

		}

		const course = await prisma.course.findUnique({

			where: {

				slug: courseSlug

			}

		});

		if (!course) {

			return res.status(404).json({

				message: "Course not found."

			});

		}

		const item = await prisma.subscription.update({

			where: {

				id: Number(req.params.id)

			},

			data: {

				userId: user.id,

				courseId: course.id,

				startsAt,

				endsAt

			}

		});

		res.json(item);

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: err.message
		});

	}

});

// --------------------------------------------------
// DELETE /:id
// Delete
// --------------------------------------------------

router.delete("/:id", async (req, res) => {

	try {

		await prisma.subscription.delete({

			where: {

				id: Number(req.params.id)

			}

		});

		res.json({

			message: "Deleted."

		});

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: err.message
		});

	}

});

export default router;