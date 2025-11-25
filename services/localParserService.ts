
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
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

  const emailMatch = text.match(emailRegex);
  if (emailMatch) data.email = emailMatch[0];

  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) data.phone = phoneMatch[0];

  // 2. Name Heuristic: Usually the first line, or first non-contact line
  if (lines.length > 0) {
     const potentialName = lines[0];
     // Simple check: Name shouldn't look like an email or phone
     if (!potentialName.includes('@') && !potentialName.match(/\d/)) {
         const nameParts = potentialName.split(' ');
         if (nameParts.length > 0) data.firstName = nameParts[0];
         if (nameParts.length > 1) data.lastName = nameParts.slice(1).join(' ');
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
    experience: ['experience', 'employment', 'work history', 'professional background'],
    education: ['education', 'academic', 'qualifications', 'university'],
    skills: ['skills', 'technologies', 'competencies', 'expertise', 'technical skills'],
    projects: ['projects', 'portfolio', 'key projects'],
    summary: ['summary', 'profile', 'objective', 'about me', 'bio']
  };

  for (const line of lines) {
    const lower = line.toLowerCase();
    let isHeader = false;

    // Check if line is a section header (usually short and contains keyword)
    if (line.length < 40) {
        for (const [section, keys] of Object.entries(keywords)) {
            if (keys.some(k => lower.includes(k))) {
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

  // Skills: Split by commas, bullets, or pipes
  if (sections.skills.length > 0) {
      const rawSkills = sections.skills.join(' ');
      // Split by common delimiters
      const skillList = rawSkills.split(/[,•|•\n]/)
        .map(s => s.trim())
        .filter(s => s.length > 1 && s.length < 30); // Filter noise
      
      // Remove duplicates
      data.skills = [...new Set(skillList)];
  }

  // Experience (Heuristic: Treat blocks of text as one entry if we can't split smart)
  if (sections.experience.length > 0) {
      // Try to find dates to split entries? For now, simple aggregation.
      data.experience?.push({
          id: Date.now().toString(),
          jobTitle: 'Role (Extracted)',
          employer: 'Employer (Extracted)',
          startDate: '',
          endDate: '',
          location: '',
          description: sections.experience.join('\n')
      });
  }

  // Education
  if (sections.education.length > 0) {
      data.education?.push({
          id: Date.now().toString(),
          school: sections.education[0] || 'University', // Guess first line is school
          degree: sections.education[1] || '', // Guess second line is degree
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
