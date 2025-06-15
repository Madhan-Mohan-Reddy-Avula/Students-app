
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
    fetchStudentProfiles();
  }, []);

  const fetchStudentProfiles = async () => {
    try {
      setLoading(true);
      
      // Fetch all student profiles from the database
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: true });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        toast.error('Error loading student profiles');
        return;
      }

      if (profiles && profiles.length > 0) {
        // Use the first profile as the current student
        const currentProfile = profiles[0];
        console.log('Loaded profile:', currentProfile);
        
        setStudentData(currentProfile);

        // Fetch class information if class_id exists
        if (currentProfile.class_id) {
          try {
            const { data: classData, error: classError } = await supabase
              .from('classes')
              .select('*')
              .eq('id', currentProfile.class_id)
              .single();

            if (!classError && classData) {
              setClassInfo(classData);
            } else {
              console.log('No class found for class_id:', currentProfile.class_id);
            }
          } catch (classError) {
            console.log('Error fetching class info:', classError);
          }
        }
      } else {
        console.log('No profiles found in database');
        toast.error('No student profiles found');
      }

    } catch (error) {
      console.error('Error fetching student profiles:', error);
      toast.error('Failed to load student data');
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
