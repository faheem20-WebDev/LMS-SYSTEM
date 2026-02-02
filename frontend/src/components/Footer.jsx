import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="RSIIT Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="text-2xl font-bold font-heading">RSIIT</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Rising Star Institute of Information and Technology. Empowering the next generation of leaders through excellence in education and innovation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-highlight transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-highlight transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-highlight transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-highlight transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-heading text-accent">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/about" className="hover:text-highlight transition-colors">About Us</Link></li>
              <li><Link to="/programs" className="hover:text-highlight transition-colors">Academic Programs</Link></li>
              <li><Link to="/admissions" className="hover:text-highlight transition-colors">Admissions</Link></li>
              <li><Link to="/campus-life" className="hover:text-highlight transition-colors">Campus Life</Link></li>
              <li><Link to="/login" className="hover:text-highlight transition-colors">Student Portal</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-heading text-accent">Programs</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/programs" className="hover:text-highlight transition-colors">Computer Science</Link></li>
              <li><Link to="/programs" className="hover:text-highlight transition-colors">Information Technology</Link></li>
              <li><Link to="/programs" className="hover:text-highlight transition-colors">Data Science</Link></li>
              <li><Link to="/programs" className="hover:text-highlight transition-colors">Software Engineering</Link></li>
              <li><Link to="/programs" className="hover:text-highlight transition-colors">Artificial Intelligence</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-heading text-accent">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-highlight flex-shrink-0" />
                <span>123 University Ave, Tech City, ST 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-highlight flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-highlight flex-shrink-0" />
                <span>info@rsiit.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Rising Star Institute. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
