
import React from 'react';
import { ResumeData } from '../../types';
import { Icons } from '../ui/Icons';

interface TemplateProps {
  data: ResumeData;
}

const DarkBlueBorderTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-6 shadow-lg font-sans text-gray-800 relative">
      {/* Thick Border Frame */}
      <div className="absolute inset-0 border-[12px] border-[#1e293b] pointer-events-none"></div>
      
      <div className="h-full flex mt-4 mb-4 ml-4 mr-4">
        {/* Left Sidebar (Dark) */}
        <div className="w-[7cm] bg-[#1e293b] text-white p-6 pt-10 flex flex-col min-h-[27cm]">
           {/* About Me */}
           <section className="mb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500 pb-2 text-white">About Me</h2>
              <p className="text-xs leading-relaxed text-gray-300 text-justify">
                 {data.summary || "Professional summary goes here. Describe your background and key strengths."}
              </p>
           </section>

           {/* Contact */}
           <section className="mb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500 pb-2 text-white">Contact</h2>
              <div className="space-y-3 text-xs text-gray-300">
                 {data.phone && (
                    <div className="flex items-center gap-3">
                       <Icons.Phone size={14} className="text-white" />
                       <span>{data.phone}</span>
                    </div>
                 )}
                 {data.email && (
                    <div className="flex items-center gap-3">
                       <Icons.Mail size={14} className="text-white" />
                       <span className="break-all">{data.email}</span>
                    </div>
                 )}
                 {(data.city || data.country) && (
                    <div className="flex items-center gap-3">
                       <Icons.MapPin size={14} className="text-white" />
                       <span>{data.city}, {data.country}</span>
                    </div>
                 )}
              </div>
           </section>

           {/* Skills */}
           {data.skills.length > 0 && (
              <section className="mb-8">
                 <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500 pb-2 text-white">Skills</h2>
                 <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                    {data.skills.map((skill, i) => (
                       <li key={i}>{skill}</li>
                    ))}
                 </ul>
              </section>
           )}

           {/* Languages (Stub if not present in data, using skills or education logic) */}
           <section>
              <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500 pb-2 text-white">Language</h2>
              <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                 <li>English</li>
                 {/* Dynamic if we had language field */}
              </ul>
           </section>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-8 pt-10 bg-white">
           {/* Header */}
           <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#1e293b] uppercase tracking-widest mb-2">
                 {data.firstName} {data.lastName}
              </h1>
              <p className="text-lg font-bold tracking-[0.2em] text-gray-500 uppercase">
                 {data.jobTitle}
              </p>
           </header>

           {/* Work Experience */}
           {data.experience.length > 0 && (
              <section className="mb-10">
                 <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-widest mb-6 border-b border-gray-300 pb-2">
                    Work Experience
                 </h2>
                 <div className="space-y-6">
                    {data.experience.map(exp => (
                       <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-1">
                             <h3 className="font-bold text-gray-800 text-md">{exp.jobTitle}</h3>
                             <span className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <div className="text-sm font-bold text-gray-600 mb-2">{exp.employer}</div>
                          <p className="text-xs text-gray-600 leading-relaxed text-justify">
                             {exp.description}
                          </p>
                       </div>
                    ))}
                 </div>
              </section>
           )}

           {/* Education */}
           {data.education.length > 0 && (
              <section>
                 <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-widest mb-6 border-b border-gray-300 pb-2">
                    Education
                 </h2>
                 <div className="space-y-4">
                    {data.education.map(edu => (
                       <div key={edu.id}>
                          <div className="flex justify-between items-baseline mb-1">
                             <h3 className="font-bold text-gray-800 text-md">{edu.school}</h3>
                             <span className="text-xs font-medium text-gray-500">{edu.startDate} - {edu.endDate}</span>
                          </div>
                          <div className="text-sm text-gray-600">{edu.degree}</div>
                       </div>
                    ))}
                 </div>
              </section>
           )}
           
           {/* References (Stub) */}
           <section className="mt-10">
              <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-widest mb-6 border-b border-gray-300 pb-2">
                 References
              </h2>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <h4 className="font-bold text-sm text-gray-800">Estelle Darcy</h4>
                    <p className="text-xs text-gray-500">Wardiere Inc. / CEO</p>
                    <p className="text-xs text-gray-500 mt-1">123-456-7890</p>
                 </div>
                 <div>
                    <h4 className="font-bold text-sm text-gray-800">Harper Russo</h4>
                    <p className="text-xs text-gray-500">Wardiere Inc. / CEO</p>
                    <p className="text-xs text-gray-500 mt-1">123-456-7890</p>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default DarkBlueBorderTemplate;
