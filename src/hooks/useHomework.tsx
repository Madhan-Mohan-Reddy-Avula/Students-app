
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { dummyHomework } from '@/data/dummyData';

interface HomeworkAssignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  due_date: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export const useHomework = () => {
  const [homework, setHomework] = useState<HomeworkAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomework();
  }, []);

  const fetchHomework = async () => {
    try {
      setLoading(true);
      // Always use dummy data
      setHomework(dummyHomework);
    } catch (error) {
      console.error('Error:', error);
      setHomework(dummyHomework);
    } finally {
      setLoading(false);
    }
  };

  return {
    homework,
    loading,
    refetch: fetchHomework
  };
};
