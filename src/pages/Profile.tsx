
import React, { useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileInfoSection from '@/components/ProfileInfoSection';
import StudentSelector from '@/components/StudentSelector';
import { User } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

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

const Profile = () => {
  const { studentData: defaultStudent, classInfo: defaultClass, loading } = useProfile();
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);

  // Use selected student or default to the first student from the hook
  const currentStudent = selectedStudent || defaultStudent;
  const currentClass = selectedClass || defaultClass;

  const handleStudentSelect = async (student: StudentProfile) => {
    setSelectedStudent(student);
    
    // Fetch class info for selected student
    if (student.class_id) {
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const { data: classData, error } = await supabase
          .from('classes')
          .select('*')
          .eq('id', student.class_id)
          .single();

        if (!error && classData) {
          setSelectedClass(classData);
        } else {
          setSelectedClass(null);
        }
      } catch (error) {
        console.error('Error fetching class:', error);
        setSelectedClass(null);
      }
    } else {
      setSelectedClass(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <NavigationHeader title="Profile" subtitle="Student Information" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profiles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="Profile" subtitle="Student Information" />
      
      <div className="max-w-6xl mx-auto p-6">
        <StudentSelector 
          onStudentSelect={handleStudentSelect}
          selectedStudentId={currentStudent?.id}
        />
        
        {currentStudent ? (
          <>
            <ProfileHeader studentData={currentStudent} classInfo={currentClass} />
            <ProfileInfoSection studentData={currentStudent} classInfo={currentClass} />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No profiles found</h3>
            <p className="text-gray-600">No student profile data available in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
