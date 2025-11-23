import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ResumeData, initialResumeState } from './types';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import About from './pages/About';
import Templates from './pages/Templates';

// --- Context Setup ---
interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateField: (field: keyof ResumeData, value: any) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : initialResumeState;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updateField = (field: keyof ResumeData, value: any) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, updateField }}>
      {children}
    </ResumeContext.Provider>
  );
};

// --- App Component ---
const App: React.FC = () => {
  return (
    <ResumeProvider>
      <HashRouter>
        <div className="min-h-screen bg-white text-navy-900 font-sans selection:bg-blue-100 selection:text-blue-600">
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
             <Route path="/templates" element={<Templates />} />
             <Route path="/builder/*" element={<Builder />} />
             <Route path="/preview" element={<Preview />} />
             <Route path="*" element={<Navigate to="/" replace />} />
           </Routes>
        </div>
      </HashRouter>
    </ResumeProvider>
  );
};

export default App;