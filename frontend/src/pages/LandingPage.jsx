import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-rsiit-blue py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute transform -rotate-45 -left-20 -top-20 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute transform rotate-45 -right-20 -bottom-20 w-96 h-96 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Welcome to <span className="text-blue-400">RSIIT</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Rising Star Institute of Information and Technology. Empowering the next generation of tech leaders with world-class education and innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login" className="bg-white text-rsiit-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                Student Portal <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/admissions" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-rsiit-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-rsiit-slate">Modern Curriculum</h3>
              <p className="text-gray-600">State-of-the-art courses designed by industry experts to keep you ahead in the tech world.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-rsiit-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-rsiit-slate">Expert Faculty</h3>
              <p className="text-gray-600">Learn from experienced PhD professors and industry veterans dedicated to your success.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-rsiit-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-rsiit-slate">Global Recognition</h3>
              <p className="text-gray-600">Degrees that are respected worldwide, opening doors to top-tier career opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rsiit-slate text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">RSIIT</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2026 Rising Star Institute of Information and Technology. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
