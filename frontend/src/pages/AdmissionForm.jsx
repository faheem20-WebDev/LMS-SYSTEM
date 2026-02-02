import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import logo from '../assets/logo.png';

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cnic: '',
    dob: '',
    program: 'BSCS',
    matricMarks: '',
    interMarks: '',
    address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for now (Will connect to backend later)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-4 border-green-500">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Application Submitted!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for applying to RSIIT. Your application ID has been sent to <strong>{formData.email}</strong>.
            Admissions office will contact you shortly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
          {/* Header inside card - simplified */}
          <div className="bg-white py-8 px-8 text-center border-b border-slate-100">
            <img src={logo} alt="RSIIT Logo" className="h-16 w-auto mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-primary">Student Details</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Information */}
            <section>
              <h3 className="text-lg font-bold text-primary border-b border-slate-100 pb-2 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Full Name</label>
                  <input required name="fullName" onChange={handleChange} type="text" className="input" placeholder="As per Matric Certificate" />
                </div>
                <div>
                  <label className="label">Date of Birth</label>
                  <input required name="dob" onChange={handleChange} type="date" className="input" />
                </div>
                <div>
                  <label className="label">Email Address</label>
                  <input required name="email" onChange={handleChange} type="email" className="input" placeholder="student@example.com" />
                </div>
                <div>
                  <label className="label">Phone Number</label>
                  <input required name="phone" onChange={handleChange} type="tel" className="input" placeholder="03XX-XXXXXXX" />
                </div>
              </div>
            </section>

            {/* Academic Information */}
            <section>
              <h3 className="text-lg font-bold text-primary border-b border-slate-100 pb-2 mb-4">Academic Background</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Matric / O-Level Marks</label>
                  <input required name="matricMarks" onChange={handleChange} type="number" className="input" placeholder="Total Marks / Percentage" />
                </div>
                <div>
                  <label className="label">Inter / A-Level Marks</label>
                  <input required name="interMarks" onChange={handleChange} type="number" className="input" placeholder="Total Marks / Percentage" />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Desired Program</label>
                  <select name="program" onChange={handleChange} className="input bg-white">
                    <option value="BSCS">BS Computer Science</option>
                    <option value="BSSE">BS Software Engineering</option>
                    <option value="BBA">Bachelor of Business Admin</option>
                    <option value="BSAI">BS Artificial Intelligence</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Submit Application'}
              </button>
              <p className="text-center text-xs text-slate-500 mt-4">
                By submitting, you confirm that all information provided is accurate to the best of your knowledge.
              </p>
            </div>
          </form>
        </div>
      </div>
  );
};

export default AdmissionForm;