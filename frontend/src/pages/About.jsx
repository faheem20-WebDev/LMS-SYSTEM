import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { CheckCircle, Award, Users, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about RSIIT's history, mission, and commitment to educational excellence." 
      />
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-primary text-white pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 font-heading"
            >
              About RSIIT
            </motion.h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Building the future through innovation, leadership, and academic rigor.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6 font-heading">Our Mission</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                At Rising Star Institute of Information and Technology, our mission is to empower students with cutting-edge knowledge and practical skills. We are dedicated to fostering a learning environment that encourages creativity, critical thinking, and ethical leadership.
              </p>
              <h2 className="text-3xl font-bold text-primary mb-6 font-heading">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be a globally recognized institution that shapes the technology leaders of tomorrow, driving positive change in society through research and innovation.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-100 rounded-2xl h-96 flex items-center justify-center border border-slate-200"
            >
              <span className="text-slate-400">Campus Image Placeholder</span>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-slate-50 section-padding px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4 font-heading">Our Core Values</h2>
              <div className="w-20 h-1 bg-accent mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Award, title: "Excellence", desc: "Striving for the highest standards in everything we do." },
                { icon: Users, title: "Community", desc: "Building a supportive and inclusive environment." },
                { icon: BookOpen, title: "Innovation", desc: "Embracing new ideas and technologies." },
                { icon: CheckCircle, title: "Integrity", desc: "Upholding honesty and ethical behavior." }
              ].map((val, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
                >
                  <val.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-2">{val.title}</h3>
                  <p className="text-slate-600 text-sm">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
