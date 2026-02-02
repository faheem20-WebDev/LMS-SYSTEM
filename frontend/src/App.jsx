import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ApplicantProvider } from './context/ApplicantContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Lazy Load Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const Admissions = lazy(() => import('./pages/Admissions'));
const CampusLife = lazy(() => import('./pages/CampusLife'));
const Contact = lazy(() => import('./pages/Contact'));
const Portal = lazy(() => import('./pages/Portal'));

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
  <div className="min-h-screen flex items-center justify-center bg-slate-50 text-primary">
    <Loader2 className="h-12 w-12 animate-spin" />
  </div>
);

// Public Layout Component
const PublicLayout = () => (
  <>
    <Navbar />
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
    <Footer />
    <ScrollToTop />
  </>
);

// Placeholder components
const TeacherDashboard = () => <div className="p-8"><h1>Teacher Dashboard (Coming Soon)</h1></div>;

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ApplicantProvider>
          <Router>
            <div className="min-h-screen bg-[#F5F7FA]">
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/programs" element={<Programs />} />
                  <Route path="/admissions" element={<Admissions />} />
                  <Route path="/campus-life" element={<CampusLife />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/portal" element={<Portal />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/applicant/register" element={<ApplicantRegister />} />
                </Route>

                {/* Standalone Public Routes */}
                <Route path="/admissions/apply" element={
                  <Suspense fallback={<PageLoader />}>
                     <Navbar />
                     <AdmissionForm />
                  </Suspense>
                } />
                
                {/* Protected Student Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute roles={['student']}>
                    <Suspense fallback={<PageLoader />}>
                      <StudentDashboard />
                    </Suspense>
                  </ProtectedRoute>
                } />
                
                <Route path="/applicant/dashboard/*" element={
                  <ProtectedRoute roles={['applicant', 'student']}>
                    <Suspense fallback={<PageLoader />}>
                      <ApplicantDashboard />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="/applicant/apply/:programId" element={
                  <ProtectedRoute roles={['applicant']}>
                    <Suspense fallback={<PageLoader />}>
                      <ApplicationForm />
                    </Suspense>
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
                    <Suspense fallback={<PageLoader />}>
                      <AdminDashboard />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="/admin/academics" element={
                  <ProtectedRoute roles={['admin']}>
                    <Suspense fallback={<PageLoader />}>
                      <AcademicManagement />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="/admin/enrollments" element={
                  <ProtectedRoute roles={['admin']}>
                    <Suspense fallback={<PageLoader />}>
                      <EnrollmentManagement />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="/admin/admissions" element={
                  <ProtectedRoute roles={['admin']}>
                    <Suspense fallback={<PageLoader />}>
                      <AdmissionApplications />
                    </Suspense>
                  </ProtectedRoute>
                } />              
                <Route path="/admin/payments" element={
                  <ProtectedRoute roles={['admin']}>
                    <div className="p-8"><h1>Payments & Vouchers (Coming Soon)</h1></div>
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </ApplicantProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;