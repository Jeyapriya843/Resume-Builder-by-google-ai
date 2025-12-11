
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icons } from '../components/ui/Icons';
import Header from '../components/Header';
import { useResume } from '../App';
import { TemplatesMap } from '../components/templates';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('Copy Resume Text');
  
  // Reference for the hidden resume container used for PDF generation
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);

    try {
      // @ts-ignore
      const html2pdf = window.html2pdf;
      if (!html2pdf) {
         alert("PDF generator not loaded. Please check your internet connection.");
         return;
      }

      const opt = {
        margin: 0,
        filename: `${resumeData.firstName || 'Resume'}_${resumeData.lastName || ''}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(resumeRef.current).save();
    } catch (e) {
      console.error("Download failed", e);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = () => {
    let fullText = `${resumeData.firstName} ${resumeData.lastName}\n${resumeData.jobTitle}\n`;
    
    if (resumeData.email) fullText += `Email: ${resumeData.email}\n`;
    if (resumeData.phone) fullText += `Phone: ${resumeData.phone}\n`;
    if (resumeData.city || resumeData.country) fullText += `Location: ${resumeData.city}, ${resumeData.country}\n`;
    
    if (resumeData.summary) {
        fullText += `\nSUMMARY\n${resumeData.summary}\n`;
    }
    
    if (resumeData.experience.length > 0) {
        fullText += `\nEXPERIENCE\n`;
        resumeData.experience.forEach(exp => {
            fullText += `${exp.jobTitle} at ${exp.employer} (${exp.startDate} - ${exp.endDate})\n${exp.description}\n\n`;
        });
    }
    
    if (resumeData.education.length > 0) {
        fullText += `\nEDUCATION\n`;
        resumeData.education.forEach(edu => {
            fullText += `${edu.degree} in ${edu.fieldOfStudy}\n${edu.school} (${edu.startDate} - ${edu.endDate})\n\n`;
        });
    }

    if (resumeData.skills.length > 0) {
        fullText += `\nSKILLS\n${resumeData.skills.join(', ')}\n`;
    }

    navigator.clipboard.writeText(fullText).then(() => {
        setCopyFeedback('Copied!');
        setTimeout(() => setCopyFeedback('Copy Resume Text'), 2000);
    });
  };

  const SelectedTemplate = TemplatesMap[resumeData.templateId] || TemplatesMap['professional'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      {/* Hidden Container for PDF Generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div ref={resumeRef} className="w-[210mm] min-h-[297mm] bg-white text-left">
           <SelectedTemplate data={resumeData} />
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden"
        >
           <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icons.Check className="text-green-500 w-6 h-6" strokeWidth={3} />
                 </div>
              </div>
           </div>

           <h1 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">
             Your resume is ready!
           </h1>

           <p className="text-gray-500 text-sm mb-10 leading-relaxed">
             Great job! You've successfully created a professional resume tailored to your needs.
           </p>

           <div className="space-y-4 mb-8">
               <button 
                 onClick={handleDownload}
                 disabled={isDownloading}
                 className="w-full bg-[#061c3d] hover:bg-[#0a2a5c] text-white font-semibold py-3.5 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
               >
                 {isDownloading ? (
                   <>
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     Generating PDF...
                   </>
                 ) : (
                   <>
                     <Icons.Download size={20} />
                     Download PDF
                   </>
                 )}
               </button>

               <button 
                 onClick={handleCopyText}
                 className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-navy-900 font-semibold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2"
               >
                 <Icons.FileText size={20} className="text-gray-400" />
                 {copyFeedback}
               </button>
           </div>

           <button 
             onClick={() => navigate('/')}
             className="text-gray-400 hover:text-navy-900 text-sm font-medium transition-colors"
           >
             Back to Dashboard
           </button>
        </motion.div>
      </main>
    </div>
  );
};

export default Success;
