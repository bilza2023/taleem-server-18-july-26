/*
  Warnings:

  - You are about to drop the column `answeredAt` on the `Communication` table. All the data in the column will be lost.
  - You are about to drop the column `answeredBy` on the `Communication` table. All the data in the column will be lost.
  - You are about to drop the column `contentDbId` on the `Communication` table. All the data in the column will be lost.
  - You are about to drop the column `response` on the `Communication` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `Communication` table. All the data in the column will be lost.
  - The primary key for the `Content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `body` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `contentId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `courseDbId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `format` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Content` table. All the data in the column will be lost.
  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `durationDays` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Course` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - Added the required column `contentId` to the `Communication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `Communication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Communication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "courseId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscription_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Communication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "authorResponse" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Communication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Communication" ("category", "createdAt", "id", "message", "userId") SELECT "category", "createdAt", "id", "message", "userId" FROM "Communication";
DROP TABLE "Communication";
ALTER TABLE "new_Communication" RENAME TO "Communication";
CREATE TABLE "new_Content" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "visibility" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    CONSTRAINT "Content_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Content" ("id", "visibility") SELECT "id", "visibility" FROM "Content";
DROP TABLE "Content";
ALTER TABLE "new_Content" RENAME TO "Content";
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Course" ("description", "id", "price", "title") SELECT "description", "id", coalesce("price", 0) AS "price", "title" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_courseId_key" ON "Subscription"("userId", "courseId");
