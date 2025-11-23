import React from 'react';
import { Icons } from './ui/Icons';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white py-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Icons.FileText className="text-blue-500" />
              <span className="text-xl font-bold">Resume builder</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering job seekers with AI-driven tools to create professional, ATS-friendly resumes in minutes.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link to="/builder" className="hover:text-white transition-colors">Resume Builder</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-navy-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 Resume Builder. All rights reserved.</p>
          <div className="flex gap-4">
            {/* Social icons placeholders */}
            <div className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-gray-400 hover:text-white">
               <span className="text-xs">Tw</span>
            </div>
            <div className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-gray-400 hover:text-white">
               <span className="text-xs">In</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;