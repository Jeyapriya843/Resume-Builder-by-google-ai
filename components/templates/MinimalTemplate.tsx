import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[2cm] text-gray-800 shadow-lg font-sans">
      {/* Minimal Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-light text-gray-900 mb-4">
          {data.firstName || 'First'} <span className="font-bold">{data.lastName || 'Last'}</span>
        </h1>
        <p className="text-xl text-gray-500 mb-6">{data.jobTitle || 'Job Title'}</p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 border-t border-gray-100 pt-6">
           {data.email && <span className="font-mono text-xs tracking-wide">{data.email}</span>}
           {data.phone && <span className="font-mono text-xs tracking-wide">{data.phone}</span>}
           {data.city && <span className="font-mono text-xs tracking-wide">{data.city}</span>}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10">
        
        {/* Skills Row - Highlighted */}
        {data.skills.length > 0 && (
           <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Expertise</h2>
              <div className="flex flex-wrap gap-4">
                 {data.skills.map(skill => (
                    <span key={skill} className="text-lg font-medium text-gray-800 border-b-2 border-transparent hover:border-gray-900 transition-all cursor-default">
                       {skill}
                    </span>
                 ))}
              </div>
           </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
             <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Experience</h2>
             <div className="space-y-8 border-l-2 border-gray-100 pl-6 ml-1">
                {data.experience.map(exp => (
                   <div key={exp.id} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-gray-200 rounded-full border-2 border-white"></div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h3>
                      <div className="text-gray-500 mb-2">{exp.employer}</div>
                      <p className="text-gray-600 leading-relaxed mb-2">{exp.description}</p>
                      <div className="text-xs text-gray-400 font-mono">{exp.startDate} — {exp.endDate}</div>
                   </div>
                ))}
             </div>
          </section>
        )}

        {/* Education & Summary Split */}
        <div className="grid grid-cols-2 gap-8">
           {data.summary && (
              <section>
                 <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">About</h2>
                 <p className="text-sm text-gray-600 leading-loose">
                    {data.summary}
                 </p>
              </section>
           )}

           {data.education.length > 0 && (
              <section>
                 <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Education</h2>
                 <div className="space-y-4">
                    {data.education.map(edu => (
                       <div key={edu.id}>
                          <div className="font-bold text-gray-900">{edu.school}</div>
                          <div className="text-sm text-gray-600">{edu.degree}</div>
                          <div className="text-xs text-gray-400 mt-1">{edu.startDate} - {edu.endDate}</div>
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