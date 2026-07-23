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


	// --------------------------------------------------
	// Courses
	// --------------------------------------------------

	console.log("📚 Creating courses...");

	const publicCourse = await prisma.course.create({
		data: {
			id: "course-public",
			slug: "course-public",
			title: "Public Course",
			description: "Public course used for platform testing.",
			thumbnail: null,
			access: "PUBLIC",
			price: 0
		}
	});

	const membersCourse = await prisma.course.create({
		data: {
			id: "course-members",
			slug: "course-members",
			title: "Members Course",
			description: "Members course used for platform testing.",
			thumbnail: null,
			access: "MEMBERS",
			price: 0
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
	// Library
	// --------------------------------------------------

	console.log("📄 Creating library items...");

	await prisma.library.create({
		data: {
			slug: "public-page",
			title: "Public Page",
			description: "Public page used for testing.",
			type: ContentType.HTML,
			body: "<h1>Public Page</h1>",
			thumbnail: null,
			courseId: publicCourse.id
		}
	});

	await prisma.library.create({
		data: {
			slug: "members-page",
			title: "Members Page",
			description: "Members page used for testing.",
			type: ContentType.HTML,
			body: "<h1>Members Page</h1>",
			thumbnail: null,
			courseId: membersCourse.id
		}
	});

	// --------------------------------------------------
	// Subscription
	// --------------------------------------------------

	console.log("🎓 Creating subscription...");

	await prisma.subscription.create({
		data: {
			userId: user.id,
			courseId: membersCourse.id,
			startsAt: new Date(),
			endsAt: null
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
	// Super Admin
	// --------------------------------------------------

	console.log("🛡️ Creating super admin...");

	await prisma.user.create({
	data: {
		name: "Super Admin",
		email: "admin@example.com",
		password,
		role: "SUPER_ADMIN",
		resource: null
		}
	});

	// --------------------------------------------------
// Resource Admins
// --------------------------------------------------

await prisma.user.create({
	data: {
		name: "Library Admin",
		email: "library-admin@example.com",
		password,
		role: "ADMIN",
		resource: "library"
	}
});

await prisma.user.create({
	data: {
		name: "Communication Admin",
		email: "communication-admin@example.com",
		password,
		role: "ADMIN",
		resource: "communication"
	}
});

await prisma.user.create({
	data: {
		name: "Subscription Admin",
		email: "subscription-admin@example.com",
		password,
		role: "ADMIN",
		resource: "subscription"
	}
});
await prisma.user.create({
	data: {
		name: "Course Admin",
		email: "course-admin@example.com",
		password,
		role: "ADMIN",
		resource: "course"
	}
});
	// --------------------------------------------------
	// Summary
	// --------------------------------------------------

	console.log("");
	console.log("✅ Taleem Reference Database Ready");
	console.log("");

	console.log("User");
	console.log("  email    : test@example.com");
	console.log("  password : 12345678");
	console.log("");

	console.log("Courses");
	console.log("  course-public");
	console.log("  course-members");
	console.log("");

	console.log("Library");
	console.log("  public-page");
	console.log("  members-page");
	console.log("");

	console.log("Communications");
	console.log("  public answered");
	console.log("  private answered");
	console.log("  unanswered");

	console.log("Admins");
console.log("  admin@example.com");
console.log("  library-admin@example.com");
console.log("  communication-admin@example.com");
console.log("  subscription-admin@example.com");
console.log("  password : 12345678");
console.log("  course-admin@example.com");
console.log("");

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