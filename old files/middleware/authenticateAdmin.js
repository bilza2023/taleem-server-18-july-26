// middleware/authenticateAdmin.js

import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function authenticateAdmin(req, res, next) {

	try {

		const auth = req.headers.authorization;

		if (!auth || !auth.startsWith("Bearer ")) {

			return res.status(401).json({
				message: "Token required."
			});

		}

		const token = auth.substring(7);

		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET
		);

		const admin = await prisma.admin.findUnique({

			where: {
				id: payload.id
			}

		});

		if (!admin) {

			return res.status(401).json({
				message: "Administrator not found."
			});

		}

		if (!admin.isActive) {

			return res.status(403).json({
				message: "Administrator account is inactive."
			});

		}

		req.admin = admin;

		next();

	}

	catch (err) {

		console.error(err);

		return res.status(401).json({
			message: "Invalid token."
		});

	}

}