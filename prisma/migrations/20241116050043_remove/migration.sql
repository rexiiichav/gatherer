/*
  Warnings:

  - You are about to drop the column `listId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_listId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "listId";

-- DropTable
DROP TABLE "List";
