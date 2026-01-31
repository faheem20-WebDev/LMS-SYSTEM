import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Loader2 } from 'lucide-react';

// Lazy Load Tabs
const HomeTab = lazy(() => import('./tabs/HomeTab'));
const ScheduleTab = lazy(() => import('./tabs/ScheduleTab'));
const ProfileTab = lazy(() => import('./tabs/ProfileTab'));
const ApplyTab = lazy(() => import('./tabs/ApplyTab'));
const DocumentsTab = lazy(() => import('./tabs/DocumentsTab'));
const VoucherTab = lazy(() => import('./tabs/VoucherTab'));
const ContactTab = lazy(() => import('./tabs/ContactTab'));

const TabLoader = () => (
  <div className="flex justify-center items-center h-64">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
  </div>
);

const ApplicantDashboard = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={<TabLoader />}>
        <Routes>
          <Route path="/" element={<HomeTab />} />
          <Route path="schedule" element={<ScheduleTab />} />
          <Route path="profile" element={<ProfileTab />} />
          <Route path="apply" element={<ApplyTab />} />
          <Route path="documents" element={<DocumentsTab />} />
          <Route path="voucher" element={<VoucherTab />} />
          <Route path="contact" element={<ContactTab />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/applicant/dashboard" replace />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
};

export default ApplicantDashboard;