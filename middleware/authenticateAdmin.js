// middleware/authenticateAdmin.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function authenticateAdmin(req, res, next) {

	try {

		const { email, password } = req.body;

		if (!email || !password) {

			return res.status(400).json({
				message: "Email and password are required."
			});

		}

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

		const valid = await bcrypt.compare(password, admin.password);

		if (!valid) {

			return res.status(401).json({
				message: "Invalid email or password."
			});

		}
		// We are using req.admin not req.user
		req.admin = admin;

		next();

	}

	catch (err) {

		console.error(err);

		return res.status(500).json({
			message: "Authentication failed."
		});

	}

}