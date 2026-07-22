import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create({ userId, libraryId, message }) {

	return await prisma.communication.create({

		data: {

			userId,
			libraryId,
			message

		}

	});

}

export async function findByUser(userId) {

	return await prisma.communication.findMany({

		where: {

			userId

		},

		include: {

			library: {

				select: {

					id: true,
					slug: true,
					title: true

				}

			}

		},

		orderBy: {

			createdAt: "desc"

		}

	});

}

export async function findPublicByLibrary(libraryId) {

	return await prisma.communication.findMany({

		where: {

			libraryId
		

		},

		include: {

			user: {

				select: {

					name: true

				}

			}

		},

		orderBy: {

			createdAt: "desc"

		}

	});

}

export async function findLibraryBySlug(slug) {

	return await prisma.library.findUnique({

		where: {

			slug

		},

		select: {

			id: true,
			slug: true,
			title: true

		}

	});

}