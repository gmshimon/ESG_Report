"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { Button } from "@/components/ui/button";
import { DownloadReportButton } from "@/components/download-report-button";

export default function RecordPage() {
  const params = useParams();
  const idRaw = params?.id;
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;

  const dispatch = useAppDispatch();
  const entry = useAppSelector((state) =>
    id ? state.emissions.entries.find((e) => e.id === id) : undefined
  );
  const fetchOneStatus = useAppSelector(
    (state) => state.emissions.fetchOneStatus
  );
  const fetchOneError = useAppSelector(
    (state) => state.emissions.fetchOneError
  );
  const generateStatus = useAppSelector(
    (state) => state.emissions.generateStatus
  );
  const generateError = useAppSelector(
    (state) => state.emissions.generateError
  );
  const selectStatus = useAppSelector((state) => state.emissions.selectStatus);
  const selectError = useAppSelector((state) => state.emissions.selectError);

  const [localError, setLocalError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (id && !entry && fetchOneStatus !== "loading") {
  //     void dispatch(fetchReportById(id));
  //   }
  // }, [dispatch, id, entry, fetchOneStatus]);

  const series = useMemo(() => {
    if (!entry) return [];
    return [
      { label: "Scope 1", value: entry.scope1_tco2e, color: "bg-emerald-500" },
      { label: "Scope 2", value: entry.scope2_tco2e, color: "bg-sky-500" },
      {
        label: "Scope 3",
        value: entry.scope3_tco2e ?? 0,
        color: "bg-amber-500",
        optional: entry.scope3_tco2e === undefined,
      },
    ];
  }, [entry]);

  const maxValue =
    series.length > 0 ? Math.max(...series.map((s) => s.value || 0), 1) : 1;

  const handleGenerate = async () => {
    if (!id) return;
    setLocalError(null);
    try {
      await dispatch(generateStrategies(id)).unwrap();
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Failed to generate strategies."
      );
    }
  };

  const handleSelect = async (variant: "short" | "neutral" | "detailed") => {
    if (!id) return;
    setLocalError(null);
    try {
      await dispatch(selectStrategy({ id, variant })).unwrap();
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Failed to save selection."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-900 p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <Link
            href="/"
            className="text-sm text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
          >
            ← Back to dashboard
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Emissions snapshot</h1>
              {entry && (
                <p className="text-slate-600">
                  Showing scopes for{" "}
                  <span className="font-semibold">{entry.company_name}</span> in{" "}
                  {entry.reporting_year}.
                </p>
              )}
            </div>
            {entry && <DownloadReportButton entry={entry} />}
          </div>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
          {!id && (
            <div className="text-red-600">
              Missing record id in the URL. Please navigate from the dashboard.
            </div>
          )}

          {fetchOneStatus === "loading" && (
            <div className="text-slate-600">Loading report…</div>
          )}
          {fetchOneStatus === "failed" && (
            <div className="text-red-600">
              {fetchOneError ?? "Failed to load report."}
            </div>
          )}
          {entry && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 font-semibold">
                    Scope totals (tCO2e)
                  </p>
                  <h2 className="text-2xl font-semibold">
                    {entry.company_name} · {entry.reporting_year}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {series.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-800">
                        {item.label}
                      </span>
                      {item.optional && (
                        <span className="text-xs text-slate-500">
                          (optional, not provided)
                        </span>
                      )}
                      <span className="ml-auto text-sm font-semibold text-slate-900">
                        {item.value.toLocaleString()} tCO₂e
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`${item.color} h-full transition-all duration-500`}
                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                        aria-label={`${item.label} bar`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">
                    Energy consumption
                  </p>
                  <p>
                    {entry.energy_consumption_kwh
                      ? `${entry.energy_consumption_kwh.toLocaleString()} kWh`
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Notes</p>
                  <p>{entry.notes ?? "—"}</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 font-semibold">
                      Strategies
                    </p>
                    <p className="text-sm text-slate-600">
                      Generate three variants, then pick one to keep.
                    </p>
                  </div>
                  <Button
                    onClick={handleGenerate}
                    disabled={generateStatus === "loading"}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {generateStatus === "loading"
                      ? "Generating…"
                      : "Generate strategies"}
                  </Button>
                </div>

                {(localError || generateError || selectError) && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {localError ?? generateError ?? selectError}
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-3">
                  {["short", "neutral", "detailed"].map((variant) => {
                    const copy =
                      variant === "short"
                        ? entry.strategyShort
                        : variant === "neutral"
                          ? entry.strategyNeutral
                          : entry.strategyDetailed;
                    const title =
                      variant === "short"
                        ? "Short"
                        : variant === "neutral"
                          ? "Neutral"
                          : "Detailed";
                    const isSelected = entry.selectedVariant === variant;
                    const isMissing = !copy;
                    return (
                      <div
                        key={variant}
                        className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/80 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">
                            {title}
                          </p>
                          {isSelected && (
                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="flex-1 rounded-md bg-white border border-slate-200 px-2.5 py-2 text-xs text-slate-700 whitespace-pre-wrap min-h-24">
                          {isMissing
                            ? "Generate to view this variant."
                            : copy}
                        </div>
                        <Button
                          variant={isSelected ? "secondary" : "outline"}
                          size="sm"
                          disabled={
                            isMissing || selectStatus === "loading" || isSelected
                          }
                          onClick={() =>
                            handleSelect(
                              variant as "short" | "neutral" | "detailed"
                            )
                          }
                        >
                          {isSelected
                            ? "Selected"
                            : selectStatus === "loading"
                              ? "Saving…"
                              : "Select"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
