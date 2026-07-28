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


// --------------------------------------------------
// Courses
// --------------------------------------------------

console.log("📚 Creating courses...");

const openCourse = await prisma.course.create({
	data: {
		slug: "course-open",
		title: "Open Course",
		description: "Open course used for platform testing.",
		thumbnail: null,
		access: "OPEN",
		price: 0
	}
});

const membersCourse = await prisma.course.create({
	data: {
		slug: "course-members",
		title: "Members Course",
		description: "Members course used for platform testing.",
		thumbnail: null,
		access: "MEMBERS",
		price: 0
	}
});

const subscriptionCourse = await prisma.course.create({
	data: {
		slug: "course-subscription",
		title: "Subscription Course",
		description: "Subscription course used for platform testing.",
		thumbnail: null,
		access: "SUBSCRIPTION",
		price: 100
	}
});

// --------------------------------------------------
// Library
// --------------------------------------------------

console.log("📄 Creating library items...");

await prisma.library.create({
	data: {
		slug: "open-page",
		title: "Open Page",
		description: "Open page used for testing.",
		type: ContentType.ARTICLE,
		thumbnail: "box.webp",
		body: "<h1>Open Page</h1>",
		courseId: openCourse.id
	}
});

await prisma.library.create({
	data: {
		slug: "members-page",
		title: "Members Page",
		description: "Members page used for testing.",
		type: ContentType.ARTICLE,
		thumbnail: "box.webp",
		body: "<h1>Members Page</h1>",
		courseId: membersCourse.id
	}
});

await prisma.library.create({
	data: {
		slug: "subscription-page",
		title: "Subscription Page",
		description: "Subscription page used for testing.",
		type: ContentType.ARTICLE,
		thumbnail: "box.webp",
		body: "<h1>Subscription Page</h1>",
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
	// Communication
	// --------------------------------------------------

	console.log("💬 Creating communications...");

	await prisma.communication.create({
		data: {
			userId: user.id,
			referenceId: "public-page",
			type: "comment",
			message: "Public answered communication.",
			authorResponse: "Public response.",
			isPublic: true,
			meta: null
		}
	});

	await prisma.communication.create({
		data: {
			userId: user.id,
			referenceId: "members-page",
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
			referenceId: "members-page",
			type: "comment",
			message: "Waiting for author response.",
			authorResponse: null,
			isPublic: false,
			meta: null
		}
	});

	// --------------------------------------------------
// Resource Admins
// --------------------------------------------------
await prisma.admin.createMany({
	data: [
		{
			email: "library@taleem.help",
			password,
			name: "Library Admin",
			resource: "library"
		},
		{
			email: "course@taleem.help",
			password,
			name: "Course Admin",
			resource: "course"
		},
		{
			email: "subscription@taleem.help",
			password,
			name: "Subscription Admin",
			resource: "subscription"
		},
		{
			email: "communication@taleem.help",
			password,
			name: "Communication Admin",
			resource: "communication"
		}
	]
});
	// --------------------------------------------------
	// Summary
	// --------------------------------------------------

	console.log("");

}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});