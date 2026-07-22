
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const courses = [
  {
    id: "fbise9math-quick-reference",
    slug: "fbise9math-quick-reference",
    title: "FBISE Class 9 Mathematics Quick Reference",
    description: "Printable quick reference sheets for every chapter.",
    thumbnail: null,
    access: "PUBLIC",
    price: 0,
  },
  {
    id: "why-quran-is-a-miracle",
    slug: "why-quran-is-a-miracle",
    title: "Why the Quran is a Miracle",
    description: "Articles discussing the miraculous nature of the Quran.",
    thumbnail: null,
    access: "PUBLIC",
    price: 0,
  },
  {
    id: "introduction-to-cosmology",
    slug: "introduction-to-cosmology",
    title: "Introduction to Cosmology",
    description: "A beginner-friendly introduction to cosmology.",
    thumbnail: null,
    access: "PUBLIC",
    price: 0,
  },
  {
    id: "blog",
    slug: "blog",
    title: "Taleem Blog",
    description: "General articles and announcements.",
    thumbnail: null,
    access: "PUBLIC",
    price: 0,
  },
  {
    id: "fbise9math",
    slug: "fbise9math",
    title: "FBISE Class 9 Mathematics",
    description: "Complete Class 9 Mathematics course.",
    thumbnail: null,
    access: "MEMBERS",
    price: 0,
  },
  {
    id: "fbise10math",
    slug: "fbise10math",
    title: "FBISE Class 10 Mathematics",
    description: "Complete Class 10 Mathematics course.",
    thumbnail: null,
    access: "MEMBERS",
    price: 0,
  },
];

async function main() {
  for (const course of courses) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: course,
      create: course,
    });
  }

  console.log(`✅ Seeded ${courses.length} courses.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });