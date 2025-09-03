
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  start_time?: string;
  location: string;
  category: string;
  participants_info?: string;
  is_featured?: boolean;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('school_events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
        setEvents([]);
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const getDaysUntilEvent = (eventDate: string) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'sports':
        return 'bg-green-100 text-green-800';
      case 'cultural':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return {
    events,
    loading,
    getDaysUntilEvent,
    getCategoryColor
  };
};
