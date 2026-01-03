
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TemplatesMap } from '../components/templates';
import { ResumeData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../components/ui/Icons';
import { useResume } from '../App';
import { parseResumeFromText } from '../services/geminiService';
import { parseResumeFromTextLocal } from '../services/localParserService';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

// ENRICHED dummy data for the homepage preview to look "fulfilled"
// Fix: Added missing address, achievements, and customSections properties to satisfy ResumeData interface
const previewData: ResumeData = {
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Senior Software Engineer",
  email: "jane.doe@example.com",
  phone: "(555) 123-4567",
  address: "123 Tech Lane",
  city: "San Francisco",
  country: "CA",
  summary: "Results-driven Senior Software Engineer with over 8 years of experience specializing in building scalable, high-performance web applications. Proven track record of leading cross-functional teams and implementing modern frontend architectures. Expert in React ecosystem, TypeScript, and cloud infrastructure with a deep focus on UI/UX best practices and accessibility.",
  experience: [
    {
      id: "1",
      jobTitle: "Senior Frontend Lead",
      employer: "TechFlow Solutions",
      startDate: "2021-03",
      endDate: "Present",
      location: "San Francisco, CA",
      description: "• Lead a team of 12 developers in rebuilding the core customer dashboard, improving load times by 40%.\n• Architected a reusable component library using React and Tailwind CSS, adopted by 5 independent product teams.\n• Mentored junior developers and implemented standardized code review processes that reduced production bugs by 25%.\n• Spearheaded the migration to Next.js, resulting in a 30% improvement in SEO rankings."
    },
    {
      id: "2",
      jobTitle: "Software Engineer II",
      employer: "Creative Digital Agency",
      startDate: "2018-06",
      endDate: "2021-02",
      location: "Austin, TX",
      description: "• Developed responsive e-commerce websites for major Fortune 500 retail clients, increasing mobile conversion rates by 15%.\n• Integrated third-party payment gateways (Stripe, PayPal) and managed headless CMS integrations using Contentful.\n• Collaborated closely with UI/UX designers to ensure pixel-perfect implementation of complex interactive designs."
    },
    {
      id: "3",
      jobTitle: "Junior Web Developer",
      employer: "StartUp Hub",
      startDate: "2016-05",
      endDate: "2018-05",
      location: "San Jose, CA",
      description: "• Assisted in the development of a real-time analytics platform using Vue.js and Firebase.\n• Wrote unit tests and end-to-end tests using Jest and Cypress, maintaining 90% code coverage.\n• Optimized SQL queries for the internal reporting dashboard, reducing load times by 2 seconds."
    }
  ],
  education: [
    {
      id: "1",
      school: "Stanford University",
      degree: "Master of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2018",
      endDate: "2020",
      location: "Stanford, CA"
    },
    {
      id: "2",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2012",
      endDate: "2016",
      location: "Berkeley, CA"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Open Source UI Framework",
      link: "github.com/janedoe/ui-core",
      description: "A lightweight, accessible UI component library built with React and Radix UI primitives.",
      technologies: ["React", "TypeScript", "Tailwind"]
    },
    {
      id: "p2",
      title: "AI Resume Scanner",
      link: "resumescan.ai",
      description: "A tool that uses NLP to analyze resumes against job descriptions for ATS compatibility.",
      technologies: ["Python", "TensorFlow", "React"]
    }
  ],
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL", "AWS", "Next.js", "Docker", "Redux", "CI/CD", "Jest", "PostgreSQL", "System Design"],
  certifications: [],
  languages: [],
  achievements: [],
  // Added missing required property
  customSections: [],
  templateId: 'modern',
  fontFamily: 'Poppins',
  accentColor: '#3b82f6',
  fontSize: 'medium',
  customGaps: {},
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const SmartResumeIllustration = () => {
  return (
    <div className="w-full h-[400px] bg-indigo-50 rounded-3xl relative overflow-hidden flex items-center justify-center border border-indigo-100 shadow-inner group">
       {/* Background Elements */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3"></div>
       </div>

       {/* Main Interface: Resume Builder with AI Sidebar */}
       <div className="relative z-10 w-[320px] h-[340px] bg-white rounded-xl shadow-2xl border border-gray-100 flex overflow-hidden">
          
          {/* Resume Preview (Left/Background) */}
          <div className="flex-1 p-4 space-y-3 bg-gray-50 opacity-50 blur-[1px]">
             <div className="h-4 w-12 bg-gray-300 rounded mb-4"></div>
             <div className="h-2 w-full bg-gray-200 rounded"></div>
             <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
             <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
             
             <div className="h-4 w-16 bg-gray-300 rounded mt-6 mb-2"></div>
             <div className="h-2 w-full bg-gray-200 rounded"></div>
             <div className="h-2 w-full bg-gray-200 rounded"></div>
          </div>

          {/* AI Overlay / Modal (Center/Prominent) */}
          <MotionDiv 
             className="absolute inset-x-4 top-8 bottom-8 bg-white rounded-xl shadow-xl border border-indigo-100 flex flex-col overflow-hidden"
             initial={{ y: 20, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
          >
             {/* Header */}
             <div className="bg-navy-900 p-3 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                   <Icons.Sparkles size={14} className="text-yellow-400" />
                   <span className="text-xs font-bold">AI Optimization</span>
                </div>
                <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded">Beta</div>
             </div>

             {/* Search/Context */}
             <div className="p-4 border-b border-gray-100 bg-indigo-50/50">
                <div className="text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Target Job Title</div>
                <div className="flex items-center bg-white border border-indigo-200 rounded-lg px-2 py-1.5 shadow-sm">
                   <Icons.Search size={12} className="text-indigo-400 mr-2" />
                   <span className="text-xs font-medium text-navy-900">Product Manager</span>
                </div>
             </div>

             {/* Suggestions List */}
             <div className="flex-1 p-4 space-y-3 overflow-hidden relative">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Recommended Phrases</div>
                
                {/* Item 1 */}
                <MotionDiv 
                   className="p-2.5 rounded-lg border border-indigo-100 bg-white shadow-sm flex gap-3 group/item hover:border-indigo-300 transition-colors cursor-pointer"
                   initial={{ x: -10, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                >
                   <div className="mt-0.5">
                      <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                         <Icons.Plus size={10} strokeWidth={3} />
                      </div>
                   </div>
                   <div className="text-[10px] text-gray-600 leading-relaxed group-hover/item:text-gray-900">
                      Spearheaded cross-functional team collaboration to launch MVP.
                   </div>
                </MotionDiv>

                {/* Item 2 */}
                <MotionDiv 
                   className="p-2.5 rounded-lg border border-indigo-100 bg-white shadow-sm flex gap-3 group/item hover:border-indigo-300 transition-colors cursor-pointer"
                   initial={{ x: -10, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.3 }}
                >
                   <div className="mt-0.5">
                      <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                         <Icons.Plus size={10} strokeWidth={3} />
                      </div>
                   </div>
                   <div className="text-[10px] text-gray-600 leading-relaxed group-hover/item:text-gray-900">
                      Defined product roadmap aligning with business goals.
                   </div>
                </MotionDiv>

                {/* Mouse Cursor */}
                <MotionDiv 
                   className="absolute bottom-8 right-8 pointer-events-none"
                   initial={{ opacity: 0, x: 20, y: 20 }}
                   whileInView={{ opacity: 1, x: 0, y: 0 }}
                   transition={{ delay: 0.8, duration: 0.6 }}
                >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                      <path d="M5.5 3.5L11.5 19.5L13.5 13.5L19.5 11.5L5.5 3.5Z" fill="#1e1b4b" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                   </svg>
                </MotionDiv>
             </div>
          </MotionDiv>

          {/* Floating Badge */}
          <MotionDiv 
             className="absolute -right-4 top-4 bg-green-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-20"
             initial={{ scale: 0 }}
             whileInView={{ scale: 1 }}
             transition={{ delay: 0.6, type: "spring" }}
          >
             <Icons.TrendingUp size={12} strokeWidth={3} />
             <span className="text-[10px] font-bold">Optimization +45%</span>
          </MotionDiv>
       </div>
    </div>
  );
};

const AutoGenerationIllustration = () => {
  return (
    <div className="w-full h-[400px] bg-purple-50 rounded-3xl relative overflow-hidden flex items-center justify-center border border-purple-100 shadow-inner group">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4"></div>
       </div>

       {/* Container */}
       <div className="relative z-10 w-[300px] h-[340px]">
          
          {/* Resume Card (Charles Mendoza style) */}
          <MotionDiv 
             className="absolute left-0 top-0 w-64 h-80 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden flex flex-col z-10"
             initial={{ y: 20, rotate: -2 }}
             whileInView={{ y: 0, rotate: -2 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
          >
             <div className="flex h-full">
                {/* Sidebar */}
                <div className="w-1/3 bg-[#334155] p-3 flex flex-col items-center pt-6">
                   <div className="w-10 h-10 bg-slate-400 rounded-full mb-4 border-2 border-white/20"></div>
                   <div className="w-full space-y-2">
                      <div className="h-1 bg-white/20 rounded-full w-full"></div>
                      <div className="h-1 bg-white/20 rounded-full w-3/4"></div>
                      <div className="h-1 bg-white/20 rounded-full w-5/6"></div>
                   </div>
                   <div className="w-full space-y-2 mt-auto pb-4">
                      <div className="h-1 bg-white/20 rounded-full w-full"></div>
                      <div className="h-1 bg-white/20 rounded-full w-2/3"></div>
                   </div>
                </div>
                {/* Main Content */}
                <div className="flex-1 p-4 space-y-4">
                   <div>
                      <div className="h-3 bg-[#334155] rounded w-3/4 mb-1"></div>
                      <div className="h-1.5 bg-slate-300 rounded w-1/2"></div>
                   </div>
                   
                   <div className="space-y-2 pt-2">
                      <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-5/6"></div>
                   </div>

                   {/* AI Auto-fill highlighted section */}
                   <div className="relative p-2 rounded bg-purple-50 border border-purple-100">
                      <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">AI</div>
                      <div className="h-1.5 bg-purple-200 rounded w-full mb-1.5"></div>
                      <div className="h-1.5 bg-purple-200 rounded w-3/4"></div>
                   </div>

                   <div className="space-y-2">
                      <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-4/5"></div>
                   </div>
                </div>
             </div>
          </MotionDiv>

          {/* Robot Character (The "Auto" agent) */}
          <MotionDiv
             className="absolute -right-4 bottom-8 z-20 pointer-events-none"
             initial={{ x: 40, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
          >
             <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Antenna */}
                <path d="M70 30V15" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                <circle cx="70" cy="15" r="5" fill="#facc15" stroke="#1e293b" strokeWidth="3" />
                {/* Head */}
                <rect x="35" y="30" width="70" height="50" rx="12" fill="#bae6fd" stroke="#1e293b" strokeWidth="4" />
                {/* Eyes */}
                <circle cx="55" cy="50" r="6" fill="#4ade80" stroke="#1e293b" strokeWidth="2" />
                <circle cx="85" cy="50" r="6" fill="#4ade80" stroke="#1e293b" strokeWidth="2" />
                {/* Smile */}
                <path d="M60 65C60 65 65 70 70 70C75 70 80 65 80 65" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                {/* Ears */}
                <path d="M35 55H25C22.2386 55 20 52.7614 20 50V60C20 62.7614 22.2386 65 25 65H35" fill="#94a3b8" stroke="#1e293b" strokeWidth="3" />
                <path d="M105 55H115C117.761 55 120 52.7614 120 50V60C120 62.7614 117.761 65 115 65H105" fill="#94a3b8" stroke="#1e293b" strokeWidth="3" />
                {/* Body */}
                <path d="M45 85H95V120C95 128.284 88.2843 135 80 135H60C51.7157 135 45 128.284 45 120V85Z" fill="#e0f2fe" stroke="#1e293b" strokeWidth="4" />
                {/* Screen on body */}
                <rect x="58" y="95" width="24" height="16" rx="2" fill="#bfdbfe" stroke="#1e293b" strokeWidth="2" />
             </svg>
          </MotionDiv>

          {/* Success Bubble */}
          <MotionDiv 
             className="absolute -left-4 top-16 z-30"
             initial={{ scale: 0 }}
             whileInView={{ scale: 1 }}
             viewport={{ once: true }}
             transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
          >
             <div className="w-16 h-16 bg-[#4ade80] rounded-full border-4 border-[#1e293b] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(30,41,59,0.3)]">
                <Icons.Check size={32} className="text-[#1e293b] stroke-[4]" />
             </div>
          </MotionDiv>

       </div>
    </div>
  );
};

const AtsIllustration = () => {
  return (
    <div className="w-full h-[400px] bg-[#eff6ff] rounded-3xl relative overflow-hidden flex items-center justify-center border border-blue-100 shadow-inner group">
      {/* Background Circuit Pattern - Blue/Gray strokes */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
         <path d="M50 0 V400 M150 0 V400 M250 0 V400 M350 0 V400 M450 0 V400" stroke="#93c5fd" strokeWidth="0.5" />
         <path d="M0 50 H600 M0 150 H600 M0 250 H600 M0 350 H600" stroke="#93c5fd" strokeWidth="0.5" />
         <circle cx="150" cy="150" r="2" fill="#3b82f6" />
         <circle cx="350" cy="250" r="2" fill="#3b82f6" />
      </svg>

      {/* Glow Effect Top Left - Light Blue */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300/20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-300/20 rounded-full blur-[80px]"></div>

      {/* Document - White */}
      <div className="relative z-10 w-[240px] h-[320px] bg-white rounded-xl border border-blue-100 shadow-2xl p-6 flex flex-col">
         {/* Top Flare - Subtle shine */}
         <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-400 rounded-full blur-[50px] opacity-10 animate-pulse"></div>
         
         {/* Header */}
         <div className="flex gap-3 mb-8 relative">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-blue-50 rounded-full opacity-50"></div>
            </div>
            <div className="flex-1 space-y-2 py-1">
               <div className="h-2 w-full bg-blue-50 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500 w-1/2 animate-[shimmer_2s_infinite]"></div>
               </div>
               <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
            </div>
            {/* Circuit Line Out */}
            <svg className="absolute top-2 left-full w-24 h-10 overflow-visible pointer-events-none">
               <path d="M 0 0 L 20 0 L 40 10 L 80 10" fill="none" stroke="#3b82f6" strokeWidth="2" className="opacity-80" />
               <circle cx="80" cy="10" r="3" fill="#3b82f6" className="animate-ping" />
            </svg>
         </div>

         {/* Sections */}
         <div className="space-y-6 relative">
            
            {/* Experience */}
            <div className="relative">
               <div className="text-[9px] text-blue-900 font-bold uppercase tracking-wider mb-2">Experience</div>
               <div className="space-y-2">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-1.5 w-5/6 bg-gray-100 rounded-full"></div>
                  <div className="h-1.5 w-2/3 bg-gray-100 rounded-full"></div>
               </div>
               {/* Circuit Line */}
               <svg className="absolute top-1/2 left-full w-32 h-20 -translate-y-1/2 overflow-visible pointer-events-none">
                  <path d="M 5 0 L 30 0 L 50 20 L 100 20" fill="none" stroke="#60a5fa" strokeWidth="2" className="opacity-80" />
                  <circle cx="100" cy="20" r="3" fill="#60a5fa" />
               </svg>
            </div>

            {/* Skills */}
            <div className="relative">
               <div className="text-[9px] text-blue-900 font-bold uppercase tracking-wider mb-2">Skills</div>
               <div className="space-y-2">
                  <div className="h-2 w-full bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.4)]"></div>
                  <div className="h-1.5 w-4/5 bg-gray-100 rounded-full"></div>
               </div>
               {/* Circuit Line */}
               <svg className="absolute top-1/2 left-full w-40 h-20 -translate-y-1/2 overflow-visible pointer-events-none">
                  <path d="M 5 0 L 20 0 L 40 30 L 120 30" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="120" cy="30" r="4" fill="#22c55e" className="animate-pulse" />
               </svg>
            </div>

            {/* Education */}
            <div className="relative">
               <div className="text-[9px] text-blue-900 font-bold uppercase tracking-wider mb-2">Education</div>
               <div className="space-y-2">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-1.5 w-3/4 bg-gray-100 rounded-full"></div>
               </div>
               {/* Circuit Line */}
               <svg className="absolute top-1/2 left-full w-24 h-20 -translate-y-1/2 overflow-visible pointer-events-none">
                  <path d="M 5 0 L 15 0 L 35 -10 L 80 -10" fill="none" stroke="#93c5fd" strokeWidth="2" className="opacity-80" />
                  <circle cx="80" cy="-10" r="3" fill="#93c5fd" />
               </svg>
            </div>
         </div>
      </div>
    </div>
  );
};

const HeroIllustration = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center select-none pointer-events-none lg:pointer-events-auto">
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-blue-100/40 via-purple-50/40 to-cyan-50/40 opacity-80 rounded-full blur-3xl animate-pulse-slow" />
      
      {/* Decorative Floating Elements */}
      <MotionDiv 
        className="absolute top-10 left-0 w-3 h-3 bg-blue-400 rounded-full"
        animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <MotionDiv 
        className="absolute top-20 right-10 w-2 h-2 bg-green-400 rounded-full"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <MotionDiv 
        className="absolute bottom-20 left-10 w-4 h-4 border-2 border-purple-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Multi-Page Effect: Stacked papers for depth */}
      <div className="absolute z-0 w-[300px] md:w-[360px] aspect-[210/297] bg-white rounded-xl shadow-lg border border-gray-100 transform -rotate-6 translate-x-12 translate-y-6 opacity-30"></div>
      <div className="absolute z-0 w-[300px] md:w-[360px] aspect-[210/297] bg-white rounded-xl shadow-lg border border-gray-100 transform rotate-3 -translate-x-8 translate-y-3 opacity-50"></div>

      {/* Main Resume Document Layer (High Content Density) */}
      <MotionDiv 
         className="relative z-10 w-[320px] md:w-[400px] aspect-[210/297] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
         initial={{ y: 20, rotate: -1 }}
         animate={{ y: 0, rotate: -1 }}
         whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.3 } }}
         transition={{ duration: 0.8, ease: "easeOut" }}
      >
         {/* Doc Header - Detailed with Name and Sub-info */}
         <div className="p-8 pb-4">
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                    <div className="h-7 w-40 bg-navy-900 rounded-md" /> {/* JANE DOE placeholder */}
                    <div className="h-3 w-32 bg-blue-600 rounded-md opacity-90" /> {/* Senior Engineer placeholder */}
                </div>
                <div className="space-y-2 text-right">
                    <div className="h-1.5 w-24 bg-gray-200 rounded-full ml-auto" />
                    <div className="h-1.5 w-28 bg-gray-200 rounded-full ml-auto" />
                    <div className="h-1.5 w-20 bg-gray-200 rounded-full ml-auto" />
                </div>
            </div>
            
            {/* Divider */}
            <div className="h-[2px] w-full bg-blue-500/20 mb-8" />

            <div className="grid grid-cols-12 gap-8">
               {/* Main Body (Left 8 cols) */}
               <div className="col-span-8 space-y-8">
                  {/* Summary */}
                  <div>
                      <div className="flex items-center gap-2 mb-3">
                         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                         <div className="h-2 w-28 bg-navy-900/10 rounded-full" /> 
                      </div>
                      <div className="space-y-2.5">
                          <div className="h-2 bg-gray-100 rounded-full w-full" />
                          <div className="h-2 bg-gray-100 rounded-full w-full" />
                          <div className="h-2 bg-gray-100 rounded-full w-11/12" />
                      </div>
                  </div>

                  {/* Experience Section */}
                  <div className="space-y-8">
                      <div className="flex items-center gap-2 mb-4">
                         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                         <div className="h-2 w-20 bg-navy-900/10 rounded-full" /> 
                      </div>
                      
                      {/* Entry 1 */}
                      <div className="space-y-3">
                          <div className="flex justify-between items-baseline">
                              <div className="h-3 w-36 bg-gray-800 rounded-full" />
                              <div className="h-2 w-20 bg-gray-200 rounded-full opacity-60" />
                          </div>
                          <div className="h-2 w-28 bg-blue-400 rounded-full opacity-30 mb-3" />
                          <div className="space-y-2 pl-4 border-l border-gray-100">
                              <div className="h-1.5 bg-gray-50 rounded-full w-full" />
                              <div className="h-1.5 bg-gray-50 rounded-full w-full" />
                              <div className="h-1.5 bg-gray-50 rounded-full w-5/6" />
                          </div>
                      </div>

                      {/* Entry 2 */}
                      <div className="space-y-3 pt-2">
                          <div className="flex justify-between items-baseline">
                              <div className="h-3 w-28 bg-gray-800 rounded-full" />
                              <div className="h-2 w-20 bg-gray-200 rounded-full opacity-60" />
                          </div>
                          <div className="h-2 w-32 bg-blue-400 rounded-full opacity-30 mb-3" />
                          <div className="space-y-2 pl-4 border-l border-gray-100">
                              <div className="h-1.5 bg-gray-50 rounded-full w-full" />
                              <div className="h-1.5 bg-gray-50 rounded-full w-11/12" />
                          </div>
                      </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                         <div className="h-2 w-20 bg-navy-900/10 rounded-full" /> 
                      </div>
                      <div className="flex justify-between">
                         <div className="space-y-2">
                            <div className="h-3 w-40 bg-gray-700 rounded-full" />
                            <div className="h-2 w-32 bg-gray-400 rounded-full opacity-40" />
                         </div>
                         <div className="h-2 w-16 bg-gray-200 rounded-full" />
                      </div>
                  </div>
               </div>

               {/* Sidebar (Right 4 cols) */}
               <div className="col-span-4 space-y-8 border-l border-gray-50 pl-6">
                  {/* Skills Cloud */}
                  <div>
                      <div className="h-2 w-12 bg-navy-900/10 rounded-full mb-4" />
                      <div className="flex flex-wrap gap-2">
                          {[...Array(8)].map((_, i) => (
                              <div key={i} className="h-5 px-3 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center">
                                  <div className="h-1 w-8 bg-blue-400/40 rounded-full" />
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Languages/Awards placeholders */}
                  <div className="space-y-4">
                      <div className="h-2 w-16 bg-navy-900/10 rounded-full" />
                      <div className="space-y-2">
                         <div className="h-1.5 w-full bg-gray-100 rounded-full" />
                         <div className="h-1.5 w-5/6 bg-gray-100 rounded-full" />
                      </div>
                  </div>
               </div>
            </div>
         </div>
         
         {/* Bottom Fade Gradient for "Infinite Content" feel */}
         <div className="mt-auto h-24 bg-gradient-to-t from-white to-transparent" />
      </MotionDiv>

      {/* Floating Meta-Cards */}
      <MotionDiv 
         className="absolute z-20 top-20 right-0 md:-right-16 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/50 w-56"
         initial={{ x: 50, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ delay: 0.6, duration: 0.6 }}
      >
         <div className="flex justify-between items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
               <Icons.Sparkles size={24} fill="currentColor" />
            </div>
            <div className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-md flex items-center gap-1 border border-green-100">
               <Icons.TrendingUp size={10} /> +45% ATS SCORE
            </div>
         </div>
         <div className="space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">AI Optimization</div>
            <div className="text-lg font-bold text-navy-900 leading-tight">Optimized Summary <br/>& Keywords</div>
         </div>
      </MotionDiv>

      <MotionDiv 
         className="absolute z-30 bottom-16 left-0 md:-left-16"
         initial={{ y: 50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.8, duration: 0.6 }}
      >
         <div className="bg-navy-900 text-white p-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 group cursor-pointer hover:bg-navy-800 transition-colors">
            <div className="bg-white/10 p-4 rounded-xl flex items-center gap-3">
                <div className="space-y-1.5">
                    <div className="h-1.5 w-12 bg-white/40 rounded-full" />
                    <div className="h-1.5 w-16 bg-white/20 rounded-full" />
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-inner">
                   <Icons.ChevronRight size={18} />
                </div>
            </div>
            <div className="pr-5">
                <div className="text-[10px] font-bold text-blue-400 uppercase mb-0.5 tracking-widest">Interactive</div>
                <div className="text-sm font-bold">Auto-Fill Content</div>
            </div>
         </div>
      </MotionDiv>
    </div>
  );
};

const Home: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStepLabel, setImportStepLabel] = useState('Initializing...');
  const { setResumeData } = useResume();
  const navigate = useNavigate();

  const importSteps = [
    "Reading file data...",
    "Extracting raw content...",
    "AI is parsing your history...",
    "Identifying key skills...",
    "Structuring for ATS formatting...",
    "Finalizing profile data..."
  ];

  const [insightIndex, setInsightIndex] = useState(0);
  const aiInsights = [
    "Scanning document for 50+ layout markers...",
    "Normalizing job titles for ATS clarity...",
    "Extracting quantifiable metrics (%, $, #)...",
    "Matching skills to industry standard taxonomy...",
    "Benchmarking against top professional templates...",
    "Detecting hidden keywords for recruiter searches..."
  ];

  // Cycle through insights while importing
  useEffect(() => {
    let interval: any;
    if (isImporting) {
      interval = setInterval(() => {
        setInsightIndex(prev => (prev + 1) % aiInsights.length);
      }, 2400); // Slower for better readability
    }
    return () => {
       if (interval) clearInterval(interval);
    };
  }, [isImporting]);

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
    setImportProgress(10);
    setImportStepLabel(importSteps[0]);

    try {
      await new Promise(r => setTimeout(r, 600));
      setImportProgress(25);
      setImportStepLabel(importSteps[1]);

      let textToParse = '';

      if (file.type === 'application/json') {
        const text = await file.text();
        const data = JSON.parse(text);
        setResumeData(prev => ({ ...prev, ...data }));
        setImportProgress(100);
        setImportStepLabel("Success!");
        setTimeout(() => navigate('/builder/summary'), 800);
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
        setImportProgress(45);
        setImportStepLabel(importSteps[2]);
        
        const aiResult = await parseResumeFromText(textToParse);
        
        setImportProgress(75);
        setImportStepLabel(importSteps[3]);
        await new Promise(r => setTimeout(r, 400));
        
        setImportProgress(90);
        setImportStepLabel(importSteps[4]);

        let extractedData: Partial<ResumeData> = {};
        if (aiResult) {
           extractedData = aiResult.resumeData;
        } else {
           console.log("AI parsing unavailable. Using Local Parser.");
           extractedData = parseResumeFromTextLocal(textToParse);
        }

        if (Object.keys(extractedData).length > 0) {
           setResumeData(prev => ({ ...prev, ...extractedData }));
           setImportProgress(100);
           setImportStepLabel(importSteps[5]);
           setTimeout(() => {
              navigate('/builder/header');
           }, 1000);
        } else {
           alert("Could not extract data from resume. Please try filling it manually.");
           setIsImporting(false);
        }
      }

    } catch (error) {
      console.error("Import failed:", error);
      alert("Failed to import resume. Please try again.");
      setIsImporting(false);
    } finally {
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
              <MotionDiv 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                 <MotionDiv variants={fadeInUp} className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-blue-500 inline-block"></span>
                    Online Resume Builder
                 </MotionDiv>
                 <MotionH1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 text-navy-900">
                    Create a Job-ready <br />
                    <span className="text-navy-900">Resume</span> <span className="text-gray-400 font-light">in minutes</span>
                 </MotionH1>
                 <MotionP variants={fadeInUp} className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md">
                    An AI-powered resume builder that optimizes your content to match job descriptions and boost your landing chances.
                 </MotionP>
                 <MotionDiv variants={fadeInUp} className="flex flex-wrap gap-4 justify-center md:justify-start">
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
                       <Icons.Upload size={18} />
                       Import Resume
                    </button>
                 </MotionDiv>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, x: 50, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative hidden lg:block"
              >
                 <HeroIllustration />
              </MotionDiv>
           </div>
        </section>

        {/* --- Top Templates Section --- */}
        <section className="bg-gray-50 py-24 overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <MotionDiv 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-100px" }}
                 variants={fadeInUp}
                 className="text-center mb-16"
              >
                 <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">Our top templates</h2>
                 <p className="text-gray-500 max-w-lg mx-auto">Professionally designed, ATS-friendly templates that get you hired.</p>
              </MotionDiv>

              <div className="flex flex-col lg:flex-row items-center gap-16">
                 {/* Left Text */}
                 <MotionDiv 
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
                 </MotionDiv>

                 {/* Right Visual (Overlapping Cards with REAL Templates) */}
                 <div className="lg:w-2/3 relative h-[500px] flex items-center justify-center">
                    {/* Left Ghost Card */}
                    <MotionDiv 
                       className="absolute left-0 lg:left-10 top-10 z-0"
                       initial={{ opacity: 0, x: -50, rotate: -10 }}
                       whileInView={{ opacity: 0.6, x: 0, rotate: -6 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8 }}
                    >
                        <div className="w-[280px] h-[400px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                           {/* Render "Professional" template scaled down */}
                           <div className="w-[210mm] h-[297mm] origin-top-left transform scale-[0.35]">
                              <TemplatesMap.professional data={previewData} />
                           </div>
                        </div>
                    </MotionDiv>

                    {/* Right Ghost Card */}
                    <MotionDiv 
                       className="absolute right-0 lg:right-10 top-10 z-0"
                       initial={{ opacity: 0, x: 50, rotate: 10 }}
                       whileInView={{ opacity: 0.6, x: 0, rotate: 6 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8 }}
                    >
                        <div className="w-[280px] h-[400px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                           {/* Render "Minimal" template scaled down */}
                           <div className="w-[210mm] h-[297mm] origin-top-left transform scale-[0.35]">
                              <TemplatesMap.minimal data={previewData} />
                           </div>
                        </div>
                    </MotionDiv>
                    
                    {/* Main Center Card */}
                    <MotionDiv 
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
                    </MotionDiv>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Features Section --- */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <MotionDiv 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-24"
           >
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Tools Designed to Land You Interviews</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm">From AI optimization to ATS friendly templates & everything you need.</p>
           </MotionDiv>

           <div className="space-y-32">
              {/* Feature 1 - Updated with Integrated UI */}
              <MotionDiv 
                 className="grid md:grid-cols-2 gap-16 items-center"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-100px" }}
                 variants={staggerContainer}
              >
                 <MotionDiv variants={fadeInLeft} className="relative">
                    <SmartResumeIllustration />
                 </MotionDiv>
                 <MotionDiv variants={fadeInRight} className="md:pl-8">
                    <h3 className="text-3xl font-bold text-navy-900 mb-4">Smarter Resumes. More Interviews.</h3>
                    <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                       Just paste the job description or industry you are looking for and let AI do the heavy lifting—optimizing your resume to meet recruiter's expectations perfectly Bird.
                    </p>
                 </MotionDiv>
              </MotionDiv>

              {/* Feature 2 */}
              <MotionDiv 
                 className="grid md:grid-cols-2 gap-16 items-center"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-100px" }}
                 variants={staggerContainer}
              >
                 <MotionDiv variants={fadeInLeft} className="order-2 md:order-1 md:pr-8">
                    <h3 className="text-3xl font-bold text-navy-900 mb-4">Auto generation makes easy</h3>
                    <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                       Skip the struggle of writing—our auto-generate feature creates polished resume content in just a click. Fast, smart, and completely hassle-free.
                    </p>
                 </MotionDiv>
                 <MotionDiv variants={fadeInRight} className="order-1 md:order-2 relative">
                    <div className="absolute inset-0 bg-purple-600 rounded-3xl transform -rotate-3 opacity-10"></div>
                    <AutoGenerationIllustration />
                 </MotionDiv>
              </MotionDiv>

              {/* Feature 3 */}
              <MotionDiv 
                 className="grid md:grid-cols-2 gap-16 items-center"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-100px" }}
                 variants={staggerContainer}
              >
                 <MotionDiv variants={fadeInLeft} className="relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-2 opacity-30"></div>
                    <AtsIllustration />
                 </MotionDiv>
                 <MotionDiv variants={fadeInRight} className="md:pl-8">
                    <h3 className="text-3xl font-bold text-navy-900 mb-4">ATS-Ready Resume Templates</h3>
                    <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                       Choose from recruiter-approved templates designed specifically to pass Applicant Tracking Systems (ATS) without losing visual appeal.
                    </p>
                 </MotionDiv>
              </MotionDiv>
           </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section className="py-24 bg-white">
           <div className="max-w-6xl mx-auto px-4 text-center">
              <MotionH1 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInUp}
                 className="text-3xl md:text-4xl font-bold text-navy-900 mb-16"
              >
                 Hear from our customers
              </MotionH1>
              
              <MotionDiv 
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
                    <MotionDiv 
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
                    </MotionDiv>
                 ))}
              </MotionDiv>
           </div>
        </section>

        {/* --- Bottom CTA --- */}
        <section className="py-24 px-4">
           <MotionDiv 
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
           </MotionDiv>
        </section>

        {/* --- Engaging Import Modal Overlay --- */}
        <AnimatePresence>
          {isImporting && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               {/* Backdrop */}
               <MotionDiv 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-navy-900/60 backdrop-blur-xl"
               />

               {/* Modal Card */}
               <MotionDiv
                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
                 animate={{ scale: 1, opacity: 1, y: 0 }}
                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
                 className="relative bg-white w-full max-w-md rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden p-10 text-center border border-white/20"
               >
                  {/* Doc Icon with High-Tech Radar Scanning Effect */}
                  <div className="relative w-32 h-32 mx-auto mb-10">
                     {/* Radar Waves */}
                     {[1, 2, 3].map((i) => (
                       <MotionDiv
                         key={i}
                         className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1.6, opacity: 0 }}
                         transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                       />
                     ))}
                     
                     <div className="absolute inset-0 bg-blue-50 rounded-[32px] shadow-inner"></div>
                     <div className="relative z-10 w-full h-full flex items-center justify-center text-blue-600">
                        <Icons.FileText size={56} strokeWidth={1.5} />
                     </div>
                     
                     {/* Refined Laser Scanner Line */}
                     <MotionDiv 
                        className="absolute left-6 right-6 h-1 z-20 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,1)]"
                        animate={{ top: ['20%', '80%', '20%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                     />
                  </div>

                  <div className="space-y-1 mb-8">
                    <h3 className="text-2xl font-bold text-navy-900 tracking-tight">Processing Resume</h3>
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">Intelligent AI Extraction</p>
                  </div>
                  
                  {/* Active AI Insights Carousel */}
                  <div className="h-6 flex items-center justify-center mb-4">
                    <AnimatePresence mode="wait">
                      <MotionDiv
                        key={insightIndex}
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        className="text-gray-400 text-xs font-semibold flex items-center justify-center gap-2"
                      >
                        <Icons.Sparkles size={14} className="text-yellow-500" fill="currentColor" />
                        {aiInsights[insightIndex]}
                      </MotionDiv>
                    </AnimatePresence>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-4 mb-10">
                     {/* Step Indicators */}
                     <div className="flex justify-between items-center gap-1 mb-2 px-1">
                        {importSteps.map((step, idx) => {
                          const currentStepIndex = importSteps.indexOf(importStepLabel);
                          const isCompleted = idx < currentStepIndex;
                          const isActive = idx === currentStepIndex;
                          
                          return (
                            <div key={idx} className="flex-1 h-1 rounded-full overflow-hidden bg-gray-100">
                               <MotionDiv 
                                  className={`h-full ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-transparent'}`}
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: (isCompleted || isActive) ? 1 : 0 }}
                                  transition={{ duration: 0.5 }}
                                  style={{ originX: 0 }}
                               />
                            </div>
                          );
                        })}
                     </div>

                     <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-2">
                           <MotionDiv 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="text-blue-500"
                           >
                              <Icons.Wrench size={12} />
                           </MotionDiv>
                           <span className="text-gray-500 text-[11px] font-bold italic tracking-tight">{importStepLabel}</span>
                        </div>
                        <span className="text-blue-600 text-xs font-black tracking-tighter">{importProgress}%</span>
                     </div>

                     {/* Shimmering Progress Bar */}
                     <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden relative border border-gray-50 shadow-inner">
                        <MotionDiv 
                           className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"
                           initial={{ width: "0%" }}
                           animate={{ width: `${importProgress}%` }}
                           transition={{ type: "spring", bounce: 0, duration: 1.2 }}
                        />
                        {/* Shimmer Overlay */}
                        <MotionDiv 
                           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
                           animate={{ x: ['-100%', '300%'] }}
                           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                     </div>
                  </div>

                  {/* Engaging Tip Card with floating micro-interaction */}
                  <MotionDiv 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl border border-blue-100/50 text-left relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 p-3 opacity-10">
                        <Icons.Sparkles size={40} />
                     </div>
                     <div className="flex gap-4">
                        <div className="mt-1 text-blue-500 flex-shrink-0">
                           <div className="p-2 bg-white rounded-xl shadow-sm">
                              <Icons.Zap size={20} fill="currentColor" />
                           </div>
                        </div>
                        <div>
                           <div className="text-[11px] font-bold text-navy-900 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                              Pro Tip 
                              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                           </div>
                           <p className="text-[12px] text-gray-600 leading-relaxed font-medium">
                              Our AI identifies <b>quantifiable metrics</b> (like % growth) which can boost your initial screening success rate by up to <b>45%</b>.
                           </p>
                        </div>
                     </div>
                  </MotionDiv>
               </MotionDiv>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
