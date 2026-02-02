import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import { CheckCircle, XCircle, Loader2, User, FileText, Trash2, Eye, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'https://muhammadfaheem52006-lmsbackend.hf.space/api';

const AdmissionApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (token) fetchApplications();
  }, [token]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/applications`, {
        headers: { 'x-auth-token': token }
      });
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
      if (selectedApp) setSelectedApp(null); // Close modal on action
    } catch (err) {
      alert('Error updating status');
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Delete this admission application permanently?')) return;
    try {
      await axios.delete(`${API_URL}/admin/applications/${id}`);
      setApps(apps.filter(a => a.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
    } catch (err) {
      alert('Error deleting application');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto relative">
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
                      <div className="flex items-center gap-3">
                        {app.profile_image ? (
                             <img src={`https://muhammadfaheem52006-lmsbackend.hf.space${app.profile_image}`} className="h-10 w-10 rounded-full object-cover border" alt="Profile" />
                        ) : (
                             <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500"><User size={20} /></div>
                        )}
                        <div>
                            <div className="font-bold text-slate-700">{app.personal_info?.fullName}</div>
                            <div className="text-xs text-slate-400">{app.contact_info?.email}</div>
                        </div>
                      </div>
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
                      <button onClick={() => setSelectedApp(app)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100" title="View Details"><Eye className="h-4 w-4" /></button>
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
        
        {/* Application Details Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-5 border-b flex justify-between items-center bg-slate-50">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">{selectedApp.personal_info?.fullName}</h2>
                    <p className="text-sm text-slate-500">Applicant ID: {selectedApp.id} • {selectedApp.program_code}</p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><X className="h-6 w-6" /></button>
              </div>
              
              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Documents */}
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                             <h3 className="text-xs font-bold uppercase text-slate-400 mb-3">Profile Picture</h3>
                             {selectedApp.profile_image ? (
                                <img src={`https://muhammadfaheem52006-lmsbackend.hf.space${selectedApp.profile_image}`} alt="Profile" className="w-full rounded-lg object-cover aspect-square border" />
                             ) : (
                                <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-xs italic">No Image Uploaded</div>
                             )}
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                             <h3 className="text-xs font-bold uppercase text-slate-400 mb-3">Fee Voucher</h3>
                             {selectedApp.voucher_image ? (
                                <img src={`https://muhammadfaheem52006-lmsbackend.hf.space${selectedApp.voucher_image}`} alt="Voucher" className="w-full rounded-lg border hover:scale-105 transition-transform cursor-pointer" onClick={() => window.open(`https://muhammadfaheem52006-lmsbackend.hf.space${selectedApp.voucher_image}`, '_blank')} />
                             ) : (
                                <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-xs italic">No Voucher Uploaded</div>
                             )}
                             <p className="text-[10px] text-slate-400 mt-2 text-center">Click to view full size</p>
                        </div>
                    </div>
                    
                    {/* Right Column: Data */}
                    <div className="lg:col-span-2 space-y-6">
                         {/* Personal Info */}
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2"><User className="h-4 w-4 text-blue-600"/> Personal Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-slate-500 block text-xs">Full Name</span> {selectedApp.personal_info?.fullName}</div>
                                <div><span className="text-slate-500 block text-xs">CNIC</span> {selectedApp.personal_info?.cnic}</div>
                                <div><span className="text-slate-500 block text-xs">Date of Birth</span> {selectedApp.personal_info?.dob}</div>
                                <div><span className="text-slate-500 block text-xs">Email</span> {selectedApp.contact_info?.email}</div>
                                <div><span className="text-slate-500 block text-xs">Phone</span> {selectedApp.contact_info?.phone}</div>
                                <div><span className="text-slate-500 block text-xs">City</span> {selectedApp.contact_info?.city}</div>
                            </div>
                         </div>

                         {/* Guardian Info */}
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Guardian Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-slate-500 block text-xs">Father Name</span> {selectedApp.guardian_info?.fatherName}</div>
                                <div><span className="text-slate-500 block text-xs">Father CNIC</span> {selectedApp.guardian_info?.fatherCnic}</div>
                                <div><span className="text-slate-500 block text-xs">Occupation</span> {selectedApp.guardian_info?.occupation}</div>
                                <div><span className="text-slate-500 block text-xs">Income</span> {selectedApp.guardian_info?.income}</div>
                            </div>
                         </div>

                         {/* Education Info */}
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Education History</h3>
                            <div className="space-y-3">
                                {selectedApp.education_info?.map((edu, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-100">
                                        <div>
                                            <div className="font-bold text-sm text-slate-700">{edu.degree}</div>
                                            <div className="text-xs text-slate-500">{edu.board}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-blue-600">{edu.marks} Marks</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>
                 </div>
              </div>

              {/* Footer Actions */}
              <div className="p-5 border-t bg-white flex justify-end gap-3">
                 <button onClick={() => updateStatus(selectedApp.id, 'rejected')} className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded hover:bg-red-100 transition-colors">Reject Application</button>
                 <button onClick={() => updateStatus(selectedApp.id, 'admitted')} className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 shadow-lg shadow-green-200 transition-all">Approve & Admit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdmissionApplications;
