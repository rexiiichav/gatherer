/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Measure` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_name_key" ON "Measure"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_name_key" ON "Recipe"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
