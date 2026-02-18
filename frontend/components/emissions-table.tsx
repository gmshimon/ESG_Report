"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchReports } from "@/lib/emissionsSlice";
import { Button } from "@/components/ui/button";

export function EmissionsTable() {
  const entries = useAppSelector((state) => state.emissions.entries);
  const fetchStatus = useAppSelector((state) => state.emissions.fetchStatus);
  const fetchError = useAppSelector((state) => state.emissions.fetchError);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchReports());
    }
  }, [dispatch, fetchStatus]);
  return (
    <section className="lg:col-span-2 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Saved entries</h2>
          <p className="text-sm text-slate-600">
            Required fields: company_name, reporting_year, scope1_tco2e,
            scope2_tco2e.
          </p>
        </div>
        <span className="text-sm rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 font-medium">
          {entries.length} record{entries.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {fetchStatus === "loading" ? (
          <div className="p-8 text-center text-slate-500">Loading reports…</div>
        ) : fetchStatus === "failed" ? (
          <div className="p-8 text-center text-red-600">
            {fetchError ?? "Failed to load data."}
          </div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No data yet. Add your first record using the form on the right.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Scope 1</th>
                  <th className="px-4 py-3">Scope 2</th>
                  <th className="px-4 py-3">Scope 3</th>
                  <th className="px-4 py-3">Energy (kWh)</th>
                  <th className="px-4 py-3">Notes</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-emerald-50/40">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      <Link
                        href={`/records/${entry.id}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {entry.company_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {entry.reporting_year}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {entry.scope1_tco2e}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {entry.scope2_tco2e}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {entry.scope3_tco2e ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {entry.energy_consumption_kwh ?? "—"}
                    </td>
                    <td
                      className="px-4 py-3 text-slate-700 max-w-xs truncate"
                      title={entry.notes}
                    >
                      {entry.notes ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/records/${entry.id}`}>View</Link>
                        </Button>
                        <Button asChild size="sm" variant="default">
                          <Link href={`/records/${entry.id}?tab=strategies`}>
                            Generate strategies
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
