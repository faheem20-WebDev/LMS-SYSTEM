import React, { useState } from 'react';
import { Upload, CheckCircle, FileText } from 'lucide-react';
import { useApplicant } from '../../../context/ApplicantContext';

const DocumentsTab = () => {
  const { hasSubmittedApplication } = useApplicant();
  const [uploads, setUploads] = useState({
    cnic: null,
    matric: null,
    inter: null,
    certificate: null
  });

  const handleFileChange = (e, type) => {
    setUploads({ ...uploads, [type]: e.target.files[0] });
  };

  const handleUpload = () => {
    // Simulate upload
    alert("Documents uploaded successfully (Simulated).");
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Academic Documents</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'cnic', label: 'CNIC / B-Form' },
          { id: 'matric', label: 'Matriculation Mark Sheet' },
          { id: 'inter', label: 'Intermediate Mark Sheet' },
          { id: 'certificate', label: 'Character Certificate (Optional)' }
        ].map(doc => (
          <div key={doc.id} className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
            {uploads[doc.id] ? (
              <div className="text-green-600">
                <CheckCircle className="h-10 w-10 mx-auto mb-2" />
                <p className="text-sm font-bold">{uploads[doc.id].name}</p>
                <button onClick={() => setUploads({...uploads, [doc.id]: null})} className="text-xs text-red-500 mt-2 hover:underline">Remove</button>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-slate-300 mb-3" />
                <label className="block text-sm font-bold text-slate-600 mb-1">{doc.label}</label>
                <input 
                  type="file" 
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  onChange={(e) => handleFileChange(e, doc.id)}
                />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleUpload}
          disabled={!uploads.cnic || !uploads.matric}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Upload All Documents
        </button>
      </div>
    </div>
  );
};

export default DocumentsTab;
