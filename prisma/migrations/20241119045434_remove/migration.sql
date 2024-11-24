/*
  Warnings:

  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipesOnLists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecipesOnLists" DROP CONSTRAINT "RecipesOnLists_listId_fkey";

-- DropForeignKey
ALTER TABLE "RecipesOnLists" DROP CONSTRAINT "RecipesOnLists_recipeId_fkey";

-- DropTable
DROP TABLE "List";

-- DropTable
DROP TABLE "RecipesOnLists";
