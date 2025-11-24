import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[1.5cm] text-gray-900 font-serif shadow-lg">
      {/* Centered Header */}
      <header className="text-center border-b border-gray-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-widest">
          {data.firstName || 'First Name'} {data.lastName || 'Last Name'}
        </h1>
        <div className="flex justify-center gap-3 text-sm text-gray-600 italic mb-2">
           <span>{data.city}, {data.country}</span>
           <span>•</span>
           <span>{data.email}</span>
           <span>•</span>
           <span>{data.phone}</span>
        </div>
        <p className="text-lg font-semibold text-gray-800 mt-2">
          {data.jobTitle || 'Job Title'}
        </p>
      </header>

      {/* Content */}
      <div className="space-y-5">
        {/* Summary */}
        {data.summary && (
          <section>
            <h2 className="text-md font-bold text-gray-900 uppercase border-b border-gray-300 mb-3">
              Professional Profile
            </h2>
            <p className="text-sm leading-relaxed text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-md font-bold text-gray-900 uppercase border-b border-gray-300 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-gray-900 mb-1">
                    <h3>{exp.employer}, {exp.location}</h3>
                    <span className="text-sm italic">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-semibold italic mb-1">{exp.jobTitle}</div>
                  <p className="text-sm text-gray-800 whitespace-pre-line text-justify">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-md font-bold text-gray-900 uppercase border-b border-gray-300 mb-3">
              Projects
            </h2>
            <div className="space-y-4">
               {data.projects.map(proj => (
                  <div key={proj.id}>
                     <div className="flex justify-between font-bold text-gray-900 mb-1">
                        <h3>{proj.title}</h3>
                        {proj.link && <span className="text-sm font-normal italic">{proj.link}</span>}
                     </div>
                     <p className="text-sm text-gray-800 mb-1">{proj.description}</p>
                     {proj.technologies && (
                       <p className="text-xs text-gray-600 italic">Technology: {proj.technologies.join(', ')}</p>
                     )}
                  </div>
               ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-md font-bold text-gray-900 uppercase border-b border-gray-300 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between font-bold text-gray-900">
                    <h3>{edu.school}</h3>
                    <span className="text-sm italic">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="text-sm">
                    {edu.degree} in {edu.fieldOfStudy}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-md font-bold text-gray-900 uppercase border-b border-gray-300 mb-3">
              Skills
            </h2>
            <p className="text-sm leading-relaxed">
              {data.skills.join(' • ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;