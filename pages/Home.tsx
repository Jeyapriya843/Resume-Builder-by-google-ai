

import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TemplatesMap } from '../components/templates';
import { ResumeData } from '../types';
import { motion, Variants } from 'framer-motion';
import { Icons } from '../components/ui/Icons';
import { useResume } from '../App';
import { parseResumeFromText } from '../services/geminiService';
import { parseResumeFromTextLocal } from '../services/localParserService';

// Populated dummy data for the homepage preview
const previewData: ResumeData = {
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Senior Software Engineer",
  email: "jane.doe@example.com",
  phone: "(555) 123-4567",
  city: "San Francisco",
  country: "CA",
  summary: "Results-driven Senior Software Engineer with over 6 years of experience specializing in modern web technologies. Proven track record of building scalable, high-performance web applications and leading cross-functional teams. Expert in React ecosystem, cloud infrastructure, and UI/UX best practices.",
  experience: [
    {
      id: "1",
      jobTitle: "Senior Frontend Engineer",
      employer: "TechFlow Solutions",
      startDate: "2021-03",
      endDate: "Present",
      location: "San Francisco, CA",
      description: "• Lead a team of 5 developers in rebuilding the core customer dashboard, improving load times by 40%.\n• Architected a reusable component library using React and Tailwind CSS, adopted by 3 product teams.\n• Mentored junior developers and implemented code review standards that reduced production bugs by 25%."
    },
    {
      id: "2",
      jobTitle: "Software Engineer",
      employer: "Creative Digital Agency",
      startDate: "2018-06",
      endDate: "2021-02",
      location: "Austin, TX",
      description: "• Developed responsive e-commerce websites for major retail clients, increasing mobile conversion rates by 15%.\n• Integrated third-party payment gateways (Stripe, PayPal) and headless CMS solutions.\n• Collaborated closely with designers to ensure pixel-perfect implementation of UI/UX designs."
    }
  ],
  education: [
    {
      id: "1",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2014",
      endDate: "2018",
      location: "Berkeley, CA"
    }
  ],
  projects: [],
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL", "AWS", "Next.js", "Docker"],
  templateId: 'modern',
  fontFamily: 'Poppins',
  accentColor: '#3b82f6',
};

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const FeatureIllustration = ({ variant }: { variant: 1 | 2 | 3 | 4 }) => {
   if (variant === 1) {
     return (
       <motion.div 
         className="w-full aspect-[4/3] bg-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center p-8"
         whileHover={{ scale: 1.02 }}
         transition={{ duration: 0.3 }}
       >
          <div className="w-3/4 h-3/4 bg-gray-200 rounded shadow-sm relative border border-gray-300">
             <motion.div 
                className="absolute -right-6 bottom-10 w-32 h-8 bg-blue-200 rounded shadow-md z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.div 
                className="absolute -right-6 bottom-24 w-32 h-8 bg-blue-300 rounded shadow-md z-10 opacity-80"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             />
          </div>
       </motion.div>
     );
   }
   if (variant === 2) {
     return (
        <motion.div 
          className="w-full aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center p-8"
          whileHover={{ scale: 1.02 }}
        >
           <div className="w-3/4 space-y-3">
              <motion.div 
                className="h-24 bg-white border border-gray-200 rounded w-full shadow-sm"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.div 
                className="h-6 bg-gray-300 rounded w-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <motion.div 
                className="h-6 bg-gray-300 rounded w-3/4"
                initial={{ width: "0%" }}
                whileInView={{ width: "75%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              />
           </div>
        </motion.div>
     );
   }
   if (variant === 3) {
      return (
        <motion.div 
          className="w-full aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center p-8"
          whileHover={{ scale: 1.02 }}
        >
           <div className="w-2/3 h-3/4 bg-white border border-gray-200 rounded relative shadow-sm">
              <motion.div 
                className="absolute -right-8 bottom-12 w-32 h-16 bg-blue-100 rounded shadow-sm flex items-center justify-center border border-blue-200"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                 <Icons.Check className="text-blue-500" />
              </motion.div>
           </div>
        </motion.div>
      );
   }
   // Variant 4: Three cards stacking
   return (
      <motion.div 
        className="w-full aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center p-8 relative"
        whileHover={{ scale: 1.02 }}
      >
          <motion.div 
            className="w-32 h-40 bg-gray-300 rounded shadow-sm absolute left-1/4 top-10 border border-gray-100"
            animate={{ rotate: -6, y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-32 h-40 bg-gray-400 rounded shadow-sm absolute right-1/4 top-10 border border-gray-100"
            animate={{ rotate: 6, y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div 
            className="w-36 h-48 bg-white rounded shadow-xl relative z-10 border border-gray-200"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
      </motion.div>
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
      // @ts-ignore
      if (!window.pdfjsLib) {
         reject(new Error("PDF Library not loaded. Check internet connection."));
         return;
      }
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);
        try {
          // @ts-ignore
          const pdf = await window.pdfjsLib.getDocument({ data: typedarray }).promise;
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
      reader.onerror = (err) => reject(err);
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
        const text = await file.text();
        const data = JSON.parse(text);
        setResumeData(prev => ({ ...prev, ...data }));
        navigate('/builder/summary'); 
        setIsImporting(false);
        return;
      } else if (file.type === 'application/pdf') {
        try {
           textToParse = await extractTextFromPdf(file);
        } catch (err) {
           console.error("PDF Extraction Error:", err);
           alert("Could not read PDF. If running locally, ensure you have internet access for the PDF library.");
           setIsImporting(false);
           return;
        }
      } else {
        alert("Please upload a PDF or JSON file.");
        setIsImporting(false);
        return;
      }

      if (textToParse) {
        let extractedData: Partial<ResumeData> = {};
        let usedMethod = 'AI';
        
        const aiResult = await parseResumeFromText(textToParse);

        if (aiResult) {
           extractedData = aiResult.resumeData;
        } else {
           console.log("AI parsing unavailable (likely missing API key). Using Local Parser.");
           extractedData = parseResumeFromTextLocal(textToParse);
           usedMethod = 'Local';
        }

        if (Object.keys(extractedData).length > 0) {
           setResumeData(prev => ({ ...prev, ...extractedData }));
           if (usedMethod === 'Local') {
              alert("Resume imported using Local Parser (No AI Key detected). Some fields may require manual editing.");
           }
           navigate('/builder/header');
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
    <div className="flex flex-col min-h-screen bg-white font-sans text-navy-900 overflow-x-hidden">
      <Header />
      
      <main className="flex-1">
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
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                 <motion.div variants={fadeInUp} className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-blue-500 inline-block"></span>
                    Online Resume Builder
                 </motion.div>
                 <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 text-navy-900">
                    Create a Job-ready <br />
                    <span className="text-navy-900">Resume</span> <span className="text-gray-400 font-light">in minutes</span>
                 </motion.h1>
                 <motion.p variants={fadeInUp} className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md">
                    An AI-powered resume builder that optimizes your content to match job descriptions and boost your landing chances.
                 </motion.p>
                 <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
                    <Link 
                      to="/builder"
                      className="px-8 py-3.5 bg-navy-900 text-white font-semibold rounded-full hover:bg-navy-800 transition-all shadow-lg shadow-navy-900/20 hover:shadow-navy-900/30 transform hover:-translate-y-0.5"
                    >
                       Build Resume
                    </Link>
                    <button 
                      onClick={handleImportClick}
                      disabled={isImporting}
                      className="px-8 py-3.5 bg-white text-navy-900 border border-gray-200 font-semibold rounded-full hover:bg-gray-50 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-60"
                    >
                       {isImporting ? (
                         <>
                           <div className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin"></div>
                           Importing...
                         </>
                       ) : "Import Resume"}
                    </button>
                 </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative hidden lg:block"
              >
                 <div className="bg-gray-50 rounded-3xl p-10 relative min-h-[500px] flex items-center justify-center overflow-hidden">
                    {/* Floating elements */}
                    <motion.div 
                       className="absolute top-20 left-10 w-24 h-12 bg-white rounded-lg shadow-md z-20 border border-gray-100"
                       animate={{ y: [0, -15, 0] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                       className="absolute bottom-32 right-10 w-32 h-12 bg-white rounded-lg shadow-md z-20 border border-gray-100"
                       animate={{ y: [0, 15, 0] }}
                       transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                    
                    {/* Main Card */}
                    <motion.div 
                       className="w-[340px] h-[440px] bg-white shadow-2xl rounded-xl p-8 space-y-5 relative z-10 border border-gray-100"
                       whileHover={{ scale: 1.02, rotate: -1 }}
                       transition={{ duration: 0.4 }}
                    >
                       <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 bg-gray-100 rounded-full"></div>
                          <div className="space-y-2 flex-1">
                             <div className="h-3 bg-navy-900 rounded w-3/4"></div>
                             <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                          </div>
                       </div>
                       <div className="h-px bg-gray-100 my-6"></div>
                       <div className="space-y-3">
                          <div className="h-2 bg-gray-100 rounded w-full"></div>
                          <div className="h-2 bg-gray-100 rounded w-full"></div>
                          <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                          <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                       </div>
                       <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="h-2 bg-blue-200 rounded w-1/3 mb-2"></div>
                          <div className="h-2 bg-blue-100 rounded w-full"></div>
                       </div>
                    </motion.div>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* --- Top Templates Section --- */}
        <section className="bg-gray-50 py-24 overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-100px" }}
                 variants={fadeInUp}
                 className="text-center mb-16"
              >
                 <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">Our top templates</h2>
                 <p className="text-gray-500 max-w-lg mx-auto">Professionally designed, ATS-friendly templates that get you hired.</p>
              </motion.div>

              <div className="flex flex-col lg:flex-row items-center gap-16">
                 {/* Left Text */}
                 <motion.div 
                    className="lg:w-1/3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInLeft}
                 >
                    <h3 className="text-3xl font-bold text-navy-900 mb-4">All in one resume</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                       One template that fits for all roles and industries. Whether you are a creative designer or a financial analyst, our templates adapt to your story.
                    </p>
                    <Link 
                      to="/templates"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-navy-900 text-white font-semibold rounded-full hover:bg-navy-800 transition-all shadow-lg hover:shadow-xl"
                    >
                       View All Templates <Icons.ChevronRight size={16} />
                    </Link>
                 </motion.div>

                 {/* Right Visual (Overlapping Cards) */}
                 <div className="lg:w-2/3 relative h-[500px] flex items-center justify-center">
                    <motion.div 
                       className="absolute left-0 lg:left-10 top-10 z-0"
                       initial={{ opacity: 0, x: -50, rotate: -10 }}
                       whileInView={{ opacity: 0.6, x: 0, rotate: -6 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8 }}
                    >
                        <div className="w-[280px] h-[400px] bg-gray-300 rounded-xl shadow-lg"></div>
                    </motion.div>
                    <motion.div 
                       className="absolute right-0 lg:right-10 top-10 z-0"
                       initial={{ opacity: 0, x: 50, rotate: 10 }}
                       whileInView={{ opacity: 0.6, x: 0, rotate: 6 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8 }}
                    >
                        <div className="w-[280px] h-[400px] bg-gray-300 rounded-xl shadow-lg"></div>
                    </motion.div>
                    
                    {/* Main Center Card */}
                    <motion.div 
                       className="relative z-10"
                       initial={{ opacity: 0, y: 50, scale: 0.9 }}
                       whileInView={{ opacity: 1, y: 0, scale: 1 }}
                       viewport={{ once: true }}
                       whileHover={{ y: -10 }}
                       transition={{ duration: 0.6 }}
                    >
                       <div className="w-[340px] h-[480px] bg-white rounded-xl overflow-hidden border border-gray-200 shadow-2xl">
                          <div className="w-[210mm] h-[297mm] origin-top-left transform scale-[0.41]">
                             <TemplatesMap.modern data={previewData} />
                          </div>
                       </div>
                    </motion.div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Features Section --- */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-24"
           >
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Tools Designed to Land You Interviews</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm">From AI optimization to ATS friendly templates & everything you need.</p>
           </motion.div>

           <div className="space-y-32">
              {/* Feature 1 */}
              <motion.div 
                 className="grid md:grid-cols-2 gap-16 items-center"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-100px" }}
                 variants={staggerContainer}
              >
                 <motion.div variants={fadeInLeft}>
                    <FeatureIllustration variant={1} />
                 </motion.div>
                 <motion.div variants={fadeInRight} className="md:pl-8">
                    <h3 className="text-3xl font-bold text-navy-900 mb-4">Smarter Resumes. More Interviews.</h3>
                    <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                       Just paste the job description or industry you are looking for and let AI do the heavy lifting—optimizing your resume to meet recruiter's expectations perfectly.
                    </p>
                 </motion.div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                 className="grid md:grid-cols-2 gap-16 items-center"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-100px" }}
                 variants={staggerContainer}
              >
                 <motion.div variants={fadeInLeft} className="order-2 md:order-1 md:pr-8">
                    <h3 className="text-3xl font-bold text-navy-900 mb-4">Auto generation makes easy</h3>
                    <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                       Skip the struggle of writing—our auto-generate feature creates polished resume content in just a click. Fast, smart, and completely hassle-free.
                    </p>
                 </motion.div>
                 <motion.div variants={fadeInRight} className="order-1 md:order-2">
                    <FeatureIllustration variant={2} />
                 </motion.div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                 className="grid md:grid-cols-2 gap-16 items-center"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-100px" }}
                 variants={staggerContainer}
              >
                 <motion.div variants={fadeInLeft}>
                    <FeatureIllustration variant={3} />
                 </motion.div>
                 <motion.div variants={fadeInRight} className="md:pl-8">
                    <h3 className="text-3xl font-bold text-navy-900 mb-4">ATS-Ready Resume Templates</h3>
                    <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                       Choose from recruiter-approved templates designed specifically to pass Applicant Tracking Systems (ATS) without losing visual appeal.
                    </p>
                 </motion.div>
              </motion.div>
           </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section className="py-24 bg-white">
           <div className="max-w-6xl mx-auto px-4 text-center">
              <motion.h2 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInUp}
                 className="text-3xl md:text-4xl font-bold text-navy-900 mb-16"
              >
                 Hear from our customers
              </motion.h2>
              
              <motion.div 
                 className="grid md:grid-cols-3 gap-8 text-left"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={staggerContainer}
              >
                 {[
                    {
                       text: "Loved the auto-generate feature, it saved me so much time and gave me polished content I wouldn't have written myself.",
                       author: "Sarah J.",
                       role: "Product Manager"
                    },
                    {
                       text: "A game-changer! Simple to use, with modern templates and AI suggestions that actually impress recruiters.",
                       author: "Mark T.",
                       role: "Developer"
                    },
                    {
                       text: "Super easy to use—AI tailored my resume perfectly to the job description and saved me hours of editing.",
                       author: "Emily R.",
                       role: "Designer"
                    }
                 ].map((t, i) => (
                    <motion.div 
                       key={i} 
                       variants={fadeInUp}
                       className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                       <div className="flex gap-1 mb-4">
                          {[1,2,3,4,5].map(star => <Icons.Sparkles key={star} size={16} className="text-yellow-400 fill-yellow-400" />)}
                       </div>
                       <p className="text-gray-600 text-sm mb-6 leading-relaxed">"{t.text}"</p>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                             {t.author[0]}
                          </div>
                          <div>
                             <div className="font-bold text-navy-900 text-sm">{t.author}</div>
                             <div className="text-xs text-gray-400">{t.role}</div>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </motion.div>
           </div>
        </section>

        {/* --- Bottom CTA --- */}
        <section className="py-24 px-4">
           <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto bg-navy-900 rounded-3xl py-20 px-8 text-center text-white relative overflow-hidden"
           >
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-20 -mt-20"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mb-20"></div>

              <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10">Build. Apply. Get Hired.</h2>
              <p className="text-blue-100 mb-10 max-w-md mx-auto relative z-10 text-lg">
                 Create your optimized resume in minutes with AI and ATS-friendly templates.
              </p>
              <Link 
                to="/builder"
                className="relative z-10 px-10 py-4 bg-white text-navy-900 font-bold rounded-full hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-block"
              >
                 Start Building Now
              </Link>
           </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
