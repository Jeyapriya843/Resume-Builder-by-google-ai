import React from 'react';
import { TemplateProps } from './index';

const DarkSidebarTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 20 ? 'text-4xl' : 'text-5xl';
  const accentColor = data.accentColor || '#2c3e50';
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
    <div className="bg-white w-[21cm] min-h-[29.7cm] flex" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
       <div className="w-[7.5cm] text-white p-8 flex flex-col min-h-full" style={{ backgroundColor: accentColor }}>
          <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto mb-10 overflow-hidden border-4 border-white/20 flex-shrink-0">
             <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/50">
                {data.firstName?.[0]}{data.lastName?.[0]}
             </div>
          </div>

          <div className="space-y-8 flex-1">
             <section className="section-header">
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mb-4">Contact</h2>
                <div className="space-y-3 text-sm text-gray-300">
                   {data.phone && (
                      <div className="break-words">
                         <div className="font-bold text-white mb-0.5">Phone</div>
                         {data.phone}
                      </div>
                   )}
                   {data.email && (
                      <div className="break-words">
                         <div className="font-bold text-white mb-0.5">Email</div>
                         <div className="break-all">{data.email}</div>
                      </div>
                   )}
                   {(data.city || data.country) && (
                      <div className="break-words">
                         <div className="font-bold text-white mb-0.5">Address</div>
                         {data.city}, {data.country}
                      </div>
                   )}
                </div>
             </section>

             {data.education.length > 0 && (
                <section style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
                   <GapHandle id="education-top" />
                   <h2 className="text-xl font-bold border-b border-white/20 pb-2 mb-4 section-header">Education</h2>
                   <div className="space-y-4 text-sm">
                      {data.education.map(edu => (
                         <div key={edu.id} className="job-header">
                            <div className="text-gray-300 mb-1">{edu.startDate} - {edu.endDate}</div>
                            <div className="font-bold text-white leading-tight mb-1">{edu.degree}</div>
                            <div className="text-gray-300">{edu.school}</div>
                         </div>
                      ))}
                   </div>
                </section>
             )}

             {data.skills.length > 0 && (
                <section style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
                   <GapHandle id="skills-top" />
                   <h2 className="text-xl font-bold border-b border-white/20 pb-2 mb-4 section-header">Expertise</h2>
                   <ul className="space-y-2 text-sm text-gray-300">
                      {data.skills.map(skill => (
                         <li key={skill} className="flex items-center gap-2 skill-item">
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </section>
             )}
          </div>
       </div>

       <div className="flex-1 p-10 bg-white text-gray-800">
          <header className="mb-12">
             <h1 className={`${nameSizeClass} font-bold mb-2 break-words`} style={{ color: accentColor }}>{data.firstName} {data.lastName}</h1>
             <p className="text-2xl font-medium tracking-wide text-gray-500 uppercase">{data.jobTitle}</p>
             {data.summary && (
                <div style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
                   <GapHandle id="summary-top" />
                   {data.summaryType === 'list' ? (
                     <ul className="list-disc list-outside ml-5 mt-6 text-sm text-gray-600 space-y-1">
                        {data.summary.split('\n').filter(l => l.trim()).map((line, i) => {
                           const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                           return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                        })}
                     </ul>
                   ) : (
                     <div className="mt-6 text-sm leading-relaxed text-gray-600 text-justify whitespace-pre-line">
                        {data.summary}
                     </div>
                   )}
                </div>
             )}
          </header>

          <section style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
             <GapHandle id="experience-top" />
             <h2 className="text-2xl font-bold pb-2 mb-6 section-header" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                Experience
             </h2>
             <div className="space-y-8">
                {data.experience.map((exp, idx) => (
                   <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200" style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                      {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-white" style={{ borderColor: accentColor }}></div>
                      <div className="job-header">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{exp.startDate} - {exp.endDate}</h3>
                        <div className="text-md font-bold text-gray-600 mb-1">{exp.employer}</div>
                        <div className="text-md font-semibold mb-2" style={{ color: accentColor }}>{exp.jobTitle}</div>
                      </div>
                      {exp.descriptionType === 'paragraph' ? (
                        <p className="text-sm text-gray-600 whitespace-pre-line text-justify leading-relaxed">
                          {exp.description}
                        </p>
                      ) : (
                        <ul className="list-disc list-outside ml-4 text-sm text-gray-600 leading-relaxed text-justify space-y-1">
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

          {data.customSections?.map((section) => (
             <section key={section.id} style={{ marginTop: `${data.customGaps[`custom-${section.id}-top`] !== undefined ? data.customGaps[`custom-${section.id}-top`] : 20}px` }}>
                <GapHandle id={`custom-${section.id}-top`} />
                <h2 className="text-2xl font-bold pb-2 mb-6 section-header" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                   {section.title}
                </h2>
                <div className="space-y-4">
                   {section.type === 'list' ? (
                     <ul className="list-disc list-outside ml-5 text-sm text-gray-600 leading-relaxed space-y-1">
                        {section.content.split('\n').filter(l => l.trim()).map((line, i) => {
                           const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                           return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                        })}
                     </ul>
                   ) : (
                     <div className="text-sm text-gray-600 whitespace-pre-line text-justify leading-relaxed">
                        {section.content}
                     </div>
                   )}
                </div>
             </section>
          ))}

          {data.projects && data.projects.length > 0 && (
             <section className="mt-10" style={{ marginTop: `${data.customGaps['projects-top'] !== undefined ? data.customGaps['projects-top'] : 20}px` }}>
                <GapHandle id="projects-top" />
                <h2 className="text-2xl font-bold pb-2 mb-6 section-header" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                   Projects
                </h2>
                <div className="grid grid-cols-1 gap-6">
                   {data.projects.map(proj => (
                      <div key={proj.id}>
                         <div className="job-header">
                            <h3 className="font-bold text-gray-800">{proj.title}</h3>
                         </div>
                         <div className="text-sm text-gray-600 leading-relaxed">
                            {proj.descriptionType === 'paragraph' ? (
                              <p className="whitespace-pre-line">{proj.description}</p>
                            ) : (
                              <ul className="list-disc list-outside ml-4 space-y-1">
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
  );
};

export default DarkSidebarTemplate;