import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findBySlug(slug) {

	return await prisma.library.findUnique({

		where: {

			slug

		},

		include: {

			course: true

		}

	});

}

export async function findActiveSubscription(userId, courseId) {

	const now = new Date();

	return await prisma.subscription.findFirst({

		where: {

			userId,

			courseId,

			startsAt: {

				lte: now

			},

			OR: [

				{

					endsAt: null

				},

				{

					endsAt: {

						gte: now

					}

				}

			]

		}

	});

}