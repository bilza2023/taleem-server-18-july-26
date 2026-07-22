/*
  Warnings:

  - You are about to drop the column `libraryId` on the `Communication` table. All the data in the column will be lost.
  - Added the required column `referenceId` to the `Communication` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Communication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "referenceId" INTEGER NOT NULL,
    "meta" TEXT,
    "message" TEXT NOT NULL,
    "authorResponse" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Communication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Communication" ("authorResponse", "createdAt", "id", "isPublic", "message", "meta", "updatedAt", "userId") SELECT "authorResponse", "createdAt", "id", "isPublic", "message", "meta", "updatedAt", "userId" FROM "Communication";
DROP TABLE "Communication";
ALTER TABLE "new_Communication" RENAME TO "Communication";
CREATE INDEX "Communication_userId_idx" ON "Communication"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
