
import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const TealModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 22 ? 'text-4xl' : 'text-5xl';
  const accentColor = data.accentColor || '#0d9488'; // Teal-600
  const fontFamily = data.fontFamily || 'Poppins';

  return (
    <div className="bg-white w-[21cm] h-[29.7cm] overflow-hidden p-[1.5cm] text-gray-800" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      {/* Header */}
      <header className="mb-8 pb-6" style={{ borderBottom: `2px solid ${accentColor}` }}>
        <div className="flex justify-between items-end">
           <div>
              <h1 className={`${nameSizeClass} font-bold uppercase mb-1 tracking-wide break-words`} style={{ color: accentColor }}>
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
           <span style={{ color: accentColor }}>|</span>
           <span>{data.phone}</span>
           <span style={{ color: accentColor }}>|</span>
           <span>{data.city}, {data.country}</span>
        </div>
      </header>

      <div className="space-y-8">
        {/* Profile Summary */}
        {data.summary && (
          <section>
            <h2 className="text-lg font-bold mb-2 flex items-center gap-3" style={{ color: accentColor }}>
               Profile Summary
               <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
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
                   <h2 className="text-lg font-bold mb-2 flex items-center gap-3" style={{ color: accentColor }}>
                     Professional Skill
                     <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
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
                   <h2 className="text-lg font-bold mb-2 flex items-center gap-3" style={{ color: accentColor }}>
                     Relevant Skill
                     <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
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
            <h2 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: accentColor }}>
               Education
               <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                     <h3 className="font-bold text-black text-md">{edu.school}</h3>
                     <span className="text-sm italic font-medium" style={{ color: accentColor }}>{edu.startDate} - {edu.endDate}</span>
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
            <h2 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: accentColor }}>
               Work Experience
               <span className="flex-1 h-[1px]" style={{ backgroundColor: accentColor }}></span>
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-black text-md">{exp.jobTitle}</h3>
                    <span className="text-sm italic font-medium" style={{ color: accentColor }}>{exp.startDate} - {exp.endDate}</span>
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
