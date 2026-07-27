// routes/public.js

import express from "express";
import kernel from "../src/serverKernel/ServerKernel.js";

const router = express.Router();

// --------------------------------------------------
// GET /api/public/course
// List all courses
// --------------------------------------------------

router.get("/course", async (req, res) => {

	try {

		const courses = await kernel.course.list();

		res.json(courses);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// GET /api/public/course/:slug/list
// List library items for a course
// --------------------------------------------------

router.get("/course/:slug/list", async (req, res) => {

	try {

		const items = await kernel.library.listByCourse(
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

export default router;