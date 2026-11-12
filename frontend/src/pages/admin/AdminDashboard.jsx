import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import {
  Users, BookOpen, ClipboardList, GraduationCap,
  ArrowRight, TrendingUp, AlertCircle, RefreshCw,
  ChevronRight, School, UserCheck, Layers, Wallet,
} from 'lucide-react';

const API = 'https://muhammadfaheem52006-lmsbackend.hf.space/api';

/* ── Skeleton pulse block ── */
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-xl bg-slate-100 ${className}`} />
);

/* ── Stat Card ── */
const StatCard = ({ name, value, icon: Icon, iconBg, iconColor, trend, loading }) => (
  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4">
    <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center ${iconBg}`}>
      <Icon className={`h-6 w-6 ${iconColor}`} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-[#64748B] truncate">{name}</p>
      {loading
        ? <Skeleton className="h-8 w-20 mt-1" />
        : <p className="text-3xl font-bold text-[#172B46] mt-0.5 tabular-nums">{value ?? '—'}</p>
      }
      {trend && !loading && (
        <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600">
          <TrendingUp className="h-3 w-3" /> {trend}
        </span>
      )}
    </div>
  </div>
);

/* ── Quick Action Card ── */
const ActionCard = ({ title, description, icon: Icon, iconBg, iconColor, to, label }) => (
  <Link
    to={to}
    className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md hover:border-[#2563EB]/30 transition-all duration-200 flex flex-col gap-4"
  >
    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${iconBg} transition-transform duration-200 group-hover:scale-105`}>
      <Icon className={`h-5 w-5 ${iconColor}`} />
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-[#172B46] text-base leading-tight">{title}</h3>
      <p className="text-sm text-[#64748B] mt-1 leading-relaxed">{description}</p>
    </div>
    <div className="flex items-center gap-2 text-sm font-semibold text-[#2563EB] group-hover:gap-3 transition-all duration-200">
      {label} <ChevronRight className="h-4 w-4" />
    </div>
  </Link>
);

/* ── Metric Row (for the summary panel) ── */
const MetricRow = ({ label, value, loading, accent = false }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#E2E8F0] last:border-0">
    <span className="text-sm text-[#64748B]">{label}</span>
    {loading
      ? <Skeleton className="h-5 w-16" />
      : <span className={`text-sm font-bold ${accent ? 'text-[#2563EB]' : 'text-[#172B46]'}`}>{value}</span>
    }
  </div>
);

/* ── Simple Horizontal Bar ── */
const HBar = ({ label, value, max, color }) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-[#172B46]">{label}</span>
        <span className="text-sm font-bold text-[#64748B]">{value}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   AdminDashboard
══════════════════════════════════════════ */
const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/admin/stats`, {
        headers: { 'x-auth-token': token },
      });
      setStats(res.data);
    } catch (err) {
      console.error('Admin stats error:', err);
      setError('Could not load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, [token]); // eslint-disable-line

  /* Derived values */
  const totalUsers = (stats?.students ?? 0) + (stats?.teachers ?? 0);
  const maxBar     = Math.max(stats?.students ?? 0, stats?.teachers ?? 0, stats?.courses ?? 0, 1);

  const statCards = [
    {
      name: 'Total Students',
      value: stats?.students,
      icon: Users,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      name: 'Total Teachers',
      value: stats?.teachers,
      icon: UserCheck,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      name: 'Courses in Catalog',
      value: stats?.courses,
      icon: BookOpen,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      name: 'Enrollment Requests',
      value: stats?.pendingRequests,
      icon: ClipboardList,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  const quickActions = [
    {
      title: 'Academic Setup',
      description: 'Create semesters, manage courses and configure the academic catalog.',
      icon: School,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      to: '/admin/academics',
      label: 'Manage Academics',
    },
    {
      title: 'Admission Applications',
      description: 'Review incoming admission applications and update applicant status.',
      icon: GraduationCap,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      to: '/admin/admissions',
      label: 'View Applications',
    },
    {
      title: 'Course Enrollments',
      description: 'Review and approve student course registration requests.',
      icon: Layers,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      to: '/admin/enrollments',
      label: 'Review Enrollments',
    },
    {
      title: 'Payments & Vouchers',
      description: 'Track fee payments and manage student financial records.',
      icon: Wallet,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      to: '/admin/payments',
      label: 'View Payments',
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Page Heading ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#172B46] leading-tight">Admin Overview</h1>
            <p className="text-sm text-[#64748B] mt-0.5">Manage university operations and academic activities.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Active semester badge */}
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#E2E8F0] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-xs text-[#64748B] font-medium">Active Semester:</span>
              {loading
                ? <Skeleton className="h-4 w-24 inline-block" />
                : <span className="text-xs font-bold text-[#172B46]">{stats?.activeSemester || 'Not Set'}</span>
              }
            </div>

            {/* Refresh */}
            <button
              onClick={fetchStats}
              disabled={loading}
              className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-all disabled:opacity-40"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Error Banner ── */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700">{error}</p>
            </div>
            <button
              onClick={fetchStats}
              className="text-xs font-semibold text-red-600 hover:text-red-800 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {statCards.map((card) => (
            <StatCard key={card.name} {...card} loading={loading} />
          ))}
        </div>

        {/* ── Middle Row: Summary + Distribution ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Summary Panel */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#172B46] text-base">University Summary</h2>
              <span className="text-xs text-[#64748B] font-medium">Live Data</span>
            </div>
            <MetricRow label="Total Enrolled Students"  value={stats?.students ?? '—'}        loading={loading} accent />
            <MetricRow label="Total Teaching Staff"     value={stats?.teachers ?? '—'}        loading={loading} />
            <MetricRow label="Courses Available"        value={stats?.courses  ?? '—'}        loading={loading} accent />
            <MetricRow label="Pending Enrollment Reqs." value={stats?.pendingRequests ?? '—'} loading={loading} />
            <MetricRow label="Active Semester"          value={stats?.activeSemester || 'N/A'} loading={loading} accent />
            <MetricRow label="Total Platform Users"     value={loading ? '—' : totalUsers}    loading={loading} />
          </div>

          {/* Distribution Chart */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-[#172B46] text-base">Resource Distribution</h2>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full">By Count</span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-8 w-full" />)}
              </div>
            ) : stats ? (
              <div className="mt-2">
                <HBar label="Students"             value={stats.students        ?? 0} max={maxBar} color="bg-blue-500" />
                <HBar label="Teaching Staff"       value={stats.teachers        ?? 0} max={maxBar} color="bg-indigo-500" />
                <HBar label="Courses in Catalog"   value={stats.courses         ?? 0} max={maxBar} color="bg-emerald-500" />
                <HBar label="Enrollment Requests"  value={stats.pendingRequests ?? 0} max={maxBar} color="bg-amber-400" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-sm text-[#64748B]">
                No data available
              </div>
            )}

            {/* Legend */}
            {!loading && stats && (
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-[#E2E8F0]">
                {[
                  { label: 'Students',  color: 'bg-blue-500' },
                  { label: 'Staff',     color: 'bg-indigo-500' },
                  { label: 'Courses',   color: 'bg-emerald-500' },
                  { label: 'Requests',  color: 'bg-amber-400' },
                ].map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                    <span className={`h-2.5 w-2.5 rounded-sm ${color}`} />
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#172B46] text-base">Quick Actions</h2>
            <span className="text-xs text-[#64748B]">Admin controls</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {quickActions.map((action) => (
              <ActionCard key={action.title} {...action} />
            ))}
          </div>
        </div>

        {/* ── Bottom: Pending Alert ── */}
        {!loading && stats?.pendingRequests > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-800">
                  {stats.pendingRequests} Enrollment Request{stats.pendingRequests !== 1 ? 's' : ''} Pending
                </p>
                <p className="text-xs text-amber-600 mt-0.5">
                  Review and approve student course registrations to unblock their schedules.
                </p>
              </div>
            </div>
            <Link
              to="/admin/enrollments"
              className="flex-shrink-0 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Review Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
