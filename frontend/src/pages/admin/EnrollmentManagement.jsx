import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import { CheckCircle, XCircle, Loader2, User, Book } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'https://muhammadfaheem52006-lmsbackend.hf.space/api';

const EnrollmentManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchRequests();
  }, [token]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/courses/requests`);
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setActionLoading(id);
    try {
      await axios.put(`${API_URL}/courses/request-status`, {
        enrollment_id: id,
        status: status
      });
      // Remove the processed request from the list
      setRequests(requests.filter(req => req.id !== id));
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-rsiit-slate">Enrollment Requests</h1>
          <p className="text-slate-500">Review and manage student course registration applications.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                  <tr>
                    <th className="p-4">Student</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Requested Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <User className="h-4 w-4" />
                          </div>
                          <span className="font-semibold text-slate-700">{req.student_name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Book className="h-4 w-4 text-slate-400" />
                          <span>{req.course_name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-500">
                        {new Date(req.requested_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            disabled={actionLoading === req.id}
                            onClick={() => handleStatusUpdate(req.id, 'approved')}
                            className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-green-100 transition-colors"
                          >
                            {actionLoading === req.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3" />}
                            Approve
                          </button>
                          <button
                            disabled={actionLoading === req.id}
                            onClick={() => handleStatusUpdate(req.id, 'denied')}
                            className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors"
                          >
                            <XCircle className="h-3 w-3" />
                            Deny
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-12 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                          <CheckCircle className="h-12 w-12 text-slate-200" />
                          <p className="text-lg font-medium">No pending requests!</p>
                          <p className="text-sm">All student registrations have been processed.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EnrollmentManagement;
