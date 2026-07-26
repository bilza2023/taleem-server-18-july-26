// routes/admin/auth.js

import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

// --------------------------------------------------
// POST /login
// --------------------------------------------------

router.post("/login", async (req, res) => {

	try {

		const { email, password } = req.body;

		const admin = await prisma.admin.findUnique({

			where: {
				email
			}

		});

		if (!admin) {

			return res.status(401).json({
				message: "Invalid email or password."
			});

		}

		if (!admin.isActive) {

			return res.status(403).json({
				message: "Administrator account is inactive."
			});

		}

		const ok = await bcrypt.compare(
			password,
			admin.password
		);

		if (!ok) {

			return res.status(401).json({
				message: "Invalid email or password."
			});

		}

		const token = jwt.sign(

			{
				id: admin.id
			},

			process.env.JWT_SECRET

		);

		res.json({
			token
		});

	}

	catch (err) {

		console.error(err);

		res.status(500).json({
			message: "Internal server error."
		});

	}

});

export default router;