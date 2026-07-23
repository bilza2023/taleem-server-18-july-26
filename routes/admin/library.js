// routes/admin/library.js

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
	requireResource("library")
);

// --------------------------------------------------
// GET /
// List
// --------------------------------------------------

router.get("/", async (req, res) => {

	try {

		const items = await prisma.library.findMany();

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

		const item = await prisma.library.findUnique({

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

		const item = await prisma.library.create({

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

		const item = await prisma.library.update({

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

		await prisma.library.delete({

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

export default router;