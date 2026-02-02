import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Code, Database, Cpu, Globe, ArrowRight } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      id: 1,
      title: "Computer Science",
      degree: "B.Sc.",
      duration: "4 Years",
      icon: Code,
      desc: "Master the fundamentals of computing, algorithms, and software engineering."
    },
    {
      id: 2,
      title: "Data Science",
      degree: "B.Sc.",
      duration: "4 Years",
      icon: Database,
      desc: "Learn to analyze complex data sets and derive actionable insights."
    },
    {
      id: 3,
      title: "Information Technology",
      degree: "B.S.",
      duration: "4 Years",
      icon: Globe,
      desc: "Focus on network administration, cybersecurity, and IT infrastructure."
    },
    {
      id: 4,
      title: "Computer Engineering",
      degree: "B.E.",
      duration: "4 Years",
      icon: Cpu,
      desc: "Bridge the gap between hardware and software with embedded systems."
    }
  ];

  return (
    <>
      <SEO 
        title="Academic Programs" 
        description="Explore our diverse range of undergraduate and graduate programs in technology and engineering." 
      />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-primary text-white pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 font-heading"
            >
              Academic Programs
            </motion.h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Prepare for a successful career with our industry-aligned curriculum.
            </p>
          </div>
        </section>

        <section className="section-padding px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {programs.map((program, idx) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border border-slate-100"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <program.icon className="h-8 w-8 text-primary group-hover:text-white" />
                      </div>
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                        {program.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-primary mb-2 font-heading">{program.title}</h3>
                    <p className="text-slate-500 font-medium mb-4">{program.degree}</p>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {program.desc}
                    </p>
                    
                    <Link to={`/login?tab=admissions&program=${program.id}`} className="inline-flex items-center text-highlight font-semibold hover:text-teal-600 transition-colors">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Programs;
