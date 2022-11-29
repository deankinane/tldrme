/*
  Warnings:

  - You are about to drop the `ElementIconText` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ElementSubTitle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `icon` to the `Element` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ElementIconText" DROP CONSTRAINT "ElementIconText_elementId_fkey";

-- DropForeignKey
ALTER TABLE "ElementSubTitle" DROP CONSTRAINT "ElementSubTitle_elementId_fkey";

-- AlterTable
ALTER TABLE "Element" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- DropTable
DROP TABLE "ElementIconText";

-- DropTable
DROP TABLE "ElementSubTitle";
