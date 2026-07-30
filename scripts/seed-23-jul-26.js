import bcrypt from "bcrypt";
import { PrismaClient, ContentType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

	console.log("🧹 Clearing database...");

	await prisma.communication.deleteMany();
	await prisma.subscription.deleteMany();
	await prisma.library.deleteMany();
	await prisma.adminCoursePolicy.deleteMany();
	await prisma.user.deleteMany();
	await prisma.course.deleteMany();
	await prisma.admin.deleteMany();

	// --------------------------------------------------
	// Courses
	// --------------------------------------------------

	console.log("📚 Creating courses...");

	const openCourse = await prisma.course.create({
		data: {
			slug: "course-open",
			title: "Open Course",
			description: "Open course used for platform testing.",
			thumbnail: "class8.png",
			access: "OPEN",
			price: 0
		}
	});

	const membersCourse = await prisma.course.create({
		data: {
			slug: "course-members",
			title: "Members Course",
			description: "Members course used for platform testing.",
			thumbnail: "class.webp",
			access: "MEMBERS",
			price: 0
		}
	});

	const subscriptionCourse = await prisma.course.create({
		data: {
			slug: "course-subscription",
			title: "Subscription Course",
			description: "Subscription course used for platform testing.",
			thumbnail: "atom.png",
			access: "SUBSCRIPTION",
			price: 100
		}
	});

	// --------------------------------------------------
	// Library
	// --------------------------------------------------

	console.log("📄 Creating library items...");

	const openPage = await prisma.library.create({
		data: {
			slug: "open-page",
			title: "Open Page",
			description: "Open page used for testing.",
			type: ContentType.ARTICLE,
			thumbnail: "box.webp",
			body: "<h1>Open Page</h1>",
			sortOrder: 1,
			status: "PUBLISHED",
			courseId: openCourse.id
		}
	});

	const openPage2 = await prisma.library.create({
		data: {
			slug: "open-page2",
			title: "Open Page #2",
			description: "Second open page.",
			type: ContentType.ARTICLE,
			thumbnail: "atom.png",
			body: "<h1>Open Page 2</h1>",
			sortOrder: 2,
			status: "PUBLISHED",
			courseId: openCourse.id
		}
	});

	const membersPage = await prisma.library.create({
		data: {
			slug: "members-page",
			title: "Members Page",
			description: "Members page used for testing.",
			type: ContentType.ARTICLE,
			thumbnail: "box.webp",
			body: "<h1>Members Page</h1>",
			sortOrder: 1,
			status: "PUBLISHED",
			courseId: membersCourse.id
		}
	});

	const membersPage2 = await prisma.library.create({
		data: {
			slug: "members-page2",
			title: "Members Page #2",
			description: "Second members page.",
			type: ContentType.ARTICLE,
			thumbnail: "atom.png",
			body: "<h1>Members Page 2</h1>",
			sortOrder: 2,
			status: "PUBLISHED",
			courseId: membersCourse.id
		}
	});

	const subscriptionPage = await prisma.library.create({
		data: {
			slug: "subscription-page",
			title: "Subscription Page",
			description: "Subscription page used for testing.",
			type: ContentType.ARTICLE,
			thumbnail: "box.webp",
			body: "<h1>Subscription Page</h1>",
			sortOrder: 1,
			status: "PUBLISHED",
			courseId: subscriptionCourse.id
		}
	});

	// --------------------------------------------------
	// User
	// --------------------------------------------------

	console.log("👤 Creating test user...");

	const password = await bcrypt.hash("12345678", 10);

	const user = await prisma.user.create({
		data: {
			name: "Test User",
			email: "test@example.com",
			password
		}
	});

	// --------------------------------------------------
	// Subscription
	// --------------------------------------------------

	console.log("🎓 Creating subscription...");

	const startsAt = new Date();

	const endsAt = new Date();
	endsAt.setFullYear(endsAt.getFullYear() + 1);

	await prisma.subscription.create({
		data: {
			userId: user.id,
			courseId: subscriptionCourse.id,
			startsAt,
			endsAt
		}
	});

	// --------------------------------------------------
	// Communications
	// --------------------------------------------------

	console.log("💬 Creating communications...");

	await prisma.communication.create({
		data: {
			userId: user.id,
			libraryId: membersPage.id,
			type: "comment",
			message: "Private answered communication.",
			authorResponse: "Private response.",
			isPublic: false,
			meta: null
		}
	});

	await prisma.communication.create({
		data: {
			userId: user.id,
			libraryId: membersPage.id,
			type: "comment",
			message: "Waiting for author response.",
			authorResponse: null,
			isPublic: false,
			meta: null
		}
	});

	await prisma.communication.create({
		data: {
			userId: user.id,
			libraryId: subscriptionPage.id,
			type: "comment",
			message: "Subscription question.",
			authorResponse: "Subscription response.",
			isPublic: false,
			meta: null
		}
	});

	// --------------------------------------------------
	// Admins
	// --------------------------------------------------

	console.log("👨‍🏫 Creating admins...");

	const openAdmin = await prisma.admin.create({
		data: {
			email: "open@taleem.help",
			password
		}
	});

	const membersAdmin = await prisma.admin.create({
		data: {
			email: "members@taleem.help",
			password
		}
	});

	const subscriptionAdmin = await prisma.admin.create({
		data: {
			email: "subscription@taleem.help",
			password
		}
	});

	// --------------------------------------------------
	// Admin Course Policies
	// --------------------------------------------------

	await prisma.adminCoursePolicy.createMany({
		data: [
			{
				adminId: openAdmin.id,
				courseId: openCourse.id,
				library: true,
				communication: true,
				subscription: false
			},
			{
				adminId: membersAdmin.id,
				courseId: membersCourse.id,
				library: true,
				communication: true,
				subscription: false
			},
			{
				adminId: subscriptionAdmin.id,
				courseId: subscriptionCourse.id,
				library: true,
				communication: true,
				subscription: true
			}
		]
	});

	console.log("✅ Seed complete.");

}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
});