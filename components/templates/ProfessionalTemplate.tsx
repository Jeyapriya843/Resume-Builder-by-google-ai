import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[1.5cm] text-gray-800 shadow-lg font-sans">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-navy-900 uppercase mb-2 tracking-wide">
          {data.firstName || 'First Name'} {data.lastName || 'Last Name'}
        </h1>
        <p className="text-lg text-gray-600 mb-3 font-medium">
          {data.jobTitle || 'Job Title'}
        </p>
        <div className="flex justify-center flex-wrap gap-2 text-sm text-gray-500 mb-4">
          {(data.city || data.country) && (
            <>
              <span>{data.city}{data.city && data.country ? ', ' : ''}{data.country}</span>
              <span className="text-gray-300">|</span>
            </>
          )}
          {data.phone && (
             <>
               <span>{data.phone}</span>
               <span className="text-gray-300">|</span>
             </>
          )}
          {data.email && (
            <span>{data.email}</span>
          )}
        </div>
        <div className="w-full h-1 bg-navy-900 rounded-full"></div>
      </header>

      <div className="space-y-5">
        {/* Summary */}
        {data.summary && (
          <section>
            <h2 className="text-lg font-bold text-navy-900 uppercase mb-2 tracking-wider">Summary</h2>
            <p className="text-sm leading-relaxed text-gray-700 text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-navy-900 uppercase mb-3 tracking-wider">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 text-md">
                      {exp.employer}{exp.location ? `, ${exp.location}` : ''}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-medium text-gray-700 border-l-2 border-blue-500 pl-2">
                      {exp.jobTitle}
                    </span>
                    <span className="text-gray-500 italic text-xs">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
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
             <h2 className="text-lg font-bold text-navy-900 uppercase mb-3 tracking-wider">Projects</h2>
             <div className="space-y-3">
                {data.projects.map((proj) => (
                   <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-1">
                         <h3 className="font-bold text-gray-900 text-md">{proj.title}</h3>
                         {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">{proj.link}</a>}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-1">{proj.description}</p>
                      {proj.technologies && proj.technologies.length > 0 && (
                         <div className="flex flex-wrap gap-1">
                            <span className="text-xs font-semibold text-gray-500">Tech:</span>
                            {proj.technologies.map((tech, i) => (
                               <span key={i} className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">{tech}</span>
                            ))}
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-navy-900 uppercase mb-3 tracking-wider">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-dashed border-gray-200 pb-2 last:border-0">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</h3>
                    <div className="text-sm text-gray-600">{edu.school}{edu.location ? `, ${edu.location}` : ''}</div>
                  </div>
                  <span className="text-sm text-gray-500 font-medium tabular-nums mt-1 sm:mt-0">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-navy-900 uppercase mb-3 tracking-wider">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
              {data.skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;