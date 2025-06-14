
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen } from 'lucide-react';

interface Period {
  time: string;
  subject: string;
  faculty: string;
}

interface DaySchedule {
  day: string;
  date: string;
  periods: Period[];
}

interface ClassTimetableTabProps {
  classSchedule: DaySchedule[];
}

const ClassTimetableTab = ({ classSchedule }: ClassTimetableTabProps) => {
  // Extract unique time slots
  const timeSlots = Array.from(new Set(classSchedule[0].periods.map(period => period.time)));

  // Create a matrix for the timetable
  const createTimetableMatrix = () => {
    const matrix: { [key: string]: { [key: string]: string } } = {};
    
    classSchedule.forEach(daySchedule => {
      daySchedule.periods.forEach(period => {
        if (!matrix[period.time]) {
          matrix[period.time] = {};
        }
        matrix[period.time][daySchedule.day] = period.subject;
      });
    });
    
    return matrix;
  };

  const timetableMatrix = createTimetableMatrix();

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
              {timeSlots.map((timeSlot) => (
                <TableRow key={timeSlot} className="hover:bg-purple-50">
                  <TableCell className="font-medium text-purple-600">
                    {timeSlot}
                  </TableCell>
                  <TableCell className={`font-semibold ${
                    timetableMatrix[timeSlot]?.Monday === 'Break' || timetableMatrix[timeSlot]?.Monday === 'Lunch Break'
                      ? 'text-gray-600 italic bg-gray-50' 
                      : 'text-gray-800'
                  }`}>
                    {timetableMatrix[timeSlot]?.Monday || '-'}
                  </TableCell>
                  <TableCell className={`font-semibold ${
                    timetableMatrix[timeSlot]?.Tuesday === 'Break' || timetableMatrix[timeSlot]?.Tuesday === 'Lunch Break'
                      ? 'text-gray-600 italic bg-gray-50' 
                      : 'text-gray-800'
                  }`}>
                    {timetableMatrix[timeSlot]?.Tuesday || '-'}
                  </TableCell>
                  <TableCell className={`font-semibold ${
                    timetableMatrix[timeSlot]?.Wednesday === 'Break' || timetableMatrix[timeSlot]?.Wednesday === 'Lunch Break'
                      ? 'text-gray-600 italic bg-gray-50' 
                      : 'text-gray-800'
                  }`}>
                    {timetableMatrix[timeSlot]?.Wednesday || '-'}
                  </TableCell>
                  <TableCell className={`font-semibold ${
                    timetableMatrix[timeSlot]?.Thursday === 'Break' || timetableMatrix[timeSlot]?.Thursday === 'Lunch Break'
                      ? 'text-gray-600 italic bg-gray-50' 
                      : 'text-gray-800'
                  }`}>
                    {timetableMatrix[timeSlot]?.Thursday || '-'}
                  </TableCell>
                  <TableCell className={`font-semibold ${
                    timetableMatrix[timeSlot]?.Friday === 'Break' || timetableMatrix[timeSlot]?.Friday === 'Lunch Break'
                      ? 'text-gray-600 italic bg-gray-50' 
                      : 'text-gray-800'
                  }`}>
                    {timetableMatrix[timeSlot]?.Friday || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ClassTimetableTab;
