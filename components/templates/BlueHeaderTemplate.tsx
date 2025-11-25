
import React from 'react';
import { ResumeData } from '../../types';
import { Icons } from '../ui/Icons';

interface TemplateProps {
  data: ResumeData;
}

const BlueHeaderTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] shadow-lg font-sans flex flex-col">
      {/* Dark Header Block */}
      <header className="bg-[#1e3a5f] text-white p-12 pt-16 pb-16 text-center">
         <h1 className="text-5xl font-light uppercase tracking-[0.2em] mb-3 text-[#d4af37]">
            {data.firstName} {data.lastName}
         </h1>
         <p className="text-lg font-bold tracking-[0.3em] uppercase text-white/90">
            {data.jobTitle}
         </p>
      </header>

      <div className="flex flex-1 p-10 gap-10">
         {/* Left Column */}
         <div className="w-1/2 space-y-10">
            {/* Experience */}
            {data.experience.length > 0 && (
               <section>
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6">Experience</h2>
                  <div className="space-y-8">
                     {data.experience.map(exp => (
                        <div key={exp.id}>
                           <h3 className="font-bold text-gray-700 text-xs uppercase mb-1">{exp.jobTitle}</h3>
                           <div className="text-xs text-gray-500 mb-1">{exp.employer}</div>
                           <div className="text-xs text-gray-400 mb-2">{exp.startDate} - {exp.endDate}</div>
                           <ul className="list-disc list-inside text-xs text-gray-600 leading-relaxed space-y-1">
                              {exp.description.split('\n').map((line, i) => (
                                 line.trim() && <li key={i}>{line}</li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
               <section>
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6">Education</h2>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id}>
                           <div className="text-xs text-gray-400 font-bold mb-1">{edu.startDate} - {edu.endDate}</div>
                           <h3 className="font-bold text-gray-700 text-xs uppercase">{edu.school}</h3>
                           <div className="text-xs text-gray-600">{edu.degree}</div>
                        </div>
                     ))}
                  </div>
               </section>
            )}
         </div>

         {/* Right Column */}
         <div className="w-1/2 space-y-10 border-l border-gray-200 pl-10">
            {/* Contact */}
            <section>
               <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6">Contact</h2>
               <div className="space-y-3 text-xs text-gray-600">
                  {data.phone && (
                     <div className="flex items-center gap-3">
                        <Icons.Phone size={14} className="text-[#d4af37]" />
                        <span>{data.phone}</span>
                     </div>
                  )}
                  {data.email && (
                     <div className="flex items-center gap-3">
                        <Icons.Mail size={14} className="text-[#d4af37]" />
                        <span>{data.email}</span>
                     </div>
                  )}
                  {(data.city || data.country) && (
                     <div className="flex items-center gap-3">
                        <Icons.MapPin size={14} className="text-[#d4af37]" />
                        <span>{data.city}, {data.country}</span>
                     </div>
                  )}
               </div>
            </section>

            {/* Summary */}
            {data.summary && (
               <section>
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6">Summary</h2>
                  <p className="text-xs leading-loose text-gray-600 text-justify">
                     {data.summary}
                  </p>
               </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
               <section>
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6">Skills</h2>
                  <ul className="space-y-2">
                     {data.skills.map(skill => (
                        <li key={skill} className="text-xs text-gray-600 flex items-center gap-2">
                           <span className="w-1 h-1 bg-[#d4af37] rounded-full"></span> {skill}
                        </li>
                     ))}
                  </ul>
               </section>
            )}
         </div>
      </div>
    </div>
  );
};

export default BlueHeaderTemplate;
