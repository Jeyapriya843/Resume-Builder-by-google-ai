
import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const TechDesignTemplate: React.FC<TemplateProps> = ({ data }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 20 ? 'text-4xl' : 'text-5xl';
  const fontFamily = data.fontFamily || 'Poppins';
  
  return (
    <div className="bg-white w-[21cm] h-[29.7cm] overflow-hidden p-[1.5cm] text-gray-800" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className={`${nameSizeClass} font-bold text-[#333] uppercase mb-1 tracking-tight break-words`}>
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-2xl font-bold text-gray-600 uppercase mb-4">
          {data.jobTitle}
        </p>
        <div className="text-sm text-gray-600 flex gap-4">
           {data.phone && <span>{data.city ? `${data.city} | ` : ''}{data.phone}</span>}
           {data.email && <span>| {data.email}</span>}
        </div>
      </header>

      <div className="space-y-6">
        {/* Summary */}
        {data.summary && (
          <section>
            <div className="bg-gray-200 rounded-full px-6 py-2 inline-block mb-4">
               <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider italic">Summary</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              {data.summary}
            </p>
          </section>
        )}

        {/* Technical Skills */}
        {data.skills.length > 0 && (
          <section>
            <div className="bg-gray-200 rounded-full px-6 py-2 inline-block mb-4">
               <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider italic">Technical Skills</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
               {data.skills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col">
                     <span className="font-medium text-gray-800">{skill}</span>
                  </div>
               ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <div className="bg-gray-200 rounded-full px-6 py-2 inline-block mb-4">
               <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider italic">Professional Experience</h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{exp.jobTitle}</h3>
                    <span className="text-sm font-bold text-gray-700">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-sm text-gray-600 italic mb-2">{exp.employer}</div>
                  <ul className="list-disc list-outside ml-5 text-sm text-gray-700 leading-relaxed space-y-1">
                     {exp.description.split('\n').map((line, i) => (
                        line.trim() && <li key={i}>{line}</li>
                     ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <div className="bg-gray-200 rounded-full px-6 py-2 inline-block mb-4">
               <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider italic">Education</h2>
            </div>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                     <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                     <span className="text-sm font-bold text-gray-700">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-sm text-gray-600 italic">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TechDesignTemplate;
