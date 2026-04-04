/*
  Warnings:

  - Added the required column `organizationId` to the `ESGReport` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('Technology', 'Finance', 'Healthcare', 'Energy', 'ConsumerGoods', 'Utilities', 'Transportation', 'Agriculture', 'RealEstate', 'Other');

-- CreateEnum
CREATE TYPE "ReportingFramework" AS ENUM ('GRI', 'TCFD', 'CSRD', 'CDP', 'CUSTOM');

-- AlterTable
ALTER TABLE "ESGReport" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "industry" "Industry" NOT NULL DEFAULT 'Other',
    "country" TEXT,
    "website" TEXT,
    "description" TEXT,
    "reportingFramework" "ReportingFramework" NOT NULL DEFAULT 'GRI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Organization_name_idx" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ESGReport" ADD CONSTRAINT "ESGReport_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


UPDATE "ESGReport"
SET "organizationId" = 'org-default'
WHERE "organizationId" IS NULL;

ALTER TABLE "ESGReport"
  ALTER COLUMN "organizationId" SET NOT NULL;