import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import { Plus, Clock, FileText, CheckCircle, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { useAuth } from '../../context/AuthContext';

const ApplicantDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Dynamic API URL
  const API_URL = 'https://muhammadfaheem52006-lmsbackend.hf.space/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, appRes] = await Promise.all([
          axios.get(`${API_URL}/applicants/programs`),
          axios.get(`${API_URL}/applicants/my-applications`)
        ]);
        setPrograms(progRes.data);
        setMyApplications(appRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateVoucher = (app) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(30, 58, 138); // RSIIT Blue
    doc.text('RSIIT ADMISSION CHALLAN', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Rising Star Institute of Information and Technology', 105, 28, { align: 'center' });
    
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Applicant Info
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Applicant Name: ${user.name}`, 20, 50);
    doc.text(`Application ID: ${app.id}`, 140, 50);
    doc.text(`Program: ${app.program_name}`, 20, 60);
    doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 140, 60);

    // Fee Table
    doc.autoTable = null; // Basic text for now, can use autoTable plugin if installed
    
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 75, 170, 10, 'F');
    doc.setFont(undefined, 'bold');
    doc.text('Description', 25, 82);
    doc.text('Amount (PKR)', 150, 82);
    
    doc.setFont(undefined, 'normal');
    doc.text('Admission Processing Fee', 25, 95);
    doc.text('2,500', 150, 95);
    
    doc.setLineWidth(0.2);
    doc.line(20, 100, 190, 100);
    
    doc.setFont(undefined, 'bold');
    doc.text('Total Payable:', 110, 110);
    doc.text('PKR 2,500', 150, 110);

    // Bank Info
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Bank: HBL (Habib Bank Limited)', 20, 130);
    doc.text('Account Title: RSIIT Admissions', 20, 136);
    doc.text('Account No: 1234-56789012-03', 20, 142);

    doc.save(`RSIIT_Challan_${app.id}.pdf`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Admission Dashboard</h1>

        {/* Available Programs */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-slate-600 mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" /> Available Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(prog => (
              <div key={prog.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{prog.code}</span>
                  <span className="text-slate-400 text-xs">{prog.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{prog.name}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{prog.description}</p>
                <button 
                  onClick={() => navigate(`/applicant/apply/${prog.id}`)}
                  className="w-full py-2 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* My Applications */}
        <section>
          <h2 className="text-lg font-bold text-slate-600 mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-500" /> My Applications
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {myApplications.length === 0 ? (
              <div className="p-8 text-center text-slate-400">You haven't applied to any programs yet.</div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="p-4">Program</th>
                    <th className="p-4">Date Submitted</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myApplications.map(app => (
                    <tr key={app.id}>
                      <td className="p-4 font-medium">{app.program_name}</td>
                      <td className="p-4 text-slate-500 text-sm">{new Date(app.submitted_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                          ${app.status === 'fee_challan_issued' ? 'bg-amber-100 text-amber-700' : 
                            app.status === 'admitted' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                          {app.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-4">
                        {app.status === 'fee_challan_issued' && (
                          <button 
                            onClick={() => generateVoucher(app)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-bold"
                          >
                            <Download className="h-4 w-4" /> Voucher
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ApplicantDashboard;
