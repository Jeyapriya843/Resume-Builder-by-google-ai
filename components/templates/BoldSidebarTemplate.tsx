
import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const BoldSidebarTemplate: React.FC<TemplateProps> = ({ data }) => {
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

  return (
    <div className="bg-white w-[21cm] h-[29.7cm] overflow-hidden flex" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
       {/* Left Sidebar */}
       <div className="w-[7cm] bg-[#e5e5e5] flex flex-col h-full">
          {/* Header Block */}
          <div className="text-white p-8 pb-12" style={{ backgroundColor: accentColor }}>
             <h1 className={`${nameSizeClass} font-bold uppercase mb-2 break-words`}>
                {data.firstName}<br/>{data.lastName}
             </h1>
             <p className="text-md font-medium uppercase tracking-wider text-gray-200">
                {data.jobTitle}
             </p>
          </div>
          
          <div className="p-8 space-y-8 flex-1">
             {/* Contact */}
             <div className="text-sm text-gray-700 space-y-2">
                {data.email && <div className="break-all">{data.email}</div>}
                {data.phone && <div>{data.phone}</div>}
                {(data.city || data.country) && <div>{data.city}, {data.country}</div>}
             </div>

             {/* Education */}
             {data.education.length > 0 && (
                <section>
                   <h2 className="text-lg font-bold uppercase mb-4" style={{ color: accentColor }}>Education</h2>
                   <div className="space-y-4">
                      {data.education.map(edu => (
                         <div key={edu.id}>
                            <h3 className="font-bold text-gray-800 leading-tight">{edu.school}</h3>
                            <div className="text-sm text-gray-600 mb-1">{edu.degree}</div>
                            <div className="text-xs text-gray-500">({edu.startDate} - {edu.endDate})</div>
                         </div>
                      ))}
                   </div>
                </section>
             )}

             {/* Skills */}
             {data.skills.length > 0 && (
                <section>
                   <h2 className="text-lg font-bold uppercase mb-4" style={{ color: accentColor }}>Skills</h2>
                   <ul className="space-y-2">
                      {data.skills.map(skill => (
                         <li key={skill} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </section>
             )}
          </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 p-10 bg-white">
          {/* Summary */}
          {data.summary && (
             <section className="mb-10">
                <h2 className="text-xl font-bold uppercase mb-4" style={{ color: accentColor }}>Summary</h2>
                <p className="text-sm leading-relaxed text-gray-600 text-justify">
                   {data.summary}
                </p>
             </section>
          )}

          {/* Work Experience */}
          {data.experience.length > 0 && (
             <section className="mb-10">
                <h2 className="text-xl font-bold uppercase mb-6" style={{ color: accentColor }}>Work Experience</h2>
                <div className="space-y-8">
                   {data.experience.map(exp => (
                      <div key={exp.id}>
                         <h3 className="text-lg font-bold text-gray-800">{exp.jobTitle}</h3>
                         <div className="flex items-center gap-2 mb-2">
                            <span className="text-md font-bold text-gray-600">{exp.employer}</span>
                            <span className="text-sm text-gray-500 font-medium">({exp.startDate} - {exp.endDate})</span>
                         </div>
                         <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
                            {exp.description.split('\n').map((line, i) => (
                               line.trim() && <li key={i}>{line}</li>
                            ))}
                         </ul>
                      </div>
                   ))}
                </div>
             </section>
          )}

          {/* Projects (if space allows) */}
          {data.projects && data.projects.length > 0 && (
             <section>
                <h2 className="text-xl font-bold uppercase mb-4" style={{ color: accentColor }}>Projects</h2>
                <div className="space-y-4">
                   {data.projects.map(proj => (
                      <div key={proj.id}>
                         <h3 className="font-bold text-gray-800">{proj.title}</h3>
                         <p className="text-sm text-gray-600">{proj.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          )}
       </div>
    </div>
  );
};

export default BoldSidebarTemplate;
