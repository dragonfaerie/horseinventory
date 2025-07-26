import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin/breeds">Manage Breeds</Link>
        </li>
        <li>
          <Link to="/admin/breed-types">Manage Breed Types</Link>
        </li>
        <li>
          <Link to="/admin/colors">Manage Colors</Link>
        </li>
        <li>
          <Link to="/admin/conditions">Manage Conditions</Link>
        </li>
        <li>
          <Link to="/admin/manufacturers">Manage Manufacturers</Link>
        </li>
        <li>
          <Link to="/admin/molds">Manage Molds</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
