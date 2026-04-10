"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "@/lib/hooks";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showErrorToast } from "@/lib/toastUtils";
import { userSliceReset } from "@/lib/Feature/Auth/auth.slice";
import type { LoginInfo } from "@/lib/Feature/Auth/auth.types";
import { loginUser } from "@/lib/Feature/Auth/auth.thunk";
import { Spinner } from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";

const featurePoints = [
  "Single workspace for emissions, approvals, and exports.",
  "Lightweight access controls with audit-friendly history.",
];

type loginForm = {
  email: string;
  password: string;
};

const initialForm: loginForm = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const { isLoginLoading, isLoginError, isLoginSuccess, errorMessage } =
    useAppSelector((state) => state.auth);

  const [form, setForm] = useState<loginForm>(initialForm);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isLoginError) {
      showErrorToast(errorMessage || "Failed to log in. Please try again.");
      dispatch(userSliceReset());
    }
    if (isLoginSuccess) {
            router.replace("/");
      // showSuccessToast("Logged in successfully!");
      // dispatch(userSliceReset());
    }
  }, [dispatch, errorMessage, isLoginError, isLoginSuccess, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Build payload in the shape required by the backend.
    const payload: LoginInfo = {
      email: form.email.trim(),
      password: form.password,
    };
    dispatch(loginUser(payload));
    console.log("Login payload:", payload);
  };

  return (
    <main className="min-h-screen text-slate-900">
      <ToastContainer />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-12 px-6 py-12 lg:flex-row lg:items-center lg:gap-16">
        <section className="space-y-4 lg:max-w-md">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 font-semibold">
            Carbon Tracker
          </p>
          <h1 className="text-3xl font-semibold leading-snug md:text-4xl">
            Welcome back. Sign in to continue your dashboard work.
          </h1>
          <p className="text-slate-600">
            Use your work email to access the dashboard. All changes stay in
            sync across records.
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
              <h2 className="text-xl font-semibold text-slate-900">
                Dashboard access
              </h2>
            </header>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="space-y-2 text-sm font-medium text-slate-800">
                Work email
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
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
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  required
                />
              </label>

              <div className="flex items-center justify-between text-sm text-slate-700">
                <Link
                  href="#"
                  className="font-medium text-emerald-700 hover:text-emerald-600"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                disabled={isLoginLoading}
                type="submit"
                className="h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {isLoginLoading ? <Spinner /> : "Sign In"}
              </Button>

              <p className="text-center text-sm text-slate-600">
                Need access?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-emerald-700 hover:text-emerald-600"
                >
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
