// repositories/AuthorizationRepository.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class GetUserSubs {

	static async build(user) {

		const subscriptions = await prisma.subscription.findMany({

			where: {

				userId: user.id,

				endsAt: { gt: new Date() }

			},

			select: {

				courseId: true

			}

		});

		return {

			role: user.role,

			resources: user.resource ? [user.resource] : [],

			subscriptions: subscriptions.map(s => s.courseId)

		};

	}

}