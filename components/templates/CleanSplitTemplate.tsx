
import React from 'react';
import { ResumeData } from '../../types';
import { Icons } from '../ui/Icons';

interface TemplateProps {
  data: ResumeData;
}

const CleanSplitTemplate: React.FC<TemplateProps> = ({ data }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 20 ? 'text-4xl' : 'text-5xl';
  const accentColor = data.accentColor || '#2c3e50';
  const fontFamily = data.fontFamily || 'Poppins';

  return (
    <div className="bg-[#f7f7f7] w-[21cm] h-[29.7cm] overflow-hidden p-[1.5cm] text-[#2d3436]" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className={`${nameSizeClass} font-bold uppercase tracking-widest mb-2 break-words`} style={{ color: accentColor }}>
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-xl text-gray-500 uppercase tracking-[0.3em] mb-8">
          {data.jobTitle}
        </p>
        
        {/* Contact Box */}
        <div className="bg-[#f0f0f0] border border-gray-300 py-3 px-6 flex justify-between items-center text-sm text-gray-600">
           <div className="flex items-center gap-2">
              <Icons.MapPin size={14} /> {(data.city || data.country) ? `${data.city}, ${data.country}` : 'Any City'}
           </div>
           <div className="flex items-center gap-2">
              <Icons.Globe size={14} /> www.reallygreatsite.com
           </div>
           <div className="flex items-center gap-2">
              <Icons.Mail size={14} /> {data.email}
           </div>
        </div>
      </header>

      {/* Profile Info */}
      {data.summary && (
         <section className="mb-10">
            <div className="flex items-center gap-4 mb-4">
               <h2 className="text-xl font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: accentColor }}>Profile Info</h2>
               <hr className="w-full border-gray-400" />
            </div>
            <p className="text-sm leading-loose text-gray-600 text-justify">
               {data.summary}
            </p>
         </section>
      )}

      <div className="flex gap-10">
         {/* Left Column (Narrow) */}
         <div className="w-1/3 space-y-10 border-r border-gray-300 pr-6">
            {/* Education */}
            {data.education.length > 0 && (
               <section>
                  <div className="pb-1 mb-6 inline-block" style={{ borderBottom: `2px solid ${accentColor}` }}>
                     <h2 className="text-lg font-bold uppercase tracking-widest" style={{ color: accentColor }}>Education</h2>
                  </div>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id}>
                           <div className="font-bold text-gray-800 text-sm">{edu.startDate} - {edu.endDate}</div>
                           <h3 className="font-bold text-sm uppercase" style={{ color: accentColor }}>{edu.school}</h3>
                           <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                              <li>{edu.degree}</li>
                           </ul>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
               <section>
                  <div className="pb-1 mb-6 inline-block" style={{ borderBottom: `2px solid ${accentColor}` }}>
                     <h2 className="text-lg font-bold uppercase tracking-widest" style={{ color: accentColor }}>Skills</h2>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-600">
                     {data.skills.map(skill => (
                        <li key={skill} className="flex items-center gap-2">
                           <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accentColor }}></span> {skill}
                        </li>
                     ))}
                  </ul>
               </section>
            )}

            {/* Languages */}
            <section>
               <div className="pb-1 mb-6 inline-block" style={{ borderBottom: `2px solid ${accentColor}` }}>
                  <h2 className="text-lg font-bold uppercase tracking-widest" style={{ color: accentColor }}>Languages</h2>
               </div>
               <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                  <li>English (Fluent)</li>
                  <li>French (Fluent)</li>
                  <li>Spanish (Intermediate)</li>
               </ul>
            </section>
         </div>

         {/* Right Column (Wide) */}
         <div className="w-2/3 space-y-10">
            {/* Work Experience */}
            {data.experience.length > 0 && (
               <section>
                  <div className="flex items-center gap-4 mb-6">
                     <h2 className="text-xl font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: accentColor }}>Work Experience</h2>
                     <hr className="w-full border-hidden" /> {/* Just placeholder alignment if needed, but style is different */}
                  </div>
                  
                  <div className="space-y-8">
                     {data.experience.map(exp => (
                        <div key={exp.id}>
                           <div className="flex justify-between items-baseline mb-1">
                              <h3 className="font-bold text-gray-900 text-lg">{exp.employer}</h3>
                              <span className="text-sm font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
                           </div>
                           <div className="text-md text-gray-600 mb-2">{exp.jobTitle}</div>
                           <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1">
                              {exp.description.split('\n').map((line, i) => (
                                 line.trim() && <li key={i}>{line}</li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {/* Reference */}
            <section>
               <div className="pb-1 mb-6 inline-block" style={{ borderBottom: `2px solid ${accentColor}` }}>
                  <h2 className="text-lg font-bold uppercase tracking-widest" style={{ color: accentColor }}>Reference</h2>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <h4 className="font-bold text-gray-800">Estelle Darcy</h4>
                     <p className="text-xs text-gray-500">Wardiere Inc. / CTO</p>
                     <p className="text-xs text-gray-500 mt-1">123-456-7890</p>
                     <p className="text-xs text-gray-500">hello@reallygreatsite.com</p>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-800">Harper Richard</h4>
                     <p className="text-xs text-gray-500">Wardiere Inc. / CEO</p>
                     <p className="text-xs text-gray-500 mt-1">123-456-7890</p>
                     <p className="text-xs text-gray-500">hello@reallygreatsite.com</p>
                  </div>
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};

export default CleanSplitTemplate;
