import React from 'react';
import { TemplateProps } from './index';
import { Icons } from '../ui/Icons';

const DarkBlueBorderTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
  const accentColor = data.accentColor || '#1e293b';
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
    <div className="bg-white w-[21cm] min-h-[29.7cm] relative p-6 text-gray-800" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      <div className="absolute inset-0 border-[12px] pointer-events-none z-10" style={{ borderColor: accentColor }}></div>
      
      <div className="flex mt-4 mb-4 ml-4 mr-4 min-h-[calc(29.7cm-32px)]">
        <div className="w-[7cm] text-white p-6 pt-10 flex flex-col" style={{ backgroundColor: accentColor }}>
           <section className="mb-8" style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
              <GapHandle id="summary-top" />
              <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500 pb-2 text-white section-header">About Me</h2>
              {data.summaryType === 'list' ? (
                <ul className="list-disc list-inside text-xs text-gray-300 leading-relaxed space-y-1">
                   {data.summary?.split('\n').filter(l => l.trim()).map((line, i) => {
                      const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                      return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                   })}
                </ul>
              ) : (
                <p className="text-xs leading-relaxed text-gray-300 text-justify whitespace-pre-line">
                   {data.summary || "Professional summary goes here."}
                </p>
              )}
           </section>

           <section className="mb-8" style={{ marginTop: `${data.customGaps['contact-top'] !== undefined ? data.customGaps['contact-top'] : 20}px` }}>
              <GapHandle id="contact-top" />
              <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500 pb-2 text-white section-header">Contact</h2>
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
              </div>
           </section>

           {data.skills.length > 0 && (
              <section className="mb-8" style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
                 <GapHandle id="skills-top" />
                 <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-500 pb-2 text-white section-header">Skills</h2>
                 <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                    {data.skills.map((skill, i) => (
                       <li key={i} className="skill-item">{skill}</li>
                    ))}
                 </ul>
              </section>
           )}
        </div>

        <div className="flex-1 p-8 pt-10 bg-white">
           <header className="text-center mb-12">
              <h1 className="text-4xl font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                 {data.firstName} {data.lastName}
              </h1>
              <p className="text-lg font-bold tracking-[0.2em] text-gray-500 uppercase">
                 {data.jobTitle}
              </p>
           </header>

           {data.experience.length > 0 && (
              <section className="mb-10" style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
                 <GapHandle id="experience-top" />
                 <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2 section-header" style={{ color: accentColor }}>
                     Work Experience
                 </h2>
                 <div className="space-y-6">
                    {data.experience.map((exp, idx) => (
                       <div key={exp.id} style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                          {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                          <div className="job-header">
                              <div className="flex justify-between items-baseline mb-1">
                                 <h3 className="font-bold text-gray-800 text-md">{exp.jobTitle}</h3>
                                 <span className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
                              </div>
                              <div className="text-sm font-bold text-gray-600 mb-2">{exp.employer}</div>
                          </div>
                          {exp.descriptionType === 'paragraph' ? (
                             <p className="text-xs text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                               {exp.description}
                             </p>
                          ) : (
                            <ul className="list-disc list-outside ml-4 text-xs text-gray-600 leading-relaxed space-y-1">
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

           {data.customSections?.map((section) => (
              <section key={section.id} className="mb-10" style={{ marginTop: `${data.customGaps[`custom-${section.id}-top`] !== undefined ? data.customGaps[`custom-${section.id}-top`] : 20}px` }}>
                 <GapHandle id={`custom-${section.id}-top`} />
                 <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2 section-header" style={{ color: accentColor }}>
                     {section.title}
                 </h2>
                 <div className="space-y-4">
                    {section.type === 'list' ? (
                      <ul className="list-disc list-outside ml-4 text-xs text-gray-600 leading-relaxed space-y-1">
                         {section.content.split('\n').filter(l => l.trim()).map((line, i) => {
                            const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                            return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                         })}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                         {section.content}
                      </p>
                    )}
                 </div>
              </section>
           ))}

           {data.education.length > 0 && (
              <section style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
                 <GapHandle id="education-top" />
                 <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-300 pb-2 section-header" style={{ color: accentColor }}>
                     Education
                 </h2>
                 <div className="space-y-4">
                    {data.education.map(edu => (
                       <div key={edu.id}>
                          <div className="job-header">
                              <div className="flex justify-between items-baseline mb-1">
                                 <h3 className="font-bold text-gray-800 text-md">{edu.school}</h3>
                                 <span className="text-xs font-medium text-gray-500">{edu.startDate} - {edu.endDate}</span>
                              </div>
                              <div className="text-sm text-gray-600">{edu.degree}</div>
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

export default DarkBlueBorderTemplate;