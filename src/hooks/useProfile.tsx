
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
      // Always use dummy data
      setStudentData(dummyStudent);
      setClassInfo(dummyClassInfo);
    } catch (error) {
      console.error('Error fetching student profile:', error);
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
