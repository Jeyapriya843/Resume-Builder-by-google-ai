import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import CleanModernTemplate from './CleanModernTemplate';
import SerifElegantTemplate from './SerifElegantTemplate';
import BoldSidebarTemplate from './BoldSidebarTemplate';
import TimelineTemplate from './TimelineTemplate';
import DarkSidebarTemplate from './DarkSidebarTemplate';
import { ResumeData } from '../../types';

export const TemplatesMap: Record<string, React.FC<{ data: ResumeData }>> = {
  'modern': ModernTemplate,
  'classic': ClassicTemplate,
  'minimal': MinimalTemplate,
  'professional': ProfessionalTemplate,
  'clean-modern': CleanModernTemplate,
  'serif-elegant': SerifElegantTemplate,
  'bold-sidebar': BoldSidebarTemplate,
  'timeline': TimelineTemplate,
  'dark-sidebar': DarkSidebarTemplate,
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
    id: 'clean-modern',
    name: "Clean Modern",
    description: "Crisp typography with a distinct sidebar. Great for developers.",
    tags: ["Clean", "Sidebar", "Developer"]
  },
  {
    id: 'serif-elegant',
    name: "Serif Elegant",
    description: "Sophisticated serif typography. Ideal for academic or executive roles.",
    tags: ["Elegant", "Serif", "Executive"]
  },
  {
    id: 'bold-sidebar',
    name: "Bold Sidebar",
    description: "Strong visual hierarchy with a high-contrast sidebar.",
    tags: ["Bold", "Contrast", "Engineering"]
  },
  {
    id: 'timeline',
    name: "Modern Timeline",
    description: "Features a timeline view for experience. Modern and spacious.",
    tags: ["Timeline", "Modern", "Creative"]
  },
  {
    id: 'dark-sidebar',
    name: "Dark Sidebar",
    description: "Professional look with a dark sidebar for contact info.",
    tags: ["Dark Mode", "Professional", "Marketing"]
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