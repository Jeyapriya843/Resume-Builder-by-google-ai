
import React from 'react';
import { ResumeData } from '../../types';
import { Icons } from '../ui/Icons';

interface TemplateProps {
  data: ResumeData;
}

const DarkSidebarTemplate: React.FC<TemplateProps> = ({ data }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 20 ? 'text-4xl' : 'text-5xl';
  const accentColor = data.accentColor || '#2c3e50';
  const fontFamily = data.fontFamily || 'Poppins';

  return (
    <div className="bg-white w-[21cm] h-[29.7cm] overflow-hidden flex" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
       {/* Left Sidebar (Dark) */}
       <div className="w-[7.5cm] text-white p-8 flex flex-col h-full" style={{ backgroundColor: accentColor }}>
          {/* Photo Placeholder */}
          <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto mb-10 overflow-hidden border-4 border-white/20">
             {/* Use initials if no photo */}
             <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/50">
                {data.firstName?.[0]}{data.lastName?.[0]}
             </div>
          </div>

          <div className="space-y-8">
             {/* Contact */}
             <section>
                <h2 className="text-xl font-bold border-b border-white/20 pb-2 mb-4">Contact</h2>
                <div className="space-y-3 text-sm text-gray-300">
                   {data.phone && (
                      <div>
                         <div className="font-bold text-white mb-0.5">Phone</div>
                         {data.phone}
                      </div>
                   )}
                   {data.email && (
                      <div>
                         <div className="font-bold text-white mb-0.5">Email</div>
                         <div className="break-words">{data.email}</div>
                      </div>
                   )}
                   {(data.city || data.country) && (
                      <div>
                         <div className="font-bold text-white mb-0.5">Address</div>
                         {data.city}, {data.country}
                      </div>
                   )}
                </div>
             </section>

             {/* Education */}
             {data.education.length > 0 && (
                <section>
                   <h2 className="text-xl font-bold border-b border-white/20 pb-2 mb-4">Education</h2>
                   <div className="space-y-4 text-sm">
                      {data.education.map(edu => (
                         <div key={edu.id}>
                            <div className="text-gray-300 mb-1">{edu.startDate} - {edu.endDate}</div>
                            <div className="font-bold text-white leading-tight mb-1">{edu.degree}</div>
                            <div className="text-gray-300">{edu.school}</div>
                         </div>
                      ))}
                   </div>
                </section>
             )}

             {/* Expertise */}
             {data.skills.length > 0 && (
                <section>
                   <h2 className="text-xl font-bold border-b border-white/20 pb-2 mb-4">Expertise</h2>
                   <ul className="space-y-2 text-sm text-gray-300">
                      {data.skills.map(skill => (
                         <li key={skill} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span> {skill}
                         </li>
                      ))}
                   </ul>
                </section>
             )}
          </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 p-10 bg-white text-gray-800">
          <header className="mb-12">
             <h1 className={`${nameSizeClass} font-bold mb-2 break-words`} style={{ color: accentColor }}>{data.firstName} {data.lastName}</h1>
             <p className="text-2xl font-medium tracking-wide text-gray-500 uppercase">{data.jobTitle}</p>
             {data.summary && (
                <p className="mt-6 text-sm leading-relaxed text-gray-600 text-justify">
                   {data.summary}
                </p>
             )}
          </header>

          <section>
             <h2 className="text-2xl font-bold pb-2 mb-6" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                Experience
             </h2>
             <div className="space-y-8">
                {data.experience.map(exp => (
                   <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-white" style={{ borderColor: accentColor }}></div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{exp.startDate} - {exp.endDate}</h3>
                      <div className="text-md font-bold text-gray-600 mb-1">{exp.employer}</div>
                      <div className="text-md font-semibold mb-2" style={{ color: accentColor }}>{exp.jobTitle}</div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                         {exp.description}
                      </p>
                   </div>
                ))}
             </div>
          </section>

          {data.projects && data.projects.length > 0 && (
             <section className="mt-10">
                <h2 className="text-2xl font-bold pb-2 mb-6" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                   Projects
                </h2>
                <div className="grid grid-cols-1 gap-6">
                   {data.projects.map(proj => (
                      <div key={proj.id}>
                         <h3 className="font-bold text-gray-800">{proj.title}</h3>
                         <p className="text-sm text-gray-600">{proj.description}</p>
                      </div>
                   ))}
                </div>
             </section>
          )}
       </div>
    </div>
  );
};

export default DarkSidebarTemplate;
