import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Icons } from './ui/Icons';
import AuthModal from './AuthModal';
import { useAuth } from '../App';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsAuthModalOpen(true);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:bg-blue-600 transition-colors">
                <Icons.FileText size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-navy-900 tracking-tight leading-none">Resume<span className="text-blue-600">AI</span></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Builder Pro</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                <Link 
                  to="/dashboard" 
                  onClick={handleDashboardClick}
                  className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all py-2.5 px-5 rounded-full ${
                    isActive('/dashboard') 
                      ? 'text-white bg-blue-600 shadow-md' 
                      : 'text-gray-500 hover:text-navy-900'
                  }`}
                >
                  <Icons.Layout size={14} />
                  Dashboard
                </Link>
                
                <Link 
                  to="/resume" 
                  className={`text-xs font-black uppercase tracking-widest transition-all py-2.5 px-5 rounded-full ${
                    isActive('/resume') ? 'text-blue-600' : 'text-gray-500 hover:text-navy-900'
                  }`}
                >
                  Resume
                </Link>
                
                <Link 
                  to="/templates" 
                  className={`text-xs font-black uppercase tracking-widest transition-all py-2.5 px-5 rounded-full ${
                    isActive('/templates') ? 'text-blue-600' : 'text-gray-500 hover:text-navy-900'
                  }`}
                >
                  Templates
                </Link>
                
                <Link 
                  to="/about" 
                  className={`text-xs font-black uppercase tracking-widest transition-all py-2.5 px-5 rounded-full ${
                    isActive('/about') ? 'text-blue-600' : 'text-gray-500 hover:text-navy-900'
                  }`}
                >
                  About
                </Link>
              </div>
              
              <div className="h-6 w-px bg-gray-200"></div>

              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to="/dashboard"
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                      <Icons.User size={18} />
                    </div>
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-gray-400 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-navy-900 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors"
                >
                  Sign In
                </button>
              )}
              
              <Link 
                to="/builder"
                className="bg-navy-900 hover:bg-blue-600 text-white px-7 py-3 rounded-full text-xs font-black uppercase tracking-[0.1em] transition-all shadow-xl shadow-navy-900/10 active:scale-95"
              >
                Build Resume
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-navy-900 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <Icons.X size={28} /> : <Icons.Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-2xl p-6 flex flex-col gap-3 animate-in slide-in-from-top-4 duration-300">
             <Link 
               to="/dashboard" 
               className={`font-black uppercase tracking-widest text-xs p-4 rounded-2xl flex items-center gap-4 ${isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-navy-900 hover:bg-gray-50'}`}
               onClick={(e) => { setMobileMenuOpen(false); handleDashboardClick(e); }}
             >
                <Icons.Layout size={20} /> Dashboard
             </Link>
             <Link to="/resume" className="text-gray-500 font-black uppercase tracking-widest text-xs p-4 rounded-2xl hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Resume</Link>
             <Link to="/templates" className="text-gray-500 font-black uppercase tracking-widest text-xs p-4 rounded-2xl hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
             <Link to="/about" className="text-gray-500 font-black uppercase tracking-widest text-xs p-4 rounded-2xl hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>About</Link>
             
             <div className="border-t border-gray-100 my-4 pt-4">
                {isLoggedIn ? (
                  <button 
                    className="text-red-500 font-black uppercase tracking-widest text-xs p-4 rounded-2xl flex items-center gap-4 w-full hover:bg-red-50 transition-colors"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icons.XCircle size={20} /> Sign Out
                  </button>
                ) : (
                  <button 
                    className="text-navy-900 font-black uppercase tracking-widest text-xs p-4 rounded-2xl flex items-center gap-4 w-full hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icons.User size={20} /> Sign In
                  </button>
                )}
             </div>
             
             <Link to="/builder" className="bg-navy-900 text-white text-center py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all" onClick={() => setMobileMenuOpen(false)}>Build Resume</Link>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={() => navigate('/dashboard')} 
      />
    </>
  );
};

export default Header;