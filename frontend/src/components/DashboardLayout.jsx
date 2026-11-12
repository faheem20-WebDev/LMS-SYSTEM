import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApplicant } from '../context/ApplicantContext';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Calendar,
  Bell,
  LogOut,
  Menu,
  X,
  GraduationCap,
  User,
  CreditCard,
  Upload,
  Phone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import RealtimeClock from './RealtimeClock';

/* ─────────────────────────────────────────────
   Nav link definitions (unchanged destinations)
───────────────────────────────────────────── */
const studentLinks = [
  { name: 'Dashboard',          path: '/dashboard',                   icon: LayoutDashboard },
  { name: 'Course Registration',path: '/dashboard/registration',      icon: BookOpen },
  { name: 'Assignments',        path: '/dashboard/assignments',        icon: ClipboardList },
  { name: 'Time Table',         path: '/dashboard/timetable',         icon: Calendar },
  { name: 'Payments',           path: '/dashboard/payments',          icon: CreditCard },
  { name: 'Notifications',      path: '/dashboard/notifications',     icon: Bell },
];

const teacherLinks = [
  { name: 'Overview',       path: '/teacher',           icon: LayoutDashboard },
  { name: 'Manage Courses', path: '/teacher/courses',   icon: BookOpen },
  { name: 'Assignments',    path: '/teacher/assignments',icon: ClipboardList },
];

const adminLinks = [
  { name: 'Overview',   path: '/admin',              icon: LayoutDashboard },
  { name: 'Academics',  path: '/admin/academics',    icon: BookOpen },
  { name: 'Admissions', path: '/admin/admissions',   icon: User },
  { name: 'Course Reg.',path: '/admin/enrollments',  icon: ClipboardList },
  { name: 'Payments',   path: '/admin/payments',     icon: CreditCard },
];

/* Role label badges */
const roleLabels = {
  admin:     { label: 'Admin Portal',     color: 'bg-blue-500/20 text-blue-200' },
  teacher:   { label: 'Teacher Portal',   color: 'bg-emerald-500/20 text-emerald-200' },
  student:   { label: 'Student Portal',   color: 'bg-indigo-500/20 text-indigo-200' },
  applicant: { label: 'Applicant Portal', color: 'bg-amber-500/20 text-amber-200' },
};

/* ─────────────────────────────────────────────
   SidebarLink
───────────────────────────────────────────── */
const SidebarLink = ({ link, collapsed, onMobileClick }) => {
  const location = useLocation();

  const isActive =
    link.path === '/applicant/dashboard'
      ? location.pathname === link.path
      : location.pathname.startsWith(link.path);

  const isDisabled = !!link.disabled;

  return (
    <Link
      to={isDisabled ? '#' : link.path}
      title={collapsed ? link.name : undefined}
      onClick={(e) => {
        if (isDisabled) e.preventDefault();
        onMobileClick?.();
      }}
      className={`
        group relative flex items-center gap-3 rounded-xl transition-all duration-200 select-none
        ${collapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'}
        ${isActive
          ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-900/30'
          : 'text-slate-300 hover:bg-[#1E3A5F] hover:text-white'
        }
        ${isDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
      `}
    >
      <link.icon className={`flex-shrink-0 ${isActive ? 'h-5 w-5' : 'h-5 w-5'}`} />

      {!collapsed && (
        <>
          <span className="font-medium text-sm leading-none">{link.name}</span>
          {isDisabled && (
            <span className="ml-auto text-[10px] font-semibold tracking-wide uppercase opacity-60">
              Locked
            </span>
          )}
          {isActive && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />
          )}
        </>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <span className="
          pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap
          rounded-lg bg-[#172B46] border border-slate-700 px-3 py-1.5 text-xs font-semibold text-white
          shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150
        ">
          {link.name}
        </span>
      )}
    </Link>
  );
};

/* ─────────────────────────────────────────────
   DashboardLayout
───────────────────────────────────────────── */
const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [collapsed,  setCollapsed]    = useState(false);

  const { user, logout } = useAuth();

  // Safely consume ApplicantContext (non-applicant roles don't have it)
  let applicantContext = {};
  try { applicantContext = useApplicant(); } catch (_) {}
  const { isProfileComplete, hasSubmittedApplication } = applicantContext || {};

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Build applicant links dynamically (preserves locked-step logic)
  const applicantLinks = [
    { name: 'Home',                 path: '/applicant/dashboard',           icon: LayoutDashboard, disabled: false },
    { name: 'Admission Schedule',   path: '/applicant/dashboard/schedule',  icon: Calendar,        disabled: false },
    { name: 'Profile Information',  path: '/applicant/dashboard/profile',   icon: User,            disabled: false },
    { name: 'Apply for Program',    path: '/applicant/dashboard/apply',     icon: GraduationCap,   disabled: !isProfileComplete },
    { name: 'Academic Documents',   path: '/applicant/dashboard/documents', icon: Upload,          disabled: !hasSubmittedApplication },
    { name: 'Fee Voucher',          path: '/applicant/dashboard/voucher',   icon: CreditCard,      disabled: !hasSubmittedApplication },
    { name: 'Contact Us',           path: '/applicant/dashboard/contact',   icon: Phone,           disabled: false },
  ];

  const links =
    user?.role === 'admin'     ? adminLinks
    : user?.role === 'teacher' ? teacherLinks
    : user?.role === 'applicant' ? applicantLinks
    : studentLinks;

  const roleMeta  = roleLabels[user?.role] || roleLabels.student;
  const initials  = user?.name ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?';
  const sidebarW  = collapsed ? 'w-20' : 'w-72';

  /* ── Sidebar inner content (shared between mobile drawer & desktop) ── */
  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">

      {/* Logo / Brand */}
      <div className={`flex items-center ${collapsed && !mobile ? 'justify-center px-3 py-6' : 'gap-3 px-6 py-6'}`}>
        <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-lg shadow-blue-900/30">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
        {(!collapsed || mobile) && (
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-white leading-tight truncate">
              RSIIT LMS
            </h1>
            <span className={`inline-block mt-0.5 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${roleMeta.color}`}>
              {roleMeta.label}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-slate-700/50" />

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto py-4 space-y-1 ${collapsed && !mobile ? 'px-2' : 'px-3'}`}>
        {links.map((link) => (
          <SidebarLink
            key={link.path}
            link={link}
            collapsed={collapsed && !mobile}
            onMobileClick={mobile ? () => setMobileOpen(false) : undefined}
          />
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-slate-700/50" />

      {/* User info + logout */}
      <div className={`py-4 ${collapsed && !mobile ? 'px-2' : 'px-3'}`}>
        {(!collapsed || mobile) && (
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-[#1E3A5F]">
            <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-tight">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.department || user?.email || ''}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          title={collapsed && !mobile ? 'Logout' : undefined}
          className={`
            group relative flex items-center gap-3 w-full rounded-xl transition-all duration-200
            text-slate-400 hover:bg-red-500/10 hover:text-red-400
            ${collapsed && !mobile ? 'justify-center px-3 py-3' : 'px-4 py-3'}
          `}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {(!collapsed || mobile) && <span className="font-medium text-sm">Logout</span>}
          {collapsed && !mobile && (
            <span className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-lg bg-[#172B46] border border-slate-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex">

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-[#172B46] flex flex-col
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile close button */}
        <button
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent mobile />
      </aside>

      {/* ── Desktop Sidebar ── */}
      <aside
        className={`
          hidden lg:flex flex-col flex-shrink-0 ${sidebarW}
          bg-[#172B46] transition-all duration-300 ease-in-out
          sticky top-0 h-screen overflow-hidden
        `}
      >
        <SidebarContent />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className={`
            absolute bottom-24 ${collapsed ? 'right-[-12px]' : 'right-[-12px]'}
            h-6 w-6 rounded-full bg-[#2563EB] border-2 border-[#172B46]
            flex items-center justify-center text-white shadow-md
            hover:bg-blue-500 transition-colors z-10
          `}
        >
          {collapsed
            ? <ChevronRight className="h-3.5 w-3.5" />
            : <ChevronLeft  className="h-3.5 w-3.5" />
          }
        </button>
      </aside>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Top Header ── */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 shadow-sm">

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-[#172B46] hover:bg-[#F3F6FA] transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Clock — hidden on mobile */}
          <div className="hidden sm:block">
            <RealtimeClock />
          </div>

          {/* Spacer on mobile */}
          <div className="flex-1 sm:hidden" />

          {/* User section */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#172B46] leading-tight">{user?.name}</p>
              <p className="text-xs text-[#64748B]">{user?.department || (user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'RSIIT')}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm">
              {initials}
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
