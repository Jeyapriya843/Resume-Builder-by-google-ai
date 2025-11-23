import React, { useRef } from 'react';
import { useResume } from '../App';
import { Link } from 'react-router-dom';
import { Icons } from '../components/ui/Icons';
import Header from '../components/Header';
import { TemplatesMap } from '../components/templates';

const Preview: React.FC = () => {
  const { resumeData } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Get the component for the selected template ID, fallback to modern if not found
  const SelectedTemplate = TemplatesMap[resumeData.templateId] || TemplatesMap['modern'];

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
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-2 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20"
              >
                <Icons.Download size={18} />
                Download PDF
              </button>
           </div>
        </div>

        {/* Resume Page Container */}
        <div className="relative shadow-2xl print:shadow-none">
           <div ref={resumeRef} className="print:w-full print:max-w-none">
              <SelectedTemplate data={resumeData} />
           </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;