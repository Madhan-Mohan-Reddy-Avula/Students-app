
import React from 'react';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

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

interface EventCardProps {
  event: Event;
  daysUntil: number;
  categoryColor: string;
  onEventClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  daysUntil, 
  categoryColor, 
  onEventClick 
}) => {
  return (
    <div
      className={`card-3d p-6 cursor-pointer hover:shadow-lg transition-shadow ${event.is_featured ? 'border-l-4 border-l-purple-500' : ''} animate-fade-in`}
      onClick={() => onEventClick(event)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {event.is_featured && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
            <h3 className="text-xl font-bold text-gray-800">
              {event.title}
            </h3>
            {event.category && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
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
};

export default EventCard;
