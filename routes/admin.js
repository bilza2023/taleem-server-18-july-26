import express from "express";
import kernel from "../src/serverKernel/ServerKernel.js";
import path from "path";

const router = express.Router();

const ADMIN_PAGES = path.resolve("admin-pages");

// --------------------------------------------------
// Admin Pages
// --------------------------------------------------

router.get("/", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "index.html"));
});

router.get("/login", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "login.html"));
});

// --------------------------------------------------
// Library Pages
// --------------------------------------------------


router.get("/library/new", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "library-new.html"));
});

router.get("/library/edit", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "library-edit.html"));
});
router.get("/library/delete", (req, res) => {

	res.sendFile(
		path.join(
			ADMIN_PAGES,
			"library-delete.html"
		)
	);

});

router.get("/library", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "library-index.html"));
});

router.get("/library/:slug", async (req, res) => {

	try {

		res.json(
			await kernel.library.getBySlug(req.params.slug)
		);

	}
	catch {

		res.status(404).json({
			error: "library_not_found"
		});

	}

});


// --------------------------------------------------
// Course Pages
// --------------------------------------------------

router.get("/course", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "course-index.html"));
});

router.get("/course/new", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "course-new.html"));
});

router.get("/course/edit", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "course-edit.html"));
});

// --------------------------------------------------
// Communication Pages
// --------------------------------------------------

router.get("/communication/unanswered", (req, res) => {
	res.sendFile(
		path.join(
			ADMIN_PAGES,
			"communication-unanswered.html"
		)
	);
});

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
			error: "login_failed"
		});

	}

});

// --------------------------------------------------
// Library API
// --------------------------------------------------


router.post("/library", async (req, res) => {

	try {

		res.status(201).json(
			await kernel.library.createBySlug(
				null,
				req.body
			)
		);

	}
	catch {

		res.status(500).json({
			error: "create_failed"
		});

	}

});

router.put("/library/:slug", async (req, res) => {

	try {

		res.json(
			await kernel.library.updateBySlug(
				null,
				req.params.slug,
				req.body
			)
		);

	}
	catch {

		res.status(500).json({
			error: "update_failed"
		});

	}

});

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
	catch {

		res.status(500).json({
			error: "delete_failed"
		});

	}

});


router.get("/course/delete", (req, res) => {

	res.sendFile(
		path.join(
			ADMIN_PAGES,
			"course-delete.html"
		)
	);

});

// --------------------------------------------------
// Course API
// --------------------------------------------------

router.get("/course/:slug", async (req, res) => {

	try {

		res.json(
			await kernel.course.getBySlug(req.params.slug)
		);

	}
	catch {

		res.status(404).json({
			error: "course_not_found"
		});

	}

});

router.post("/course", async (req, res) => {

	try {

		res.status(201).json(
			await kernel.course.createBySlug(req.body)
		);

	}
	// catch {

	// 	res.status(500).json({
	// 		error: "create_failed"
	// 	});

	// }
	catch (error) {

	console.error(error);

	res.status(500).json({
		name: error.name,
		code: error.code,
		message: error.message,
		meta: error.meta
	});

}

});

router.put("/course/:slug", async (req, res) => {

	try {

		res.json(
			await kernel.course.updateBySlug(
				req.params.slug,
				req.body
			)
		);

	}
	catch {

		res.status(500).json({
			error: "update_failed"
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
	// catch {

	// 	res.status(500).json({
	// 		error: "delete_failed"
	// 	});

	// }
	catch (error) {

	console.error(error);

	res.status(500).json({
		error: error.message
	});

}

});


// --------------------------------------------------
// Communication API
// --------------------------------------------------

router.get("/communication/unanswered/list", async (req, res) => {

	try {

		res.json(
			await kernel.communication.listUnanswered()
		);

	}
	catch {

		res.status(500).json({
			error: "server_error"
		});

	}

});

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
	catch {

		res.status(500).json({
			error: "update_failed"
		});

	}

});




export default router;