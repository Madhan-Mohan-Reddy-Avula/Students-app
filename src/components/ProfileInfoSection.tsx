
import React from 'react';
import { Mail, Phone, Calendar, GraduationCap, MapPin, User } from 'lucide-react';
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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information */}
      <InfoCard title="Personal Information" icon={User}>
        <div className="space-y-3">
          <InfoRow label="Full Name" value={studentData.name} />
          <InfoRow label="Roll Number" value={studentData.roll_number} />
          <InfoRow label="Email" value={studentData.email} />
          <InfoRow label="Phone" value={studentData.phone || 'Not provided'} />
          <InfoRow label="Department" value={studentData.department} />
          <InfoRow label="Academic Year" value={`Year ${studentData.year}`} />
        </div>
      </InfoCard>

      {/* Academic Information */}
      <InfoCard title="Academic Information" icon={GraduationCap}>
        <div className="space-y-3">
          <InfoRow 
            label="Class" 
            value={classInfo ? `${classInfo.name}` : `Year ${studentData.year}`} 
          />
          <InfoRow 
            label="Section" 
            value={classInfo?.section || 'A'} 
          />
          <InfoRow label="Department" value={studentData.department} />
          <InfoRow label="Student ID" value={studentData.id.substring(0, 8) + '...'} />
        </div>
      </InfoCard>

      {/* Contact Information */}
      <InfoCard title="Contact Details" icon={Mail}>
        <div className="space-y-3">
          <InfoRow label="Email Address" value={studentData.email} />
          <InfoRow label="Phone Number" value={studentData.phone || 'Not provided'} />
          <InfoRow label="Emergency Contact" value="Not configured" />
          <InfoRow label="Preferred Contact" value="Email" />
        </div>
      </InfoCard>

      {/* Account Information */}
      <InfoCard title="Account Information" icon={Calendar}>
        <div className="space-y-3">
          <InfoRow label="Account Created" value={formatDate(studentData.created_at)} />
          <InfoRow label="Last Updated" value={formatDate(studentData.updated_at)} />
          <InfoRow label="Profile Status" value="Active" />
          <InfoRow label="Verification Status" value="Verified" />
        </div>
      </InfoCard>
    </div>
  );
};

export default ProfileInfoSection;
