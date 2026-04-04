/*
  Warnings:

  - You are about to drop the `ESGReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ESGReport" DROP CONSTRAINT "ESGReport_organizationId_fkey";

-- DropTable
DROP TABLE "ESGReport";

-- CreateTable
CREATE TABLE "ESGRecord" (
    "id" TEXT NOT NULL,
    "reportingYear" INTEGER NOT NULL,
    "scope1" DOUBLE PRECISION NOT NULL,
    "scope2" DOUBLE PRECISION NOT NULL,
    "scope3" DOUBLE PRECISION,
    "energyKwh" DOUBLE PRECISION,
    "notes" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ESGRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strategy" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "recordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ESGRecord_organizationId_reportingYear_key" ON "ESGRecord"("organizationId", "reportingYear");

-- AddForeignKey
ALTER TABLE "ESGRecord" ADD CONSTRAINT "ESGRecord_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "ESGRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
