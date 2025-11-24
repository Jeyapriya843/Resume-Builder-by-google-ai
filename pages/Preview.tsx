import React, { useRef, useState } from 'react';
import { useResume } from '../App';
import { Link } from 'react-router-dom';
import { Icons } from '../components/ui/Icons';
import Header from '../components/Header';
import { TemplatesMap } from '../components/templates';

const Preview: React.FC = () => {
  const { resumeData } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    const element = resumeRef.current;
    
    // Check if html2pdf is available (loaded via CDN in index.html)
    // @ts-ignore
    if (typeof window !== 'undefined' && window.html2pdf && element) {
       const opt = {
          margin: 0,
          filename: `${resumeData.firstName || 'Resume'}_${resumeData.lastName || 'Resume'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
       };

       // @ts-ignore
       window.html2pdf().set(opt).from(element).save().then(() => {
          setIsDownloading(false);
       }).catch((err: any) => {
          console.error('PDF generation failed', err);
          setIsDownloading(false);
          alert('Failed to generate PDF. Please try using the Print option (Ctrl+P) and Save as PDF.');
       });
    } else {
       // Fallback to native print
       window.print();
       setIsDownloading(false);
    }
  };

  // Get the component for the selected template ID, fallback to professional if not found
  const SelectedTemplate = TemplatesMap[resumeData.templateId] || TemplatesMap['professional'];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="no-print">
        <Header />
      </div>

      <main className="flex-1 py-8 px-4 flex flex-col items-center gap-8">
        {/* Toolbar */}
        <div className="no-print w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
           <Link to="/builder/summary" className="flex items-center gap-2 text-gray-600 hover:text-navy-900 font-medium">
              <Icons.ArrowLeft size={18} />
              Edit Resume
           </Link>
           <div className="flex gap-4">
              <Link 
                 to="/templates"
                 className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200"
              >
                 Change Template
              </Link>
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 px-6 py-2 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20 disabled:opacity-70 disabled:cursor-wait"
              >
                {isDownloading ? (
                   <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Generating...
                   </span>
                ) : (
                   <>
                     <Icons.Download size={18} />
                     Download PDF
                   </>
                )}
              </button>
           </div>
        </div>

        {/* Resume Page Container */}
        <div className="relative shadow-2xl print:shadow-none">
           <div ref={resumeRef} className="print:w-full print:max-w-none bg-white">
              <SelectedTemplate data={resumeData} />
           </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;