-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipesOnLists" (
    "listId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "RecipesOnLists_pkey" PRIMARY KEY ("listId","recipeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "List_name_key" ON "List"("name");

-- AddForeignKey
ALTER TABLE "RecipesOnLists" ADD CONSTRAINT "RecipesOnLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipesOnLists" ADD CONSTRAINT "RecipesOnLists_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
