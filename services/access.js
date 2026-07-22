import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkAccess(req, content) {

	// --------------------------------------------------
	// Every course requires login
	// --------------------------------------------------

	const auth = req.headers.authorization;

	if (!auth || !auth.startsWith("Bearer ")) {

		return {

			allowed: false,
			status: 401,
			reason: "login_required"

		};

	}

	const token = auth.substring(7);

	let payload;

	try {

		payload = jwt.verify(
			token,
			process.env.JWT_SECRET
		);

	}

	catch {

		return {

			allowed: false,
			status: 401,
			reason: "invalid_token"

		};

	}

	// --------------------------------------------------
	// PUBLIC
	// --------------------------------------------------

	if (content.visibility === "PUBLIC") {

		return {

			allowed: true,
			status: 200,
			reason: "public"

		};

	}

	// --------------------------------------------------
	// MEMBERS
	// --------------------------------------------------

	if (content.visibility === "MEMBERS") {

		return {

			allowed: true,
			status: 200,
			reason: "member"

		};

	}

	// --------------------------------------------------
	// SUBSCRIPTION
	// --------------------------------------------------

	const subscription =
		await prisma.subscription.findFirst({

			where: {

				userId: payload.id,

				courseId: content.courseId,

				status: "ACTIVE"

			}

		});

	if (!subscription) {

		return {

			allowed: false,
			status: 403,
			reason: "subscription_required"

		};

	}

	return {

		allowed: true,
		status: 200,
		reason: "subscription"

	};

}