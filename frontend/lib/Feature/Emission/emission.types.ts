import type { User } from "../Auth/auth.types";

export interface ESGRecords {
  id: string;
  reportingYear: string;
  scope1: number;
  scope2: number;
  scope3?: number;
  energyKwh?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  organization: Pick<Organization, "id" | "name" | "slug">;
};

export type CreateESGInput = Omit<ESGRecords, 'id' | 'createdAt' | 'updatedAt' | 'organization'>

export interface Organization {
    id: string;
    name: string;
    slug: string;
    industry?: string;
    country?: string;
    website?: string;
    description?: string;
    users: User[];
    records: ESGRecords[];
};

export interface ESGState {
    entries: ESGRecords[] | null;
    fetchReportLoading: boolean;
    fetchReportError: boolean;
    fetchReportSuccess: boolean;

    createReportLoading: boolean;
    createReportError: boolean;
    createReportSuccess: boolean;

    generateStrategiesLoading: boolean;
    generateStrategiesError: boolean;
    generateStrategiesSuccess: boolean;

    selectStrategyLoading: boolean;
    selectStrategyError: boolean;
    selectStrategySuccess: boolean;

    errorMessage?: string; // Helpful for UI feedback
}