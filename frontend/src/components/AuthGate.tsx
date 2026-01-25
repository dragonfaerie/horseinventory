import React from "react";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, session } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-200">
        Checking Supabase session…
      </div>
    );
  }

  if (!session) {
    return <LoginForm />;
  }

  return <>{children}</>;
};

export default AuthGate;
