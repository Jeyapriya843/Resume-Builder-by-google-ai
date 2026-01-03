import React from 'react';
import { TemplateProps } from './index';

const TimelineTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
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
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[1.5cm] text-gray-800" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
       <header className="flex justify-between items-start mb-12">
          <div>
             <h1 className="text-4xl font-normal uppercase tracking-[0.1em] text-gray-800 mb-2">
                {data.firstName} <br/><span className="font-bold">{data.lastName}</span>
             </h1>
             <p className="text-sm tracking-[0.3em] uppercase text-gray-500">{data.jobTitle}</p>
          </div>
          <div className="text-right text-xs text-gray-500 space-y-1">
             {data.phone && <div>{data.phone}</div>}
             {data.email && <div className="break-all">{data.email}</div>}
             {(data.city || data.country) && <div>{data.city}, {data.country}</div>}
          </div>
       </header>

       <div className="grid grid-cols-12 gap-8">
          <div className="col-span-7">
             {data.summary && (
                <section className="mb-10" style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
                   <GapHandle id="summary-top" />
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 border-b border-gray-100 pb-2 section-header">
                      Profile
                   </h2>
                   {data.summaryType === 'list' ? (
                     <ul className="list-disc list-outside ml-4 text-xs text-gray-600 space-y-1">
                       {data.summary.split('\n').filter(l => l.trim()).map((line, i) => {
                          const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                          return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                       })}
                     </ul>
                   ) : (
                     <p className="text-xs leading-loose text-gray-600 text-justify whitespace-pre-line">
                        {data.summary}
                     </p>
                   )}
                </section>
             )}

             {data.experience.length > 0 && (
                <section style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
                   <GapHandle id="experience-top" />
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-8 border-b border-gray-100 pb-2 section-header">
                      Work Experience
                   </h2>
                   <div className="space-y-0 relative border-l border-gray-300 ml-1.5">
                      {data.experience.map((exp, idx) => (
                         <div key={exp.id} className="pl-8 pb-10 relative last:pb-0" style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                            {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-gray-500"></div>
                            <div className="job-header">
                                <div className="text-xs font-bold tracking-wider text-gray-500 mb-1 uppercase">
                                   {exp.startDate} - {exp.endDate}
                                </div>
                                <h3 className="text-sm font-bold text-gray-800 mb-1">{exp.employer}</h3>
                                <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">{exp.jobTitle}</div>
                            </div>
                            {exp.descriptionType === 'paragraph' ? (
                              <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                                {exp.description}
                              </p>
                            ) : (
                              <ul className="text-xs text-gray-600 leading-relaxed list-disc ml-4 space-y-1">
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

          <div className="col-span-5 pt-2">
             {data.education.length > 0 && (
                <section className="mb-10" style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
                   <GapHandle id="education-top" />
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 border-b border-gray-100 pb-2 section-header">
                      Education
                   </h2>
                   <div className="space-y-6">
                      {data.education.map(edu => (
                         <div key={edu.id} className="job-header">
                            <div className="text-xs font-bold text-gray-500 mb-1">{edu.startDate} - {edu.endDate}</div>
                            <h3 className="text-sm font-bold text-gray-800 uppercase">{edu.school}</h3>
                            <div className="text-xs text-gray-600 mt-1">{edu.degree}</div>
                         </div>
                      ))}
                   </div>
                </section>
             )}

             {data.skills.length > 0 && (
                <section className="mb-10" style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
                   <GapHandle id="skills-top" />
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 border-b border-gray-100 pb-2 section-header">
                      Skills
                   </h2>
                   <ul className="space-y-3">
                      {data.skills.map(skill => (
                         <li key={skill} className="flex items-center gap-3 text-xs text-gray-600 skill-item">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </section>
             )}

             {data.projects && data.projects.length > 0 && (
                <section style={{ marginTop: `${data.customGaps['projects-top'] !== undefined ? data.customGaps['projects-top'] : 20}px` }}>
                   <GapHandle id="projects-top" />
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 border-b border-gray-100 pb-2 section-header">
                      Projects
                   </h2>
                   <div className="space-y-4">
                      {data.projects.map(proj => (
                         <div key={proj.id}>
                            <h3 className="text-sm font-bold text-gray-800 job-header">{proj.title}</h3>
                            <div className="text-xs text-gray-600 leading-relaxed mt-1">
                               {proj.descriptionType === 'paragraph' ? (
                                 <p className="whitespace-pre-line">{proj.description}</p>
                               ) : (
                                 <ul className="list-disc ml-4 space-y-1">
                                   {proj.description.split('\n').map((line, i) => {
                                      const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                                      return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                                   })}
                                 </ul>
                               )}
                            </div>
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

export default TimelineTemplate;