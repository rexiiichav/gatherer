/*
  Warnings:

  - Added the required column `conversion` to the `Measure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Measure" ADD COLUMN     "aggregateByVolume" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "aggregateByWeight" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "conversion" DECIMAL(20,10) NOT NULL;
