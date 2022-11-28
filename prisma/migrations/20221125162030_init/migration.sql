-- CreateEnum
CREATE TYPE "ElementType" AS ENUM ('IconText', 'SubTitle');

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "headerTitle" TEXT NOT NULL,
    "headerSubtitle" TEXT NOT NULL,
    "profilePicUrl" TEXT,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "columnIndex" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "type" "ElementType" NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementIconText" (
    "id" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "ElementIconText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementSubTitle" (
    "id" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "ElementSubTitle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ElementIconText_elementId_key" ON "ElementIconText"("elementId");

-- CreateIndex
CREATE UNIQUE INDEX "ElementSubTitle_elementId_key" ON "ElementSubTitle"("elementId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementIconText" ADD CONSTRAINT "ElementIconText_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementSubTitle" ADD CONSTRAINT "ElementSubTitle_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
