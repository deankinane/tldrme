/*
  Warnings:

  - Added the required column `elementTextColor` to the `ResumeStyle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResumeStyle" ADD COLUMN     "elementTextColor" INTEGER NOT NULL;
