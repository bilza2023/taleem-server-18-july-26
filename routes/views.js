// routes/views.js
import authenticate from "../middleware/authenticate.js";
import requireResource from "../middleware/requireResource.js";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// --------------------------------------------------
// Library
// --------------------------------------------------

router.get(	"/library",authenticate,requireResource("library"), 
	
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