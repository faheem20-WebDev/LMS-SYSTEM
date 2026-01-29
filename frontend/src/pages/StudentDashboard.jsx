import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { BookOpen, ClipboardList, Calendar, Bell } from 'lucide-react';

const StudentDashboard = () => {
  const stats = [
    { name: 'Enrolled Courses', value: '5', icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Pending Assignments', value: '3', icon: ClipboardList, color: 'bg-amber-500' },
    { name: 'Attendance', value: '92%', icon: Calendar, color: 'bg-emerald-500' },
    { name: 'Notifications', value: '2', icon: Bell, color: 'bg-indigo-500' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-rsiit-slate">Welcome back, Student!</h1>
          <p className="text-slate-500">Here's what's happening with your courses today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Assignments */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-rsiit-slate mb-6">Upcoming Assignments</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-rsiit-blue">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-rsiit-slate">Database Management Assignment {i}</p>
                      <p className="text-xs text-slate-500">Due: Oct 25, 2025 • 11:59 PM</p>
                    </div>
                  </div>
                  <button className="text-sm font-bold text-rsiit-blue hover:underline">Submit</button>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-rsiit-slate mb-6">Today's Schedule</h2>
            <div className="space-y-4">
              {[
                { time: '09:00 AM', course: 'Web Development', room: 'Lab 04' },
                { time: '11:30 AM', course: 'Software Engineering', room: 'Hall A' },
                { time: '02:00 PM', course: 'Data Structures', room: 'Room 202' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-xl border-l-4 border-blue-500 bg-slate-50">
                  <div className="text-sm font-bold text-rsiit-blue whitespace-nowrap">{item.time}</div>
                  <div>
                    <p className="font-semibold text-rsiit-slate">{item.course}</p>
                    <p className="text-xs text-slate-500">{item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
