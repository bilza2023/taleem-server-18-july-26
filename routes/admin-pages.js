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

export default router;