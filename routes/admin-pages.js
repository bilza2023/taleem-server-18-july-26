
import express from "express";
import path from "path";

const router = express.Router();

const ADMIN_PAGES = path.resolve("admin-pages");


// --------------------------------------------------
// Library Pages
// --------------------------------------------------

router.get("/library", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "library-index.html"));
});

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

router.get("/", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "index.html"));
});

router.get("/login", (req, res) => {
	res.sendFile(path.join(ADMIN_PAGES, "login.html"));
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

export default router;