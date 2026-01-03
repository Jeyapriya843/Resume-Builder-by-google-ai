import React from 'react';
import { TemplateProps } from './index';

const TealModernTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 22 ? 'text-4xl' : 'text-5xl';
  const accentColor = data.accentColor || '#0d9488';
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
    <div className="w-[21cm] min-h-[29.7cm] p-[1.5cm] text-gray-800" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      <header className="mb-8 pb-6" style={{ borderBottom: `2px solid ${accentColor}` }}>
        <div className="flex justify-between items-end">
           <div>
              <h1 className={`${nameSizeClass} font-bold uppercase mb-1 tracking-wide break-words`} style={{ color: accentColor }}>
                {data.firstName} {data.lastName}
              </h1>
              <p className="text-xl tracking-widest uppercase text-gray-600">
                {data.jobTitle}
              </p>
           </div>
        </div>
        <div className="flex justify-between mt-6 text-sm text-gray-600 font-medium">
           <span className="break-all">{data.email}</span>
           <span style={{ color: accentColor }}>|</span>
           <span>{data.phone}</span>
           <span style={{ color: accentColor }}>|</span>
           <span>{data.city}, {data.country}</span>
        </div>
      </header>

      <div className="space-y-8">
        {data.summary && (
          <section style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
            <GapHandle id="summary-top" />
            <h2 className="text-lg font-bold mb-2 flex items-center gap-3 section-header" style={{ color: accentColor }}>
               Profile Summary
               <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
            </h2>
            {data.summaryType === 'list' ? (
              <ul className="list-disc list-outside ml-5 text-sm text-gray-700 leading-relaxed space-y-1">
                 {data.summary.split('\n').filter(l => l.trim()).map((line, i) => {
                    const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                    return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                 })}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                {data.summary}
              </p>
            )}
          </section>
        )}

        {data.skills.length > 0 && (
          <section style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
             <GapHandle id="skills-top" />
             <div className="grid grid-cols-2 gap-12">
                <div>
                   <h2 className="text-lg font-bold mb-2 flex items-center gap-3 section-header" style={{ color: accentColor }}>
                     Professional Skill
                     <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
                   </h2>
                   <ul className="space-y-2 mt-4">
                      {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map(skill => (
                         <li key={skill} className="flex items-center gap-2 text-sm skill-item">
                            <span className="w-1.5 h-1.5 bg-black rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </div>
                <div>
                   <h2 className="text-lg font-bold mb-2 flex items-center gap-3 section-header" style={{ color: accentColor }}>
                     Relevant Skill
                     <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
                   </h2>
                   <ul className="space-y-2 mt-4">
                      {data.skills.slice(Math.ceil(data.skills.length / 2)).map(skill => (
                         <li key={skill} className="flex items-center gap-2 text-sm skill-item">
                            <span className="w-1.5 h-1.5 bg-black rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
            <GapHandle id="education-top" />
            <h2 className="text-lg font-bold mb-4 flex items-center gap-3 section-header" style={{ color: accentColor }}>
                Education
                <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={edu.id} className="mb-2" style={{ marginTop: idx > 0 ? `${data.customGaps[`edu-${edu.id}-top`] !== undefined ? data.customGaps[`edu-${edu.id}-top`] : 20}px` : 0 }}>
                  {idx > 0 && <GapHandle id={`edu-${edu.id}-top`} />}
                  <div className="job-header">
                      <div className="flex justify-between items-baseline mb-1">
                         <h3 className="font-bold text-black text-md">{edu.school}</h3>
                         <span className="text-sm italic font-medium" style={{ color: accentColor }}>{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <div className="text-sm text-gray-700">{edu.degree} in {edu.fieldOfStudy}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
            <GapHandle id="experience-top" />
            <h2 className="text-lg font-bold mb-4 flex items-center gap-3 section-header" style={{ color: accentColor }}>
                Work Experience
                <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="mb-2" style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                  {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                  <div className="job-header">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-black text-md">{exp.jobTitle}</h3>
                        <span className="text-sm italic font-medium" style={{ color: accentColor }}>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-bold text-gray-600 mb-2">{exp.employer}</div>
                  </div>
                  {exp.descriptionType === 'paragraph' ? (
                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  ) : (
                    <ul className="list-disc list-outside ml-5 text-sm text-gray-700 leading-relaxed space-y-1">
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
  );
};

export default TealModernTemplate;