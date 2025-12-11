
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ResumeData, initialResumeState } from './types';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import About from './pages/About';
import Templates from './pages/Templates';
import Pricing from './pages/Pricing';
import Resume from './pages/Resume';
import ATS from './pages/ATS';
import JobTarget from './pages/JobTarget';
import Success from './pages/Success';
import UploadResume from './pages/UploadResume';
import ATSTemplates from './pages/ATSTemplates';
import FinalReview from './pages/FinalReview';

// --- Resume Context Setup ---
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

// Helper to sanitize data loaded from storage
const sanitizeData = (data: any): ResumeData => {
  if (!data) return initialResumeState;
  return {
    ...initialResumeState,
    ...data,
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
  };
};

const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      return saved ? sanitizeData(JSON.parse(saved)) : initialResumeState;
    } catch (e) {
      console.error("Failed to parse resume data", e);
      return initialResumeState;
    }
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

// --- Auth Context Setup ---
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- App Component ---
const App: React.FC = () => {
  return (
    <AuthProvider>
      <ResumeProvider>
        <HashRouter>
          <div className="min-h-screen bg-white text-navy-900 font-sans selection:bg-blue-100 selection:text-blue-600">
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/resume" element={<Resume />} />
               <Route path="/upload-resume" element={<UploadResume />} />
               <Route path="/templates" element={<Templates />} />
               <Route path="/ats-templates" element={<ATSTemplates />} />
               <Route path="/final-review" element={<FinalReview />} />
               <Route path="/pricing" element={<Pricing />} />
               <Route path="/ats" element={<ATS />} />
               <Route path="/job-target" element={<JobTarget />} />
               <Route path="/success" element={<Success />} />
               <Route path="/builder/*" element={<Builder />} />
               <Route path="/preview" element={<Preview />} />
               <Route path="*" element={<Navigate to="/" replace />} />
             </Routes>
          </div>
        </HashRouter>
      </ResumeProvider>
    </AuthProvider>
  );
};

export default App;
