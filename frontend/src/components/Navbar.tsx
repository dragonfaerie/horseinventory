import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Hello World</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/horses">All Horses</Link>
      </div>
    </nav>
  );
};

export default Navbar;
