
import React, { useRef, useState, useEffect } from 'react';
import { useResume, useAuth } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { Icons } from '../components/ui/Icons';
import Header from '../components/Header';
import { TemplatesMap } from '../components/templates';
import AuthModal from '../components/AuthModal';

const A4_WIDTH_PX = 793.7; // 210mm at 96 DPI

const Preview: React.FC = () => {
  const { resumeData } = useResume();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // New handleDownload flow
  const handleDownload = () => {
    if (isLoggedIn) {
      navigate('/pricing');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    navigate('/pricing');
  };

  const resumeRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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
                 to="/builder/template"
                 className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200"
              >
                 Change Template
              </Link>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-2 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20"
              >
                 <Icons.Download size={18} />
                 Download PDF
              </button>
           </div>
        </div>

        {/* Resume Page Container */}
        <div
          ref={previewContainerRef}
          className="w-full max-w-[210mm] shadow-2xl print:shadow-none"
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
            <div ref={resumeRef} className="bg-white print:w-[210mm] print:h-[297mm] overflow-hidden">
              <SelectedTemplate data={resumeData} />
            </div>
          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Preview;
