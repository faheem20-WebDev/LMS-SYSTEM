import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ClipboardList, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const Admissions = () => {
  const steps = [
    { title: "Application", desc: "Submit your online application form with personal details.", icon: ClipboardList },
    { title: "Review", desc: "Our team reviews your academic records and eligibility.", icon: CheckCircle },
    { title: "Test/Interview", desc: "Qualify through our entrance exam or interview process.", icon: Calendar },
    { title: "Enrollment", desc: "Receive your offer letter and complete the enrollment.", icon: CheckCircle }
  ];

  return (
    <>
      <SEO title="Admissions" description="Start your journey at RSIIT. Apply now for our undergraduate and graduate programs." />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-primary text-white pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 font-heading"
            >
              Admissions
            </motion.h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your future starts here. Join a community of innovators and leaders.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="section-padding px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4 font-heading">How to Apply</h2>
              <div className="w-20 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>
              
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white pt-4 text-center"
                >
                  <div className="w-16 h-16 bg-white border-4 border-accent rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm z-10 relative">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link to="/login?tab=admissions" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                Start Your Application <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-slate-50 section-padding px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-primary mb-6 font-heading">General Requirements</h3>
            <ul className="space-y-4">
              {[
                "High School Diploma or equivalent (for Undergraduate)",
                "Bachelor's Degree in relevant field (for Graduate)",
                "Official Transcripts",
                "Proof of English Proficiency",
                "Valid ID / Passport"
              ].map((req, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-highlight flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default Admissions;
