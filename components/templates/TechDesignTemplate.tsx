import React from 'react';
import { TemplateProps } from './index';

const TechDesignTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 20 ? 'text-4xl' : 'text-5xl';
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
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-8 text-gray-800" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      <header className="mb-6">
        <h1 className={`${nameSizeClass} font-bold text-[#333] uppercase mb-1 tracking-tight break-words`}>
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-xl font-bold text-gray-600 uppercase mb-3">
          {data.jobTitle}
        </p>
        <div className="text-xs text-gray-600 flex gap-4 font-mono">
           {data.phone && <span>{data.city ? `${data.city} | ` : ''}{data.phone}</span>}
           {data.email && <span className="break-all">| {data.email}</span>}
        </div>
      </header>

      <div className="space-y-5">
        {data.summary && (
          <section style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
            <GapHandle id="summary-top" />
            <div className="bg-gray-200 rounded-full px-4 py-1.5 inline-block mb-3 section-header">
               <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider italic">Summary</h2>
            </div>
            {data.summaryType === 'list' ? (
              <ul className="list-disc list-outside ml-4 text-xs text-gray-700 leading-relaxed space-y-1">
                 {data.summary.split('\n').filter(l => l.trim()).map((line, i) => {
                    const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                    return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                 })}
              </ul>
            ) : (
              <div className="text-xs leading-relaxed text-gray-700 text-justify whitespace-pre-line">
                 {data.summary}
              </div>
            )}
          </section>
        )}

        {data.skills.length > 0 && (
          <section style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
            <GapHandle id="skills-top" />
            <div className="bg-gray-200 rounded-full px-4 py-1.5 inline-block mb-3 section-header">
               <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider italic">Technical Skills</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
               {data.skills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col skill-item">
                     <span className="font-medium text-gray-800 bg-gray-50 px-2 py-1 rounded border border-gray-100 text-center">{skill}</span>
                  </div>
               ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
            <GapHandle id="experience-top" />
            <div className="bg-gray-200 rounded-full px-4 py-1.5 inline-block mb-3 section-header">
               <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider italic">Professional Experience</h2>
            </div>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                  {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                  <div className="job-header">
                    <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-bold text-gray-900 text-sm">{exp.jobTitle}</h3>
                        <span className="text-xs font-bold text-gray-700">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-xs text-gray-600 italic mb-1">{exp.employer}</div>
                  </div>
                  {exp.descriptionType === 'paragraph' ? (
                    <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  ) : (
                    <ul className="list-disc list-outside ml-4 text-xs text-gray-700 leading-relaxed space-y-0.5">
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
          <section key={section.id} style={{ marginTop: `${data.customGaps[`custom-${section.id}-top`] !== undefined ? data.customGaps[`custom-${section.id}-top`] : 20}px` }}>
            <GapHandle id={`custom-${section.id}-top`} />
            <div className="bg-gray-200 rounded-full px-4 py-1.5 inline-block mb-3 section-header">
               <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider italic">{section.title}</h2>
            </div>
            {section.type === 'list' ? (
              <ul className="list-disc list-outside ml-4 text-xs text-gray-700 leading-relaxed space-y-1">
                 {section.content.split('\n').filter(l => l.trim()).map((line, i) => {
                    const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                    return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
                 })}
              </ul>
            ) : (
              <div className="text-xs leading-relaxed text-gray-700 text-justify whitespace-pre-line">
                 {section.content}
              </div>
            )}
          </section>
        ))}

        {data.education.length > 0 && (
          <section style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
            <GapHandle id="education-top" />
            <div className="bg-gray-200 rounded-full px-4 py-1.5 inline-block mb-3 section-header">
               <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider italic">Education</h2>
            </div>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="job-header">
                  <div className="flex justify-between items-baseline">
                     <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                     <span className="text-xs font-bold text-gray-700">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-xs text-gray-600 italic">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TechDesignTemplate;