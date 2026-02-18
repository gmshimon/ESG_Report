"use client";

import { Button } from "@/components/ui/button";
import type { EmissionEntry } from "@/lib/emissionsSlice";

type Props = {
  entry: EmissionEntry;
};

export function DownloadReportButton({ entry }: Props) {
  const handleDownload = () => {
    if (!entry) return;

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${entry.company_name} ESG Report ${entry.reporting_year}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; padding: 24px; }
    h1, h2 { color: #065f46; }
    .section { margin-bottom: 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #d1fae5; color: #065f46; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
    pre { white-space: pre-wrap; background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>${entry.company_name} — ${entry.reporting_year}</h1>
  <div class="section">
    <span class="badge">Snapshot</span>
    <table>
      <tbody>
        <tr><th>Scope 1 (tCO₂e)</th><td>${entry.scope1_tco2e}</td></tr>
        <tr><th>Scope 2 (tCO₂e)</th><td>${entry.scope2_tco2e}</td></tr>
        <tr><th>Scope 3 (tCO₂e)</th><td>${entry.scope3_tco2e ?? "—"}</td></tr>
        <tr><th>Energy (kWh)</th><td>${entry.energy_consumption_kwh ?? "—"}</td></tr>
        <tr><th>Notes</th><td>${entry.notes ?? "—"}</td></tr>
      </tbody>
    </table>
  </div>
  <div class="section">
    <span class="badge">Strategies</span>
    <p>Selected variant: ${entry.selectedVariant ?? "none"}</p>
    <h2>Short</h2>
    <pre>${entry.strategyShort ?? "Not generated"}</pre>
    <h2>Neutral</h2>
    <pre>${entry.strategyNeutral ?? "Not generated"}</pre>
    <h2>Detailed</h2>
    <pre>${entry.strategyDetailed ?? "Not generated"}</pre>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entry.company_name}-${entry.reporting_year}-report.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} variant="outline" className="whitespace-nowrap">
      Download HTML report
    </Button>
  );
}
