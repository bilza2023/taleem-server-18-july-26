// /scripts/bulk-seed/clearDatabase.js

/**
 * Clears all application data from the database.
 *
 * Deletion order respects foreign-key constraints.
 *
 * @param {PrismaClient} prisma
 */
export default async function clearDatabase(prisma) {
	console.log("🧹 Clearing database...");

	await prisma.communication.deleteMany();
	await prisma.subscription.deleteMany();
	await prisma.library.deleteMany();
	await prisma.user.deleteMany();
	await prisma.course.deleteMany();
	await prisma.admin.deleteMany();
}