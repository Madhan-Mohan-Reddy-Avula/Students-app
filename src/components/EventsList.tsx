
import React from 'react';
import { Calendar } from 'lucide-react';
import EventCard from './EventCard';

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

interface EventsListProps {
  events: Event[];
  loading: boolean;
  getDaysUntilEvent: (eventDate: string) => number;
  getCategoryColor: (category: string) => string;
  onEventClick: (event: Event) => void;
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  loading,
  getDaysUntilEvent,
  getCategoryColor,
  onEventClick
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No events scheduled</h3>
        <p className="text-gray-600">School events will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {events.map((event) => {
        const daysUntil = getDaysUntilEvent(event.event_date);
        const categoryColor = getCategoryColor(event.category);
        
        return (
          <EventCard
            key={event.id}
            event={event}
            daysUntil={daysUntil}
            categoryColor={categoryColor}
            onEventClick={onEventClick}
          />
        );
      })}
    </div>
  );
};

export default EventsList;
