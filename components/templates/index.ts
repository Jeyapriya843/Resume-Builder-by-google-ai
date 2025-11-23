import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import { ResumeData } from '../../types';

export const TemplatesMap: Record<string, React.FC<{ data: ResumeData }>> = {
  'modern': ModernTemplate,
  'classic': ClassicTemplate,
  'minimal': MinimalTemplate,
};

export const availableTemplates = [
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