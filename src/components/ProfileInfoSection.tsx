
import React from 'react';
import { User, Phone, GraduationCap, Shield } from 'lucide-react';
import InfoCard from './InfoCard';
import InfoRow from './InfoRow';

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

interface ProfileInfoSectionProps {
  studentData: StudentProfile;
  classInfo: ClassInfo | null;
}

const ProfileInfoSection = ({ studentData, classInfo }: ProfileInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Personal Information */}
      <InfoCard title="Personal Information" icon={User}>
        <div className="space-y-2">
          <InfoRow label="Full Name" value={studentData.name} />
          <InfoRow label="Roll Number" value={studentData.roll_number} />
          <InfoRow label="Email ID" value={studentData.email} />
          <InfoRow label="Phone Number" value={studentData.phone || 'Not provided'} />
          <InfoRow label="Department" value={studentData.department} />
          <InfoRow label="Year" value={studentData.year.toString()} />
          <InfoRow label="Student ID" value={studentData.id} />
        </div>
      </InfoCard>

      {/* Academic Information */}
      <InfoCard title="Academic Information" icon={GraduationCap}>
        <div className="space-y-2">
          <InfoRow label="Department" value={studentData.department} />
          <InfoRow label="Year" value={`Year ${studentData.year}`} />
          <InfoRow label="Class" value={classInfo?.name || 'Not assigned'} />
          <InfoRow label="Section" value={classInfo?.section || 'Not assigned'} />
          <InfoRow label="Roll Number" value={studentData.roll_number} />
          <InfoRow label="Student ID" value={studentData.id.substring(0, 8)} />
        </div>
      </InfoCard>

      {/* Contact Information */}
      <InfoCard title="Contact Information" icon={Phone}>
        <div className="space-y-2">
          <InfoRow label="Email Address" value={studentData.email} />
          <InfoRow label="Phone Number" value={studentData.phone || 'Not provided'} />
          <InfoRow label="Emergency Contact" value="Not available" />
        </div>
      </InfoCard>

      {/* Account Information */}
      <InfoCard title="Account Information" icon={Shield}>
        <div className="space-y-2">
          <InfoRow label="Account Created" value={new Date(studentData.created_at).toLocaleDateString()} />
          <InfoRow label="Last Updated" value={new Date(studentData.updated_at).toLocaleDateString()} />
          <InfoRow label="Profile Status" value="Active" />
        </div>
      </InfoCard>
    </div>
  );
};

export default ProfileInfoSection;
