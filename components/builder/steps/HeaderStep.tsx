import React from 'react';
import { useResume } from '../../../App';
import { useNavigate } from 'react-router-dom';

const HeaderStep: React.FC = () => {
  const { resumeData, updateField } = useResume();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Personal Information</h2>
        <p className="text-gray-500">Add your contact details so recruiters can reach you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input 
            type="text" 
            value={resumeData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="e.g. John"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input 
            type="text" 
            value={resumeData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="e.g. Doe"
          />
        </div>

        {/* Job Title */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Job Title</label>
          <input 
            type="text" 
            value={resumeData.jobTitle}
            onChange={(e) => updateField('jobTitle', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="e.g. Senior Frontend Engineer"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            value={resumeData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input 
            type="tel" 
            value={resumeData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="+1 234 567 890"
          />
        </div>
        
        {/* City */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">City</label>
          <input 
            type="text" 
            value={resumeData.city}
            onChange={(e) => updateField('city', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="New York"
          />
        </div>

        {/* Country */}
         <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Country</label>
          <input 
            type="text" 
            value={resumeData.country}
            onChange={(e) => updateField('country', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="USA"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button 
          onClick={() => navigate('/builder/experience')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default HeaderStep;