
import { EmissionsForm } from "@/components/EmissionsForm/EmissionsForm";
import { EmissionsTable } from "@/components/EmissionsTable/EmissionsTable";

export default function Home() {
  // Server component wrapper that renders client-side dashboard pieces.
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-900 p-6 md:p-10">
      <div className="mx-auto max-w-9xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 font-semibold">
            Carbon Tracker
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">Dashboard</h1>
          <p className="text-slate-600 max-w-2xl">
            Log emissions by company and year, then review everything in one consolidated list.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <EmissionsTable />
          <section className="lg:col-span-1">
            <EmissionsForm />
          </section>
        </div>
      </div>
    </main>
  );
}
