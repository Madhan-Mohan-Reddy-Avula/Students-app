
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
        // No user is logged in, fetch demo data instead
        console.log('No authenticated user found, using demo profile data');
        await fetchDemoProfile();
        return;
      }

      setUser(session.user);
      console.log('Authenticated user found:', session.user);
      
      // Fetch user profile data
      await fetchStudentProfile(session.user.id);
      
    } catch (error) {
      console.error('Auth check error:', error);
      // Fallback to demo data if there's an error
      await fetchDemoProfile();
    }
  };

  const fetchDemoProfile = async () => {
    try {
      setLoading(true);
      
      // Fetch the first profile for demo purposes
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      if (profileError) {
        console.error('Error fetching demo profile:', profileError);
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

  const fetchStudentProfile = async (userId: string) => {
    try {
      setLoading(true);
      
      // Fetch the authenticated user's profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        // If user profile doesn't exist, fall back to demo data
        await fetchDemoProfile();
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
      // Fallback to demo data
      await fetchDemoProfile();
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
