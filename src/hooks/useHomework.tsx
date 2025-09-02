
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface HomeworkAssignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  due_date: string;
  assigned_date: string;
  status: string;
  class_id: string;
  created_at: string;
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
      
      const currentClassId = localStorage.getItem('currentClassId') || 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      
      const { data, error } = await supabase
        .from('homework_assignments')
        .select('*')
        .eq('class_id', currentClassId)
        .order('due_date', { ascending: true });

      if (error) {
        console.error('Error fetching homework:', error);
        toast.error('Failed to load homework assignments');
        setHomework([]);
        return;
      }

      setHomework(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      setHomework([]);
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
