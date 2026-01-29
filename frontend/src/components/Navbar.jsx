import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-rsiit-blue" />
              <span className="text-xl font-bold text-rsiit-slate">RSIIT</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-rsiit-blue font-medium">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-rsiit-blue font-medium">About</Link>
            <Link to="/admissions" className="text-gray-600 hover:text-rsiit-blue font-medium">Admissions</Link>
            <Link to="/login" className="bg-rsiit-blue text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">Portal Login</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-rsiit-blue focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      ></div>
      <div 
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-rsiit-blue" />
              <span className="text-xl font-bold text-rsiit-slate">RSIIT</span>
            </div>
            <button onClick={toggleMenu} className="text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            <Link to="/" className="text-lg font-medium text-gray-800 hover:text-rsiit-blue" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="text-lg font-medium text-gray-800 hover:text-rsiit-blue" onClick={toggleMenu}>About</Link>
            <Link to="/admissions" className="text-lg font-medium text-gray-800 hover:text-rsiit-blue" onClick={toggleMenu}>Admissions</Link>
            <Link to="/login" className="bg-rsiit-blue text-white px-6 py-3 rounded-md text-center font-bold" onClick={toggleMenu}>Portal Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
