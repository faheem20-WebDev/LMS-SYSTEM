import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Lazy Load Pages for Performance Optimization
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdmissionForm = lazy(() => import('./pages/AdmissionForm'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AcademicManagement = lazy(() => import('./pages/admin/AcademicManagement'));
const EnrollmentManagement = lazy(() => import('./pages/admin/EnrollmentManagement'));
const AdmissionApplications = lazy(() => import('./pages/admin/AdmissionApplications'));
const ApplicantRegister = lazy(() => import('./pages/applicant/ApplicantRegister'));
const ApplicantDashboard = lazy(() => import('./pages/applicant/ApplicantDashboard'));
const ApplicationForm = lazy(() => import('./pages/applicant/ApplicationForm'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <Loader2 className="h-12 w-12 animate-spin text-blue-900" />
  </div>
);

// Placeholder components
const TeacherDashboard = () => <div className="p-8"><h1>Teacher Dashboard (Coming Soon)</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<><Navbar /><LandingPage /></>} />
              <Route path="/login" element={<><Navbar /><LoginPage /></>} />
              <Route path="/admissions/apply" element={<AdmissionForm />} />
              <Route path="/applicant/register" element={<ApplicantRegister />} />
              
              {/* Protected Student Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute roles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/applicant/dashboard" element={
                <ProtectedRoute roles={['applicant']}>
                  <ApplicantDashboard />
                </ProtectedRoute>
              } />
              <Route path="/applicant/apply/:programId" element={
                <ProtectedRoute roles={['applicant']}>
                  <ApplicationForm />
                </ProtectedRoute>
              } />

              {/* Protected Teacher Routes */}
              <Route path="/teacher" element={
                <ProtectedRoute roles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/academics" element={
                <ProtectedRoute roles={['admin']}>
                  <AcademicManagement />
                </ProtectedRoute>
              } />
                          <Route path="/admin/enrollments" element={
                            <ProtectedRoute roles={['admin']}>
                              <EnrollmentManagement />
                            </ProtectedRoute>
                          } />
                          <Route path="/admin/admissions" element={
                            <ProtectedRoute roles={['admin']}>
                              <AdmissionApplications />
                            </ProtectedRoute>
                          } />              <Route path="/admin/payments" element={
                <ProtectedRoute roles={['admin']}>
                  <div className="p-8"><h1>Payments & Vouchers (Coming Soon)</h1></div>
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;