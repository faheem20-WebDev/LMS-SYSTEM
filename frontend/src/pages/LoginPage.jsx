import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  Loader2, 
  User, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Award,
  GraduationCap
} from 'lucide-react';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['student', 'teacher', 'admin', 'admissions', 'alumni'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const tabs = [
    { id: 'student', label: 'Student', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'teacher', label: 'Faculty', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, color: 'text-slate-700', bg: 'bg-slate-100' },
    { id: 'admissions', label: 'Admissions', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'alumni', label: 'Alumni', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const data = await login(email, password);
      
      if (activeTab === 'admin' && data.user.role !== 'admin') {
        throw new Error('Unauthorized access. You are not an Admin.');
      }
      
      if (data.user.role === 'admin') navigate('/admin');
      else if (data.user.role === 'teacher') navigate('/teacher');
      else if (data.user.role === 'applicant') navigate('/applicant/dashboard');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.message || err.response?.data?.msg || 'Failed to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeTabConfig = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header for Transparent Navbar Support */}
      <div className="bg-primary pt-32 pb-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-white font-heading">University Portal</h1>
        <p className="text-blue-200 mt-2">Secure access to RSIIT services</p>
      </div>

      <div className="flex items-center justify-center px-6 -mt-12 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="RSIIT Logo" className="h-20 w-auto object-contain" />
            </div>
            <h2 className="text-2xl font-extrabold text-primary">Sign In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Select your role to access the system.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setError(''); }}
                  className={`flex flex-col items-center justify-center p-3 w-20 sm:w-24 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg ring-2 ring-slate-700 transform scale-105' 
                      : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`h-6 w-6 mb-1 ${isActive ? 'text-white' : tab.color}`} />
                  <span className="text-xs font-bold">{tab.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Tab Specific Header */}
          <div className={`text-center py-2 ${activeTabConfig.bg} rounded-lg border border-opacity-20 border-gray-400`}>
            <h3 className={`text-lg font-bold ${activeTabConfig.color}`}>
              {activeTab === 'admissions' ? 'Applicant Portal' : `${activeTabConfig.label} Login`}
            </h3>
          </div>

          {/* Admissions Specific Content */}
          {activeTab === 'admissions' && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-amber-800">
                    New to RSIIT? Start your journey today.
                  </p>
                  <div className="mt-2">
                    <button 
                      onClick={() => navigate('/applicant/register')}
                      className="text-sm font-bold text-amber-800 underline hover:text-amber-900 cursor-pointer"
                    >
                      Create Applicant Account &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  {activeTab === 'admissions' ? 'Application ID / Email' : 
                   activeTab === 'student' ? 'Email Address / Enrollment No' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all bg-white"
                    placeholder={activeTab === 'admin' ? "admin@rsiit.edu.pk" : 
                                 activeTab === 'student' ? "name@rsiit.edu.pk or RSIIT-2026-XXXX" : "name@rsiit.edu.pk"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all bg-white"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-blue-800">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-70 cursor-pointer ${
                  activeTab === 'student' ? 'bg-primary hover:bg-slate-900 focus:ring-slate-500' :
                  activeTab === 'teacher' ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' :
                  activeTab === 'admin' ? 'bg-slate-800 hover:bg-slate-900 focus:ring-slate-500' :
                  activeTab === 'admissions' ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500' :
                  'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                }`}
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Access Portal'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;