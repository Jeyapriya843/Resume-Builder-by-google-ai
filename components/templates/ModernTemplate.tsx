import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[2cm] text-gray-800 shadow-lg">
      {/* Header */}
      <header className="border-b-4 border-navy-900 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-navy-900 mb-2 uppercase tracking-wide">
            {data.firstName || 'First Name'} {data.lastName || 'Last Name'}
          </h1>
          <p className="text-xl text-blue-600 font-medium">
            {data.jobTitle || 'Job Title'}
          </p>
        </div>
        <div className="text-right text-sm text-gray-600 space-y-1">
          {data.email && <div className="font-medium">{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {(data.city || data.country) && <div>{data.city}, {data.country}</div>}
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="col-span-8 space-y-8">
          {/* Summary */}
          {data.summary && (
            <section>
              <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-gray-200 pb-2 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                {data.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 text-md">{exp.jobTitle}</h3>
                      <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm text-blue-600 font-medium mb-2">
                      {exp.employer} {exp.location && `| ${exp.location}`}
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

           {/* Education (if main column preference) */}
           {data.education.length > 0 && (
            <section>
               <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900">{edu.school}</h3>
                      <span className="text-xs text-gray-500 font-medium">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      {edu.degree} in {edu.fieldOfStudy}
                    </div>
                    {edu.location && <div className="text-xs text-gray-500 mt-1">{edu.location}</div>}
                  </div>
                ))}
              </div>
            </section>
           )}
        </div>

        {/* Sidebar Column */}
        <div className="col-span-4 space-y-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white border border-gray-200 text-navy-900 text-xs font-semibold px-2 py-1 rounded shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;