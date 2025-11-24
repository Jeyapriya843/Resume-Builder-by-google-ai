
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TemplatesMap } from '../components/templates';
import { ResumeData } from '../types';
import { motion } from 'framer-motion';
import { Icons } from '../components/ui/Icons';
import { useResume } from '../App';
import { parseResumeFromText } from '../services/geminiService';

// Dummy data for the homepage preview
const previewData: ResumeData = {
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Software Engineer",
  email: "jane@example.com",
  phone: "(555) 123-4567",
  city: "San Francisco",
  country: "CA",
  summary: "Passionate developer with expertise in React and Node.js.",
  experience: [],
  education: [],
  projects: [],
  skills: ["React", "TypeScript", "Tailwind"],
  templateId: 'modern'
};

const FeatureIllustration = ({ variant }: { variant: 1 | 2 | 3 | 4 }) => {
   if (variant === 1) {
     return (
       <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center p-8">
          <div className="w-3/4 h-3/4 bg-gray-200 rounded shadow-sm relative">
             <div className="absolute right-[-20px] bottom-[40px] w-32 h-8 bg-gray-400 rounded shadow-md z-10"></div>
             <div className="absolute right-[-20px] bottom-[80px] w-32 h-8 bg-gray-400 rounded shadow-md z-10 opacity-60"></div>
          </div>
       </div>
     );
   }
   if (variant === 2) {
     return (
        <div className="w-full aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center p-8">
           <div className="w-3/4 space-y-3">
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-400 rounded w-full"></div>
              <div className="h-6 bg-gray-400 rounded w-full"></div>
           </div>
        </div>
     );
   }
   if (variant === 3) {
      return (
        <div className="w-full aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center p-8">
           <div className="w-2/3 h-3/4 bg-gray-200 rounded relative">
              <div className="absolute -right-8 bottom-12 w-32 h-16 bg-gray-400 rounded shadow-sm"></div>
              <div className="absolute -right-8 bottom-32 w-32 h-8 bg-gray-400 rounded shadow-sm opacity-60"></div>
           </div>
        </div>
      );
   }
   // Variant 4: Three cards stacking
   return (
      <div className="w-full aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center p-8 relative">
          <div className="w-32 h-40 bg-gray-300 rounded shadow-sm absolute left-1/4 top-10 transform -rotate-6"></div>
          <div className="w-32 h-40 bg-gray-300 rounded shadow-sm absolute right-1/4 top-10 transform rotate-6"></div>
          <div className="w-36 h-48 bg-gray-200 rounded shadow-lg relative z-10"></div>
      </div>
   );
};

const Home: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const { setResumeData } = useResume();
  const navigate = useNavigate();

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const extractTextFromPdf = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);
        try {
          // @ts-ignore
          const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n';
          }
          resolve(fullText);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    try {
      let textToParse = '';

      if (file.type === 'application/json') {
        // JSON Import
        const text = await file.text();
        const data = JSON.parse(text);
        setResumeData(prev => ({ ...prev, ...data }));
        navigate('/builder/summary'); // Go to summary to review
        return;
      } else if (file.type === 'application/pdf') {
        // PDF Parsing
        textToParse = await extractTextFromPdf(file);
      } else {
        alert("Please upload a PDF or JSON file.");
        setIsImporting(false);
        return;
      }

      if (textToParse) {
        // AI Parsing
        const parsedData = await parseResumeFromText(textToParse);
        if (Object.keys(parsedData).length > 0) {
           setResumeData(prev => ({ ...prev, ...parsedData }));
           navigate('/builder/header'); // Start from header to verify details
        } else {
           alert("Could not extract data from resume. Please try filling it manually.");
        }
      }

    } catch (error) {
      console.error("Import failed:", error);
      alert("Failed to import resume. Please try again.");
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-navy-900">
      <Header />
      
      <main className="flex-1">
        {/* Hidden File Input */}
        <input 
          type="file" 
          accept=".pdf,.json" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />

        {/* --- Hero Section --- */}
        <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Online Resume Builder</div>
                 <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 text-gray-900">
                    Create a Job-ready <br />
                    <span className="text-gray-900">Resume</span> <span className="text-gray-400 font-normal">in minutes</span>
                 </h1>
                 <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md">
                    An AI-powered resume builder creates ATS-friendly resume & optimizes your content with the right keywords to match job description to boost your chances of landing interviews.
                 </p>
                 <div className="flex gap-4">
                    <Link 
                      to="/builder"
                      className="px-8 py-3 bg-navy-900 text-white font-semibold rounded-md hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/10"
                    >
                       Build Resume
                    </Link>
                    <button 
                      onClick={handleImportClick}
                      disabled={isImporting}
                      className="px-8 py-3 bg-gray-100 text-navy-900 font-semibold rounded-md hover:bg-gray-200 transition-colors disabled:opacity-60 flex items-center gap-2"
                    >
                       {isImporting ? (
                         <>
                           <div className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin"></div>
                           Importing...
                         </>
                       ) : "Import Resume"}
                    </button>
                 </div>
                 <p className="mt-4 text-xs text-gray-400">* Supports PDF (AI Parsed) or JSON backups</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                 <div className="bg-gray-100 rounded-xl p-8 relative min-h-[500px] flex items-center justify-center">
                    {/* Abstract Shapes replicating the design */}
                    <div className="absolute top-20 left-10 w-24 h-12 bg-gray-400 rounded shadow-sm z-20"></div>
                    <div className="absolute bottom-20 right-20 w-32 h-12 bg-gray-400 rounded shadow-sm z-20"></div>
                    
                    {/* Main Card */}
                    <div className="w-[300px] h-[400px] bg-white shadow-2xl rounded-lg p-6 space-y-4 relative z-10">
                       <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                       <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                       <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                       <div className="h-px bg-gray-100 my-4"></div>
                       <div className="space-y-2">
                          <div className="h-2 bg-gray-100 rounded w-full"></div>
                          <div className="h-2 bg-gray-100 rounded w-full"></div>
                          <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                       </div>
                       <div className="h-24 bg-gray-50 rounded w-full mt-4 border border-dashed border-gray-200"></div>
                    </div>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* --- Top Templates Section --- */}
        <section className="bg-gray-100 py-24">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-navy-900 mb-3">Our top templates</h2>
                 <p className="text-gray-500 max-w-lg mx-auto">Our curated list of resume templates designed for ATS friendly resume</p>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-16">
                 {/* Left Text */}
                 <div className="lg:w-1/3">
                    <h3 className="text-2xl font-bold text-navy-900 mb-4">All in one resume</h3>
                    <p className="text-gray-500 mb-8">One template that fits for all roles and industry.</p>
                    <Link 
                      to="/templates"
                      className="px-6 py-3 bg-navy-900 text-white font-semibold rounded-md hover:bg-navy-800 transition-colors"
                    >
                       Build Resume
                    </Link>
                 </div>

                 {/* Right Visual (Overlapping Cards) */}
                 <div className="lg:w-2/3 relative h-[500px] flex items-center justify-center">
                    {/* Background Cards */}
                    <div className="absolute left-0 lg:left-20 top-10 transform -rotate-6 opacity-60 scale-90 blur-[1px]">
                        <div className="w-[280px] h-[400px] bg-gray-400 rounded-lg shadow-xl"></div>
                    </div>
                    <div className="absolute right-0 lg:right-20 top-10 transform rotate-6 opacity-60 scale-90 blur-[1px]">
                        <div className="w-[280px] h-[400px] bg-gray-400 rounded-lg shadow-xl"></div>
                    </div>
                    
                    {/* Main Center Card (Real Preview) */}
                    <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 shadow-2xl">
                       <div className="w-[340px] h-[480px] bg-white rounded-lg overflow-hidden border border-gray-200">
                          {/* We use scale to fit the A4 component into this small box */}
                          <div className="w-[210mm] h-[297mm] origin-top-left transform scale-[0.41]">
                             <TemplatesMap.modern data={previewData} />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Features Section --- */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Tools Designed to Land You Interviews</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm">From AI optimization, ATS friendly templates & everything you need to turn your resume into an interview magnet.</p>
           </div>

           <div className="space-y-24">
              {/* Feature 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                 <FeatureIllustration variant={1} />
                 <div className="md:pl-10">
                    <h3 className="text-2xl font-bold text-navy-900 mb-4">Smarter Resumes. More Interviews.</h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                       Just paste the job description or role or industry you looking for and let AI do the heavy lifting—optimizing your resume to recruiter's expectations.
                    </p>
                 </div>
              </div>

              {/* Feature 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="order-2 md:order-1 md:pr-10">
                    <h3 className="text-2xl font-bold text-navy-900 mb-4">Auto generation makes easy</h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                       Skip the struggle of writing—our auto-generate feature creates polished resume content in just a click —fast, smart, and hassle-free.
                    </p>
                 </div>
                 <div className="order-1 md:order-2">
                    <FeatureIllustration variant={2} />
                 </div>
              </div>

              {/* Feature 3 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                 <FeatureIllustration variant={3} />
                 <div className="md:pl-10">
                    <h3 className="text-2xl font-bold text-navy-900 mb-4">ATS-Ready Resume Templates</h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                       Choose from recruiter-approved templates designed to pass Applicant Tracking Systems without losing style or readability.
                    </p>
                 </div>
              </div>

               {/* Feature 4 */}
               <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="order-2 md:order-1 md:pr-10">
                    <h3 className="text-2xl font-bold text-navy-900 mb-4">A Template for Every Career Path</h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                       Choose from 20+ polished, ATS-optimized templates designed for different industries and career levels. Whether you're applying for your first job or a leadership role.
                    </p>
                 </div>
                 <div className="order-1 md:order-2">
                    <FeatureIllustration variant={4} />
                 </div>
              </div>
           </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section className="py-24 bg-white">
           <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-navy-900 mb-16">Hear from our customers</h2>
              
              <div className="grid md:grid-cols-2 gap-12 text-left">
                 {/* Testimonial 1 */}
                 <div className="flex flex-col items-center text-center">
                    <div className="flex gap-2 mb-4">
                       {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 bg-gray-300 rounded-sm"></div>)}
                    </div>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                       "Loved the auto-generate feature, it saved me so much time and gave me polished content I wouldn't have written myself."
                    </p>
                 </div>

                 {/* Testimonial 2 */}
                 <div className="flex flex-col items-center text-center">
                    <div className="flex gap-2 mb-4">
                       {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 bg-gray-300 rounded-sm"></div>)}
                    </div>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                       "A game-changer! Simple to use, with 20+ modern templates and AI suggestions that actually impress recruiters."
                    </p>
                 </div>

                  {/* Testimonial 3 */}
                  <div className="flex flex-col items-center text-center md:col-span-2 max-w-md mx-auto">
                    <div className="flex gap-2 mb-4">
                       {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 bg-gray-300 rounded-sm"></div>)}
                    </div>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                       "Super easy to use—AI tailored my resume perfectly to the job description and saved me hours of editing."
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Bottom CTA --- */}
        <section className="pb-24 px-4">
           <div className="max-w-5xl mx-auto bg-gray-200 rounded-sm py-16 px-8 text-center">
              <h2 className="text-3xl font-bold text-navy-900 mb-2">Build. Apply. Get Hired.</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Create your optimized resume in minutes with AI and ATS-friendly templates.</p>
              <Link 
                to="/builder"
                className="px-8 py-3 bg-navy-900 text-white font-semibold rounded-sm hover:bg-navy-800 transition-colors"
              >
                 Build Resume
              </Link>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
