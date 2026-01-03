
import { ResumeData, CustomSection } from "../types";

export const parseResumeFromTextLocal = (text: string): Partial<ResumeData> => {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  const data: Partial<ResumeData> = {
    experience: [],
    education: [],
    skills: [],
    projects: [],
    customSections: []
  };

  // Track which lines have been "consumed" by sections
  const consumedLines = new Set<number>();

  // 1. Basic Contact Info Extraction
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) data.email = emailMatch[0];

  const phoneRegex = /(?:\+?\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) data.phone = phoneMatch[0];

  // 2. Name Heuristic
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    if (line.length < 50 && !line.includes('@') && !line.match(/\d/) && !line.toLowerCase().includes('resume')) {
      const nameParts = line.split(' ');
      if (nameParts.length >= 2 && nameParts.length <= 4) {
        data.firstName = nameParts[0];
        data.lastName = nameParts.slice(1).join(' ');
        consumedLines.add(i);
        break; 
      }
    }
  }

  // 3. Section Splitting
  const sectionContent: Record<string, number[]> = {
    summary: [],
    experience: [],
    education: [],
    skills: [],
    projects: []
  };

  let currentSection = '';
  const keywords = {
    experience: ['experience', 'employment', 'work history', 'career history', 'professional background'],
    education: ['education', 'academic', 'qualifications', 'university', 'college'],
    skills: ['skills', 'technologies', 'competencies', 'expertise', 'technical skills', 'core competencies'],
    projects: ['projects', 'personal projects', 'key projects'],
    summary: ['summary', 'profile', 'objective', 'about me', 'professional summary']
  };

  lines.forEach((line, index) => {
    if (consumedLines.has(index)) return;
    
    const lower = line.toLowerCase();
    let foundHeader = false;

    if (line.length < 40) {
      for (const [section, keys] of Object.entries(keywords)) {
        if (keys.some(k => lower.includes(k) || lower === k)) {
          currentSection = section;
          foundHeader = true;
          consumedLines.add(index);
          break;
        }
      }
    }

    if (!foundHeader && currentSection) {
      sectionContent[currentSection].push(index);
      consumedLines.add(index);
    }
  });

  // 4. Process Parsed Sections Verbatim
  if (sectionContent.summary.length > 0) {
    data.summary = sectionContent.summary.map(i => lines[i]).join('\n');
  }

  if (sectionContent.skills.length > 0) {
    const rawSkills = sectionContent.skills.map(i => lines[i]).join(' ');
    data.skills = rawSkills.split(/[,•|•\n•]/).map(s => s.trim()).filter(s => s.length > 1);
  }

  if (sectionContent.experience.length > 0) {
    data.experience = [{
      id: 'local-exp-1',
      jobTitle: 'Extracted Experience',
      employer: 'See details below',
      startDate: '',
      endDate: '',
      location: '',
      description: sectionContent.experience.map(i => lines[i]).join('\n')
    }];
  }

  if (sectionContent.education.length > 0) {
    data.education = [{
      id: 'local-edu-1',
      school: lines[sectionContent.education[0]] || 'School',
      degree: 'Extracted Degree',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: sectionContent.education.slice(1).map(i => lines[i]).join(', ')
    }];
  }

  // 5. CRITICAL: Capture ALL Remaining Lines (Truncation Prevention)
  const remainingLines = lines.filter((_, idx) => !consumedLines.has(idx));
  if (remainingLines.length > 0) {
    data.customSections?.push({
      id: 'unmapped-data',
      title: 'Additional Information',
      content: remainingLines.join('\n'),
      type: 'paragraph'
    });
  }

  return data;
};
