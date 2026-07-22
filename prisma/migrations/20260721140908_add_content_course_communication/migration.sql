/*
  Warnings:

  - You are about to drop the column `contentId` on the `Communication` table. All the data in the column will be lost.
  - You are about to drop the column `contentType` on the `Communication` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "price" REAL,
    "durationDays" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contentId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "body" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "thumbnail" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'public',
    "comments" BOOLEAN NOT NULL DEFAULT true,
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "courseDbId" INTEGER,
    CONSTRAINT "Content_courseDbId_fkey" FOREIGN KEY ("courseDbId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Communication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "contentDbId" INTEGER,
    "category" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "response" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answeredAt" DATETIME,
    "answeredBy" INTEGER,
    CONSTRAINT "Communication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Communication_contentDbId_fkey" FOREIGN KEY ("contentDbId") REFERENCES "Content" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Communication" ("answeredAt", "answeredBy", "category", "createdAt", "id", "message", "response", "userId", "visibility") SELECT "answeredAt", "answeredBy", "category", "createdAt", "id", "message", "response", "userId", "visibility" FROM "Communication";
DROP TABLE "Communication";
ALTER TABLE "new_Communication" RENAME TO "Communication";
CREATE INDEX "Communication_userId_idx" ON "Communication"("userId");
CREATE INDEX "Communication_contentDbId_idx" ON "Communication"("contentDbId");
CREATE INDEX "Communication_visibility_idx" ON "Communication"("visibility");
CREATE INDEX "Communication_category_idx" ON "Communication"("category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseId_key" ON "Course"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_contentId_key" ON "Content"("contentId");

-- CreateIndex
CREATE INDEX "Content_type_idx" ON "Content"("type");

-- CreateIndex
CREATE INDEX "Content_visibility_idx" ON "Content"("visibility");

-- CreateIndex
CREATE INDEX "Content_courseDbId_idx" ON "Content"("courseDbId");
