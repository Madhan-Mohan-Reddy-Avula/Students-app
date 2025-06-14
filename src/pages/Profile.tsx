
import React from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileInfoSection from '@/components/ProfileInfoSection';
import { User } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

const Profile = () => {
  const { studentData, classInfo, loading } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <NavigationHeader title="Profile" subtitle="Student Information" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <NavigationHeader title="Profile" subtitle="Student Information" />
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No profile found</h3>
          <p className="text-gray-600">Unable to load student profile data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="Profile" subtitle="Student Information" />
      
      <div className="max-w-6xl mx-auto p-6">
        <ProfileHeader studentData={studentData} classInfo={classInfo} />
        <ProfileInfoSection studentData={studentData} classInfo={classInfo} />
      </div>
    </div>
  );
};

export default Profile;
