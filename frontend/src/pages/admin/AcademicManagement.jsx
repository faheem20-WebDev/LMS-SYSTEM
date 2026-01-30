import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import { Calendar, Users, BookOpen, Plus, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Dynamic API URL based on environment
const API_URL = 'https://muhammadfaheem52006-lmsbackend.hf.space/api';

const AcademicManagement = () => {
  const [activeTab, setActiveTab] = useState('semesters');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { token } = useAuth();

  // Form States
  const [semesterForm, setSemesterForm] = useState({ name: '', start_date: '', end_date: '' });
  const [classForm, setClassForm] = useState({ name: '', department: '' });
  const [courseForm, setCourseForm] = useState({ code: '', name: '', description: '', credit_hours: 3 });

  useEffect(() => {
    fetchData();
  }, [activeTab, token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'semesters' ? '/admin/semesters' 
                     : activeTab === 'classes' ? '/admin/classes' 
                     : '/admin/courses';
      
      const res = await axios.get(`${API_URL}${endpoint}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === 'semesters') {
        await axios.post(`${API_URL}/admin/semesters`, semesterForm);
        setSemesterForm({ name: '', start_date: '', end_date: '' });
      } else if (activeTab === 'classes') {
        await axios.post(`${API_URL}/admin/classes`, classForm);
        setClassForm({ name: '', department: '' });
      } else {
        await axios.post(`${API_URL}/admin/courses`, courseForm);
        setCourseForm({ code: '', name: '', description: '', credit_hours: 3 });
      }
      fetchData(); // Refresh list
    } catch (err) {
      alert('Error creating item: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  const activateSemester = async (id) => {
    try {
      await axios.put(`${API_URL}/admin/semesters/${id}/activate`);
      fetchData();
    } catch (err) {
      alert('Error activating semester');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-rsiit-slate">Academic Management</h1>
          <p className="text-slate-500">Configure the foundational structure of the university.</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-slate-200 mb-8">
          {[
            { id: 'semesters', label: 'Semesters', icon: Calendar },
            { id: 'classes', label: 'Classes', icon: Users },
            { id: 'courses', label: 'Course Catalog', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600 font-bold' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              Add New {activeTab === 'semesters' ? 'Semester' : activeTab === 'classes' ? 'Class' : 'Course'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'semesters' && (
                <>
                  <input required type="text" placeholder="Semester Name (e.g. Fall 2025)" className="w-full p-2 border rounded-md" value={semesterForm.name} onChange={e => setSemesterForm({...semesterForm, name: e.target.value})} />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500">Start Date</label>
                      <input required type="date" className="w-full p-2 border rounded-md" value={semesterForm.start_date} onChange={e => setSemesterForm({...semesterForm, start_date: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">End Date</label>
                      <input required type="date" className="w-full p-2 border rounded-md" value={semesterForm.end_date} onChange={e => setSemesterForm({...semesterForm, end_date: e.target.value})} />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'classes' && (
                <>
                  <input required type="text" placeholder="Class Name (e.g. BSCS-1)" className="w-full p-2 border rounded-md" value={classForm.name} onChange={e => setClassForm({...classForm, name: e.target.value})} />
                  <input required type="text" placeholder="Department (e.g. Computer Science)" className="w-full p-2 border rounded-md" value={classForm.department} onChange={e => setClassForm({...classForm, department: e.target.value})} />
                </>
              )}

              {activeTab === 'courses' && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <input required type="text" placeholder="Course Code (e.g. CS101)" className="w-full p-2 border rounded-md" value={courseForm.code} onChange={e => setCourseForm({...courseForm, code: e.target.value})} />
                    </div>
                    <div>
                      <input required type="number" placeholder="Credits" className="w-full p-2 border rounded-md" value={courseForm.credit_hours} onChange={e => setCourseForm({...courseForm, credit_hours: e.target.value})} />
                    </div>
                  </div>
                  <input required type="text" placeholder="Course Name" className="w-full p-2 border rounded-md" value={courseForm.name} onChange={e => setCourseForm({...courseForm, name: e.target.value})} />
                  <textarea placeholder="Description (Optional)" className="w-full p-2 border rounded-md h-24" value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})}></textarea>
                </>
              )}

              <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium flex items-center justify-center gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Record'}
              </button>
            </form>
          </div>

          {/* List View */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="font-bold text-lg mb-4">Existing Records</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name / Title</th>
                    <th className="p-3">Details</th>
                    {activeTab === 'semesters' && <th className="p-3">Status</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-xs text-slate-400">#{item.id}</td>
                      <td className="p-3 font-medium">
                        {item.name}
                        {item.code && <span className="ml-2 text-xs bg-slate-100 px-2 py-1 rounded">{item.code}</span>}
                      </td>
                      <td className="p-3 text-sm text-slate-500">
                        {activeTab === 'semesters' && `${new Date(item.start_date).toLocaleDateString()} - ${new Date(item.end_date).toLocaleDateString()}`}
                        {activeTab === 'classes' && item.department}
                        {activeTab === 'courses' && `${item.credit_hours} Cr. Hrs`}
                      </td>
                      {activeTab === 'semesters' && (
                        <td className="p-3">
                          <button 
                            onClick={() => activateSemester(item.id)}
                            className={`px-3 py-1 rounded-full text-xs font-bold ${item.is_active ? 'bg-green-100 text-green-700 cursor-default' : 'bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-700'}`}
                          >
                            {item.is_active ? 'Active' : 'Activate'}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-slate-400">No records found. Create one to get started.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AcademicManagement;
