/*
  Warnings:

  - Changed the type of `headerTitleColor` on the `ResumeStyle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `headerSubtitleColor` on the `ResumeStyle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sectionTitleColor` on the `ResumeStyle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bulletColor` on the `ResumeStyle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `iconColor` on the `ResumeStyle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ResumeStyle" DROP COLUMN "headerTitleColor",
ADD COLUMN     "headerTitleColor" INTEGER NOT NULL,
DROP COLUMN "headerSubtitleColor",
ADD COLUMN     "headerSubtitleColor" INTEGER NOT NULL,
DROP COLUMN "sectionTitleColor",
ADD COLUMN     "sectionTitleColor" INTEGER NOT NULL,
DROP COLUMN "bulletColor",
ADD COLUMN     "bulletColor" INTEGER NOT NULL,
DROP COLUMN "iconColor",
ADD COLUMN     "iconColor" INTEGER NOT NULL;
