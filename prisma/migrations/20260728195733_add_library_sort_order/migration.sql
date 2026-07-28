-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Library" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "type" TEXT NOT NULL,
    "body" TEXT,
    "courseId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "allowCommunication" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Library_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Library" ("allowCommunication", "body", "courseId", "createdAt", "description", "id", "slug", "status", "thumbnail", "title", "type", "updatedAt") SELECT "allowCommunication", "body", "courseId", "createdAt", "description", "id", "slug", "status", "thumbnail", "title", "type", "updatedAt" FROM "Library";
DROP TABLE "Library";
ALTER TABLE "new_Library" RENAME TO "Library";
CREATE UNIQUE INDEX "Library_slug_key" ON "Library"("slug");
CREATE INDEX "Library_slug_idx" ON "Library"("slug");
CREATE INDEX "Library_courseId_idx" ON "Library"("courseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
