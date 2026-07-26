// routes/views.js
import authenticateAdmin from "../middleware/authenticateAdmin.js";
import requireResource from "../middleware/requireResource.js";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// --------------------------------------------------
// Admin Login
// --------------------------------------------------

router.get("/admin/login", (req, res) => {

	res.render("admin/login");

});
// --------------------------------------------------
// Library
// --------------------------------------------------

router.get(	"/library",authenticateAdmin,requireResource("library"), 
	
async (req, res) => {

	console.log("✅ Reached library page");

	const items = await prisma.library.findMany({

		include: {
			course: true
		},

		orderBy: {
			title: "asc"
		}

	});

	res.render("library/index", {

		items,
		user: {
			email: "debug@example.com"
		}

	});

});

export default router;