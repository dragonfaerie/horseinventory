import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "./AdminDashboard";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Hello World</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/horses">All Horses</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
