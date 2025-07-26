import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin/manufacturers">Manage Manufacturers</Link>
          <Link to="/admin/molds">Manage Molds</Link>
        </li>
        {/* Add similar links here for RunType, Finish, etc. */}
      </ul>
    </div>
  );
};

export default AdminDashboard;
