import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import Recommendation from './pages/Recommendation';
import History from './pages/History';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ManageCrops from './pages/ManageCrops';
import ManageFertilizers from './pages/ManageFertilizers';
import ManageUsers from './pages/ManageUsers';
import RulesManager from './pages/RulesManager';
import Navbar from './components/Navbar';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Farmer Routes */}
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/recommendation" element={<Recommendation />} />
          <Route path="/farmer/history" element={<History />} />
          <Route path="/farmer/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-crops" element={<ManageCrops />} />
          <Route path="/admin/manage-fertilizers" element={<ManageFertilizers />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/rules" element={<RulesManager />} />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
