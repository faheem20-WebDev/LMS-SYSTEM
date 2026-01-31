import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  CreditCard
} from 'lucide-react';
import RealtimeClock from './RealtimeClock';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Course Registration', path: '/dashboard/registration', icon: BookOpen },
    { name: 'Assignments', path: '/dashboard/assignments', icon: ClipboardList },
    { name: 'Time Table', path: '/dashboard/timetable', icon: Calendar },
    { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
  ];

  const teacherLinks = [
    { name: 'Overview', path: '/teacher', icon: LayoutDashboard },
    { name: 'Manage Courses', path: '/teacher/courses', icon: BookOpen },
    { name: 'Assignments', path: '/teacher/assignments', icon: ClipboardList },
  ];

  const adminLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Academics', path: '/admin/academics', icon: BookOpen },
    { name: 'Admissions', path: '/admin/admissions', icon: User }, // New Applicants
    { name: 'Course Reg.', path: '/admin/enrollments', icon: ClipboardList }, // Existing Students
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
  ];

  const applicantLinks = [
    { name: 'Dashboard', path: '/applicant/dashboard', icon: LayoutDashboard },
    { name: 'New Application', path: '/applicant/dashboard', icon: BookOpen }, // Points to dashboard where list is
  ];

  const links = user?.role === 'admin' ? adminLinks 
              : user?.role === 'teacher' ? teacherLinks 
              : user?.role === 'applicant' ? applicantLinks
              : studentLinks;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-40 transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-rsiit-slate text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <GraduationCap className="h-10 w-10 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">RSIIT LMS</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest">{user?.role} Portal</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <button 
            className="p-2 text-slate-600 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden sm:block">
            <RealtimeClock />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-rsiit-slate">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.department || 'RSIIT Student'}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-rsiit-blue font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
