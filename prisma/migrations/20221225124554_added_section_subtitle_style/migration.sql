-- AlterTable
ALTER TABLE "ResumeStyle" ADD COLUMN     "sectionSubtitleColor" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "headerTitleColor" SET DEFAULT 1,
ALTER COLUMN "headerSubtitleColor" SET DEFAULT 1,
ALTER COLUMN "sectionTitleColor" SET DEFAULT 1,
ALTER COLUMN "bulletColor" SET DEFAULT 1,
ALTER COLUMN "iconColor" SET DEFAULT 1,
ALTER COLUMN "elementTextColor" SET DEFAULT 1;
