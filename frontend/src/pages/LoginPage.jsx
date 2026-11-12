import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock, Mail, Loader2, User, BookOpen,
  ShieldCheck, FileText, Award, GraduationCap,
  Eye, EyeOff, AlertCircle, ArrowRight,
} from 'lucide-react';
import logo from '../assets/logo.png';

/* ── Tab definitions (IDs, labels, icons — all preserved) ── */
const tabs = [
  { id: 'student',    label: 'Student',    icon: User,        accent: '#2563EB', accentLight: '#EFF6FF', accentText: '#1D4ED8' },
  { id: 'teacher',    label: 'Faculty',    icon: BookOpen,    accent: '#7C3AED', accentLight: '#F5F3FF', accentText: '#6D28D9' },
  { id: 'admin',      label: 'Admin',      icon: ShieldCheck, accent: '#172B46', accentLight: '#F1F5F9', accentText: '#172B46' },
  { id: 'admissions', label: 'Admissions', icon: FileText,    accent: '#D97706', accentLight: '#FFFBEB', accentText: '#B45309' },
  { id: 'alumni',     label: 'Alumni',     icon: Award,       accent: '#059669', accentLight: '#ECFDF5', accentText: '#047857' },
];

const LoginPage = () => {
  const [searchParams]              = useSearchParams();
  const [activeTab, setActiveTab]   = useState('student');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [error, setError]           = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login }  = useAuth();
  const navigate   = useNavigate();

  /* Preserve ?tab= param behaviour */
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabs.find(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const activeTabConfig = tabs.find(t => t.id === activeTab) || tabs[0];

  /* ── Preserved login handler (unchanged logic) ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const data = await login(email, password);

      if (activeTab === 'admin' && data.user.role !== 'admin') {
        throw new Error('Unauthorized access. You are not an Admin.');
      }

      if      (data.user.role === 'admin')     navigate('/admin');
      else if (data.user.role === 'teacher')   navigate('/teacher');
      else if (data.user.role === 'applicant') navigate('/applicant/dashboard');
      else                                     navigate('/dashboard');
    } catch (err) {
      setError(err.message || err.response?.data?.msg || 'Failed to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailLabel =
    activeTab === 'student' ? 'Enrollment Number' : 'Email Address';
  const emailPlaceholder =
    activeTab === 'admin'   ? 'admin@rsiit.edu.pk'  :
    activeTab === 'student' ? 'RSIIT-2026-XXXX'     : 'name@rsiit.edu.pk';

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex flex-col">

      {/* ── Decorative top band ── */}
      <div
        className="flex-shrink-0 h-2 w-full"
        style={{ background: `linear-gradient(90deg, #172B46 0%, ${activeTabConfig.accent} 100%)` }}
      />

      {/* ── Main content ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">

          {/* ── Card ── */}
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl shadow-slate-200/60 overflow-hidden">

            {/* Card top-bar colored by role */}
            <div
              className="h-1.5 w-full transition-colors duration-300"
              style={{ backgroundColor: activeTabConfig.accent }}
            />

            <div className="px-8 pt-8 pb-10 space-y-7">

              {/* ── Brand header ── */}
              <div className="text-center">
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-2xl blur-lg opacity-20 transition-colors duration-300"
                      style={{ backgroundColor: activeTabConfig.accent }}
                    />
                    <div className="relative h-16 w-16 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center">
                      <img src={logo} alt="RSIIT Logo" className="h-11 w-auto object-contain" />
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-[#172B46] leading-tight">
                  RSIIT University Portal
                </h1>
                <p className="text-sm text-[#64748B] mt-1">
                  Secure access to academic services
                </p>
              </div>

              {/* ── Role tabs ── */}
              <div className="flex flex-wrap gap-2 justify-center p-1 bg-[#F3F6FA] rounded-2xl border border-[#E2E8F0]">
                {tabs.map(({ id, label, icon: Icon, accent, accentLight }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setActiveTab(id); setError(''); }}
                      className="relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer min-w-[64px]"
                      style={isActive
                        ? { backgroundColor: accent, color: '#fff', boxShadow: `0 2px 8px ${accent}40` }
                        : { backgroundColor: 'transparent', color: '#64748B' }
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* ── Active role context banner ── */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-300"
                style={{ backgroundColor: activeTabConfig.accentLight, color: activeTabConfig.accentText }}
              >
                {React.createElement(activeTabConfig.icon, { className: 'h-4 w-4 flex-shrink-0' })}
                <span>
                  {activeTab === 'admissions'
                    ? 'Applicant Portal — sign in with your registered credentials'
                    : `${activeTabConfig.label} Login — enter your credentials below`
                  }
                </span>
              </div>

              {/* ── Admissions register CTA ── */}
              {activeTab === 'admissions' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-amber-800">New to RSIIT? Start your journey today.</p>
                  <button
                    type="button"
                    onClick={() => navigate('/applicant/register')}
                    className="flex-shrink-0 flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors whitespace-nowrap"
                  >
                    Create Account <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* ── Error alert ── */}
              {error && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              {/* ── Login form (logic preserved) ── */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email / Enrollment */}
                <div>
                  <label className="block text-sm font-semibold text-[#172B46] mb-1.5">
                    {emailLabel}
                  </label>
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
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#172B46] placeholder:text-[#94A3B8] outline-none transition-all duration-200 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-[#172B46]">Password</label>
                    <a
                      href="#"
                      className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                    >
                      Forgot password?
                    </a>
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
                      className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#172B46] placeholder:text-[#94A3B8] outline-none transition-all duration-200 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(s => !s)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#94A3B8] hover:text-[#64748B] transition-colors"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-60 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.98]"
                  style={{ backgroundColor: activeTabConfig.accent }}
                >
                  {isSubmitting
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</>
                    : <><GraduationCap className="h-4 w-4" /> Access Portal</>
                  }
                </button>
              </form>

              {/* ── Footer links ── */}
              <div className="text-center pt-2 border-t border-[#E2E8F0]">
                <p className="text-xs text-[#64748B]">
                  New applicant?{' '}
                  <Link
                    to="/applicant/register"
                    className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                  >
                    Register here
                  </Link>
                  {' · '}
                  <Link
                    to="/"
                    className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                  >
                    Back to home
                  </Link>
                </p>
              </div>

            </div>
          </div>

          {/* ── Below-card trust badges ── */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Secure SSL
            </span>
            <span className="h-3 w-px bg-[#E2E8F0]" />
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-blue-400" /> Encrypted
            </span>
            <span className="h-3 w-px bg-[#E2E8F0]" />
            <span>© 2026 RSIIT University</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
