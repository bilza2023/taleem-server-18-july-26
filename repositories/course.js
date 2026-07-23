import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function index() {

	return await prisma.course.findMany({

		orderBy: {
			title: "asc"
		},

		select: {
			id: true,
			slug: true,
			title: true,
			description: true,
			access: true
		}

	});

}

export async function findBySlug(slug) {

	return await prisma.course.findUnique({

		where: {
			slug
		},

		select: {
			id: true,
			slug: true,
			title: true,
			description: true,
			access: true
		}

	});

}