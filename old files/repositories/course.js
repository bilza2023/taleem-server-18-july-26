// --------------------------------------------------
// Course Repository
// --------------------------------------------------

import { PrismaClient }
	from "@prisma/client";

const prisma =
	new PrismaClient();

// --------------------------------------------------
// List
// --------------------------------------------------

export async function index() {

	return await prisma.course.findMany({

		orderBy: {

			title: "asc"

		}

	});

}

// --------------------------------------------------
// Read
// --------------------------------------------------

export async function findBySlug(

	slug

) {

	return await prisma.course.findUnique({

		where: {

			slug

		}

	});

}