import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Icons } from '../components/ui/Icons';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-navy-900 mb-6"
            >
              Bridging Talent with <span className="text-blue-500">Opportunity</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed"
            >
              We believe that every professional story deserves to be told with clarity and confidence. Our AI-powered tools help you craft the perfect resume to land your dream job.
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block p-3 bg-blue-100 rounded-xl text-blue-600 mb-6">
                  <Icons.Sparkles size={32} />
                </div>
                <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The job market is competitive, and Applicant Tracking Systems (ATS) often filter out great candidates before a human ever sees their resume.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Our mission is to democratize career success by providing top-tier resume building technology to everyone. Whether you are a fresh graduate or a seasoned executive, Resume Builder AI ensures your qualifications shine through.
                </p>
                <Link to="/builder" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                  Start Building Now <Icons.ChevronRight size={16} />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 opacity-10"></div>
                <img 
                  src="https://picsum.photos/800/600?grayscale&blur=2" 
                  alt="Team collaboration" 
                  className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Why Choose Us?</h2>
              <p className="text-gray-500">Built with modern technology for modern job seekers.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Icons.Wrench,
                  title: 'ATS Optimized',
                  desc: 'Our templates are rigorously tested against popular ATS software to ensure high parse rates.'
                },
                {
                  icon: Icons.Sparkles,
                  title: 'AI Assistance',
                  desc: 'Stuck on what to write? Our Gemini-powered AI suggests professional summaries and bullet points.'
                },
                {
                  icon: Icons.User,
                  title: 'Privacy First',
                  desc: 'We store your data locally in your browser. No hidden servers, no data selling. Your resume is yours.'
                }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Ready to take the next step?</h2>
            <p className="text-gray-500 mb-8 text-lg">Join thousands of professionals who have advanced their careers with our tools.</p>
            <Link 
              to="/builder"
              className="inline-flex items-center justify-center px-8 py-4 bg-navy-900 text-white rounded-lg font-bold text-lg hover:bg-navy-800 transition-all shadow-lg shadow-navy-900/20"
            >
              Create Your Resume
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;