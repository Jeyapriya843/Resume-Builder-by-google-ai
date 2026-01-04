import React from 'react';
import { TemplateProps } from './index';

const BoldSidebarTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const longestNamePart = Math.max(firstName.length, lastName.length);
  const accentColor = data.accentColor || '#5c5c5c';
  const fontFamily = data.fontFamily || 'Poppins';

  let nameSizeClass = 'text-4xl leading-none';
  if (longestNamePart > 13) {
    nameSizeClass = 'text-2xl leading-tight';
  } else if (longestNamePart > 10) {
    nameSizeClass = 'text-3xl leading-snug';
  }

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
       <div className="w-[7cm] bg-[#e5e5e5] flex flex-col min-h-full">
          <div className="text-white p-8 pb-12" style={{ backgroundColor: accentColor }}>
             <h1 className={`${nameSizeClass} font-bold uppercase mb-2 break-words`}>
                {data.firstName}<br/>{data.lastName}
             </h1>
             <p className="text-md font-medium uppercase tracking-wider text-gray-200">
                {data.jobTitle}
             </p>
          </div>
          
          <div className="p-8 space-y-8 flex-1">
             <div className="text-sm text-gray-700 space-y-2">
                {data.email && <div className="break-all font-bold">{data.email}</div>}
                {data.phone && <div>{data.phone}</div>}
                {(data.city || data.country) && <div>{data.city}, {data.country}</div>}
             </div>

             {data.education.length > 0 && (
                <section style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
                   <GapHandle id="education-top" />
                   <h2 className="text-lg font-bold uppercase mb-4 section-header" style={{ color: accentColor }}>Education</h2>
                   <div className="space-y-4">
                      {data.education.map(edu => (
                         <div key={edu.id} className="job-header">
                            <h3 className="font-bold text-gray-800 leading-tight">{edu.school}</h3>
                            <div className="text-sm text-gray-600 mb-1">{edu.degree}</div>
                            <div className="text-xs text-gray-500">({edu.startDate} - {edu.endDate})</div>
                         </div>
                      ))}
                   </div>
                </section>
             )}

             {data.skills.length > 0 && (
                <section style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
                   <GapHandle id="skills-top" />
                   <h2 className="text-lg font-bold uppercase mb-4 section-header" style={{ color: accentColor }}>Skills</h2>
                   <ul className="space-y-2">
                      {data.skills.map(skill => (
                         <li key={skill} className="flex items-center gap-2 text-sm text-gray-700 skill-item">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </section>
             )}
          </div>
       </div>

       <div className="flex-1 p-10 bg-white">
          {data.summary && (
             <section className="mb-10" style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
                <GapHandle id="summary-top" />
                <h2 className="text-xl font-bold uppercase mb-4 section-header" style={{ color: accentColor }}>Summary</h2>
                {data.summaryType === 'list' ? (
                  <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
                    {data.summary.split('\n').filter(l => l.trim()).map((line, i) => {
                       const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                       return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                    })}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-gray-600 text-justify whitespace-pre-line">
                     {data.summary}
                  </p>
                )}
             </section>
          )}

          {data.experience.length > 0 && (
             <section className="mb-10" style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
                <GapHandle id="experience-top" />
                <h2 className="text-xl font-bold uppercase mb-6 section-header" style={{ color: accentColor }}>Work Experience</h2>
                <div className="space-y-8">
                   {data.experience.map((exp, idx) => (
                      <div key={exp.id} className="group/item" style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                         {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                         <div className="job-header">
                            <h3 className="text-lg font-bold text-gray-800">{exp.jobTitle}</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-md font-bold text-gray-600">{exp.employer}</span>
                                <span className="text-sm text-gray-500 font-medium">({exp.startDate} - {exp.endDate})</span>
                            </div>
                         </div>
                         {exp.descriptionType === 'paragraph' ? (
                           <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                             {exp.description}
                           </p>
                         ) : (
                           <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
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

          {data.projects && data.projects.length > 0 && (
             <section className="mb-10" style={{ marginTop: `${data.customGaps['projects-top'] !== undefined ? data.customGaps['projects-top'] : 20}px` }}>
                <GapHandle id="projects-top" />
                <h2 className="text-xl font-bold uppercase mb-4 section-header" style={{ color: accentColor }}>Projects</h2>
                <div className="space-y-4">
                   {data.projects.map(proj => (
                      <div key={proj.id}>
                         <h3 className="font-bold text-gray-800 job-header">{proj.title}</h3>
                         <div className="text-sm text-gray-600">
                            {proj.descriptionType === 'paragraph' ? (
                              <p className="whitespace-pre-line leading-relaxed">{proj.description}</p>
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

          {data.customSections?.map((section) => (
             <section key={section.id} style={{ marginTop: `${data.customGaps[`custom-${section.id}-top`] !== undefined ? data.customGaps[`custom-${section.id}-top`] : 20}px` }}>
                <GapHandle id={`custom-${section.id}-top`} />
                <h2 className="text-xl font-bold uppercase mb-4 section-header" style={{ color: accentColor }}>{section.title}</h2>
                <div className="text-sm text-gray-600">
                   {section.type === 'list' ? (
                     <ul className="list-disc list-outside ml-4 space-y-1">
                        {section.content.split('\n').filter(l => l.trim()).map((line, i) => {
                           const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                           return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                        })}
                     </ul>
                   ) : (
                     <p className="whitespace-pre-line leading-relaxed text-justify">{section.content}</p>
                   )}
                </div>
             </section>
          ))}
       </div>
    </div>
  );
};

export default BoldSidebarTemplate;