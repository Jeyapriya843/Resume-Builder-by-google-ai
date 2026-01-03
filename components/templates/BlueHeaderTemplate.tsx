import React from 'react';
import { TemplateProps } from './index';
import { Icons } from '../ui/Icons';

const BlueHeaderTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 20 ? 'text-4xl' : 'text-5xl';
  const accentColor = data.accentColor || '#1e3a5f';
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
    <div className="bg-white w-[21cm] min-h-[29.7cm] flex flex-col" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      <header className="text-white p-12 pt-16 pb-16 text-center" style={{ backgroundColor: accentColor }}>
         <h1 className={`${nameSizeClass} font-light uppercase tracking-[0.2em] mb-3 text-white break-words`}>
            {data.firstName} {data.lastName}
         </h1>
         <p className="text-lg font-bold tracking-[0.3em] uppercase text-white/90">
            {data.jobTitle}
         </p>
      </header>

      <div className="flex flex-1 p-10 gap-10">
         <div className="w-1/2 space-y-10">
            {data.experience.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
                  <GapHandle id="experience-top" />
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6 section-header">Experience</h2>
                  <div className="space-y-8">
                     {data.experience.map((exp, idx) => (
                        <div key={exp.id} style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                           {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                           <div className="job-header">
                               <h3 className="font-bold text-gray-700 text-xs uppercase mb-1">{exp.jobTitle}</h3>
                               <div className="text-xs text-gray-500 mb-1">{exp.employer}</div>
                               <div className="text-xs text-gray-400 mb-2">{exp.startDate} - {exp.endDate}</div>
                           </div>
                           {exp.descriptionType === 'paragraph' ? (
                             <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                               {exp.description}
                             </p>
                           ) : (
                             <ul className="list-disc list-inside text-xs text-gray-600 leading-relaxed space-y-1">
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

            {data.education.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
                  <GapHandle id="education-top" />
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6 section-header">Education</h2>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id} className="job-header">
                           <div className="text-xs text-gray-400 font-bold mb-1">{edu.startDate} - {edu.endDate}</div>
                           <h3 className="font-bold text-gray-700 text-xs uppercase">{edu.school}</h3>
                           <div className="text-xs text-gray-600">{edu.degree}</div>
                        </div>
                     ))}
                  </div>
               </section>
            )}
         </div>

         <div className="w-1/2 space-y-10 border-l border-gray-200 pl-10">
            <section style={{ marginTop: `${data.customGaps['contact-top'] !== undefined ? data.customGaps['contact-top'] : 20}px` }}>
               <GapHandle id="contact-top" />
               <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6 section-header">Contact</h2>
               <div className="space-y-3 text-xs text-gray-600">
                  {data.phone && <div className="flex items-center gap-3"><Icons.Phone size={14} style={{ color: accentColor }} /><span>{data.phone}</span></div>}
                  {data.email && <div className="flex items-center gap-3"><Icons.Mail size={14} style={{ color: accentColor }} /><span className="break-all">{data.email}</span></div>}
               </div>
            </section>

            {data.summary && (
               <section style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
                  <GapHandle id="summary-top" />
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6 section-header">Summary</h2>
                  {data.summaryType === 'list' ? (
                    <ul className="list-disc list-inside text-xs text-gray-600 leading-relaxed space-y-1">
                       {data.summary.split('\n').filter(l => l.trim()).map((line, i) => {
                          const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                          return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                       })}
                    </ul>
                  ) : (
                    <div className="text-xs leading-loose text-gray-600 text-justify whitespace-pre-line">
                       {data.summary}
                    </div>
                  )}
               </section>
            )}

            {data.skills.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
                  <GapHandle id="skills-top" />
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-[0.2em] mb-6 section-header">Skills</h2>
                  <ul className="space-y-2">
                     {data.skills.map(skill => (
                        <li key={skill} className="text-xs text-gray-600 flex items-center gap-2 skill-item">
                           <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accentColor }}></span> {skill}
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