
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { dummyStudent, dummyClassInfo } from '@/data/dummyData';

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

export const useProfile = () => {
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentStudent();
  }, []);

  const fetchCurrentStudent = async () => {
    try {
      setLoading(true);
      
      // Try to get current user from localStorage first
      const currentUser = localStorage.getItem('currentUser');
      
      if (currentUser) {
        const profile = JSON.parse(currentUser);
        console.log('Loaded profile from localStorage:', profile);
        setStudentData(profile);

        // Fetch class information if class_id exists
        if (profile.class_id) {
          try {
            const { data: classData, error: classError } = await supabase
              .from('classes')
              .select('*')
              .eq('id', profile.class_id)
              .single();

            if (!classError && classData) {
              setClassInfo(classData);
            }
          } catch (classError) {
            console.log('Error fetching class info:', classError);
          }
        }
      } else {
        // Use dummy data when not logged in
        console.log('Using dummy data for preview');
        setStudentData(dummyStudent);
        setClassInfo(dummyClassInfo);
      }

    } catch (error) {
      console.error('Error fetching student profile:', error);
      // Fallback to dummy data on error
      setStudentData(dummyStudent);
      setClassInfo(dummyClassInfo);
    } finally {
      setLoading(false);
    }
  };

  return {
    studentData,
    classInfo,
    loading,
    user
  };
};
