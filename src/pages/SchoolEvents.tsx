
import React, { useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import EventInterestForm from '@/components/EventInterestForm';
import EventsList from '@/components/EventsList';
import { useEvents } from '@/hooks/useEvents';

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
  const { events, loading, getDaysUntilEvent, getCategoryColor } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseForm = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="School Events" subtitle="Stay updated with school activities" />
      
      <div className="max-w-6xl mx-auto p-6">
        <EventsList
          events={events}
          loading={loading}
          getDaysUntilEvent={getDaysUntilEvent}
          getCategoryColor={getCategoryColor}
          onEventClick={handleEventClick}
        />
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
