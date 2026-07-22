/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `category` on the `Communication` table. All the data in the column will be lost.
  - You are about to drop the column `contentId` on the `Communication` table. All the data in the column will be lost.
  - You are about to drop the column `contentType` on the `Communication` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `libraryId` to the `Communication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Content";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Library" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "type" TEXT NOT NULL,
    "body" TEXT,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Library_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Communication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "meta" TEXT,
    "message" TEXT NOT NULL,
    "authorResponse" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Communication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Communication_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Communication" ("authorResponse", "createdAt", "id", "isPublic", "message", "updatedAt", "userId") SELECT "authorResponse", "createdAt", "id", "isPublic", "message", "updatedAt", "userId" FROM "Communication";
DROP TABLE "Communication";
ALTER TABLE "new_Communication" RENAME TO "Communication";
CREATE INDEX "Communication_userId_idx" ON "Communication"("userId");
CREATE INDEX "Communication_libraryId_idx" ON "Communication"("libraryId");
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "access" TEXT NOT NULL DEFAULT 'PUBLIC',
    "price" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Course" ("description", "id", "price", "title") SELECT "description", "id", "price", "title" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
CREATE TABLE "new_Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "courseId" TEXT NOT NULL,
    "startsAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" DATETIME,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscription_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subscription" ("courseId", "id", "userId") SELECT "courseId", "id", "userId" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");
CREATE INDEX "Subscription_courseId_idx" ON "Subscription"("courseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Library_slug_key" ON "Library"("slug");

-- CreateIndex
CREATE INDEX "Library_slug_idx" ON "Library"("slug");

-- CreateIndex
CREATE INDEX "Library_courseId_idx" ON "Library"("courseId");
