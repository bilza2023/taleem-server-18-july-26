import express from "express";
import path from "path";

const router = express.Router();

const pages = path.resolve("server-pages");

// --------------------------------------------------
// Administrator Pages
// --------------------------------------------------

router.get("/login", (req, res) => {

	res.sendFile(
		path.join(pages, "admin-login.html")
	);

});

// --------------------------------------------------
// Library
// --------------------------------------------------

router.get("/library", (req, res) => {

	res.sendFile(
		path.join(pages, "library-index.html")
	);

});

router.get("/library/new", (req, res) => {

	res.sendFile(
		path.join(pages, "library-new.html")
	);

});

router.get("/library/edit", (req, res) => {

	res.sendFile(
		path.join(pages, "library-edit.html")
	);

});

// --------------------------------------------------
// Courses
// --------------------------------------------------

router.get("/course", (req, res) => {

	res.sendFile(
		path.join(pages, "course-index.html")
	);

});

router.get("/course/new", (req, res) => {

	res.sendFile(
		path.join(pages, "course-new.html")
	);

});

router.get("/course/edit", (req, res) => {

	res.sendFile(
		path.join(pages, "course-edit.html")
	);

});

router.get("/communication/unanswered", (req, res) => {

	res.sendFile(
		path.join(pages, "communication-unanswered.html")
	);

});

export default router;