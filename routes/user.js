// routes/user.js

import express from "express";
import kernel from "../src/serverKernel/ServerKernel.js";

const router = express.Router();

// --------------------------------------------------
// POST /api/user/login
// --------------------------------------------------

router.post("/login", async (req, res) => {

	try {

		const { email, password } = req.body;

		const token = await kernel.user.login(email, password);

		res.json({ token });

	}
	catch (error) {

		res.status(401).json({
			error: error.message
		});

	}

});

export default router;