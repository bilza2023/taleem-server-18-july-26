// routes/library.js

import express from "express";
import kernel from "../src/serverKernel/ServerKernel.js";

const router = express.Router();

// --------------------------------------------------
// GET /api/library/:slug
// --------------------------------------------------

router.get("/:slug", async (req, res) => {

	try {

		const token = req.headers.authorization?.replace("Bearer ", "");

		const user = await kernel.auth.authenticate(token);

		const item = await kernel.library.getBySlug(
			req.params.slug,
			user
		);

		res.json(item);

	}
	catch (error) {

		res.status(401).json({
			error: error.message
		});

	}

});

export default router;