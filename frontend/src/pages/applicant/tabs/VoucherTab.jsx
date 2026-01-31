import React, { useState } from 'react';
import { useApplicant } from '../../../context/ApplicantContext';
import { Download, Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useAuth } from '../../../context/AuthContext';

const VoucherTab = () => {
  const { applications, hasSubmittedApplication } = useApplicant();
  const { user } = useAuth();
  const [receipt, setReceipt] = useState(null);

  const generateVoucher = (app) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(10, 37, 64); // Primary Navy
    doc.text('RSIIT ADMISSION CHALLAN', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Rising Star Institute of Information and Technology', 105, 28, { align: 'center' });
    
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Applicant Info
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Applicant Name: ${user?.name}`, 20, 50);
    doc.text(`Application ID: ${app.id}`, 140, 50);
    doc.text(`Program: ${app.program_name}`, 20, 60);
    doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 140, 60);

    // Fee Details
    doc.setFillColor(245, 247, 250); // Light Gray
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
    doc.text('QuickPay ID: 998877', 20, 148);

    doc.save(`RSIIT_Challan_${app.id}.pdf`);
  };

  if (!hasSubmittedApplication) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <AlertTriangle className="h-16 w-16 text-amber-400 mb-4" />
        <h2 className="text-xl font-bold text-slate-500">No Vouchers Available</h2>
        <p className="text-slate-400 mt-2">Please submit an application to generate a fee voucher.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Fee Voucher</h1>

      {applications.map(app => (
        <div key={app.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-700">{app.program_name}</h2>
              <p className="text-sm text-slate-500">Application ID: {app.id}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize
              ${app.status === 'fee_challan_issued' ? 'bg-amber-100 text-amber-700' : 
                app.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
              {app.status === 'fee_challan_issued' ? 'Payment Pending' : app.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Voucher Details */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Amount Due:</span>
                  <span className="font-bold text-slate-800">PKR 2,500</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">QuickPay ID:</span>
                  <span className="font-bold text-blue-600">998877</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Bank Branch:</span>
                  <span className="font-bold text-slate-800">HBL Any Branch</span>
                </div>
              </div>
              
              <button 
                onClick={() => generateVoucher(app)}
                className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary/5 transition-colors"
              >
                <Download className="h-5 w-5" /> Download Voucher PDF
              </button>
            </div>

            {/* Upload Receipt */}
            <div className="border-l pl-8 border-slate-100">
               <h3 className="font-bold text-slate-700 mb-4">Upload Paid Slip</h3>
               {receipt ? (
                 <div className="text-center p-6 border-2 border-green-200 bg-green-50 rounded-lg">
                   <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                   <p className="text-sm font-bold text-green-800">Receipt Uploaded</p>
                   <p className="text-xs text-green-600 mt-1">{receipt.name}</p>
                 </div>
               ) : (
                 <div className="space-y-4">
                   <label className="block w-full cursor-pointer border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all">
                     <Upload className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                     <span className="text-sm font-bold text-slate-500">Click to upload image/PDF</span>
                     <input type="file" className="hidden" onChange={(e) => setReceipt(e.target.files[0])} />
                   </label>
                   <button 
                     disabled={!receipt}
                     className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     Submit Payment Proof
                   </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoucherTab;
