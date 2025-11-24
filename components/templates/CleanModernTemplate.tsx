import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const CleanModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[1.2cm] text-gray-800 shadow-lg font-sans flex flex-col">
      {/* Header */}
      <header className="text-center mb-10 border-b border-gray-300 pb-6">
        <h1 className="text-4xl font-light tracking-widest text-gray-800 uppercase mb-2">
          {data.firstName} <span className="font-semibold">{data.lastName}</span>
        </h1>
        <p className="text-sm font-bold tracking-[0.2em] text-gray-600 uppercase">
          {data.jobTitle}
        </p>
      </header>

      <div className="flex gap-10 flex-1">
        {/* Main Column (Left) */}
        <div className="w-7/12 space-y-8 border-r border-gray-200 pr-8">
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 bg-gray-100 py-1 px-2 mb-6 uppercase">
                Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-sm font-bold text-gray-800 uppercase mb-1">{exp.jobTitle}</h3>
                    <div className="text-xs font-semibold text-gray-600 mb-1">
                      {exp.employer} | {exp.startDate} - {exp.endDate}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 bg-gray-100 py-1 px-2 mb-6 uppercase">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="text-xs font-bold text-gray-800 uppercase">{edu.startDate} - {edu.endDate}</div>
                    <h3 className="text-sm font-bold text-gray-700 uppercase mt-1">{edu.school}</h3>
                    <div className="text-xs text-gray-600 italic">{edu.degree} in {edu.fieldOfStudy}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
           {/* Projects (Extra content if available) */}
           {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 bg-gray-100 py-1 px-2 mb-6 uppercase">
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-sm font-bold text-gray-800 uppercase">{proj.title}</h3>
                    {proj.link && <div className="text-xs text-blue-500 mb-1">{proj.link}</div>}
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Column (Right) */}
        <div className="w-5/12 space-y-8">
          
          {/* Contact */}
          <section>
             <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 bg-gray-100 py-1 px-2 mb-6 uppercase">
                Contact
              </h2>
              <div className="text-xs text-gray-600 space-y-2">
                 {data.phone && <div className="font-medium">{data.phone}</div>}
                 {(data.city || data.country) && <div className="font-medium">{data.city}, {data.country}</div>}
                 {data.email && <div className="font-medium">{data.email}</div>}
              </div>
          </section>

          {/* Summary */}
          {data.summary && (
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 bg-gray-100 py-1 px-2 mb-6 uppercase">
                Summary
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed text-justify">
                {data.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 bg-gray-100 py-1 px-2 mb-6 uppercase">
                Skills
              </h2>
              <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
                {data.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CleanModernTemplate;