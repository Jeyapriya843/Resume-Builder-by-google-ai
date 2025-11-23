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
  skills: string[];
  templateId: string;
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
  skills: [],
  templateId: 'modern'
};