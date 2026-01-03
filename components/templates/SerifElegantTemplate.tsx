import React from 'react';
import { TemplateProps } from './index';

const SerifElegantTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
  const accentColor = data.accentColor || '#654321';
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
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[1.5cm] text-gray-900" style={{ fontFamily: `'${fontFamily}', serif` }}>
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-2 font-serif" style={{ color: accentColor }}>
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-2xl italic text-gray-700 font-serif mb-6">
          {data.jobTitle}
        </p>
        <div className="py-2 flex justify-around text-sm" style={{ borderTop: `1px solid ${accentColor}`, borderBottom: `1px solid ${accentColor}`, color: accentColor }}>
           {data.email && <span>{data.email}</span>}
           {data.phone && <span>{data.phone}</span>}
           {(data.city || data.country) && <span>{data.city}, {data.country}</span>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-8" style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
           <GapHandle id="summary-top" />
           {data.summaryType === 'list' ? (
             <ul className="list-disc list-outside ml-4 text-md text-gray-800 space-y-1">
               {data.summary.split('\n').filter(l => l.trim()).map((line, i) => {
                  const cleanLine = line.replace(/^[\u2022\u25CF\u00B7\-\*]\s*/, '').trim();
                  return cleanLine && <li key={i} className="description-line">{cleanLine}</li>;
               })}
             </ul>
           ) : (
             <p className="text-md leading-relaxed text-gray-800 text-justify whitespace-pre-line">
                {data.summary}
             </p>
           )}
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-8" style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
          <GapHandle id="experience-top" />
          <h2 className="text-xl font-bold pb-1 mb-4 section-header" style={{ color: accentColor, borderBottom: `1px solid ${accentColor}` }}>
            Experience
          </h2>
          <div className="space-y-6 relative border-l-2 pl-6 ml-2" style={{ borderColor: accentColor }}>
            {data.experience.map((exp, idx) => (
              <div key={exp.id} className="relative" style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: accentColor }}></div>
                <div className="job-header">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{exp.jobTitle}</h3>
                    <span className="text-sm italic text-gray-600">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-md font-semibold mb-2" style={{ color: accentColor }}>{exp.employer}</div>
                </div>
                {exp.descriptionType === 'paragraph' ? (
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                ) : (
                  <ul className="list-disc list-outside ml-4 text-sm text-gray-700 leading-relaxed space-y-1">
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
        <section className="mb-8" style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
          <GapHandle id="education-top" />
          <h2 className="text-xl font-bold pb-1 mb-4 section-header" style={{ color: accentColor, borderBottom: `1px solid ${accentColor}` }}>
            Education
          </h2>
          <div className="space-y-4 relative border-l-2 pl-6 ml-2" style={{ borderColor: accentColor }}>
             {data.education.map((edu) => (
              <div key={edu.id} className="relative">
                 <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: accentColor }}></div>
                 <div className="job-header">
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-bold text-gray-800">{edu.school}</h3>
                        <span className="text-sm italic text-gray-600">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div className="text-md text-gray-700">{edu.degree} in {edu.fieldOfStudy}</div>
                 </div>
              </div>
             ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
           <GapHandle id="skills-top" />
           <h2 className="text-xl font-bold pb-1 mb-4 section-header" style={{ color: accentColor, borderBottom: `1px solid ${accentColor}` }}>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
             {data.skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2 text-gray-800 skill-item">
                   <span style={{ color: accentColor }}>•</span> {skill}
                </div>
             ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SerifElegantTemplate;