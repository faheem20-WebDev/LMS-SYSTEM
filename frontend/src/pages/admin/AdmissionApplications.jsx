import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import { CheckCircle, XCircle, Loader2, User, FileText, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'https://muhammadfaheem52006-lmsbackend.hf.space/api';

const AdmissionApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, [token]);

  const fetchApplications = async () => {
    try {
      // We need to create this endpoint in backend
      const res = await axios.get(`${API_URL}/admin/applications`);
      setApps(res.data);
    } catch (err) {
      console.error('Error fetching applications', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/admin/applications/${id}/status`, { status });
      fetchApplications();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Delete this admission application permanently?')) return;
    try {
      await axios.delete(`${API_URL}/admin/applications/${id}`);
      setApps(apps.filter(a => a.id !== id));
    } catch (err) {
      alert('Error deleting application');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-rsiit-slate">Admission Applications</h1>
          <p className="text-slate-500">Manage new student admission requests for Fall 2026.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-blue-600" /></div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Program</th>
                  <th className="p-4">Father Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {apps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-bold text-slate-700">{app.personal_info?.fullName}</div>
                      <div className="text-xs text-slate-400">{app.contact_info?.email}</div>
                    </td>
                    <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{app.program_code}</span></td>
                    <td className="p-4 text-sm text-slate-600">{app.guardian_info?.fatherName}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                        app.status === 'admitted' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {app.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button onClick={() => updateStatus(app.id, 'admitted')} className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Admit Student"><CheckCircle className="h-4 w-4" /></button>
                      <button onClick={() => updateStatus(app.id, 'rejected')} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Reject"><XCircle className="h-4 w-4" /></button>
                      <button onClick={() => deleteApplication(app.id)} className="p-2 bg-slate-100 text-slate-600 rounded hover:bg-slate-200" title="Delete"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
                {apps.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-slate-400">No applications found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdmissionApplications;
