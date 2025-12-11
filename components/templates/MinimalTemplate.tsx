
import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const fontFamily = data.fontFamily || 'Poppins';

  return (
    <div className="bg-white w-[21cm] h-[29.7cm] overflow-hidden p-[1.5cm] text-gray-800" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      {/* Minimal Header */}
      <header className="mb-8">
        <h1 className="text-5xl font-light text-gray-900 mb-3">
          {data.firstName || 'First'} <span className="font-bold">{data.lastName || 'Last'}</span>
        </h1>
        <p className="text-xl text-gray-500 mb-4">{data.jobTitle || 'Job Title'}</p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
           {data.email && <span className="font-mono text-xs tracking-wide">{data.email}</span>}
           {data.phone && <span className="font-mono text-xs tracking-wide">{data.phone}</span>}
           {data.city && <span className="font-mono text-xs tracking-wide">{data.city}</span>}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Skills Row - Highlighted */}
        {data.skills.length > 0 && (
           <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Expertise</h2>
              <div className="flex flex-wrap gap-3">
                 {data.skills.map(skill => (
                    <span key={skill} className="text-sm font-medium text-gray-800 border-b-2 border-transparent hover:border-gray-900 transition-all cursor-default">
                       {skill}
                    </span>
                 ))}
              </div>
           </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
             <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Experience</h2>
             <div className="space-y-6 border-l-2 border-gray-100 pl-6 ml-1">
                {data.experience.map(exp => (
                   <div key={exp.id} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-gray-200 rounded-full border-2 border-white"></div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h3>
                      <div className="text-gray-500 mb-1 text-sm">{exp.employer}</div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-1">{exp.description}</p>
                      <div className="text-xs text-gray-400 font-mono">{exp.startDate} — {exp.endDate}</div>
                   </div>
                ))}
             </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
             <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Key Projects</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.map(proj => (
                   <div key={proj.id} className="bg-gray-50 p-4 rounded">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{proj.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-2">{proj.description}</p>
                      {proj.technologies.length > 0 && (
                         <div className="flex flex-wrap gap-1">
                            {proj.technologies.map((t, i) => (
                               <span key={i} className="text-[10px] bg-white px-1 py-0.5 rounded text-gray-500 border border-gray-100">{t}</span>
                            ))}
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </section>
        )}

        {/* Education & Summary Split */}
        <div className="grid grid-cols-2 gap-8">
           {data.summary && (
              <section>
                 <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">About</h2>
                 <p className="text-sm text-gray-600 leading-relaxed text-justify">
                    {data.summary}
                 </p>
              </section>
           )}

           {data.education.length > 0 && (
              <section>
                 <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Education</h2>
                 <div className="space-y-3">
                    {data.education.map(edu => (
                       <div key={edu.id}>
                          <div className="font-bold text-gray-900 text-sm">{edu.school}</div>
                          <div className="text-xs text-gray-600">{edu.degree}</div>
                          <div className="text-[10px] text-gray-400 mt-1">{edu.startDate} - {edu.endDate}</div>
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

export default MinimalTemplate;
