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
// GET /:slug
// Read
// --------------------------------------------------

router.get("/:slug", async (req, res) => {

	try {

		const item = await prisma.library.findUnique({

			where: {
				slug: req.params.slug
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
// PUT /:slug
// Update
// --------------------------------------------------

router.put("/:slug", async (req, res) => {

	try {

		const item = await prisma.library.update({

			where: {
				slug: req.params.slug
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
// DELETE /:slug
// Delete
// --------------------------------------------------

router.delete("/:slug", async (req, res) => {

	try {

		await prisma.library.delete({

			where: {
				slug: req.params.slug
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