
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
    checkAuthAndFetchProfile();
  }, []);

  const checkAuthAndFetchProfile = async () => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No user is logged in, redirect to login page
        console.log('No authenticated user found, redirecting to login');
        navigate('/login');
        return;
      }

      setUser(session.user);
      console.log('Authenticated user found:', session.user);
      
      // Fetch user profile data
      await fetchStudentProfile();
      
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/login');
    }
  };

  const fetchStudentProfile = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll fetch the first profile
      // In a real app, this would be based on the authenticated user
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        toast.error('Failed to load profile data');
        return;
      }

      setStudentData(profile);

      // Fetch class information if class_id exists
      if (profile?.class_id) {
        const { data: classData, error: classError } = await supabase
          .from('classes')
          .select('*')
          .eq('id', profile.class_id)
          .single();

        if (!classError && classData) {
          setClassInfo(classData);
        }
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load profile data');
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
