"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createReport } from "@/lib/emissionsSlice";

type FormState = {
  company_name: string;
  reporting_year: string;
  scope1_tco2e: string;
  scope2_tco2e: string;
  scope3_tco2e: string;
  energy_consumption_kwh: string;
  notes: string;
};

const initialForm: FormState = {
  company_name: "",
  reporting_year: new Date().getFullYear().toString(),
  scope1_tco2e: "",
  scope2_tco2e: "",
  scope3_tco2e: "",
  energy_consumption_kwh: "",
  notes: "",
};

export function EmissionsForm() {
  const dispatch = useAppDispatch();
  const saveStatus = useAppSelector((state) => state.emissions.saveStatus);
  const saveError = useAppSelector((state) => state.emissions.saveError);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.company_name.trim()) {
      setError("Company name is required.");
      return;
    }

    const year = Number(form.reporting_year);
    const scope1 = Number(form.scope1_tco2e);
    const scope2 = Number(form.scope2_tco2e);

    if (!year || Number.isNaN(year)) {
      setError("Reporting year must be a number.");
      return;
    }

    if (Number.isNaN(scope1) || Number.isNaN(scope2)) {
      setError("Scope 1 and Scope 2 values must be numbers.");
      return;
    }

    if (scope1 < 0 || scope2 < 0) {
      setError("Scope 1 and Scope 2 must be zero or positive.");
      return;
    }

    const scope3 = form.scope3_tco2e ? Number(form.scope3_tco2e) : undefined;
    const energy = form.energy_consumption_kwh
      ? Number(form.energy_consumption_kwh)
      : undefined;

    if (scope3 !== undefined && scope3 < 0) {
      setError("Scope 3 must be zero or positive.");
      return;
    }

    if (energy !== undefined && energy < 0) {
      setError("Energy consumption must be zero or positive.");
      return;
    }

    try {
      await dispatch(
        createReport({
          company_name: form.company_name.trim(),
          reporting_year: year,
          scope1_tco2e: scope1,
          scope2_tco2e: scope2,
          scope3_tco2e: scope3,
          energy_consumption_kwh: energy,
          notes: form.notes.trim() || undefined,
        })
      ).unwrap();

      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save entry."
      );
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-5 space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Add new entry</h3>
        <p className="text-sm text-slate-600">
          All required fields must be filled before saving.
        </p>
      </div>

      {(error || saveError) && (
        <div className="rounded-md bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
          {error ?? saveError}
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label
            className="text-sm font-medium text-slate-800"
            htmlFor="company_name"
          >
            Company name*
          </label>
          <input
            id="company_name"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Acme Corp"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="reporting_year"
            >
              Reporting year*
            </label>
            <input
              id="reporting_year"
              name="reporting_year"
              type="number"
              value={form.reporting_year}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              min={1900}
              max={9999}
              required
            />
          </div>
          <div className="space-y-1">
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="scope1_tco2e"
            >
              Scope 1 (tCO2e)*
            </label>
            <input
              id="scope1_tco2e"
              name="scope1_tco2e"
                    type="number"
                    step="0.01"
                    min={0}
                    value={form.scope1_tco2e}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    required
                  />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="scope2_tco2e"
            >
              Scope 2 (tCO2e)*
            </label>
            <input
              id="scope2_tco2e"
              name="scope2_tco2e"
                    type="number"
                    step="0.01"
                    min={0}
                    value={form.scope2_tco2e}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    required
                  />
          </div>
          <div className="space-y-1">
            <label
              className="text-sm font-medium text-slate-800"
              htmlFor="scope3_tco2e"
            >
              Scope 3 (tCO2e)
            </label>
            <input
              id="scope3_tco2e"
              name="scope3_tco2e"
                    type="number"
                    step="0.01"
                    min={0}
                    value={form.scope3_tco2e}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
          </div>
        </div>

        <div className="space-y-1">
          <label
            className="text-sm font-medium text-slate-800"
            htmlFor="energy_consumption_kwh"
          >
            Energy consumption (kWh)
          </label>
          <input
            id="energy_consumption_kwh"
            name="energy_consumption_kwh"
                    type="number"
                    step="0.01"
                    min={0}
                    value={form.energy_consumption_kwh}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-800" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Optional context or assumptions"
          />
        </div>

        <Button
          type="submit"
          disabled={saveStatus === "loading"}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60"
        >
          {saveStatus === "loading" ? "Saving..." : "Save entry"}
        </Button>
      </form>
    </div>
  );
}
