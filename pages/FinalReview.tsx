
import React, { useRef, useState, useEffect } from 'react';
import { useResume } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import { Icons } from '../components/ui/Icons';
import Header from '../components/Header';
import { TemplatesMap } from '../components/templates';
import ATSFlowHeader from '../components/ATSFlowHeader';

const A4_WIDTH_PX = 793.7; // 210mm at 96 DPI

const FinalReview: React.FC = () => {
  const { resumeData } = useResume();
  const navigate = useNavigate();
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Template render logic
  const SelectedTemplate = TemplatesMap[resumeData.templateId] || TemplatesMap['professional'];

  // Handle scaling for responsiveness
  useEffect(() => {
    if (!previewContainerRef.current) return;

    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        if (containerWidth > 0) {
          // Calculate scale to fit container width
          setScale(containerWidth / A4_WIDTH_PX);
        }
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(previewContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <ATSFlowHeader onBack={() => navigate('/ats-templates')} />
      
      <main className="flex-1 py-8 px-4 flex flex-col items-center gap-6">
        {/* Top Action Bar */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
           <div className="text-center md:text-left">
              <h1 className="text-xl font-bold text-navy-900 flex items-center gap-2 justify-center md:justify-start">
                 <Icons.CheckCircle className="text-green-500" size={20} /> Final Review
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                 Your resume is ATS optimized. Review it one last time before downloading.
              </p>
           </div>
           
           <div className="flex gap-4">
              <Link 
                 to="/ats-templates" 
                 className="px-5 py-2.5 text-gray-600 font-bold text-sm hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors"
              >
                 Change Template
              </Link>
              <button
                 onClick={() => navigate('/success')}
                 className="flex items-center gap-2 px-6 py-2.5 bg-navy-900 text-white rounded-xl font-bold text-sm hover:bg-navy-800 transition-all shadow-lg shadow-navy-900/20 transform hover:-translate-y-0.5"
              >
                 <Icons.Download size={18} />
                 Confirm & Download
              </button>
           </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 w-full flex justify-center pb-12">
           <div
              ref={previewContainerRef}
              className="w-full max-w-[210mm] bg-white shadow-2xl rounded-sm overflow-hidden"
              style={{ aspectRatio: '210 / 297' }}
            >
              <div
                className="origin-top-left"
                style={{
                  width: `${A4_WIDTH_PX}px`,
                  minHeight: `${A4_WIDTH_PX * (297 / 210)}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                <div className="bg-white print:w-[210mm] print:h-[297mm]">
                  <SelectedTemplate data={resumeData} />
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default FinalReview;
