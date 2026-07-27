// routes/admin.js

import express from "express";
import kernel from "../src/serverKernel/ServerKernel.js";

const router = express.Router();

// --------------------------------------------------
// POST /api/admin/login
// --------------------------------------------------

router.post("/login", async (req, res) => {

	try {

		const { email, password } = req.body;

		const token = await kernel.admin.login(email, password);

		res.json({ token });

	}
	catch (error) {

		res.status(401).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// GET /api/admin/library
// --------------------------------------------------

router.get("/library", async (req, res) => {

	try {

		const items = await kernel.library.list();

		res.json(items);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// GET /api/admin/library/:slug
// --------------------------------------------------

router.get("/library/:slug", async (req, res) => {

	try {

		const item = await kernel.library.getBySlug(
			req.params.slug
		);

		res.json(item);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// POST /api/admin/library
// --------------------------------------------------

router.post("/library", async (req, res) => {

	try {

		const item = await kernel.library.createBySlug(
			null,
			req.body
		);

		res.status(201).json(item);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// PUT /api/admin/library/:slug
// --------------------------------------------------

router.put("/library/:slug", async (req, res) => {

	try {

		const item = await kernel.library.updateBySlug(
			null,
			req.params.slug,
			req.body
		);

		res.json(item);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// DELETE /api/admin/library/:slug
// --------------------------------------------------

router.delete("/library/:slug", async (req, res) => {

	try {

		await kernel.library.deleteBySlug(
			null,
			req.params.slug
		);

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

//course 

// --------------------------------------------------
// GET /api/admin/course
// --------------------------------------------------

router.get("/course", async (req, res) => {

	try {

		const items = await kernel.course.list();

		res.json(items);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// GET /api/admin/course/:slug
// --------------------------------------------------

router.get("/course/:slug", async (req, res) => {

	try {

		const item = await kernel.course.getBySlug(
			req.params.slug
		);

		res.json(item);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// POST /api/admin/course
// --------------------------------------------------

router.post("/course", async (req, res) => {

	try {

		const item = await kernel.course.createBySlug(
			req.body
		);

		res.status(201).json(item);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// PUT /api/admin/course/:slug
// --------------------------------------------------

router.put("/course/:slug", async (req, res) => {

	try {

		const item = await kernel.course.updateBySlug(
			req.params.slug,
			req.body
		);

		res.json(item);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});


router.delete("/course/:slug", async (req, res) => {

	try {

		await kernel.course.deleteBySlug(
			req.params.slug
		);

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
// GET /api/admin/communication/unanswered
// --------------------------------------------------

router.get("/communication/unanswered", async (req, res) => {

	try {

		const items = await kernel.communication.listUnanswered();

		res.json(items);

	}
	catch (error) {

		res.status(500).json({
			error: error.message
		});

	}

});

// --------------------------------------------------
// POST /api/admin/communication/respond
// --------------------------------------------------

router.post("/communication/respond", async (req, res) => {

	try {

		const { id, authorResponse, isPublic } = req.body;

		await kernel.communication.update(id, {
			authorResponse,
			isPublic
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