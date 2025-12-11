
import React from 'react';
import { ResumeData } from '../../types';
import { Icons } from '../ui/Icons';

interface TemplateProps {
  data: ResumeData;
}

const ElegantSerifTemplate: React.FC<TemplateProps> = ({ data }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 18 ? 'text-5xl leading-tight' : 'text-6xl';
  const accentColor = data.accentColor || '#8a9a8b';
  const headerColor = data.accentColor || '#4a5d4b';
  const fontFamily = data.fontFamily || 'Poppins';

  return (
    <div className="bg-white w-[21cm] h-[29.7cm] overflow-hidden text-gray-700 flex flex-col" style={{ fontFamily: `'${fontFamily}', serif` }}>
      {/* Top Split Header */}
      <div className="flex h-[8cm]">
         {/* Photo Box Left */}
         <div className="w-[8cm] h-full relative overflow-hidden" style={{ backgroundColor: accentColor }}>
             {/* Image placeholder - full cover */}
             <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white/30 text-6xl">
                {data.firstName?.[0]}
             </div>
         </div>
         {/* Name Box Right */}
         <div className="flex-1 bg-[#e8e8e3] flex flex-col justify-center px-12">
             <h1 className={`${nameSizeClass} font-bold mb-2 leading-tight break-words`} style={{ color: headerColor }}>
                {data.firstName}<br/>{data.lastName}
             </h1>
             <p className="text-xl tracking-[0.2em] uppercase text-gray-500">
                {data.jobTitle}
             </p>
         </div>
      </div>

      <div className="flex flex-1">
         {/* Left Sidebar (Green/Gray) */}
         <div className="w-[8cm] text-white p-8 space-y-10" style={{ backgroundColor: accentColor }}>
            {/* Profile */}
            <section>
               <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 border-b border-white/30 pb-2">Profile</h2>
               <p className="text-sm leading-relaxed text-white/90 text-justify">
                  {data.summary || "IT Project manager with holistic knowledge of software development..."}
               </p>
            </section>

            {/* Skills */}
            {data.skills.length > 0 && (
               <section>
                  <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 border-b border-white/30 pb-2">Skills</h2>
                  <ul className="space-y-2 text-sm text-white/90">
                     {data.skills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-white rounded-full"></span> {skill}
                        </li>
                     ))}
                  </ul>
               </section>
            )}

            {/* Awards / Additional */}
            <section>
               <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 border-b border-white/30 pb-2">Awards</h2>
               <ul className="space-y-4 text-sm text-white/90">
                  <li>
                     <div className="font-bold">Most Outstanding Employee</div>
                     <div className="text-xs opacity-80">The Year, Pixelpoint Hive (2015)</div>
                  </li>
               </ul>
            </section>
            
            {/* Contact Footer in Sidebar */}
            <div className="pt-10 space-y-3 text-sm font-sans text-white/90">
               {data.phone && <div className="flex items-center gap-2"><Icons.Phone size={14}/> {data.phone}</div>}
               {data.email && <div className="flex items-center gap-2"><Icons.Mail size={14}/> {data.email}</div>}
               {(data.city || data.country) && <div className="flex items-center gap-2"><Icons.Globe size={14}/> {data.city}</div>}
            </div>
         </div>

         {/* Right Content */}
         <div className="flex-1 bg-[#fcfcfc] p-10 space-y-10">
            {/* Work Experience */}
            {data.experience.length > 0 && (
               <section>
                  <h2 className="text-2xl font-bold text-[#6b706b] uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">
                     Work Experience
                  </h2>
                  <div className="space-y-8">
                     {data.experience.map(exp => (
                        <div key={exp.id}>
                           <h3 className="text-xl font-bold" style={{ color: headerColor }}>{exp.jobTitle}</h3>
                           <div className="text-sm text-gray-500 italic mb-2">
                              {exp.employer} | {exp.startDate} - {exp.endDate}
                           </div>
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

            {/* Educational History */}
            {data.education.length > 0 && (
               <section>
                  <h2 className="text-2xl font-bold text-[#6b706b] uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">
                     Educational History
                  </h2>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id}>
                           <h3 className="text-lg font-bold text-gray-700">{edu.school}</h3>
                           <div className="text-sm text-gray-500 italic mb-1">{edu.degree} | {edu.startDate} - {edu.endDate}</div>
                           <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed">
                              <li>Studied {edu.fieldOfStudy}</li>
                           </ul>
                        </div>
                     ))}
                  </div>
               </section>
            )}
         </div>
      </div>
    </div>
  );
};

export default ElegantSerifTemplate;
