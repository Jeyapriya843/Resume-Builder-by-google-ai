
import React from 'react';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import CleanModernTemplate from './CleanModernTemplate';
import SerifElegantTemplate from './SerifElegantTemplate';
import BoldSidebarTemplate from './BoldSidebarTemplate';
import TimelineTemplate from './TimelineTemplate';
import DarkSidebarTemplate from './DarkSidebarTemplate';
import SimpleProfessionalTemplate from './SimpleProfessionalTemplate';
import TechDesignTemplate from './TechDesignTemplate';
import TealModernTemplate from './TealModernTemplate';
import DarkBlueBorderTemplate from './DarkBlueBorderTemplate';
import BlueHeaderTemplate from './BlueHeaderTemplate';
import PhotoSidebarTemplate from './PhotoSidebarTemplate';
import ElegantSerifTemplate from './ElegantSerifTemplate';
import MinimalistTealTemplate from './MinimalistTealTemplate';
import CleanSplitTemplate from './CleanSplitTemplate';
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
  'simple-professional': SimpleProfessionalTemplate,
  'tech-design': TechDesignTemplate,
  'teal-modern': TealModernTemplate,
  'dark-blue-border': DarkBlueBorderTemplate,
  'blue-header': BlueHeaderTemplate,
  'photo-sidebar': PhotoSidebarTemplate,
  'elegant-serif': ElegantSerifTemplate,
  'minimalist-teal': MinimalistTealTemplate,
  'clean-split': CleanSplitTemplate,
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
    id: 'simple-professional',
    name: "Simple Professional",
    description: "Minimalist, centered layout with strong headers. Based on Sebastian Bennett design.",
    tags: ["Minimal", "Clean", "Finance"]
  },
  {
    id: 'tech-design',
    name: "Tech Design",
    description: "Modern pill-shaped headers and clear hierarchy. Based on Daniel Gallego design.",
    tags: ["Modern", "Tech", "Creative"]
  },
  {
    id: 'teal-modern',
    name: "Teal Modern",
    description: "Professional layout with teal accents and split skills section. Based on Drew Feig design.",
    tags: ["Color", "Marketing", "Split"]
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
  },
  {
    id: 'dark-blue-border',
    name: "Hannah",
    description: "Bold dark blue border with a highly structured layout. Excellent for Marketing Managers.",
    tags: ["Bold", "Border", "Marketing"]
  },
  {
    id: 'blue-header',
    name: "Morgan",
    description: "Professional dark blue header block with gold accents. Great for Developers.",
    tags: ["Header", "Professional", "Developer"]
  },
  {
    id: 'photo-sidebar',
    name: "Donna",
    description: "Friendly layout with a circular photo and soft gray sidebar. Perfect for Sales/Client roles.",
    tags: ["Photo", "Sidebar", "Sales"]
  },
  {
    id: 'elegant-serif',
    name: "Catrine",
    description: "High-end serif typography with a split header. Ideal for Project Managers.",
    tags: ["Serif", "Elegant", "Manager"]
  },
  {
    id: 'minimalist-teal',
    name: "Lorna",
    description: "Clean, open layout with centered headers and subtle structure. Art Director style.",
    tags: ["Clean", "Minimal", "Creative"]
  },
  {
    id: 'clean-split',
    name: "Richard",
    description: "Strict, organized split layout with a centered header. Very organized.",
    tags: ["Split", "Organized", "Manager"]
  }
];
