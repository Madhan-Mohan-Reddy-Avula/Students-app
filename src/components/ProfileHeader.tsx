
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StudentProfile {
  id: string;
  roll_number: string;
  name: string;
  email: string;
  department: string;
  year: number;
  phone?: string;
  avatar_url?: string;
  class_id?: string;
  created_at: string;
  updated_at: string;
}

interface ClassInfo {
  id: string;
  name: string;
  section?: string;
  year: number;
}

interface ProfileHeaderProps {
  studentData: StudentProfile;
  classInfo: ClassInfo | null;
}

const ProfileHeader = ({ studentData, classInfo }: ProfileHeaderProps) => {
  return (
    <div className="card-3d p-8 mb-8 animate-fade-in">
      <div className="flex items-center space-x-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={studentData.avatar_url} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-2xl">
            {studentData.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {studentData.name}
          </h2>
          <p className="text-purple-600 font-medium text-lg">
            {classInfo ? `${classInfo.name} - Section ${classInfo.section || 'A'}` : `Year ${studentData.year}`}
          </p>
          <p className="text-gray-600">
            {studentData.department} Department
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Roll Number: {studentData.roll_number}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
