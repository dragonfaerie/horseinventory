import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HorseList from './components/Horselist';
import AdminDashboard from './components/AdminDashboard';
import ManageManufacturers from './components/ManageManufacturers';
import ManageMolds from './components/ManageMolds';
import ManageBreeds from './components/ManageBreeds';
import ManageColors from './components/ManageColors';
import ManageBreedTypes from './components/ManageBreedTypes';
import ManageCondition from './components/ManageCondition';

const Home: React.FC = () => (
  <div>
    <h2>Welcome to the Model Horse Inventory App</h2>
    <p>Track your collection, sales, and show history.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/horses" element={<HorseList />} />
          <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/breeds" element={<ManageBreeds />} />
            <Route path="/admin/breed-types" element={<ManageBreedTypes />} />
            <Route path="/admin/colors" element={<ManageColors />} />
            <Route path="/admin/conditions" element={<ManageCondition />} />
          <Route path="/admin/manufacturers" element={<ManageManufacturers />} />
          <Route path="/admin/molds" element={<ManageMolds />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


