import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApplicant } from '../../../context/ApplicantContext';
import { CheckCircle, Clock, FileText, CreditCard, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeTab = () => {
  const { user } = useAuth();
  const { isProfileComplete, hasSubmittedApplication, hasFeeVoucher, applications } = useApplicant();

  const steps = [
    { id: 1, title: 'Complete Profile', description: 'Personal & Guardian Info', status: isProfileComplete ? 'completed' : 'pending', link: '/applicant/dashboard/profile' },
    { id: 2, title: 'Apply for Program', description: 'Select Degree & Education', status: hasSubmittedApplication ? 'completed' : (isProfileComplete ? 'pending' : 'locked'), link: '/applicant/dashboard/apply' },
    { id: 3, title: 'Upload Documents', description: 'CNIC, Mark Sheets', status: hasSubmittedApplication ? 'pending' : 'locked', link: '/applicant/dashboard/documents' }, // Simplified status logic
    { id: 4, title: 'Fee Voucher', description: 'Download & Pay', status: hasFeeVoucher ? 'pending' : 'locked', link: '/applicant/dashboard/voucher' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">Welcome, {user?.name}!</h1>
        <p className="text-slate-500 mt-2">Track your admission progress here. Complete each step to proceed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className={`p-4 rounded-xl border-2 transition-all ${
            step.status === 'completed' ? 'border-green-500 bg-green-50' : 
            step.status === 'locked' ? 'border-slate-200 bg-slate-50 opacity-60' : 
            'border-primary bg-white'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Step {step.id}</span>
              {step.status === 'completed' ? <CheckCircle className="h-5 w-5 text-green-500" /> : 
               step.status === 'locked' ? <Clock className="h-5 w-5 text-slate-400" /> : 
               <Clock className="h-5 w-5 text-primary" />}
            </div>
            <h3 className="font-bold text-slate-800">{step.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{step.description}</p>
            
            {step.status !== 'locked' && (
              <Link to={step.link} className="block mt-4 text-sm font-bold text-primary hover:underline">
                {step.status === 'completed' ? 'Review' : 'Start Now'} &rarr;
              </Link>
            )}
          </div>
        ))}
      </div>

      {applications.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Current Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase">
                <tr>
                  <th className="p-3">Program</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map(app => (
                  <tr key={app.id}>
                    <td className="p-3 font-medium">{app.program_name}</td>
                    <td className="p-3 text-slate-500">{new Date(app.submitted_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${
                        app.status === 'admitted' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {app.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeTab;
