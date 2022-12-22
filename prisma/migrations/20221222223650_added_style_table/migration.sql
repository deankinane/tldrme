/*
  Warnings:

  - You are about to drop the column `iconColor` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `headerColor` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `titleColor` on the `Section` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resumeStyleId]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resumeStyleId` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Element" DROP COLUMN "iconColor",
DROP COLUMN "textColor";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "headerColor",
ADD COLUMN     "resumeStyleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "titleColor";

-- CreateTable
CREATE TABLE "ResumeStyle" (
    "id" TEXT NOT NULL,
    "headerTitleColor" TEXT NOT NULL,
    "headerSubtitleColor" TEXT NOT NULL,
    "sectionTitleColor" TEXT NOT NULL,
    "bulletColor" TEXT NOT NULL,
    "iconColor" TEXT NOT NULL,

    CONSTRAINT "ResumeStyle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_resumeStyleId_key" ON "Resume"("resumeStyleId");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_resumeStyleId_fkey" FOREIGN KEY ("resumeStyleId") REFERENCES "ResumeStyle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
