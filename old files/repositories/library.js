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
export async function index({
	courseId,
	page = 1,
	pageSize = 20
}) {

	const where = {};

	if (courseId) {

		where.courseId = courseId;

	}

	const [totalItems, items] = await Promise.all([

		prisma.library.count({
			where
		}),

		prisma.library.findMany({

			where,

			select: {

				id: true,
				slug: true,
				title: true,
				description: true,
				thumbnail: true,
				type: true,
				courseId: true,

				course: {
					select: {
						id: true,
						slug: true,
						title: true,
						access: true
					}
				}

			},

			orderBy: {

				id: "asc"

			},

			skip: (page - 1) * pageSize,

			take: pageSize

		})

	]);

	return {

		page,

		pageSize,

		totalItems,

		totalPages: Math.ceil(totalItems / pageSize),

		items

	};

}