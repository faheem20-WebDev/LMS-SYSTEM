import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const navItems = [
  { name: 'Home', path: '/', isHash: false },
  { name: 'Features', path: '/#features', targetId: 'features', isHash: true },
  { name: 'Courses', path: '/programs', isHash: false },
  { name: 'About Us', path: '/about', isHash: false },
  { name: 'Contact', path: '/contact', isHash: false },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Scroll detection for sticky navbar background transition and landing page active section highlight
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (location.pathname === '/') {
        const featuresEl = document.getElementById('features');
        if (featuresEl) {
          const rect = featuresEl.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 150) {
            setActiveSection('features');
            return;
          }
        }

        if (window.scrollY < 300) {
          setActiveSection('home');
          return;
        }

        setActiveSection('');
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle hash scrolling when arriving from other routes
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetId);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle navigation clicks for smooth section scrolling
  const handleNavClick = (e, item) => {
    setIsOpen(false);

    if (item.name === 'Home') {
      if (location.pathname === '/' && !location.hash) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      }
    } else if (item.isHash) {
      if (location.pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(item.targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${item.targetId}`);
          setActiveSection(item.targetId);
        }
      }
    }
  };

  // Determine active state for links
  const isItemActive = (item) => {
    if (item.name === 'Home') {
      return (
        location.pathname === '/' &&
        (!location.hash || location.hash === '#home' || location.hash === '#top') &&
        activeSection !== 'features'
      );
    }
    if (item.name === 'Features') {
      return location.pathname === '/' && (location.hash === '#features' || activeSection === 'features');
    }
    if (item.name === 'Courses') {
      return location.pathname.startsWith('/programs');
    }
    if (item.name === 'About Us') {
      return location.pathname.startsWith('/about');
    }
    if (item.name === 'Contact') {
      return location.pathname.startsWith('/contact');
    }
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 font-sans ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border-b border-slate-200/90 py-2.5'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LEFT: Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, { name: 'Home' })}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg select-none"
              aria-label="RSIIT LMS Home"
            >
              <img
                src={logo}
                alt="RSIIT LMS Logo"
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#172B46] font-heading">
                  RSIIT
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/60 font-sans">
                  LMS
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 ${
                    active
                      ? 'text-blue-600 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-[#172B46] hover:bg-slate-100/70'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Login & Primary CTA (Get Started) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-[#172B46] hover:text-blue-600 hover:bg-slate-100/80 px-4 py-2 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50"
            >
              Login
            </Link>

            <Link
              to="/applicant/register"
              className="inline-flex items-center justify-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded-lg shadow-sm hover:shadow active:scale-[0.99] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="p-2 rounded-lg text-slate-700 hover:text-[#172B46] hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl z-50 lg:hidden flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <Link
                    to="/"
                    onClick={(e) => handleNavClick(e, { name: 'Home' })}
                    className="flex items-center gap-2.5"
                  >
                    <img src={logo} alt="RSIIT LMS Logo" className="h-8 w-auto object-contain" />
                    <span className="text-lg font-bold text-[#172B46] font-heading">RSIIT</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60 font-sans">
                      LMS
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="p-4 space-y-1">
                  {navItems.map((item) => {
                    const active = isItemActive(item);
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={(e) => handleNavClick(e, item)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          active
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#172B46]'
                        }`}
                      >
                        <span>{item.name}</span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/60 space-y-2.5">
                <Link
                  to="/applicant/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 py-3 px-4 rounded-xl shadow-sm transition-colors"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center text-sm font-semibold text-[#172B46] bg-white hover:bg-slate-100 border border-slate-200 py-3 px-4 rounded-xl transition-colors shadow-xs"
                >
                  Login
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
