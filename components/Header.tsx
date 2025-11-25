
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './ui/Icons';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <Icons.FileText size={20} />
              </div>
              <span className="font-bold text-xl text-navy-900 tracking-tight">Resume</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/templates" className="text-gray-600 hover:text-navy-900 text-sm font-medium transition-colors">Templates</Link>
              <Link to="/about" className="text-gray-600 hover:text-navy-900 text-sm font-medium transition-colors">About</Link>
              
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="text-gray-600 hover:text-navy-900 text-sm font-medium transition-colors"
              >
                Sign In
              </button>
              
              <Link 
                to="/builder"
                className="bg-navy-900 hover:bg-navy-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
              >
                Build Resume
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4">
             <Link to="/templates" className="text-gray-600 font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
             <Link to="/about" className="text-gray-600 font-medium p-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
             <button 
                className="text-gray-600 font-medium p-2 text-left"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
             >
               Sign In
             </button>
             <Link to="/builder" className="bg-navy-900 text-white text-center py-3 rounded-lg font-semibold" onClick={() => setMobileMenuOpen(false)}>Build Resume</Link>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
