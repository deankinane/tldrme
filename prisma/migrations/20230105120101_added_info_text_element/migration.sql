-- AlterEnum
ALTER TYPE "ElementType" ADD VALUE 'InfoText';

-- AlterTable
ALTER TABLE "ResumeStyle" ADD COLUMN     "infoTextColor" INTEGER NOT NULL DEFAULT 1;
