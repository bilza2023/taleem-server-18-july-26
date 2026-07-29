
// /scripts/bulk-seed/bulk-seed.js

import { PrismaClient } from "@prisma/client";

import clearDatabase from "./clearDatabase.js";
import createAdmin from "./createAdmin.js";
import createCommunication from "./createCommunication.js";
import createCourse from "./createCourse.js";
import createSubscription from "./createSubscription.js";
import createUser from "./createUser.js";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Bulk Seed");

	await clearDatabase(prisma);

	// --------------------------------------------------
	// Courses + Library
	// --------------------------------------------------

	const pages = await createCourse(prisma, {
		slug: "pages",
		title: "Pages",
		access: "OPEN",
		lessons: 6,
		allowCommunication: false
	});

	await createCourse(prisma, {
		slug: "blog",
		title: "Blog",
		access: "OPEN",
		lessons: 25
	});

	await createCourse(prisma, {
		slug: "pre-algebra",
		title: "Pre-Algebra",
		access: "MEMBERS",
		lessons: 30
	});

	const physics = await createCourse(prisma, {
		slug: "physics",
		title: "Physics",
		access: "SUBSCRIPTION",
		price: 1000,
		lessons: 20
	});

	// --------------------------------------------------
	// User
	// --------------------------------------------------

	const testUser = await createUser(prisma, {
		name: "Test User",
		email: "test@example.com"
	});

	// --------------------------------------------------
	// Admins
	// --------------------------------------------------

	await createAdmin(prisma, {
		name: "Library Admin",
		email: "library@taleem.help",
		resource: "library"
	});

	await createAdmin(prisma, {
		name: "Course Admin",
		email: "course@taleem.help",
		resource: "course"
	});

	await createAdmin(prisma, {
		name: "Subscription Admin",
		email: "subscription@taleem.help",
		resource: "subscription"
	});

	await createAdmin(prisma, {
		name: "Communication Admin",
		email: "communication@taleem.help",
		resource: "communication"
	});

	// --------------------------------------------------
	// Subscription
	// --------------------------------------------------

	await createSubscription(prisma, {
		userId: testUser.id,
		courseId: physics.id
	});

	// --------------------------------------------------
	// Sample Communications
	// --------------------------------------------------

	await createCommunication(prisma, {
		userId: testUser.id,
		referenceId: "pre-algebra-lesson-1",
		message: "I have a question about this lesson."
	});

	await createCommunication(prisma, {
		userId: testUser.id,
		referenceId: "pre-algebra-lesson-2",
		message: "This lesson was very helpful.",
		authorResponse: "Thank you for your feedback!",
		isPublic: true
	});

	await createCommunication(prisma, {
		userId: testUser.id,
		referenceId: "about",
		message: "The About page looks great.",
		isPublic: true
	});

	console.log("");
	console.log("✅ Bulk seed completed.");
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});