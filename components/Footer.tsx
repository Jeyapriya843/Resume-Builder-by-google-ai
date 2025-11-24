
import React from 'react';
import { Icons } from './ui/Icons';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#061c3d] text-white py-16 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-navy-900">
                <Icons.FileText size={18} fill="currentColor" />
              </div>
              <span className="text-xl font-bold">Resume builder</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              We build AI Powered resume with wide range of ATS friendly templates to choose from.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-6">Reach us</h3>
            <ul className="space-y-4 text-gray-400 text-xs">
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-6">Templates</h3>
            <ul className="space-y-4 text-gray-400 text-xs">
              <li><Link to="/templates" className="hover:text-white transition-colors">Resume</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">CV</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sm mb-6">info@resbuilder.com</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              901 N Pitt Str., Suite 170<br/>
              Alexandria, VA 22314, USA
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
             {/* Social Icons matching design style (dark squares) */}
             <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                <Icons.Menu className="w-4 h-4 text-white" /> {/* Placeholder for FB */}
             </a>
             <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                <Icons.Wrench className="w-4 h-4 text-white" /> {/* Placeholder for Twitter */}
             </a>
             <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                <Icons.Briefcase className="w-4 h-4 text-white" /> {/* Placeholder for LinkedIn */}
             </a>
             <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                <Icons.User className="w-4 h-4 text-white" /> {/* Placeholder for IG */}
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
