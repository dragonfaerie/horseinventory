import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "./AdminDashboard";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, session, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Failed to sign out", err);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Hello World</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/horses">All Horses</Link>
        <Link to="/horses/new">Add Horse</Link>
        <Link to="/admin">Admin</Link>
      </div>
      {session ? (
        <div className="nav-session">
          <span className="nav-user">
            {user?.email ?? user?.user_metadata?.display_name ?? "Logged in"}
          </span>
          <button type="button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <Link className="nav-login" to="/login">
          Sign in
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
