"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
  organizationSlug: string;
  industry: string;
  country: string;
  website: string;
  description: string;
};

const initialForm: SignupForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  organizationName: "",
  organizationSlug: "",
  industry: "",
  country: "",
  website: "",
  description: "",
};

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Build payload in the shape required by the backend.
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      confirmPassword: form.confirmPassword,
      organization: {
        name: form.organizationName.trim(),
        slug: form.organizationSlug.trim(),
        industry: form.industry.trim(),
        country: form.country.trim(),
        website: form.website.trim(),
        description: form.description.trim(),
      },
    };

    // TODO: replace with actual POST (e.g., axios/ fetch) to your signup endpoint.
    // await axios.post("/api/signup", payload);
    console.log("Signup payload", payload);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen  text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-6 py-4 lg:flex-row lg:items-center lg:gap-16">
        <section className="space-y-4 lg:max-w-md">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 font-semibold">
            Carbon Tracker
          </p>
          <h1 className="text-3xl font-semibold leading-snug md:text-4xl">
            Create your account and workspace.
          </h1>
          <p className="text-slate-600">
            One step signup captures both your user credentials and the organization profile so the dashboard is ready on first login.
          </p>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2 text-sm">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Single form for user and company details.
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Keeps dashboard records consistent from day one.
            </li>
          </ul>
          <p className="text-sm text-slate-700">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-700 hover:text-emerald-600"
            >
              Go to login
            </Link>
          </p>
        </section>

        <section className="w-full lg:max-w-lg">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <header className="space-y-1">
              <p className="text-sm text-slate-600">Sign up</p>
              <h2 className="text-xl font-semibold text-slate-900">
                Account + Organization
              </h2>
            </header>

            {(error || submitted) && (
              <div
                className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                  error
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-800"
                }`}
              >
                {error ?? "Signup payload prepared. Hook up your API to proceed."}
              </div>
            )}

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-800">
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Alice Lang"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-800">
                  Work email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="alice@example.com"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-800">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-800">
                  Confirm password
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    required
                  />
                </label>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Organization details
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-800">
                    Company name
                    <input
                      type="text"
                      name="organizationName"
                      value={form.organizationName}
                      onChange={handleChange}
                      placeholder="Verdant Power"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      required
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-800">
                    Company slug
                    <input
                      type="text"
                      name="organizationSlug"
                      value={form.organizationSlug}
                      onChange={handleChange}
                      placeholder="verdant-power"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      required
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-800">
                    Industry
                    <input
                      type="text"
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      placeholder="Energy"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      required
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-800">
                    Country
                    <input
                      type="text"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder="Germany"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      required
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-800 sm:col-span-2">
                    Website
                    <input
                      type="url"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="https://verdantpower.example"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      required
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-800 sm:col-span-2">
                    Short description
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Grid-scale renewables and storage"
                      rows={3}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      required
                    />
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Create account
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
