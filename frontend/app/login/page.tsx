"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const featurePoints = [
  "Single workspace for emissions, approvals, and exports.",
  "Lightweight access controls with audit-friendly history.",
];

export default function LoginPage() {
  return (
    <main className="min-h-screen text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-12 px-6 py-12 lg:flex-row lg:items-center lg:gap-16">
        <section className="space-y-4 lg:max-w-md">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 font-semibold">
            Carbon Tracker
          </p>
          <h1 className="text-3xl font-semibold leading-snug md:text-4xl">
            Welcome back. Sign in to continue your dashboard work.
          </h1>
          <p className="text-slate-600">
            Use your work email to access the dashboard. All changes stay in sync across records.
          </p>
          <ul className="space-y-2 text-slate-700">
            {featurePoints.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full lg:max-w-lg">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <header className="space-y-1">
              <p className="text-sm text-slate-600">Sign in</p>
              <h2 className="text-xl font-semibold text-slate-900">Dashboard access</h2>
            </header>

            <form className="mt-6 space-y-4">
              <label className="space-y-2 text-sm font-medium text-slate-800">
                Work email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-800">
                Password
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  required
                />
              </label>

              <div className="flex items-center justify-between text-sm text-slate-700">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-300"
                    defaultChecked
                  />
                  Remember me
                </label>
                <Link
                  href="#"
                  className="font-medium text-emerald-700 hover:text-emerald-600"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Continue
              </Button>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="h-px flex-1 bg-slate-200" />
                or
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-11 w-full border-slate-200 text-slate-800 hover:border-emerald-200 hover:bg-emerald-50"
              >
                Continue with Google
              </Button>

              <p className="text-center text-sm text-slate-600">
                Need access?{" "}
                <Link href="/signup" className="font-semibold text-emerald-700 hover:text-emerald-600">
                  Request an account
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
