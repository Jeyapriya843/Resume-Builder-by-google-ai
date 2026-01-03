import React from 'react';
import { TemplateProps } from './index';
import { Icons } from '../ui/Icons';

const MinimalistTealTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 18 ? 'text-5xl' : 'text-6xl';
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
    <div className="bg-white w-[21cm] min-h-[29.7cm] flex flex-col p-12" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      <div className="flex items-center gap-10 mb-16">
         <div className="w-48 h-48 rounded-full bg-gray-200 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center text-4xl text-gray-400">
            {data.firstName?.[0]}
         </div>
         <div className="flex-1">
            <h1 className={`${nameSizeClass} font-bold text-[#333] mb-2 tracking-tight break-words`}>
               {data.firstName} <br/> {data.lastName}
            </h1>
            <p className="text-2xl text-gray-600 font-light">
               {data.jobTitle}
            </p>
         </div>
      </div>

      <div className="flex gap-12">
         <div className="w-1/3 space-y-12">
            <section style={{ marginTop: `${data.customGaps['contact-top'] !== undefined ? data.customGaps['contact-top'] : 20}px` }}>
               <GapHandle id="contact-top" />
               <h2 className="text-xl font-medium text-[#333] mb-6 uppercase tracking-wide section-header">Contact</h2>
               <div className="space-y-4 text-sm text-gray-600">
                  {data.phone && <div className="flex items-center gap-3"><Icons.Phone size={16} /> {data.phone}</div>}
                  {data.email && <div className="flex items-center gap-3 font-bold"><Icons.Mail size={16} /> <span className="break-all">{data.email}</span></div>}
               </div>
               <hr className="border-gray-300 mt-6 w-16" />
            </section>

            {data.education.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['education-top'] || 20}px` }}>
                  <GapHandle id="education-top" />
                  <h2 className="text-xl font-medium text-[#333] mb-6 uppercase tracking-wide section-header">Education</h2>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id} className="job-header">
                           <h3 className="font-bold text-gray-800 text-sm">{edu.school}</h3>
                           <div className="text-xs text-gray-600 mb-1">{edu.degree}</div>
                           <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
                        </div>
                     ))}
                  </div>
                  <hr className="border-gray-300 mt-6 w-16" />
               </section>
            )}

            {data.skills.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['skills-top'] || 20}px` }}>
                  <GapHandle id="skills-top" />
                  <h2 className="text-xl font-medium text-[#333] mb-6 uppercase tracking-wide section-header">Skills</h2>
                  <ul className="space-y-3 text-sm text-gray-600">
                     {data.skills.map(skill => (
                        <li key={skill} className="flex items-center gap-2 skill-item">
                           <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span> {skill}
                        </li>
                     ))}
                  </ul>
                  <hr className="border-gray-300 mt-6 w-16" />
               </section>
            )}
         </div>

         <div className="w-2/3 space-y-12">
            {data.summary && (
               <section style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
                  <GapHandle id="summary-top" />
                  <div className="flex items-center gap-4 mb-6">
                     <h2 className="text-xl font-medium text-[#333] uppercase tracking-wide section-header">Summary</h2>
                     <hr className="flex-1 border-gray-300" />
                  </div>
                  {data.summaryType === 'list' ? (
                    <ul className="list-disc list-outside ml-5 text-sm text-gray-600 leading-relaxed space-y-1">
                       {data.summary.split('\n').filter(l => l.trim()).map((line, i) => {
                          const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                          return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                       })}
                    </ul>
                  ) : (
                    <div className="text-sm leading-loose text-gray-600 text-justify whitespace-pre-line">
                       {data.summary}
                    </div>
                  )}
               </section>
            )}

            {data.experience.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
                  <GapHandle id="experience-top" />
                  <div className="flex items-center gap-4 mb-8">
                     <h2 className="text-xl font-medium text-[#333] uppercase tracking-wide section-header">Work Experience</h2>
                     <hr className="flex-1 border-gray-300" />
                  </div>
                  <div className="space-y-8">
                     {data.experience.map((exp, idx) => (
                        <div key={exp.id} className="group/item" style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                           {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                           <div className="job-header">
                              <div className="flex justify-between items-baseline mb-1">
                                 <h3 className="font-bold text-gray-800 text-lg">{exp.jobTitle}</h3>
                                 <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                              </div>
                              <div className="text-sm font-medium text-gray-600 mb-2 italic">{exp.employer}</div>
                           </div>
                           {exp.descriptionType === 'paragraph' ? (
                             <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line text-justify">
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

export default MinimalistTealTemplate;