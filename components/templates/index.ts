import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import { ResumeData } from '../../types';

export const TemplatesMap: Record<string, React.FC<{ data: ResumeData }>> = {
  'modern': ModernTemplate,
  'classic': ClassicTemplate,
  'minimal': MinimalTemplate,
  'professional': ProfessionalTemplate,
};

export const availableTemplates = [
  {
    id: 'professional',
    name: "Professional ATS",
    description: "Standard, high-readability layout preferred by recruiters. Optimized for ATS parsing.",
    tags: ["ATS Friendly", "Standard", "Recommended"]
  },
  {
    id: 'modern',
    name: "Modern Professional",
    description: "Clean, structured, and ATS-friendly. Perfect for corporate roles.",
    tags: ["ATS Friendly", "Corporate", "Popular"]
  },
  {
    id: 'minimal',
    name: "Creative Minimalist",
    description: "A stylish, whitespace-heavy choice for designers and modern tech.",
    tags: ["Creative", "Clean", "Design"]
  },
  {
    id: 'classic',
    name: "Executive Classic",
    description: "Timeless serif design. Best for academic, legal, or executive roles.",
    tags: ["Senior", "Professional", "Traditional"]
  }
];