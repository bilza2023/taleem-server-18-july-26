///home/bilal-tariq/00--TALEEM/taleem-server/routes/admin.js
import express from "express";
import kernel from "../src/serverKernel/ServerKernel.js";
import path from "path";

const router = express.Router();

const ADMIN_PAGES = path.resolve("admin-pages");


// --------------------------------------------------
// Library API
// --------------------------------------------------

router.get("/library/:slug", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		const id = await kernel.library.slugToId(req.params.slug);
		const library = await kernel.library.get(id);

		await kernel.policy.require(admin, library.course.id, "library");

		res.json(library);

	}
	catch (error) {

		res.status(404).json({
			error: error.message
		});

	}

});

router.post("/library", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		await kernel.policy.require(admin, req.body.courseId, "library");

		res.status(201).json(
			await kernel.library.create(req.body)
		);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

router.put("/library/:slug", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		const id = await kernel.library.slugToId(req.params.slug);
		const library = await kernel.library.get(id);

		await kernel.policy.require(admin, library.course.id, "library");

		res.json(
			await kernel.library.update(id, req.body)
		);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

router.delete("/library/:slug", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		const id = await kernel.library.slugToId(req.params.slug);
		const library = await kernel.library.get(id);

		await kernel.policy.require(admin, library.course.id, "library");

		await kernel.library.delete(id);

		res.json({
			success: true
		});

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});


// --------------------------------------------------
// Course API
// --------------------------------------------------

router.get("/course/:slug", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		const id = await kernel.course.slugToId(req.params.slug);
		const course = await kernel.course.get(id);

		await kernel.policy.require(admin, course.id, "course");

		res.json(course);

	}
	catch (error) {

		res.status(404).json({
			error: error.message
		});

	}

});

router.post("/course", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		await kernel.policy.require(admin, req.body.id, "course");

		res.status(201).json(
			await kernel.course.create(req.body)
		);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

router.put("/course/:slug", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		const id = await kernel.course.slugToId(req.params.slug);
		const course = await kernel.course.get(id);

		await kernel.policy.require(admin, course.id, "course");

		res.json(
			await kernel.course.update(id, req.body)
		);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

router.delete("/course/:slug", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		const id = await kernel.course.slugToId(req.params.slug);
		const course = await kernel.course.get(id);

		await kernel.policy.require(admin, course.id, "course");

		await kernel.course.delete(id);

		res.json({
			success: true
		});

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// Communication API
// --------------------------------------------------
// --------------------------------------------------
// Communication API
// --------------------------------------------------

router.get("/communication/unanswered/list", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		// TODO: Filter by admin's courses in a later revision.
		const communication = await kernel.communication.listUnanswered();

		res.json(communication);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

router.post("/communication/respond", async (req, res) => {

	try {

		const admin = await kernel.admin.authenticate(req);

		const communication = await kernel.communication.get(req.body.id);

		await kernel.policy.require(
			admin,
			communication.courseId,
			"communication"
		);

		await kernel.communication.update(req.body.id, {
			authorResponse: req.body.authorResponse,
			isPublic: req.body.isPublic
		});

		res.json({
			success: true
		});

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});


export default router;