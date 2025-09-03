import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TimetableEntry {
  id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  room: string;
  faculty: string;
  subject: string;
  class_id: string;
  created_at: string;
}

export const useTimetable = () => {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      
      const currentClassId = localStorage.getItem('currentClassId') || 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      console.log('Fetching timetable for class:', currentClassId);
      
      const { data, error } = await supabase
        .from('class_timetable')
        .select('*')
        .eq('class_id', currentClassId)
        .order('day_of_week', { ascending: true })
        .order('start_time', { ascending: true });

      console.log('Timetable response:', { data, error });

      if (error) {
        console.error('Error fetching timetable:', error);
        toast.error('Failed to load class timetable');
        setTimetable([]);
        return;
      }

      console.log('Setting timetable data:', data);
      setTimetable(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      setTimetable([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    timetable,
    loading,
    refetch: fetchTimetable
  };
};