// /home/bilal-tariq/00--TALEEM/taleem-server/routes/library.js

import express from "express";
import kernel from "../src/serverKernel/ServerKernel.js";

const router = express.Router();

// --------------------------------------------------
// GET /api/library/:slug ==> The main library content route
// --------------------------------------------------
// --------------------------------------------------
// GET /api/library/:slug
// --------------------------------------------------
router.get("/:slug", async (req, res) => {

	try {

		const item = await kernel.library.getBySlug(
			req.params.slug
		);

		if (!item) {

			return res.status(404).json({
				error: "library_not_found"
			});

		}

		if (item.access !== "OPEN") {

			const token = req.headers.authorization?.replace(
				"Bearer ",
				""
			);

			const user = await kernel.auth.authenticate(token);

			if (item.access === "SUBSCRIPTION") {

				const course = await kernel.course.getBySlug(
					item.courseSlug
				);

				await kernel.subscription.authorize(
					user.id,
					course.id
				);

			}

		}

		res.json(item);

	}
	catch (error) {

		console.error(error);

		const message = error.message.toLowerCase();

		if (
			message.includes("authenticate") ||
			message.includes("token")
		) {

			return res.status(401).json({
				error: "login_required"
			});

		}

		if (message.includes("subscription")) {

			return res.status(403).json({
				error: "subscription_required"
			});

		}

		return res.status(500).json({
			error: "server_error"
		});

	}

});

export default router;