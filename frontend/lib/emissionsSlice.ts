import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "./axios";

export type EmissionEntry = {
  id: string;
  company_name: string;
  reporting_year: number;
  scope1_tco2e: number;
  scope2_tco2e: number;
  scope3_tco2e?: number;
  energy_consumption_kwh?: number;
  notes?: string;
  createdAt: string;
  strategyShort?: string | null;
  strategyNeutral?: string | null;
  strategyDetailed?: string | null;
  selectedVariant?: "short" | "neutral" | "detailed" | null;
};

export type EmissionsState = {
  entries: EmissionEntry[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchError?: string | null;
  saveStatus: "idle" | "loading" | "succeeded" | "failed";
  saveError?: string | null;
  fetchOneStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchOneError?: string | null;
  generateStatus: "idle" | "loading" | "succeeded" | "failed";
  generateError?: string | null;
  selectStatus: "idle" | "loading" | "succeeded" | "failed";
  selectError?: string | null;
};

type ApiReport = {
  id?: string;
  company_name?: string;
  companyName?: string;
  company?: string;
  reporting_year?: number;
  reportingYear?: number;
  year?: number;
  scope1_tco2e?: number;
  scope1Tco2e?: number;
  scope1?: number;
  scope2_tco2e?: number;
  scope2Tco2e?: number;
  scope2?: number;
  scope3_tco2e?: number;
  scope3Tco2e?: number;
  scope3?: number;
  energy_consumption_kwh?: number;
  energyConsumptionKwh?: number;
  energy?: number;
  notes?: string | null;
  createdAt?: string;
  strategyShort?: string | null;
  strategyNeutral?: string | null;
  strategyDetailed?: string | null;
  selectedVariant?: "short" | "neutral" | "detailed" | null;
};

const normalizeReport = (item: ApiReport, fallbackIndex = 0): EmissionEntry => {
  const company =
    item?.company_name ??
    item?.companyName ??
    item?.company ??
    "Unknown company";
  const reportingYear =
    item?.reporting_year ?? item?.reportingYear ?? item?.year ?? 0;

  const id =
    item?.id ??
    `${company?.toString().toLowerCase().replace(/\\s+/g, "-") ?? "report"}-${reportingYear ?? fallbackIndex}`;

  return {
    id,
    company_name: company,
    reporting_year: Number(reportingYear),
    scope1_tco2e: Number(
      item?.scope1_tco2e ?? item?.scope1Tco2e ?? item?.scope1 ?? 0
    ),
    scope2_tco2e: Number(
      item?.scope2_tco2e ?? item?.scope2Tco2e ?? item?.scope2 ?? 0
    ),
    scope3_tco2e:
      item?.scope3_tco2e === undefined && item?.scope3Tco2e === undefined
        ? undefined
        : Number(item?.scope3_tco2e ?? item?.scope3Tco2e ?? item?.scope3 ?? 0),
    energy_consumption_kwh:
      item?.energy_consumption_kwh === undefined &&
      item?.energyConsumptionKwh === undefined
        ? undefined
        : Number(
            item?.energy_consumption_kwh ??
              item?.energyConsumptionKwh ??
              item?.energy ??
              0
          ),
    notes: item?.notes ?? undefined,
    createdAt: item?.createdAt ?? new Date().toISOString(),
    strategyShort: item?.strategyShort ?? null,
    strategyNeutral: item?.strategyNeutral ?? null,
    strategyDetailed: item?.strategyDetailed ?? null,
    selectedVariant:
      item?.selectedVariant === null || item?.selectedVariant === undefined
        ? null
        : item?.selectedVariant,
  };
};

export const fetchReports = createAsyncThunk<
  EmissionEntry[],
  void,
  { rejectValue: string }
>("emissions/fetchReports", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/esg-reports");
    if (!Array.isArray(data)) throw new Error("Unexpected API shape; expected an array");
    return data.map((item: ApiReport, idx: number) =>
      normalizeReport(item, idx)
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const createReport = createAsyncThunk<
  EmissionEntry,
  Omit<EmissionEntry, "id" | "createdAt">,
  { rejectValue: string }
>("emissions/createReport", async (payload, thunkAPI) => {
  try {
    const { data: created } = await api.post("/esg-reports", {
      company_name: payload.company_name,
      reporting_year: payload.reporting_year,
      scope1_tco2e: payload.scope1_tco2e,
      scope2_tco2e: payload.scope2_tco2e,
      scope3_tco2e: payload.scope3_tco2e,
      energy_consumption_kwh: payload.energy_consumption_kwh,
      notes: payload.notes,
    });
    return normalizeReport(created);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchReportById = createAsyncThunk<
  EmissionEntry,
  string,
  { rejectValue: string }
>("emissions/fetchReportById", async (id, thunkAPI) => {
  try {
    const { data } = await api.get(`/esg-reports/${id}`);
    return normalizeReport(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const generateStrategies = createAsyncThunk<
  EmissionEntry,
  string,
  { rejectValue: string }
>("emissions/generateStrategies", async (id, thunkAPI) => {
  try {
    const { data } = await api.post(`/esg-reports/${id}/strategies`);
    return normalizeReport(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const selectStrategy = createAsyncThunk<
  EmissionEntry,
  { id: string; variant: "short" | "neutral" | "detailed" },
  { rejectValue: string }
>("emissions/selectStrategy", async ({ id, variant }, thunkAPI) => {
  try {
    const { data } = await api.put(`/esg-reports/${id}/selection`, {
      variant,
    });
    return normalizeReport(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState: EmissionsState = {
  entries: [],
  fetchStatus: "idle",
  fetchError: null,
  saveStatus: "idle",
  saveError: null,
  fetchOneStatus: "idle",
  fetchOneError: null,
  generateStatus: "idle",
  generateError: null,
  selectStatus: "idle",
  selectError: null,
};

const emissionsSlice = createSlice({
  name: "emissions",
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<EmissionEntry>) => {
      state.entries.unshift(action.payload);
    },
    setEntries: (state, action: PayloadAction<EmissionEntry[]>) => {
      state.entries = action.payload;
    },
    clearEntries: (state) => {
      state.entries = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.entries = action.payload ?? [];
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Failed to load reports";
      })
      .addCase(createReport.pending, (state) => {
        state.saveStatus = "loading";
        state.saveError = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.saveStatus = "succeeded";
        state.entries.unshift(action.payload);
      })
      .addCase(createReport.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.saveError =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Failed to create report";
      })
      .addCase(fetchReportById.pending, (state) => {
        state.fetchOneStatus = "loading";
        state.fetchOneError = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.fetchOneStatus = "succeeded";
        const existingIndex = state.entries.findIndex(
          (e) => e.id === action.payload.id
        );
        if (existingIndex >= 0) {
          state.entries[existingIndex] = action.payload;
        } else {
          state.entries.unshift(action.payload);
        }
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.fetchOneStatus = "failed";
        state.fetchOneError =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Failed to load report";
      })
      .addCase(generateStrategies.pending, (state) => {
        state.generateStatus = "loading";
        state.generateError = null;
      })
      .addCase(generateStrategies.fulfilled, (state, action) => {
        state.generateStatus = "succeeded";
        const idx = state.entries.findIndex((e) => e.id === action.payload.id);
        if (idx >= 0) {
          state.entries[idx] = action.payload;
        } else {
          state.entries.unshift(action.payload);
        }
      })
      .addCase(generateStrategies.rejected, (state, action) => {
        state.generateStatus = "failed";
        state.generateError =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Failed to generate strategies";
      })
      .addCase(selectStrategy.pending, (state) => {
        state.selectStatus = "loading";
        state.selectError = null;
      })
      .addCase(selectStrategy.fulfilled, (state, action) => {
        state.selectStatus = "succeeded";
        const idx = state.entries.findIndex((e) => e.id === action.payload.id);
        if (idx >= 0) {
          state.entries[idx] = action.payload;
        } else {
          state.entries.unshift(action.payload);
        }
      })
      .addCase(selectStrategy.rejected, (state, action) => {
        state.selectStatus = "failed";
        state.selectError =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Failed to save selection";
      });
  },
});

export const { addEntry, setEntries, clearEntries } = emissionsSlice.actions;
export default emissionsSlice.reducer;
