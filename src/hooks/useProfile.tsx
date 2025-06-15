
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
    fetchDemoProfile();
  }, []);

  const fetchDemoProfile = async () => {
    try {
      setLoading(true);
      
      // Create demo profile data since database constraints prevent direct insertion
      const demoProfile: StudentProfile = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        roll_number: 'CS2021001',
        name: 'Alex Thompson',
        email: 'alex.thompson@student.university.edu',
        department: 'Computer Science',
        year: 3,
        phone: '+1-555-9876',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        class_id: 'c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setStudentData(demoProfile);

      // Try to fetch class information from database
      try {
        const { data: classData, error: classError } = await supabase
          .from('classes')
          .select('*')
          .eq('id', demoProfile.class_id)
          .single();

        if (!classError && classData) {
          setClassInfo(classData);
        } else {
          // Fallback to demo class data
          setClassInfo({
            id: 'c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
            name: 'Computer Science - 3rd Year',
            section: 'A',
            year: 3
          });
        }
      } catch (classError) {
        console.log('Using demo class data due to database issue');
        // Fallback to demo class data
        setClassInfo({
          id: 'c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
          name: 'Computer Science - 3rd Year',
          section: 'A',
          year: 3
        });
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Using demo profile data');
      
      // Fallback profile if everything fails
      setStudentData({
        id: '550e8400-e29b-41d4-a716-446655440000',
        roll_number: 'CS2021001',
        name: 'Alex Thompson',
        email: 'alex.thompson@student.university.edu',
        department: 'Computer Science',
        year: 3,
        phone: '+1-555-9876',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        class_id: 'c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      setClassInfo({
        id: 'c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
        name: 'Computer Science - 3rd Year',
        section: 'A',
        year: 3
      });
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
