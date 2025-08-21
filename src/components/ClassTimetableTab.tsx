
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { dummyTimetable } from '@/data/dummyData';

interface TimetableEntry {
  id: string;
  day_of_week: string | number;
  start_time: string;
  end_time: string;
  room_location?: string;
  room?: string;
  teacher: string;
  subject?: string;
  subjects?: {
    name: string;
  };
  faculty?: {
    name: string;
  };
}

const ClassTimetableTab = () => {
  const [timetableData, setTimetableData] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      
      // Check if user is logged in
      const currentUser = localStorage.getItem('currentUser');
      
      if (currentUser) {
        // User is logged in - fetch real data
        const { data, error } = await supabase
          .from('timetable')
          .select('*')
          .order('day_of_week')
          .order('start_time');

        if (error) {
          console.error('Error fetching timetable:', error);
          toast.error('Failed to load timetable');
          setTimetableData(dummyTimetable);
          return;
        }

        setTimetableData(data || []);
      } else {
        // User not logged in - use dummy data
        setTimetableData(dummyTimetable);
      }
    } catch (error) {
      console.error('Error:', error);
      setTimetableData(dummyTimetable);
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (dayNumber: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber] || 'Unknown';
  };

  const getDayNumberFromName = (dayName: string): number => {
    const dayMap: { [key: string]: number } = {
      'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5,
      'sunday': 0, 'saturday': 6
    };
    return dayMap[dayName.toLowerCase()] || 0;
  };

  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(':');
      const hour24 = parseInt(hours);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 >= 12 ? 'PM' : 'AM';
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  // Group timetable entries by time slots
  const timeSlots = Array.from(new Set(timetableData.map(entry => 
    `${entry.start_time}-${entry.end_time}`
  ))).sort();

  // Create a matrix for the timetable
  const createTimetableMatrix = () => {
    const matrix: { [key: string]: { [key: number]: TimetableEntry } } = {};
    
    timetableData.forEach(entry => {
      const timeSlot = `${entry.start_time}-${entry.end_time}`;
      if (!matrix[timeSlot]) {
        matrix[timeSlot] = {};
      }
      // Handle both string and number day formats
      const dayNumber = typeof entry.day_of_week === 'string' 
        ? getDayNumberFromName(entry.day_of_week)
        : entry.day_of_week;
      if (dayNumber >= 1 && dayNumber <= 5) {
        matrix[timeSlot][dayNumber] = entry;
      }
    });
    
    return matrix;
  };

  const timetableMatrix = createTimetableMatrix();

  if (loading) {
    return (
      <div className="card-3d p-6 animate-fade-in">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading timetable...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card-3d p-6 animate-fade-in">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Weekly Class Schedule</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-purple-700">TIME</TableHead>
                <TableHead className="font-bold text-purple-700">MONDAY</TableHead>
                <TableHead className="font-bold text-purple-700">TUESDAY</TableHead>
                <TableHead className="font-bold text-purple-700">WEDNESDAY</TableHead>
                <TableHead className="font-bold text-purple-700">THURSDAY</TableHead>
                <TableHead className="font-bold text-purple-700">FRIDAY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeSlots.map((timeSlot) => {
                const [startTime, endTime] = timeSlot.split('-');
                return (
                  <TableRow key={timeSlot} className="hover:bg-purple-50">
                    <TableCell className="font-medium text-purple-600">
                      {formatTime(startTime)} - {formatTime(endTime)}
                    </TableCell>
                    {[1, 2, 3, 4, 5].map((dayNum) => {
                      const entry = timetableMatrix[timeSlot]?.[dayNum];
                      const subject = entry?.subjects?.name || entry?.subject || 'No Subject';
                      const teacher = entry?.faculty?.name || entry?.teacher || 'No Teacher';
                      const room = entry?.room_location || entry?.room || '';
                      
                      return (
                        <TableCell key={dayNum} className="font-semibold text-gray-800">
                          {entry ? (
                            <div className="space-y-1">
                              <div className="font-bold">{subject}</div>
                              <div className="text-sm text-gray-600">{teacher}</div>
                              {room && <div className="text-xs text-gray-500">{room}</div>}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        {timetableData.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No timetable data</h3>
            <p className="text-gray-600">Class schedule will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassTimetableTab;
