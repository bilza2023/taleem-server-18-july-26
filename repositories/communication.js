///home/bilal-tariq/00--TALEEM/taleem-server/repositories/communication.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create({
	userId,
	referenceId,
	type,
	message
}) {

	return await prisma.communication.create({

		data: {

			userId,
			referenceId,
			type,
			message

		}

	});

}

export async function findMine(userId) {

	return await prisma.communication.findMany({

		where: {

			userId

		},

		orderBy: {

			createdAt: "desc"

		}

	});

}

export async function findById(id) {

	return await prisma.communication.findUnique({

		where: {

			id

		}

	});

}