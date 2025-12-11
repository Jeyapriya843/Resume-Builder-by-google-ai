
import React from 'react';
import { ResumeData } from '../../types';
import { Icons } from '../ui/Icons';

interface TemplateProps {
  data: ResumeData;
}

const PhotoSidebarTemplate: React.FC<TemplateProps> = ({ data }) => {
  const fontFamily = data.fontFamily || 'Poppins';

  return (
    <div className="bg-white w-[21cm] h-[29.7cm] overflow-hidden flex text-gray-800" style={{ fontFamily: `'${fontFamily}', sans-serif` }}>
      {/* Left Sidebar (Light Blue/Gray) */}
      <div className="w-[7.5cm] bg-[#dfe6ed] flex flex-col p-8 pt-12 relative">
         {/* Circular Photo Placeholder Overlay */}
         <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-40 h-40 bg-gray-300 rounded-full border-4 border-white overflow-hidden flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-500">{data.firstName?.[0]}</span>
            </div>
         </div>
         
         {/* Spacer for photo */}
         <div className="h-32"></div>

         <div className="space-y-8 mt-8">
            {/* Contact */}
            <div className="space-y-3 text-xs text-gray-600">
               {data.phone && (
                  <div className="flex items-center gap-3">
                     <Icons.Phone size={16} className="text-gray-700" />
                     <span>{data.phone}</span>
                  </div>
               )}
               {data.email && (
                  <div className="flex items-center gap-3">
                     <Icons.Mail size={16} className="text-gray-700" />
                     <span className="break-all">{data.email}</span>
                  </div>
               )}
               {(data.city || data.country) && (
                  <div className="flex items-center gap-3">
                     <Icons.MapPin size={16} className="text-gray-700" />
                     <span>{data.city}, {data.country}</span>
                  </div>
               )}
            </div>

            {/* Education */}
            {data.education.length > 0 && (
               <section>
                  <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-400 pb-1">Education</h2>
                  <div className="space-y-4">
                     {data.education.map(edu => (
                        <div key={edu.id}>
                           <h3 className="font-bold text-sm text-gray-700">{edu.degree}</h3>
                           <div className="text-xs font-semibold text-gray-600">{edu.school}</div>
                           <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
               <section>
                  <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-400 pb-1">Skills</h2>
                  <ul className="space-y-2 text-xs text-gray-600">
                     {data.skills.map(skill => (
                        <li key={skill} className="flex items-center gap-2">
                           <span className="w-1 h-1 bg-gray-600 rounded-full"></span> {skill}
                        </li>
                     ))}
                  </ul>
               </section>
            )}

            {/* Languages */}
            <section>
               <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-400 pb-1">Language</h2>
               <ul className="space-y-2 text-xs text-gray-600">
                  <li>English</li>
                  <li>French</li>
               </ul>
            </section>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
         {/* Top Banner Area */}
         <div className="h-[5cm] bg-[#d0dde7] flex flex-col justify-center px-10 pl-20 relative">
             {/* Offset for the sidebar photo */}
             <h1 className="text-4xl font-bold text-[#4a4a4a] uppercase tracking-widest mb-2">
                {data.firstName} {data.lastName}
             </h1>
             <p className="text-xl font-medium text-[#4a4a4a] tracking-wide">
                {data.jobTitle}
             </p>
         </div>

         <div className="p-10 pt-8 space-y-8">
            {/* About Me */}
            {data.summary && (
               <section>
                  <h2 className="text-2xl font-medium text-[#4a4a4a] mb-4 border-b border-gray-300 pb-2">About Me</h2>
                  <p className="text-sm leading-relaxed text-gray-600 text-justify">
                     {data.summary}
                  </p>
               </section>
            )}

            {/* Work Experience */}
            {data.experience.length > 0 && (
               <section>
                  <h2 className="text-2xl font-medium text-[#4a4a4a] mb-6 border-b border-gray-300 pb-2">Work Experience</h2>
                  <div className="space-y-6">
                     {data.experience.map(exp => (
                        <div key={exp.id}>
                           <div className="flex justify-between items-baseline mb-1">
                              <div className="font-bold text-gray-500 text-sm uppercase tracking-wide">{exp.startDate} - {exp.endDate}</div>
                           </div>
                           <h3 className="text-lg font-bold text-gray-700">{exp.jobTitle}</h3>
                           <div className="text-sm font-medium text-gray-500 mb-2">{exp.employer}</div>
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
                <h2 className="text-2xl font-medium text-[#4a4a4a] mb-6 border-b border-gray-300 pb-2">References</h2>
                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <h4 className="font-bold text-sm text-gray-800">Estelle Darcy</h4>
                      <p className="text-xs text-gray-500">Wardiere Inc. / CEO</p>
                      <p className="text-xs text-gray-500">123-456-7890</p>
                   </div>
                   <div>
                      <h4 className="font-bold text-sm text-gray-800">Harper Russo</h4>
                      <p className="text-xs text-gray-500">Wardiere Inc. / CEO</p>
                      <p className="text-xs text-gray-500">123-456-7890</p>
                   </div>
                </div>
            </section>
         </div>
      </div>
    </div>
  );
};

export default PhotoSidebarTemplate;
