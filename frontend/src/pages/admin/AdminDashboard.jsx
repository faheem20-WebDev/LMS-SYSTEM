import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Users, BookOpen, Calendar, ClipboardList } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    activeSemester: 'Loading...',
    pendingRequests: 0
  });
  const { token } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://muhammadfaheem52006-lmsbackend.hf.space/api/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching admin stats', err);
      }
    };
    fetchStats();
  }, [token]);

  const statCards = [
    { name: 'Total Students', value: stats.students, icon: Users, color: 'bg-blue-500' },
    { name: 'Total Teachers', value: stats.teachers, icon: Users, color: 'bg-indigo-500' },
    { name: 'Courses in Catalog', value: stats.courses, icon: BookOpen, color: 'bg-emerald-500' },
    { name: 'Enrollment Requests', value: stats.pendingRequests, icon: ClipboardList, color: 'bg-amber-500' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-rsiit-slate">Admin Overview</h1>
            <p className="text-slate-500">Manage university operations and academic structure.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <span className="text-sm text-slate-500">Active Semester:</span>
            <span className="ml-2 font-bold text-rsiit-blue">{stats.activeSemester}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                <div className={`${stat.color} p-3 rounded-xl text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-rsiit-slate">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4">Academic Setup</h3>
            <p className="text-sm text-slate-500 mb-4">Create new semesters, add classes, and manage the course catalog.</p>
            <Link to="/admin/academics" className="w-full bg-slate-100 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors block text-center">Manage Academics</Link>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4">Enrollments</h3>
            <p className="text-sm text-slate-500 mb-4">Review and approve student course registration requests.</p>
            <Link to="/admin/enrollments" className="w-full bg-slate-100 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors block text-center">View Requests</Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4">Users</h3>
            <p className="text-sm text-slate-500 mb-4">Add teachers, students, and manage their access roles.</p>
            <button className="w-full bg-slate-100 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors">Manage Users</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;