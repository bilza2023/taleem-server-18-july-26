
import bcrypt from "bcrypt";
import { PrismaClient, ContentType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Clearing test data...");

  // Keep Course table intact (seeded separately)
  await prisma.communication.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.library.deleteMany();
  await prisma.user.deleteMany();

  console.log("📚 Loading courses...");

  const quickRefCourse = await prisma.course.findUnique({
    where: { id: "fbise9math-quick-reference" },
  });

  const quranCourse = await prisma.course.findUnique({
    where: { id: "why-quran-is-a-miracle" },
  });

  const cosmologyCourse = await prisma.course.findUnique({
    where: { id: "introduction-to-cosmology" },
  });

  const blogCourse = await prisma.course.findUnique({
    where: { id: "blog" },
  });

  const math9Course = await prisma.course.findUnique({
    where: { id: "fbise9math" },
  });

  const math10Course = await prisma.course.findUnique({
    where: { id: "fbise10math" },
  });

  if (
    !quickRefCourse ||
    !quranCourse ||
    !cosmologyCourse ||
    !blogCourse ||
    !math9Course ||
    !math10Course
  ) {
    throw new Error(
      "Courses not found. Please run scripts/seed-course-db.js first."
    );
  }

  console.log("👤 Creating test user...");

  const password = await bcrypt.hash("12345678", 10);

  const user = await prisma.user.create({
    data: {
      email: "alice@example.com",
      password,
      name: "Alice",
    },
  });

  console.log("📄 Creating library items...");

  const quickRef = await prisma.library.create({
    data: {
      slug: "9math-ch1-quickref-real-numbers",
      title: "Class 9 Mathematics - Chapter 1 Quick Reference",
      description: "Quick reference sheet",
      thumbnail: "/content/images/9math-ch1-quickref-real-numbers.png",
      type: ContentType.HTML,
      body: "<h1>Quick Reference</h1>",
      courseId: quickRefCourse.id,
    },
  });

  await prisma.library.create({
    data: {
      slug: "why-quran-is-a-miracle-001",
      title: "Why the Quran is a Miracle",
      description: "Article",
      thumbnail: "/content/images/quran-is-a-miracle.png",
      type: ContentType.HTML,
      body: "<h1>Why the Quran is a Miracle</h1>",
      courseId: quranCourse.id,
    },
  });

  await prisma.library.create({
    data: {
      slug: "introduction-to-cosmology-001",
      title: "Introduction to Cosmology",
      description: "Article",
      thumbnail: "/content/images/introduction-to-cosmology.png",
      type: ContentType.HTML,
      body: "<h1>Introduction to Cosmology</h1>",
      courseId: cosmologyCourse.id,
    },
  });

  await prisma.library.create({
    data: {
      slug: "welcome-to-blog",
      title: "Welcome to the Taleem Blog",
      description: "Blog post",
      thumbnail: null,
      type: ContentType.HTML,
      body: "<h1>Welcome</h1>",
      courseId: blogCourse.id,
    },
  });

  await prisma.library.create({
    data: {
      slug: "9math-ch1-lesson-001",
      title: "Chapter 1 Lesson",
      description: "Members lesson",
      thumbnail: null,
      type: ContentType.HTML,
      body: "<h1>Lesson 1</h1>",
      courseId: math9Course.id,
    },
  });

  await prisma.library.create({
    data: {
      slug: "10math-ch1-lesson-001",
      title: "Chapter 1 Lesson",
      description: "Members lesson",
      thumbnail: null,
      type: ContentType.HTML,
      body: "<h1>Lesson 1</h1>",
      courseId: math10Course.id,
    },
  });

  console.log("🎓 Creating subscription...");

  await prisma.subscription.create({
    data: {
      userId: user.id,
      courseId: math9Course.id,
      startsAt: new Date(),
      endsAt: null,
    },
  });

  console.log("💬 Creating sample communication...");

  await prisma.communication.create({
    data: {
      userId: user.id,
      referenceId: "welcome-to-blog",
      type: "query",
      message: "This quick reference is very helpful!",
      authorResponse: "Thank you for your feedback.",
      isPublic: true,
      meta: null,
    },
  });

  console.log("✅ Test database ready.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });