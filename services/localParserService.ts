
import { ResumeData } from "../types";

export const parseResumeFromTextLocal = (text: string): Partial<ResumeData> => {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  const data: Partial<ResumeData> = {
    experience: [],
    education: [],
    skills: [],
    projects: []
  };

  // 1. Basic Contact Info Extraction
  // Improved Email Regex
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) data.email = emailMatch[0];

  // Improved Phone Regex (Generic international + US)
  const phoneRegex = /(?:\+?\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) data.phone = phoneMatch[0];

  // Links (LinkedIn/GitHub)
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9-]+/;
  const githubRegex = /github\.com\/[a-zA-Z0-9-]+/;
  
  // 2. Name Heuristic
  // Look at the first few lines. Usually name is first, distinct from email/phone.
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    if (line.length < 50 && !line.includes('@') && !line.match(/\d/) && !line.toLowerCase().includes('resume')) {
      const nameParts = line.split(' ');
      if (nameParts.length >= 2 && nameParts.length <= 4) {
        data.firstName = nameParts[0];
        data.lastName = nameParts.slice(1).join(' ');
        break; 
      }
    }
  }

  // 3. Section Splitting
  const sections: Record<string, string[]> = {
    header: [],
    summary: [],
    experience: [],
    education: [],
    skills: [],
    projects: []
  };

  let currentSection = 'header';

  // Keywords to identify sections (case insensitive)
  const keywords = {
    experience: ['experience', 'employment', 'work history', 'career history', 'professional background'],
    education: ['education', 'academic', 'qualifications', 'university', 'college'],
    skills: ['skills', 'technologies', 'competencies', 'expertise', 'technical skills', 'core competencies'],
    projects: ['projects', 'personal projects', 'key projects'],
    summary: ['summary', 'profile', 'objective', 'about me', 'professional summary']
  };

  for (const line of lines) {
    const lower = line.toLowerCase();
    let isHeader = false;

    // Check if line is a section header (usually short and contains keyword)
    if (line.length < 40) {
        for (const [section, keys] of Object.entries(keywords)) {
            if (keys.some(k => lower.includes(k) || lower === k)) {
                currentSection = section;
                isHeader = true;
                break;
            }
        }
    }

    if (!isHeader) {
        sections[currentSection].push(line);
    }
  }

  // 4. Process Parsed Sections

  // Summary
  if (sections.summary.length > 0) {
      data.summary = sections.summary.join(' ');
  }

  // Skills
  if (sections.skills.length > 0) {
      const rawSkills = sections.skills.join(' ');
      // Split by common delimiters: comma, bullet points, pipes
      const skillList = rawSkills.split(/[,•|•\n•]/)
        .map(s => s.trim())
        .filter(s => s.length > 2 && s.length < 35); // Filter noise
      
      data.skills = [...new Set(skillList)];
  }

  // Experience Processing (Simple Heuristics for Date Detection)
  // Regex looks for "YYYY - YYYY" or "Month YYYY - Present"
  const dateRangeRegex = /((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s?\d{4}|(?:\d{1,2}\/)?\d{4})\s*[-–to]+\s*(present|current|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s?\d{4}|(?:\d{1,2}\/)?\d{4})/i;

  if (sections.experience.length > 0) {
      let currentExp: any = null;
      
      sections.experience.forEach(line => {
         const dateMatch = line.match(dateRangeRegex);
         
         // If we find a date, it's likely a new entry or the header of an entry
         if (dateMatch) {
             if (currentExp) {
                 data.experience?.push(currentExp);
             }
             currentExp = {
                 id: Date.now().toString() + Math.random(),
                 jobTitle: 'Role', // Default, try to overwrite
                 employer: 'Employer',
                 startDate: dateMatch[1] || '',
                 endDate: dateMatch[2] || '',
                 location: '',
                 description: ''
             };
         } else if (currentExp) {
             // If short line and no description yet, might be job title or company
             if (line.length < 50 && currentExp.description.length === 0) {
                 if (currentExp.jobTitle === 'Role') currentExp.jobTitle = line;
                 else if (currentExp.employer === 'Employer') currentExp.employer = line;
                 else currentExp.description += line + '\n';
             } else {
                 currentExp.description += line + '\n';
             }
         }
      });
      if (currentExp) data.experience?.push(currentExp);
      
      // Fallback if regex failed completely but we have text
      if ((!data.experience || data.experience.length === 0) && sections.experience.length > 0) {
          data.experience = [{
              id: Date.now().toString(),
              jobTitle: 'Experience Details',
              employer: '',
              startDate: '',
              endDate: '',
              location: '',
              description: sections.experience.join('\n')
          }];
      }
  }

  // Education
  if (sections.education.length > 0) {
      // Simple aggregation for education
      data.education?.push({
          id: Date.now().toString(),
          school: sections.education[0] || 'University/School',
          degree: sections.education[1] || 'Degree/Certificate',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          location: ''
      });
  }

  // Projects
  if (sections.projects.length > 0) {
      data.projects?.push({
          id: Date.now().toString(),
          title: 'Project',
          link: '',
          description: sections.projects.join('\n'),
          technologies: []
      });
  }

  return data;
};
