import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const TimelineTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[1.5cm] text-gray-800 shadow-lg font-sans">
       {/* Header */}
       <header className="flex justify-between items-start mb-12">
          <div>
             <h1 className="text-4xl font-normal uppercase tracking-[0.1em] text-gray-800 mb-2">
                {data.firstName} <br/><span className="font-bold">{data.lastName}</span>
             </h1>
             <p className="text-sm tracking-[0.3em] uppercase text-gray-500">{data.jobTitle}</p>
          </div>
          <div className="text-right text-xs text-gray-500 space-y-1">
             {data.phone && <div>{data.phone}</div>}
             {data.email && <div>{data.email}</div>}
             {(data.city || data.country) && <div>{data.city}, {data.country}</div>}
          </div>
       </header>

       <div className="grid grid-cols-12 gap-8">
          {/* Main Column (Left) */}
          <div className="col-span-7">
             {/* Profile */}
             {data.summary && (
                <section className="mb-10">
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 border-b border-gray-100 pb-2">
                      Profile
                   </h2>
                   <p className="text-xs leading-loose text-gray-600 text-justify">
                      {data.summary}
                   </p>
                </section>
             )}

             {/* Work Experience */}
             {data.experience.length > 0 && (
                <section>
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-8 border-b border-gray-100 pb-2">
                      Work Experience
                   </h2>
                   <div className="space-y-0 relative border-l border-gray-300 ml-1.5">
                      {data.experience.map((exp) => (
                         <div key={exp.id} className="pl-8 pb-10 relative last:pb-0">
                            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-gray-500"></div>
                            <div className="text-xs font-bold tracking-wider text-gray-500 mb-1 uppercase">
                               {exp.startDate} - {exp.endDate}
                            </div>
                            <h3 className="text-sm font-bold text-gray-800 mb-1">{exp.employer}</h3>
                            <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">{exp.jobTitle}</div>
                            <ul className="text-xs text-gray-600 leading-relaxed list-disc ml-4 space-y-1">
                               {exp.description.split('\n').map((line, i) => (
                                  line.trim() && <li key={i}>{line}</li>
                               ))}
                            </ul>
                         </div>
                      ))}
                   </div>
                </section>
             )}
          </div>

          {/* Sidebar Column (Right) */}
          <div className="col-span-5 pt-2">
             {/* Education */}
             {data.education.length > 0 && (
                <section className="mb-10">
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 border-b border-gray-100 pb-2">
                      Education
                   </h2>
                   <div className="space-y-6">
                      {data.education.map(edu => (
                         <div key={edu.id}>
                            <div className="text-xs font-bold text-gray-500 mb-1">{edu.startDate} - {edu.endDate}</div>
                            <h3 className="text-sm font-bold text-gray-800 uppercase">{edu.school}</h3>
                            <div className="text-xs text-gray-600 mt-1">{edu.degree}</div>
                         </div>
                      ))}
                   </div>
                </section>
             )}

             {/* Skills */}
             {data.skills.length > 0 && (
                <section className="mb-10">
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 border-b border-gray-100 pb-2">
                      Skills
                   </h2>
                   <ul className="space-y-3">
                      {data.skills.map(skill => (
                         <li key={skill} className="flex items-center gap-3 text-xs text-gray-600">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </section>
             )}

             {/* Projects */}
             {data.projects && data.projects.length > 0 && (
                <section>
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 border-b border-gray-100 pb-2">
                      Projects
                   </h2>
                   <div className="space-y-4">
                      {data.projects.map(proj => (
                         <div key={proj.id}>
                            <h3 className="text-sm font-bold text-gray-800">{proj.title}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed mt-1">{proj.description}</p>
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