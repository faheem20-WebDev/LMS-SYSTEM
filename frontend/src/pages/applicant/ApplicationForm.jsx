import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../../components/DashboardLayout';
import { ArrowRight, ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Dynamic API URL
const API_URL = 'https://muhammadfaheem52006-lmsbackend.hf.space/api';

const ApplicationForm = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Personal
    fullName: '', dob: '', cnic: '', nationality: 'Pakistani', religion: 'Islam', bloodGroup: '',
    // Contact
    address: '', city: '', district: '', phone: '', email: '',
    // Guardian
    fatherName: '', fatherCnic: '', fatherOccupation: '', fatherIncome: '',
    // Education (Simplified for prototype)
    matricMarks: '', interMarks: '', board: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/applicants/apply`, {
        program_id: programId,
        personal_info: {
          fullName: formData.fullName, dob: formData.dob, cnic: formData.cnic,
          nationality: formData.nationality, religion: formData.religion, bloodGroup: formData.bloodGroup
        },
        contact_info: {
          address: formData.address, city: formData.city, district: formData.district,
          phone: formData.phone, email: formData.email
        },
        guardian_info: {
          fatherName: formData.fatherName, fatherCnic: formData.fatherCnic,
          occupation: formData.fatherOccupation, income: formData.fatherIncome
        },
        education_info: [
          { degree: 'Matric', marks: formData.matricMarks, board: formData.board },
          { degree: 'Intermediate', marks: formData.interMarks, board: formData.board }
        ]
      });
      navigate('/applicant/dashboard');
    } catch (err) {
      alert('Application Failed: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-4">
          <div className="flex items-center justify-between text-sm font-bold text-slate-500">
            <span className={step >= 1 ? 'text-blue-600' : ''}>1. Personal</span>
            <span className={step >= 2 ? 'text-blue-600' : ''}>2. Contact</span>
            <span className={step >= 3 ? 'text-blue-600' : ''}>3. Guardian</span>
            <span className={step >= 4 ? 'text-blue-600' : ''}>4. Education</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${step * 25}%` }}></div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold mb-6 text-slate-800">
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Contact Details'}
            {step === 3 && 'Guardian Information'}
            {step === 4 && 'Academic History'}
          </h2>

          <form className="space-y-6">
            {/* Step 1: Personal */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="fullName" value={formData.fullName} onChange={handleChange} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Date of Birth</label><input type="date" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="dob" value={formData.dob} onChange={handleChange} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">CNIC / B-Form</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="cnic" value={formData.cnic} onChange={handleChange} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Blood Group</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} /></div>
              </div>
            )}

            {/* Step 2: Contact */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2"><label className="block text-sm font-semibold text-slate-700 mb-1">Address</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="address" value={formData.address} onChange={handleChange} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">City</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="city" value={formData.city} onChange={handleChange} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Mobile No</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="phone" value={formData.phone} onChange={handleChange} /></div>
              </div>
            )}

            {/* Step 3: Guardian */}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Father Name</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="fatherName" value={formData.fatherName} onChange={handleChange} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Father CNIC</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="fatherCnic" value={formData.fatherCnic} onChange={handleChange} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Occupation</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Monthly Income</label><input type="number" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="fatherIncome" value={formData.fatherIncome} onChange={handleChange} /></div>
              </div>
            )}

            {/* Step 4: Education */}
            {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Matric Marks</label><input type="number" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="matricMarks" value={formData.matricMarks} onChange={handleChange} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">Inter Marks</label><input type="number" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="interMarks" value={formData.interMarks} onChange={handleChange} /></div>
                <div className="col-span-2"><label className="block text-sm font-semibold text-slate-700 mb-1">Board / University</label><input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" name="board" value={formData.board} onChange={handleChange} /></div>
              </div>
            )}
          </form>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center text-slate-600 font-bold hover:text-blue-600">
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </button>
            ) : <div></div>}

            {step < 4 ? (
              <button onClick={() => setStep(step + 1)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center">
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="bg-green-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center">
                {loading ? 'Submitting...' : 'Submit Application'} <CheckCircle className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationForm;
