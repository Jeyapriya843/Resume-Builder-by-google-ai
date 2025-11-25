
import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const SimpleProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[1.5cm] text-gray-900 shadow-lg font-sans">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-900 uppercase mb-2 tracking-wider">
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-xl text-gray-600 mb-4 font-light">
          {data.jobTitle}
        </p>
        
        <div className="flex justify-center items-center gap-6 text-sm text-gray-500 border-t border-b border-gray-200 py-3">
           {data.phone && (
             <div className="flex items-center gap-2">
               <span>📞</span> {data.phone}
             </div>
           )}
           {data.email && (
             <div className="flex items-center gap-2">
               <span>✉️</span> {data.email}
             </div>
           )}
           {(data.city || data.country) && (
             <div className="flex items-center gap-2">
               <span>📍</span> {data.city}, {data.country}
             </div>
           )}
        </div>
      </header>

      <div className="space-y-8">
        {/* About Me */}
        {data.summary && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-3">About Me</h2>
            <p className="text-sm leading-loose text-gray-600 text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                     <h3 className="text-gray-600 text-sm">{edu.school} | <span className="text-gray-500">{edu.startDate} - {edu.endDate}</span></h3>
                  </div>
                  <div className="text-md font-bold text-gray-900 mt-1">{edu.degree}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Work Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-md text-gray-500 font-medium">
                      {exp.employer} | {exp.startDate} - {exp.endDate}
                    </h3>
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-2">{exp.jobTitle}</div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Skills</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 list-disc list-inside text-sm text-gray-700">
              {data.skills.map((skill) => (
                <li key={skill} className="pl-2">{skill}</li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
           <section>
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Projects</h2>
            <div className="grid grid-cols-1 gap-4">
               {data.projects.map((proj) => (
                  <div key={proj.id}>
                     <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-900">{proj.title}</h3>
                        {proj.link && <span className="text-xs text-blue-600">{proj.link}</span>}
                     </div>
                     <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                  </div>
               ))}
            </div>
           </section>
        )}
      </div>
    </div>
  );
};

export default SimpleProfessionalTemplate;
