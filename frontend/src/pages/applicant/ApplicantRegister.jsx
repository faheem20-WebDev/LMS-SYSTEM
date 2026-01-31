import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, Mail, Lock, Phone, User, Loader2, ArrowLeft } from 'lucide-react';

const ApplicantRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { registerApplicant } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await registerApplicant(formData.name, formData.email, formData.password, formData.phone);
      navigate('/applicant/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <Link to="/login" className="flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
        </Link>
        
        <div className="text-center mb-8">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Create Admission Account</h2>
          <p className="text-slate-500 text-sm mt-1">Register to apply for RSIIT programs</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input required type="text" className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="John Doe"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input required type="email" className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="john@example.com"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input required type="tel" className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="0300-1234567"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input required type="password" className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="••••••••"
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold hover:bg-amber-700 transition-colors flex justify-center">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Register Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicantRegister;
