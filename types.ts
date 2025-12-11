
export interface Experience {
  id: string;
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  link: string;
  description: string;
  technologies: string[];
}

export interface ResumeData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  templateId: string;
  fontFamily: string;
  accentColor: string;
}

export interface AnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: Array<{ title: string; description: string }>;
}

export const initialResumeState: ResumeData = {
  firstName: '',
  lastName: '',
  jobTitle: '',
  email: '',
  phone: '',
  city: '',
  country: '',
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: [],
  templateId: 'professional',
  fontFamily: 'Poppins',
  accentColor: '#3b82f6',
};
