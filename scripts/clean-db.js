import bcrypt from "bcrypt";
import { PrismaClient, ContentType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

	console.log("🧹 Clearing database...");

	await prisma.communication.deleteMany();
	await prisma.subscription.deleteMany();
	await prisma.library.deleteMany();
	await prisma.user.deleteMany();
	await prisma.course.deleteMany();
	await prisma.admin.deleteMany();

}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});