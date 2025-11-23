import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Icons } from '../components/ui/Icons';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <div className="inline-block mb-4 px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-xs font-semibold uppercase tracking-wide">
                  Online Resume Builder
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-navy-900 leading-tight mb-6">
                  Create a Job-ready <br />
                  <span className="text-blue-500">Resume</span> in minutes
                </h1>
                <p className="text-gray-500 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  An AI-powered resume builder creates ATS-friendly resumes & optimizes your content with the right keywords to match job descriptions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    to="/builder"
                    className="px-8 py-4 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-all shadow-xl shadow-navy-900/10"
                  >
                    Build Resume
                  </Link>
                  <button className="px-8 py-4 bg-gray-100 text-navy-900 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                    Import Resume
                  </button>
                </div>
              </motion.div>

              {/* Hero Image */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                 <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-gray-50 border border-gray-200 p-2">
                    <img 
                      src="https://picsum.photos/800/600?grayscale" 
                      alt="Resume Builder Interface" 
                      className="w-full h-auto rounded-xl"
                    />
                    {/* Floating Cards Mockup */}
                    <div className="absolute -bottom-6 -left-6 w-48 h-24 bg-white rounded-lg shadow-xl p-4 hidden md:block animate-bounce">
                        <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                        <div className="h-2 w-32 bg-gray-100 rounded"></div>
                    </div>
                 </div>
                 {/* Decorative blobs */}
                 <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl -z-10 opacity-50"></div>
                 <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl -z-10 opacity-50"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Templates Teaser */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Our top templates</h2>
            <p className="text-gray-500 mb-12 max-w-2xl mx-auto">Our curated list of resume templates designed for ATS friendly resumes.</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                    <img src={`https://picsum.photos/400/600?random=${i}`} alt="Template" className="object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link to="/builder" className="px-6 py-2 bg-white text-navy-900 rounded-full font-semibold">Use Template</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;