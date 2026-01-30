import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import AdminDashboard from './pages/admin/AdminDashboard';

// Placeholder components for other Dashboards
const TeacherDashboard = () => <div className="p-8"><h1>Teacher Dashboard (Coming Soon)</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Routes>
            {/* Public Routes with Navbar */}
            <Route path="/" element={<><Navbar /><LandingPage /></>} />
            <Route path="/login" element={<><Navbar /><LoginPage /></>} />
            
            {/* Dashboard Routes (No Navbar, DashboardLayout has its own) */}
            <Route path="/dashboard" element={
              <ProtectedRoute roles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher" element={
              <ProtectedRoute roles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Sub-routes for dashboards can be added here */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
