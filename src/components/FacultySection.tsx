
import React from 'react';

interface Faculty {
  name: string;
  subject: string;
  department: string;
}

interface FacultySectionProps {
  facultyList: Faculty[];
}

const FacultySection = ({ facultyList }: FacultySectionProps) => {
  return (
    <div className="card-3d p-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Faculty Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facultyList.map((faculty, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-800 mb-1">{faculty.name}</h4>
            <p className="text-purple-600 font-medium">{faculty.subject}</p>
            <p className="text-sm text-gray-600">{faculty.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultySection;
