import React from 'react';
import { TemplateProps } from './index';
import { Icons } from '../ui/Icons';

const PhotoSidebarTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
  const fontFamily = data.fontFamily || 'Poppins';

  const GapHandle = ({ id }: { id: string }) => {
    if (!isAdjusting || !onAdjustGap) return null;
    const currentGap = data.customGaps[id] !== undefined ? data.customGaps[id] : 20;
    return (
      <div className="no-print relative h-0 w-full group/handle z-50">
        <div className="absolute inset-x-0 -top-2 flex justify-center opacity-0 group-hover/handle:opacity-100 transition-opacity">
          <div className="bg-blue-600 text-white rounded-full shadow-lg flex overflow-hidden border border-white">
            <button onClick={(e) => { e.stopPropagation(); onAdjustGap(id, -5); }} className="px-2 py-1 hover:bg-blue-700 border-r border-blue-500 text-[10px] font-bold">-</button>
            <div className="px-2 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 min-w-[30px] text-center">{currentGap}px</div>
            <button onClick={(e) => { e.stopPropagation(); onAdjustGap(id, 5); }} className="px-2 py-1 hover:bg-blue-700 text-[10px] font-bold">+</button>
          </div>
        </div>
        <div className="absolute inset-x-0 -top-[1px] border-t border-dashed border-blue-400 opacity-20 group-hover/handle:opacity-100 transition-opacity" />
      </div>
    );
  };

  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] flex text-gray-800" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      <div className="w-[7.5cm] bg-[#dfe6ed] flex flex-col p-8 pt-12 relative">
         <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-40 h-40 bg-gray-300 rounded-full border-4 border-white overflow-hidden flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-500">{data.firstName?.[0]}</span>
            </div>
         </div>
         <div className="h-32"></div>

         <div className="space-y-8 mt-8">
            <div className="space-y-3 text-xs text-gray-600" style={{ marginTop: `${data.customGaps['contact-top'] !== undefined ? data.customGaps['contact-top'] : 20}px` }}>
               <GapHandle id="contact-top" />
               {data.phone && <div className="flex items-center gap-3"><Icons.Phone size={16} className="text-gray-700" /><span>{data.phone}</span></div>}
               {data.email && <div className="flex items-center gap-3"><Icons.Mail size={16} className="text-gray-700" /><span className="break-all">{data.email}</span></div>}
            </div>

            {data.education.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
                  <GapHandle id="education-top" />
                  <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-400 pb-1 section-header">Education</h2>
                  <div className="space-y-4">
                     {data.education.map(edu => (
                        <div key={edu.id} className="job-header">
                           <h3 className="font-bold text-sm text-gray-700">{edu.degree}</h3>
                           <div className="text-xs font-semibold text-gray-600">{edu.school}</div>
                           <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {data.skills.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
                  <GapHandle id="skills-top" />
                  <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-400 pb-1 section-header">Skills</h2>
                  <ul className="space-y-2 text-xs text-gray-600">
                     {data.skills.map(skill => (
                        <li key={skill} className="flex items-center gap-2 skill-item">
                           <span className="w-1 h-1 bg-gray-600 rounded-full"></span> {skill}
                        </li>
                     ))}
                  </ul>
               </section>
            )}
         </div>
      </div>

      <div className="flex-1 flex flex-col">
         <div className="h-[5cm] bg-[#d0dde7] flex flex-col justify-center px-10 pl-20 relative">
             <h1 className="text-4xl font-bold text-[#4a4a4a] uppercase tracking-widest mb-2">
                {data.firstName} {data.lastName}
             </h1>
             <p className="text-xl font-medium text-[#4a4a4a] tracking-wide">
                {data.jobTitle}
             </p>
         </div>

         <div className="p-10 pt-8 space-y-8">
            {data.summary && (
               <section style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
                  <GapHandle id="summary-top" />
                  <h2 className="text-2xl font-medium text-[#4a4a4a] mb-4 border-b border-gray-300 pb-2 section-header">About Me</h2>
                  {data.summaryType === 'list' ? (
                    <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1">
                       {data.summary.split('\n').filter(l => l.trim()).map((line, i) => {
                          const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                          return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                       })}
                    </ul>
                  ) : (
                    <div className="text-sm leading-relaxed text-gray-600 text-justify whitespace-pre-line">
                       {data.summary}
                    </div>
                  )}
               </section>
            )}

            {data.experience.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
                  <GapHandle id="experience-top" />
                  <h2 className="text-2xl font-medium text-[#4a4a4a] mb-6 border-b border-gray-300 pb-2 section-header">Work Experience</h2>
                  <div className="space-y-6">
                     {data.experience.map((exp, idx) => (
                        <div key={exp.id} className="group/item" style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                           {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                           <div className="job-header">
                              <h3 className="text-lg font-bold text-gray-700">{exp.jobTitle}</h3>
                              <div className="text-sm font-medium text-gray-500 mb-2">{exp.employer}</div>
                           </div>
                           {exp.descriptionType === 'paragraph' ? (
                             <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                               {exp.description}
                             </p>
                           ) : (
                             <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1">
                                {exp.description.split('\n').map((line, i) => {
                                   const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                                   return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                                })}
                             </ul>
                           )}
                        </div>
                     ))}
                  </div>
               </section>
            )}
         </div>
      </div>
    </div>
  );
};

export default PhotoSidebarTemplate;