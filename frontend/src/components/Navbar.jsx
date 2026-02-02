import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Campus Life', path: '/campus-life' },
    { name: 'Contact', path: '/contact' },
  ];

  // Dynamic Styles - Transparent at top, solid on scroll for ALL pages
  const isTransparent = !scrolled;
  
  const navBackground = isTransparent ? 'bg-transparent py-4' : 'bg-white shadow-md py-2 transition-all duration-300';
  const logoText = isTransparent ? 'text-white' : 'text-primary';
  
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return isTransparent ? 'text-white font-bold border-b-2 border-highlight' : 'text-highlight font-semibold';
    }
    return isTransparent 
      ? 'text-white/80 hover:text-white' 
      : 'text-slate-600 hover:text-highlight';
  };

  const mobileMenuBg = 'bg-white';

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-300 ${navBackground}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="RSIIT Logo" className="h-12 w-auto object-contain" />
              <span className={`text-2xl font-bold tracking-tight ${logoText}`}>
                RSIIT
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${getLinkClass(link.path)}`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              to="/login" 
              className={`ml-4 text-sm px-5 py-2.5 flex items-center gap-2 shadow-md hover:shadow-lg transition-all rounded-lg font-semibold ${
                isTransparent 
                  ? 'bg-white text-primary hover:bg-slate-100' 
                  : 'btn-primary'
              }`}
            >
              Portal Login
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={toggleMenu} 
              className={`focus:outline-none p-2 rounded-md ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
              onClick={toggleMenu}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed inset-y-0 right-0 w-80 shadow-2xl z-50 lg:hidden overflow-y-auto ${mobileMenuBg}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <img src={logo} alt="RSIIT Logo" className="h-10 w-auto" />
                    <span className="text-xl font-bold text-primary">RSIIT</span>
                  </div>
                  <button onClick={toggleMenu} className="text-gray-400 hover:text-primary">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name}
                      to={link.path} 
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                         location.pathname === link.path 
                          ? 'bg-primary/5 text-primary' 
                          : 'text-slate-600 hover:bg-gray-50 hover:text-primary'
                      }`}
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  <div className="pt-6 mt-4 border-t border-gray-100">
                    <Link 
                      to="/login" 
                      className="w-full btn-primary flex justify-center items-center gap-2"
                      onClick={toggleMenu}
                    >
                      Portal Login
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
