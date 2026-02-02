import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const CampusLife = () => {
  return (
    <>
      <SEO title="Campus Life" description="Experience the vibrant community and state-of-the-art facilities at RSIIT." />

      <div className="min-h-screen bg-white">
        <section className="bg-primary text-white pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 font-heading"
            >
              Campus Life
            </motion.h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              More than just classrooms. A place to grow, connect, and thrive.
            </p>
          </div>
        </section>

        <section className="section-padding px-4">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3, 4, 5, 6].map((item) => (
                 <motion.div 
                   key={item}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="bg-slate-200 rounded-xl h-64 flex items-center justify-center overflow-hidden relative group"
                 >
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                   <span className="text-slate-500 font-medium z-10 bg-white/80 px-4 py-2 rounded-lg">Gallery Image {item}</span>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>

        <section className="bg-slate-50 section-padding px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center font-heading">Student Activities</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-white p-6 rounded-xl shadow-sm">
                 <h3 className="text-xl font-bold mb-3">Tech Clubs</h3>
                 <p className="text-slate-600">Join our coding, robotics, and AI clubs to collaborate on projects.</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm">
                 <h3 className="text-xl font-bold mb-3">Sports</h3>
                 <p className="text-slate-600">Stay active with our intramural sports leagues and fitness center.</p>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm">
                 <h3 className="text-xl font-bold mb-3">Events</h3>
                 <p className="text-slate-600">Regular hackathons, guest lectures, and cultural festivals.</p>
               </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CampusLife;
