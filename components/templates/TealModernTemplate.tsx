
import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const TealModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="bg-white w-[21cm] min-h-[29.7cm] p-[1.5cm] text-gray-800 shadow-lg font-sans">
      {/* Header */}
      <header className="mb-8 border-b-2 border-teal-600 pb-6">
        <div className="flex justify-between items-end">
           <div>
              <h1 className="text-5xl font-bold text-teal-700 uppercase mb-1 tracking-wide">
                {data.firstName} {data.lastName}
              </h1>
              <p className="text-xl tracking-widest uppercase text-gray-600">
                {data.jobTitle}
              </p>
           </div>
           <div className="text-right text-sm font-medium text-gray-600">
              <div className="uppercase tracking-wider">Marketing Specialist</div> {/* Static or Dynamic? Using dynamic below */}
           </div>
        </div>
        
        <div className="flex justify-between mt-6 text-sm text-gray-600 font-medium">
           <span>{data.email}</span>
           <span className="text-teal-400">|</span>
           <span>{data.phone}</span>
           <span className="text-teal-400">|</span>
           <span>{data.city}, {data.country}</span>
        </div>
      </header>

      <div className="space-y-8">
        {/* Profile Summary */}
        {data.summary && (
          <section>
            <h2 className="text-lg font-bold text-teal-700 mb-2 flex items-center gap-3">
               Profile Summary
               <span className="flex-1 h-[1px] bg-teal-600"></span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {data.summary}
            </p>
          </section>
        )}

        {/* Skills Split */}
        {data.skills.length > 0 && (
          <section>
             <div className="grid grid-cols-2 gap-12">
                <div>
                   <h2 className="text-lg font-bold text-teal-700 mb-2 flex items-center gap-3">
                     Professional Skill
                     <span className="flex-1 h-[1px] bg-teal-600"></span>
                   </h2>
                   <ul className="space-y-2 mt-4">
                      {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map(skill => (
                         <li key={skill} className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 bg-black rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </div>
                <div>
                   <h2 className="text-lg font-bold text-teal-700 mb-2 flex items-center gap-3">
                     Relevant Skill
                     <span className="flex-1 h-[1px] bg-teal-600"></span>
                   </h2>
                   <ul className="space-y-2 mt-4">
                      {data.skills.slice(Math.ceil(data.skills.length / 2)).map(skill => (
                         <li key={skill} className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 bg-black rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-3">
               Education
               <span className="flex-1 h-[1px] bg-teal-600"></span>
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                     <h3 className="font-bold text-black text-md">{edu.school}</h3>
                     <span className="text-sm text-teal-600 italic font-medium">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-sm text-gray-700">{edu.degree} in {edu.fieldOfStudy}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-3">
               Work Experience
               <span className="flex-1 h-[1px] bg-teal-600"></span>
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-black text-md">{exp.jobTitle}</h3>
                    <span className="text-sm text-teal-600 italic font-medium">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-600 mb-2">{exp.employer}</div>
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
      </div>
    </div>
  );
};

export default TealModernTemplate;
