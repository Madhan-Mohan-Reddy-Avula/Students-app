
import React, { useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import EventInterestForm from '@/components/EventInterestForm';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

const SchoolEvents = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Annual Science Fair',
      date: '2024-06-28',
      time: '10:00 AM',
      location: 'Main Auditorium',
      category: 'Academic',
      description: 'Showcase your scientific projects and innovations. Prizes for best projects!',
      participants: '150+ students',
      featured: true
    },
    {
      id: 2,
      title: 'Sports Day',
      date: '2024-07-05',
      time: '08:00 AM',
      location: 'School Playground',
      category: 'Sports',
      description: 'Annual inter-house sports competition. All students are encouraged to participate.',
      participants: '200+ students',
      featured: false
    },
    {
      id: 3,
      title: 'Cultural Festival',
      date: '2024-07-12',
      time: '06:00 PM',
      location: 'School Auditorium',
      category: 'Cultural',
      description: 'Celebrate diversity with music, dance, and cultural performances.',
      participants: '100+ students',
      featured: true
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting',
      date: '2024-07-15',
      time: '02:00 PM',
      location: 'Classrooms',
      category: 'Academic',
      description: 'Individual meetings to discuss student progress and development.',
      participants: 'All parents',
      featured: false
    },
    {
      id: 5,
      title: 'Art Exhibition',
      date: '2024-07-20',
      time: '11:00 AM',
      location: 'Art Gallery',
      category: 'Cultural',
      description: 'Display of student artwork from the past semester.',
      participants: '50+ artists',
      featured: false
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic':
        return 'bg-blue-100 text-blue-800';
      case 'Sports':
        return 'bg-green-100 text-green-800';
      case 'Cultural':
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

  const handleEventClick = (event: typeof events[0]) => {
    setSelectedEvent(event);
  };

  const handleCloseForm = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="School Events" subtitle="Stay updated with school activities" />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid gap-6">
          {events.map((event) => {
            const daysUntil = getDaysUntilEvent(event.date);
            
            return (
              <div
                key={event.id}
                className={`card-3d p-6 cursor-pointer hover:shadow-lg transition-shadow ${event.featured ? 'border-l-4 border-l-purple-500' : ''} animate-fade-in`}
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {event.featured && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                      <h3 className="text-xl font-bold text-gray-800">
                        {event.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
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
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{event.participants}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {event.featured && (
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
        
        {events.length === 0 && (
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
