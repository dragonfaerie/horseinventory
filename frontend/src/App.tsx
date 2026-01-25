import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HorseList from "./components/Horselist";
import AdminDashboard from "./components/AdminDashboard";
import ManageManufacturers from "./components/ManageManufacturers";
import ManageMolds from "./components/ManageMolds";
import ManageBreeds from "./components/ManageBreeds";
import ManageColors from "./components/ManageColors";
import ManageBreedTypes from "./components/ManageBreedTypes";
import ManageCondition from "./components/ManageCondition";
import ManageFinish from "./components/ManageFinish";
import ManageGenders from "./components/ManageGenders";
import ManageLocations from "./components/ManageLocations";
import ManagePatterns from "./components/ManagePatterns";
import ManageRunTypes from "./components/ManageRunTypes";
import ManageScales from "./components/ManageScales";
import ManageModels from "./components/ManageModels";
import HorseForm from "./components/HorseForm";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";

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
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/horses"
            element={
              <ProtectedRoute>
                <HorseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/horses/new"
            element={
              <ProtectedRoute>
                <HorseForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/horses/:id/edit"
            element={
              <ProtectedRoute>
                <HorseForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/breeds"
            element={
              <ProtectedRoute>
                <ManageBreeds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/breed-types"
            element={
              <ProtectedRoute>
                <ManageBreedTypes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/colors"
            element={
              <ProtectedRoute>
                <ManageColors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/conditions"
            element={
              <ProtectedRoute>
                <ManageCondition />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/finish"
            element={
              <ProtectedRoute>
                <ManageFinish />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gender"
            element={
              <ProtectedRoute>
                <ManageGenders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/locations"
            element={
              <ProtectedRoute>
                <ManageLocations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manufacturers"
            element={
              <ProtectedRoute>
                <ManageManufacturers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/models"
            element={
              <ProtectedRoute>
                <ManageModels />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/molds"
            element={
              <ProtectedRoute>
                <ManageMolds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/patterns"
            element={
              <ProtectedRoute>
                <ManagePatterns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/run-types"
            element={
              <ProtectedRoute>
                <ManageRunTypes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/scales"
            element={
              <ProtectedRoute>
                <ManageScales />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
