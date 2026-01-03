import React from 'react';
import { TemplateProps } from './index';
import { Icons } from '../ui/Icons';

const CleanSplitTemplate: React.FC<TemplateProps> = ({ data, isAdjusting = false, onAdjustGap }) => {
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
    <div className="bg-[#f7f7f7] w-[21cm] min-h-[29.7cm] p-[1.5cm] text-[#2d3436]" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      <header className="text-center mb-10">
        <h1 className={`${nameSizeClass} font-bold uppercase tracking-widest mb-2 break-words`} style={{ color: accentColor }}>
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-xl text-gray-500 uppercase tracking-[0.3em] mb-8">
          {data.jobTitle}
        </p>
        <div className="bg-[#f0f0f0] border border-gray-300 py-3 px-6 flex justify-between items-center text-sm text-gray-600">
           <div className="flex items-center gap-2"><Icons.MapPin size={14} /> {data.city || 'Any City'}</div>
           <div className="flex items-center gap-2 font-bold"><Icons.Mail size={14} /> <span className="break-all">{data.email}</span></div>
        </div>
      </header>

      {data.summary && (
         <section className="mb-10" style={{ marginTop: `${data.customGaps['summary-top'] !== undefined ? data.customGaps['summary-top'] : 20}px` }}>
            <GapHandle id="summary-top" />
            <div className="flex items-center gap-4 mb-4">
               <h2 className="text-xl font-bold uppercase tracking-widest whitespace-nowrap section-header" style={{ color: accentColor }}>Profile Info</h2>
               <hr className="w-full border-gray-400" />
            </div>
            {data.summaryType === 'list' ? (
              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1">
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

      <div className="flex gap-10">
         <div className="w-1/3 space-y-10 border-r border-gray-300 pr-6">
            {data.education.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['education-top'] !== undefined ? data.customGaps['education-top'] : 20}px` }}>
                  <GapHandle id="education-top" />
                  <div className="pb-1 mb-6 inline-block border-b-2" style={{ borderColor: accentColor }}>
                     <h2 className="text-lg font-bold uppercase tracking-widest section-header" style={{ color: accentColor }}>Education</h2>
                  </div>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id} className="job-header">
                           <div className="font-bold text-gray-800 text-sm">{edu.startDate} - {edu.endDate}</div>
                           <h3 className="font-bold text-sm uppercase" style={{ color: accentColor }}>{edu.school}</h3>
                           <div className="text-xs text-gray-600 mt-1">{edu.degree}</div>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {data.skills.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['skills-top'] !== undefined ? data.customGaps['skills-top'] : 20}px` }}>
                  <GapHandle id="skills-top" />
                  <div className="pb-1 mb-6 inline-block border-b-2" style={{ borderColor: accentColor }}>
                     <h2 className="text-lg font-bold uppercase tracking-widest section-header" style={{ color: accentColor }}>Skills</h2>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600">
                     {data.skills.map(skill => (
                        <li key={skill} className="flex items-center gap-2 skill-item">
                           <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accentColor }}></span> {skill}
                        </li>
                     ))}
                  </ul>
               </section>
            )}
         </div>

         <div className="w-2/3 space-y-10">
            {data.experience.length > 0 && (
               <section style={{ marginTop: `${data.customGaps['experience-top'] !== undefined ? data.customGaps['experience-top'] : 20}px` }}>
                  <GapHandle id="experience-top" />
                  <div className="flex items-center gap-4 mb-6">
                     <h2 className="text-xl font-bold uppercase tracking-widest whitespace-nowrap section-header" style={{ color: accentColor }}>Work Experience</h2>
                  </div>
                  <div className="space-y-8">
                     {data.experience.map((exp, idx) => (
                        <div key={exp.id} className="group/item" style={{ marginTop: idx > 0 ? `${data.customGaps[`exp-${exp.id}-top`] !== undefined ? data.customGaps[`exp-${exp.id}-top`] : 20}px` : 0 }}>
                           {idx > 0 && <GapHandle id={`exp-${exp.id}-top`} />}
                           <div className="job-header">
                              <div className="flex justify-between items-baseline mb-1">
                                 <h3 className="font-bold text-gray-900 text-lg">{exp.employer}</h3>
                                 <span className="text-sm font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
                              </div>
                              <div className="text-md text-gray-600 mb-2">{exp.jobTitle}</div>
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

export default CleanSplitTemplate;