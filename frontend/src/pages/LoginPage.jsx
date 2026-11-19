import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock, Mail, Loader2, User, BookOpen,
  ShieldCheck, FileText, Award, GraduationCap,
  Eye, EyeOff, AlertCircle, ArrowRight,
} from 'lucide-react';
import logo from '../assets/logo.png';

/* ── Tab definitions (preserved) ── */
const tabs = [
  { id: 'student',    label: 'Student',    icon: User,        accent: '#2563EB', accentLight: '#EFF6FF', accentText: '#1D4ED8' },
  { id: 'teacher',    label: 'Faculty',    icon: BookOpen,    accent: '#7C3AED', accentLight: '#F5F3FF', accentText: '#6D28D9' },
  { id: 'admin',      label: 'Admin',      icon: ShieldCheck, accent: '#172B46', accentLight: '#F1F5F9', accentText: '#172B46' },
  { id: 'admissions', label: 'Admissions', icon: FileText,    accent: '#D97706', accentLight: '#FFFBEB', accentText: '#B45309' },
  { id: 'alumni',     label: 'Alumni',     icon: Award,       accent: '#059669', accentLight: '#ECFDF5', accentText: '#047857' },
];

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Preserve ?tab= param behaviour
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabs.find(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const data = await login(email, password);

      // Backend already enforces RBAC – keep this guard for admin tab
      if (activeTab === 'admin' && data.user.role !== 'admin') {
        throw new Error('Unauthorized access. You are not an Admin.');
      }

      // Redirect based on role returned from the server
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

  const emailLabel = activeTab === 'student' ? 'Enrollment Number' : 'Email Address';
  const emailPlaceholder =
    activeTab === 'admin'   ? 'admin@rsiit.edu.pk' :
    activeTab === 'student' ? 'RSIIT-2026-XXXX'    :
    'name@rsiit.edu.pk';

  const activeConfig = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with logo */}
        <div className="flex flex-col items-center py-8 px-6 bg-white">
          <img src={logo} alt="RSIIT Logo" className="h-12 w-auto mb-3" />
          <h1 className="text-2xl font-bold text-[#172B46]">RSIIT University Portal</h1>
          <p className="text-sm text-[#64748B] mt-1">Secure access to academic services</p>
        </div>

        {/* Role selector – retained because the backend supports it */}
        <div className="flex gap-2 justify-center bg-[#F3F6FA] p-2 border-t border-b border-[#E2E8F0]">
          {tabs.map(({ id, label, icon: Icon, accent, accentLight }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => { setActiveTab(id); setError(''); }}
                className="flex flex-col items-center gap-1 text-xs font-medium px-3 py-2 rounded-xl transition-colors"
                style={isActive
                  ? { backgroundColor: accent, color: '#fff', boxShadow: `0 2px 8px ${accent}40` }
                  : { backgroundColor: 'transparent', color: '#64748B' }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Role banner */}
        <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: activeConfig.accentLight, color: activeConfig.accentText }}>
          {React.createElement(activeConfig.icon, { className: 'h-4 w-4 flex-shrink-0' })}
          <span className="text-sm font-semibold">
            {activeTab === 'admissions'
              ? 'Applicant Portal — sign in with your registered credentials'
              : `${activeConfig.label} Login`}
          </span>
        </div>

        {/* Admissions call‑to‑action */}
        {activeTab === 'admissions' && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mx-4 my-3 flex items-center justify-between">
            <p className="text-sm text-amber-800">New to RSIIT? Start your journey today.</p>
            <button
              type="button"
              onClick={() => navigate('/applicant/register')}
              className="flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors"
            >
              Create Account <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Error alert */}
        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mx-4 mt-2">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Email / Enrollment */}
          <div>
            <label className="block text-sm font-semibold text-[#172B46] mb-1.5">{emailLabel}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#94A3B8]" />
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                className="input pl-11"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-[#172B46]">Password</label>
              <Link to="#" className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">Forgot password?</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#94A3B8]" />
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#94A3B8] hover:text-[#64748B] transition-colors"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white transition-colors disabled:opacity-60 shadow-sm hover:shadow-md active:scale-[0.98]"
            style={{ backgroundColor: activeConfig.accent }}
          >
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : <><GraduationCap className="h-4 w-4" /> Access Portal</>}
          </button>
        </form>

        {/* Footer links */}
        <div className="text-center pt-2 border-t border-[#E2E8F0] text-xs text-[#64748B] pb-4">
          {activeTab === 'admissions' && (
            <>
              New applicant?{' '}
              <Link
                to="/applicant/register"
                className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
              >
                Register here
              </Link>
              {' · '}
            </>
          )}
          <Link
            to="/"
            className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
