-- CreateTable
CREATE TABLE "Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "image_path" TEXT,
    "review" TEXT NOT NULL,
    "link" TEXT
);

-- CreateTable
CREATE TABLE "Configurations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ConfigurationsToReviews" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ConfigurationsToReviews_A_fkey" FOREIGN KEY ("A") REFERENCES "Configurations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ConfigurationsToReviews_B_fkey" FOREIGN KEY ("B") REFERENCES "Reviews" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Configurations_key_value_key" ON "Configurations"("key", "value");

-- CreateIndex
CREATE UNIQUE INDEX "_ConfigurationsToReviews_AB_unique" ON "_ConfigurationsToReviews"("A", "B");

-- CreateIndex
CREATE INDEX "_ConfigurationsToReviews_B_index" ON "_ConfigurationsToReviews"("B");
