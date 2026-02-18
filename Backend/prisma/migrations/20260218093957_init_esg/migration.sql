-- CreateEnum
CREATE TYPE "StrategyVariant" AS ENUM ('short', 'neutral', 'detailed');

-- CreateTable
CREATE TABLE "ESGReport" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "reportingYear" INTEGER NOT NULL,
    "scope1Tco2e" DOUBLE PRECISION NOT NULL,
    "scope2Tco2e" DOUBLE PRECISION NOT NULL,
    "scope3Tco2e" DOUBLE PRECISION,
    "energyConsumptionKwh" DOUBLE PRECISION,
    "notes" TEXT,
    "strategyShort" TEXT,
    "strategyNeutral" TEXT,
    "strategyDetailed" TEXT,
    "selectedVariant" "StrategyVariant",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ESGReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ESGReport_companyName_reportingYear_idx" ON "ESGReport"("companyName", "reportingYear");
