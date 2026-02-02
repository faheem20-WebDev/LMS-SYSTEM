import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { User, ShieldCheck, GraduationCap } from 'lucide-react';

const Portal = () => {
  return (
    <>
      <SEO title="Portals" description="Access RSIIT student, applicant, and administrative portals." />

      <div className="min-h-screen bg-slate-50">
        {/* Brand Header */}
        <div className="bg-primary pt-32 pb-24 px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 font-heading">University Portals</h1>
          <p className="text-blue-200">Gateway to RSIIT Academic & Administrative Services</p>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4 -mt-12 pb-20">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all text-center border-t-4 border-highlight"
            >
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-10 w-10 text-highlight" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">Applicant Portal</h2>
              <p className="text-slate-600 mb-8 h-12">Track your application status and manage documents.</p>
              <Link to="/applicant/dashboard" className="btn-primary w-full block">Login</Link>
              <div className="mt-4">
                <Link to="/applicant/register" className="text-sm text-slate-500 hover:text-highlight">Create Account</Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all text-center border-t-4 border-primary"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">Student Portal</h2>
              <p className="text-slate-600 mb-8 h-12">Access courses, grades, and academic resources.</p>
              <Link to="/login" className="btn-primary w-full block">Login</Link>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all text-center border-t-4 border-accent"
            >
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-10 w-10 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">Staff & Faculty</h2>
              <p className="text-slate-600 mb-8 h-12">Administrative access for staff and faculty members.</p>
              <Link to="/login" className="btn-primary w-full block">Login</Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portal;
