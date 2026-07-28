// routes/public.js

import express from "express";
import kernel from "../src/serverKernel/ServerKernel.js";

const router = express.Router();

// --------------------------------------------------
// GET /api/public/course
// List all courses
// --------------------------------------------------

// --------------------------------------------------
// GET /api/public/course
// Query courses
//
// Examples:
//   /course
//   /course?access=OPEN
//   /course?access=SUBSCRIPTION
// --------------------------------------------------

router.get("/course", async (req, res) => {

	try {

		const courses = await kernel.course.list({

			access: req.query.access

		});

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

// --------------------------------------------------
// GET /api/public/library
// List all library items (without body)
// --------------------------------------------------
// --------------------------------------------------
// GET /api/public/library
// Query library items
//
// Examples:
//   /library
//   /library?course=blog
//   /library?course=pre-algebra
// --------------------------------------------------
router.get("/library", async (req, res) => {

	try {

		const items = await kernel.library.list({

			course: req.query.course,
			access: req.query.access,
			type: req.query.type

		});

		res.json(items);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});
export default router;