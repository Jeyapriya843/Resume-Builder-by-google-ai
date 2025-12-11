
import React from 'react';
import { ResumeData } from '../../types';
import { Icons } from '../ui/Icons';

interface TemplateProps {
  data: ResumeData;
}

const MinimalistTealTemplate: React.FC<TemplateProps> = ({ data }) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const nameSizeClass = fullName.length > 18 ? 'text-5xl' : 'text-6xl';
  const fontFamily = data.fontFamily || 'Poppins';
  
  return (
    <div className="bg-white w-[21cm] h-[29.7cm] overflow-hidden flex flex-col p-12" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      {/* Header with Circular Photo */}
      <div className="flex items-center gap-10 mb-16">
         <div className="w-48 h-48 rounded-full bg-gray-200 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center text-4xl text-gray-400">
            {/* Photo Placeholder */}
            {data.firstName?.[0]}
         </div>
         <div className="flex-1">
            <h1 className={`${nameSizeClass} font-bold text-[#333] mb-2 tracking-tight break-words`}>
               {data.firstName} <br/> {data.lastName}
            </h1>
            <p className="text-2xl text-gray-600 font-light">
               {data.jobTitle}
            </p>
         </div>
      </div>

      <div className="flex gap-12">
         {/* Left Column */}
         <div className="w-1/3 space-y-12">
            {/* Contact */}
            <section>
               <h2 className="text-xl font-medium text-[#333] mb-6 uppercase tracking-wide">Contact</h2>
               <div className="space-y-4 text-sm text-gray-600">
                  {data.phone && <div className="flex items-center gap-3"><Icons.Phone size={16} /> {data.phone}</div>}
                  {data.email && <div className="flex items-center gap-3"><Icons.Mail size={16} /> <span className="break-all">{data.email}</span></div>}
                  {(data.city || data.country) && <div className="flex items-center gap-3"><Icons.MapPin size={16} /> {data.city}, {data.country}</div>}
               </div>
               <hr className="border-gray-300 mt-6 w-16" />
            </section>

            {/* Education */}
            {data.education.length > 0 && (
               <section>
                  <h2 className="text-xl font-medium text-[#333] mb-6 uppercase tracking-wide">Education</h2>
                  <div className="space-y-6">
                     {data.education.map(edu => (
                        <div key={edu.id}>
                           <h3 className="font-bold text-gray-800 text-sm">{edu.school}</h3>
                           <div className="text-xs text-gray-600 mb-1">{edu.degree}</div>
                           <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
                        </div>
                     ))}
                  </div>
                  <hr className="border-gray-300 mt-6 w-16" />
               </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
               <section>
                  <h2 className="text-xl font-medium text-[#333] mb-6 uppercase tracking-wide">Skills</h2>
                  <ul className="space-y-3 text-sm text-gray-600">
                     {data.skills.map(skill => (
                        <li key={skill} className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span> {skill}
                        </li>
                     ))}
                  </ul>
                  <hr className="border-gray-300 mt-6 w-16" />
               </section>
            )}
            
            {/* Language */}
            <section>
               <h2 className="text-xl font-medium text-[#333] mb-6 uppercase tracking-wide">Language</h2>
               <ul className="space-y-2 text-sm text-gray-600">
                  <li>English</li>
                  <li>German (Basics)</li>
               </ul>
               <hr className="border-gray-300 mt-6 w-16" />
            </section>
         </div>

         {/* Right Column */}
         <div className="w-2/3 space-y-12">
            {/* Summary */}
            {data.summary && (
               <section>
                  <div className="flex items-center gap-4 mb-6">
                     <h2 className="text-xl font-medium text-[#333] uppercase tracking-wide">Summary</h2>
                     <hr className="flex-1 border-gray-300" />
                  </div>
                  <p className="text-sm leading-loose text-gray-600 text-justify">
                     {data.summary}
                  </p>
               </section>
            )}

            {/* Work Experience */}
            {data.experience.length > 0 && (
               <section>
                  <div className="flex items-center gap-4 mb-8">
                     <h2 className="text-xl font-medium text-[#333] uppercase tracking-wide">Work Experience</h2>
                     <hr className="flex-1 border-gray-300" />
                  </div>
                  
                  <div className="space-y-8">
                     {data.experience.map(exp => (
                        <div key={exp.id}>
                           <div className="flex justify-between items-baseline mb-1">
                              <h3 className="font-bold text-gray-800 text-lg">{exp.jobTitle}</h3>
                              <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                           </div>
                           <div className="text-sm font-medium text-gray-600 mb-2 italic">{exp.employer}</div>
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

            {/* References */}
            <section>
               <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-xl font-medium text-[#333] uppercase tracking-wide">References</h2>
                  <hr className="flex-1 border-gray-300" />
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <h4 className="font-bold text-gray-800">Bailey Dupont</h4>
                     <p className="text-xs text-gray-500">Wardiere Inc. / CEO</p>
                     <p className="text-xs text-gray-500 mt-1">123-456-7890</p>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-800">Harumi Kobayashi</h4>
                     <p className="text-xs text-gray-500">Wardiere Inc. / CEO</p>
                     <p className="text-xs text-gray-500 mt-1">123-456-7890</p>
                  </div>
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};

export default MinimalistTealTemplate;
