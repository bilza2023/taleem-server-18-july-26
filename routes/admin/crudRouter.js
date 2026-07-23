// routes/admin/crudRouter.js

import express from "express";

export default function createCrudRouter({

	model,
	middleware = []

}) {

	const router = express.Router();

	// --------------------------------------------------
	// Middleware
	// --------------------------------------------------

	router.use(...middleware);

	// --------------------------------------------------
	// GET /
	// List
	// --------------------------------------------------

	router.get("/", async (req, res) => {

		try {

			const items = await model.findMany();

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
	// GET /:id
	// Read
	// --------------------------------------------------

	router.get("/:id", async (req, res) => {

		try {

			const item = await model.findUnique({

				where: {

					id: Number(req.params.id)

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

				message: "Internal server error."

			});

		}

	});

	// --------------------------------------------------
	// POST /
	// Create
	// --------------------------------------------------

	router.post("/", async (req, res) => {

		try {

			const item = await model.create({

				data: req.body

			});

			res.status(201).json(item);

		}

		catch (err) {

			console.error(err);

			res.status(500).json({

				message: "Internal server error."

			});

		}

	});

	// --------------------------------------------------
	// PUT /:id
	// Update
	// --------------------------------------------------

	router.put("/:id", async (req, res) => {

		try {

			const item = await model.update({

				where: {

					id: Number(req.params.id)

				},

				data: req.body

			});

			res.json(item);

		}

		catch (err) {

			console.error(err);

			res.status(500).json({

				message: "Internal server error."

			});

		}

	});

	// --------------------------------------------------
	// DELETE /:id
	// Delete
	// --------------------------------------------------

	router.delete("/:id", async (req, res) => {

		try {

			await model.delete({

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

				message: "Internal server error."

			});

		}

	});

	return router;

}