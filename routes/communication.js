// routes/communication.js

import express from "express";
import kernel from "../src/serverKernel/ServerKernel.js";

const router = express.Router();

// --------------------------------------------------
// POST /api/communication
// --------------------------------------------------
// --------------------------------------------------
// POST /api/communication
// --------------------------------------------------

router.post("/", async (req, res) => {

	try {

		const token = req.headers.authorization?.replace("Bearer ", "");

		const user = await kernel.auth.authenticate(token);
		// console.log("req.body" , req.body);
		const item = await kernel.communication.create(
			user,
			req.body
		);

		res.status(201).json(item);

	}
	catch (error) {

		res.status(401).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// GET /api/communication/library/:slug
// --------------------------------------------------

router.get("/library/:slug", async (req, res) => {

	try {

		const items = await kernel.communication.listByReference(
			req.params.slug
		);

		res.json(items);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// GET /api/communication/user/:userId
// --------------------------------------------------

// --------------------------------------------------
// GET /api/communication/my
// --------------------------------------------------

router.get("/my", async (req, res) => {

	try {

		const token = req.headers.authorization?.replace("Bearer ", "");

		const user = await kernel.auth.authenticate(token);

		const items = await kernel.communication.listByUser(user.id);

		res.json(items);

	}
	catch (error) {

		res.status(401).json({
			error: error.message
		});

	}

});

export default router;