import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApplicant } from '../../../context/ApplicantContext';
import { CheckCircle, AlertCircle, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://muhammadfaheem52006-lmsbackend.hf.space/api';

const ApplyTab = () => {
  const { profile, education, setEducation, fetchApplications } = useApplicant();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get(`${API_URL}/applicants/programs`);
        setPrograms(res.data);
      } catch (err) {
        console.error("Failed to fetch programs", err);
      }
    };
    fetchPrograms();
  }, []);

  const handleEducationChange = (level, field, value) => {
    setEducation(prev => ({
      ...prev,
      [level]: { ...prev[level], [field]: value }
    }));
  };

  const handleSubmit = async () => {
    if (!selectedProgram) {
      alert("Please select a program.");
      return;
    }
    // Basic validation
    if (!education.matric.marks || !education.matric.board) {
      alert("Please complete Matriculation details.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        program_id: selectedProgram,
        personal_info: {
            fullName: profile.fullName, dob: profile.dob, cnic: profile.cnic,
            nationality: profile.nationality, religion: profile.religion, bloodGroup: profile.bloodGroup
        },
        contact_info: {
            address: profile.address, city: profile.city, district: profile.district,
            phone: profile.phone, email: profile.email
        },
        guardian_info: {
            fatherName: profile.fatherName, fatherCnic: profile.fatherCnic,
            occupation: profile.fatherOccupation, income: profile.fatherIncome
        },
        education_info: [
            { degree: 'Matric', ...education.matric },
            { degree: 'Intermediate', ...education.intermediate }
        ]
      };

      await axios.post(`${API_URL}/applicants/apply`, payload);
      await fetchApplications(); // Refresh context
      navigate('/applicant/dashboard/documents');
    } catch (err) {
      console.error(err);
      alert('Application Failed: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <h1 className="text-2xl font-bold text-slate-800">Apply for Program</h1>
       
       {/* Program Selection */}
       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
         <h2 className="text-lg font-bold text-slate-700 mb-4">1. Select Degree Program</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {programs.map(prog => (
             <div 
               key={prog.id} 
               onClick={() => setSelectedProgram(prog.id)}
               className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${selectedProgram === prog.id ? 'border-primary bg-primary/10 ring-2 ring-primary/20' : 'border-slate-200 hover:border-slate-300'}`}
             >
               <div className="flex justify-between items-center mb-2">
                 <span className="font-bold text-slate-800">{prog.name}</span>
                 {selectedProgram === prog.id && <CheckCircle className="h-5 w-5 text-primary" />}
               </div>
               <p className="text-xs text-slate-500">{prog.duration} • {prog.code}</p>
             </div>
           ))}
         </div>
       </div>

       {/* Education Details */}
       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
         <h2 className="text-lg font-bold text-slate-700 mb-4">2. Education Details</h2>
         
         {/* Matric */}
         <div className="mb-6 pb-6 border-b border-slate-100">
            <h3 className="font-semibold text-slate-600 mb-3 flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Matric / O-Level</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div><label className="label">Board/University</label><input className="input" value={education.matric.board} onChange={(e) => handleEducationChange('matric', 'board', e.target.value)} /></div>
               <div><label className="label">Marks Obtained</label><input type="number" className="input" value={education.matric.marks} onChange={(e) => handleEducationChange('matric', 'marks', e.target.value)} /></div>
               <div><label className="label">Total Marks</label><input type="number" className="input" value={education.matric.total} onChange={(e) => handleEducationChange('matric', 'total', e.target.value)} /></div>
            </div>
         </div>

         {/* Intermediate */}
         <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-slate-600 flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Intermediate / A-Level</h3>
              <div className="flex items-center gap-2">
                 <label className="text-sm font-semibold text-slate-600">Status:</label>
                 <select 
                    className="p-1 border border-slate-300 rounded text-sm outline-none"
                    value={education.intermediate.passed ? 'passed' : 'appearing'}
                    onChange={(e) => handleEducationChange('intermediate', 'passed', e.target.value === 'passed')}
                 >
                   <option value="passed">Passed</option>
                   <option value="appearing">Appearing (Result Awaited)</option>
                 </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div><label className="label">Board/University</label><input className="input" value={education.intermediate.board} onChange={(e) => handleEducationChange('intermediate', 'board', e.target.value)} /></div>
               {education.intermediate.passed && (
                 <>
                   <div><label className="label">Marks Obtained</label><input type="number" className="input" value={education.intermediate.marks} onChange={(e) => handleEducationChange('intermediate', 'marks', e.target.value)} /></div>
                   <div><label className="label">Total Marks</label><input type="number" className="input" value={education.intermediate.total} onChange={(e) => handleEducationChange('intermediate', 'total', e.target.value)} /></div>
                 </>
               )}
            </div>
         </div>
       </div>

       <div className="flex justify-end pt-4">
         <button 
           onClick={handleSubmit} 
           disabled={loading}
           className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-900/20 transition-all flex items-center gap-2"
         >
            {loading ? 'Submitting...' : 'Submit Application'}
         </button>
       </div>
    </div>
  );
};

export default ApplyTab;
