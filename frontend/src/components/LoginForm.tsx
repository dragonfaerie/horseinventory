import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const primaryButtonClasses =
  "inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-60";

const LoginForm: React.FC = () => {
  const { signIn, session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fromPath =
    (location.state as { from?: { pathname?: string } })?.from?.pathname ??
    "/horses";

  if (session) {
    return <Navigate to={fromPath} replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      navigate(fromPath, { replace: true });
    } catch (err: any) {
      const message =
        err?.message ?? "Unable to sign in. Please verify your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-12 text-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            Horse Inventory
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Sign in to continue
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Use your Supabase email + password.
          </p>
        </div>
        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        <label className="block text-sm font-medium text-slate-700">
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputClasses} mt-1`}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClasses} mt-1`}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </label>
        <button
          type="submit"
          className={`${primaryButtonClasses} mt-6`}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="mt-4 text-center text-xs text-slate-400">
          Need an account? Add a user in the Supabase dashboard.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
