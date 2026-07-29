/*
  Warnings:

  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `resource` on the `Admin` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "AdminCoursePolicy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adminId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "library" BOOLEAN NOT NULL DEFAULT false,
    "communication" BOOLEAN NOT NULL DEFAULT false,
    "subscription" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AdminCoursePolicy_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AdminCoursePolicy_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Admin" ("createdAt", "email", "id", "isActive", "password", "updatedAt") SELECT "createdAt", "email", "id", "isActive", "password", "updatedAt" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AdminCoursePolicy_adminId_courseId_key" ON "AdminCoursePolicy"("adminId", "courseId");
