import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function authenticate(req, res, next) {

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

		const user = await prisma.user.findUnique({

			where: {
				id: payload.id
			},

			select: {

				id: true,
				email: true,
				name: true,
				role: true

			}

		});

		if (!user) {

			return res.status(401).json({

				message: "User not found."

			});

		}

		req.user = user;

		next();

	}

	catch (err) {

		return res.status(401).json({

			message: "Invalid token."

		});

	}

}