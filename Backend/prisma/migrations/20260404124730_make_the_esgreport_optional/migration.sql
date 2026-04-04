-- DropForeignKey
ALTER TABLE "ESGReport" DROP CONSTRAINT "ESGReport_organizationId_fkey";

-- AlterTable
ALTER TABLE "ESGReport" ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ESGReport" ADD CONSTRAINT "ESGReport_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
