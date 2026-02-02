import React, { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, FileText, Loader2 } from 'lucide-react';
import { useApplicant } from '../../../context/ApplicantContext';
import { useAuth } from '../../../context/AuthContext';

const API_URL = 'https://muhammadfaheem52006-lmsbackend.hf.space/api';

const DocumentsTab = () => {
  const { hasSubmittedApplication, applications, fetchApplications } = useApplicant();
  const { token } = useAuth();
  const [uploading, setUploading] = useState({}); // Track uploading state per file
  
  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Auto upload on select
    await uploadFile(file, type);
  };

  const uploadFile = async (file, type) => {
    if (!applications[0]?.id) return;
    
    setUploading(prev => ({ ...prev, [type]: true }));
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Upload File
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      });
      
      const filePath = res.data.filePath;

      // 2. Link to Application (Only for profile and voucher for now)
      if (type === 'profile' || type === 'voucher') {
        await axios.put(`${API_URL}/applicants/documents`, {
          applicationId: applications[0].id,
          type: type,
          filePath: filePath
        }, {
          headers: { 'x-auth-token': token }
        });
        
        // Refresh data
        await fetchApplications();
        alert(`${type === 'profile' ? 'Profile Picture' : 'Voucher'} uploaded successfully!`);
      } else {
        // For other docs, we might just store them locally in state or separate table
        // For this prototype, we'll just simulate success for non-core docs
        alert("Document uploaded (Prototype only saves Profile & Voucher to DB)");
      }

    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  if (!hasSubmittedApplication) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <FileText className="h-16 w-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-500">Application Required</h2>
        <p className="text-slate-400 mt-2">Please submit your application first to upload documents.</p>
      </div>
    );
  }

  const app = applications[0]; // Latest application

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Upload Documents</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'profile', label: 'Passport Size Photograph', current: app.profile_image },
          { id: 'voucher', label: 'Paid Fee Voucher Copy', current: app.voucher_image },
          { id: 'matric', label: 'Matriculation Mark Sheet', current: null }, // Placeholder
          { id: 'inter', label: 'Intermediate Mark Sheet', current: null }    // Placeholder
        ].map(doc => (
          <div key={doc.id} className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-200 transition-colors relative">
            
            {uploading[doc.id] ? (
              <div className="flex flex-col items-center text-blue-600">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <span className="text-xs font-bold">Uploading...</span>
              </div>
            ) : doc.current ? (
              <div className="text-green-600 flex flex-col items-center">
                <div className="relative mb-2">
                    <img src={`https://muhammadfaheem52006-lmsbackend.hf.space${doc.current}`} alt="Uploaded" className="h-20 w-20 object-cover rounded-full border border-slate-200" />
                    <CheckCircle className="absolute -bottom-1 -right-1 h-6 w-6 text-green-600 bg-white rounded-full" />
                </div>
                <p className="text-sm font-bold">Uploaded</p>
                <label className="text-xs text-blue-500 mt-2 hover:underline cursor-pointer">
                  Change
                  <input type="file" className="hidden" onChange={(e) => handleFileChange(e, doc.id)} />
                </label>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-slate-300 mb-3" />
                <label className="block text-sm font-bold text-slate-600 mb-1">{doc.label}</label>
                <input 
                  type="file" 
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  onChange={(e) => handleFileChange(e, doc.id)}
                />
              </>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
        <strong>Note:</strong> Please upload clear images (JPG/PNG). Profile picture should be recent.
      </div>
    </div>
  );
};

export default DocumentsTab;
