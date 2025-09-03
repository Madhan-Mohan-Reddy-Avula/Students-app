import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ExamEntry {
  id: string;
  subject: string;
  exam_date: string;
  start_time: string;
  end_time: string;
  room: string;
  exam_type: string;
  class_id: string;
  created_at: string;
}

export const useExamTimetable = () => {
  const [exams, setExams] = useState<ExamEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      
      const currentClassId = localStorage.getItem('currentClassId') || 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      
      const { data, error } = await supabase
        .from('exam_timetable')
        .select('*')
        .eq('class_id', currentClassId)
        .order('exam_date', { ascending: true });

      if (error) {
        console.error('Error fetching exam timetable:', error);
        toast.error('Failed to load exam timetable');
        setExams([]);
        return;
      }

      setExams(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    exams,
    loading,
    refetch: fetchExams
  };
};