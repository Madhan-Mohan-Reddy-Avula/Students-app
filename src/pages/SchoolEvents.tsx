
import React, { useState, useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import EventInterestForm from '@/components/EventInterestForm';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  location: string;
  category: string;
  participants_info: string;
  is_featured: boolean;
}

const SchoolEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
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

  const getDaysUntilEvent = (eventDate: string) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseForm = () => {
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <NavigationHeader title="School Events" subtitle="Stay updated with school activities" />
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="School Events" subtitle="Stay updated with school activities" />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid gap-6">
          {events.map((event) => {
            const daysUntil = getDaysUntilEvent(event.event_date);
            
            return (
              <div
                key={event.id}
                className={`card-3d p-6 cursor-pointer hover:shadow-lg transition-shadow ${event.is_featured ? 'border-l-4 border-l-purple-500' : ''} animate-fade-in`}
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {event.is_featured && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                      <h3 className="text-xl font-bold text-gray-800">
                        {event.title}
                      </h3>
                      {event.category && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                          <span className="text-sm text-purple-600">
                            {daysUntil === 0 
                              ? '(Today)' 
                              : daysUntil === 1 
                                ? '(Tomorrow)' 
                                : daysUntil > 0 
                                  ? `(${daysUntil} days)`
                                  : '(Past)'
                            }
                          </span>
                        </div>
                        {event.start_time && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{event.start_time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.participants_info && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{event.participants_info}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {event.is_featured && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-purple-800 font-medium">Featured Event</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-purple-600 font-medium">
                    Click to express interest in this event
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {events.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No events scheduled</h3>
            <p className="text-gray-600">School events will appear here.</p>
          </div>
        )}
      </div>

      {/* Interest Form Modal */}
      {selectedEvent && (
        <EventInterestForm
          event={selectedEvent}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default SchoolEvents;
