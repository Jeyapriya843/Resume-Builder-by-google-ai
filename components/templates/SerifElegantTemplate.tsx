
import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const SerifElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
  const accentColor = data.accentColor || '#654321';
  const fontFamily = data.fontFamily || 'Poppins';

  return (
    <div className="bg-white w-[21cm] h-[29.7cm] overflow-hidden p-[1.5cm] text-gray-900" style={{ fontFamily: `'${fontFamily}', serif` }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-2 font-serif" style={{ color: accentColor }}>
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-2xl italic text-gray-700 font-serif mb-6">
          {data.jobTitle}
        </p>
        
        <div className="py-2 flex justify-around text-sm" style={{ borderTop: `1px solid ${accentColor}`, borderBottom: `1px solid ${accentColor}`, color: accentColor }}>
           {data.email && <span>{data.email}</span>}
           {data.phone && <span>{data.phone}</span>}
           {(data.city || data.country) && <span>{data.city}, {data.country}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8">
           <p className="text-md leading-relaxed text-gray-800 text-justify">
              {data.summary}
           </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold pb-1 mb-4" style={{ color: accentColor, borderBottom: `1px solid ${accentColor}` }}>
            Experience
          </h2>
          <div className="space-y-6 relative border-l-2 pl-6 ml-2" style={{ borderColor: accentColor }}>
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: accentColor }}></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{exp.jobTitle}</h3>
                  <span className="text-sm italic text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-md font-semibold mb-2" style={{ color: accentColor }}>{exp.employer}</div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 leading-relaxed space-y-1">
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
        <section className="mb-8">
          <h2 className="text-xl font-bold pb-1 mb-4" style={{ color: accentColor, borderBottom: `1px solid ${accentColor}` }}>
            Education
          </h2>
          <div className="space-y-4 relative border-l-2 pl-6 ml-2" style={{ borderColor: accentColor }}>
             {data.education.map((edu) => (
              <div key={edu.id} className="relative">
                 <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: accentColor }}></div>
                 <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-gray-800">{edu.school}</h3>
                    <span className="text-sm italic text-gray-600">{edu.startDate} - {edu.endDate}</span>
                 </div>
                 <div className="text-md text-gray-700">{edu.degree} in {edu.fieldOfStudy}</div>
              </div>
             ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
           <h2 className="text-xl font-bold pb-1 mb-4" style={{ color: accentColor, borderBottom: `1px solid ${accentColor}` }}>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
             {data.skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2 text-gray-800">
                   <span style={{ color: accentColor }}>•</span> {skill}
                </div>
             ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SerifElegantTemplate;
