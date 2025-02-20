-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Documents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "body" JSONB
);
INSERT INTO "new_Documents" ("body", "created_at", "id", "name", "updated_at") SELECT "body", "created_at", "id", "name", "updated_at" FROM "Documents";
DROP TABLE "Documents";
ALTER TABLE "new_Documents" RENAME TO "Documents";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
