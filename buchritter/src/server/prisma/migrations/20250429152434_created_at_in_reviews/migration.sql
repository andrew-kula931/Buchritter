-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "image_path" TEXT,
    "review" TEXT NOT NULL,
    "link" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Reviews" ("id", "image_path", "link", "rating", "review", "summary", "title") SELECT "id", "image_path", "link", "rating", "review", "summary", "title" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
