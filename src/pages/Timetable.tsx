import React, { useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, MapPin, AlertCircle, BookOpen } from 'lucide-react';

const Timetable = () => {
  // Class Timetable Data - restructured for the new layout
  const [classSchedule] = useState([
    {
      day: 'Monday',
      date: '2024-06-17',
      periods: [
        { time: '09:00-09:45', subject: 'Mathematics', faculty: 'Mr. Smith' },
        { time: '09:45-10:30', subject: 'English', faculty: 'Ms. Johnson' },
        { time: '10:30-10:45', subject: 'Break', faculty: '' },
        { time: '10:45-11:30', subject: 'Science', faculty: 'Dr. Brown' },
        { time: '11:30-12:15', subject: 'History', faculty: 'Mr. Davis' },
        { time: '12:15-01:00', subject: 'Lunch Break', faculty: '' },
        { time: '01:00-01:45', subject: 'Geography', faculty: 'Ms. Wilson' },
        { time: '01:45-02:30', subject: 'Physical Education', faculty: 'Coach Miller' }
      ]
    },
    {
      day: 'Tuesday',
      date: '2024-06-18',
      periods: [
        { time: '09:00-09:45', subject: 'Science', faculty: 'Dr. Brown' },
        { time: '09:45-10:30', subject: 'Mathematics', faculty: 'Mr. Smith' },
        { time: '10:30-10:45', subject: 'Break', faculty: '' },
        { time: '10:45-11:30', subject: 'English', faculty: 'Ms. Johnson' },
        { time: '11:30-12:15', subject: 'Art', faculty: 'Ms. Garcia' },
        { time: '12:15-01:00', subject: 'Lunch Break', faculty: '' },
        { time: '01:00-01:45', subject: 'Music', faculty: 'Mr. Taylor' },
        { time: '01:45-02:30', subject: 'Computer Science', faculty: 'Mr. Anderson' }
      ]
    },
    {
      day: 'Wednesday',
      date: '2024-06-19',
      periods: [
        { time: '09:00-09:45', subject: 'English', faculty: 'Ms. Johnson' },
        { time: '09:45-10:30', subject: 'History', faculty: 'Mr. Davis' },
        { time: '10:30-10:45', subject: 'Break', faculty: '' },
        { time: '10:45-11:30', subject: 'Mathematics', faculty: 'Mr. Smith' },
        { time: '11:30-12:15', subject: 'Science', faculty: 'Dr. Brown' },
        { time: '12:15-01:00', subject: 'Lunch Break', faculty: '' },
        { time: '01:00-01:45', subject: 'Physical Education', faculty: 'Coach Miller' },
        { time: '01:45-02:30', subject: 'Geography', faculty: 'Ms. Wilson' }
      ]
    },
    {
      day: 'Thursday',
      date: '2024-06-20',
      periods: [
        { time: '09:00-09:45', subject: 'History', faculty: 'Mr. Davis' },
        { time: '09:45-10:30', subject: 'Science', faculty: 'Dr. Brown' },
        { time: '10:30-10:45', subject: 'Break', faculty: '' },
        { time: '10:45-11:30', subject: 'Geography', faculty: 'Ms. Wilson' },
        { time: '11:30-12:15', subject: 'English', faculty: 'Ms. Johnson' },
        { time: '12:15-01:00', subject: 'Lunch Break', faculty: '' },
        { time: '01:00-01:45', subject: 'Mathematics', faculty: 'Mr. Smith' },
        { time: '01:45-02:30', subject: 'Art', faculty: 'Ms. Garcia' }
      ]
    },
    {
      day: 'Friday',
      date: '2024-06-21',
      periods: [
        { time: '09:00-09:45', subject: 'Computer Science', faculty: 'Mr. Anderson' },
        { time: '09:45-10:30', subject: 'Mathematics', faculty: 'Mr. Smith' },
        { time: '10:30-10:45', subject: 'Break', faculty: '' },
        { time: '10:45-11:30', subject: 'Music', faculty: 'Mr. Taylor' },
        { time: '11:30-12:15', subject: 'Physical Education', faculty: 'Coach Miller' },
        { time: '12:15-01:00', subject: 'Lunch Break', faculty: '' },
        { time: '01:00-01:45', subject: 'English', faculty: 'Ms. Johnson' },
        { time: '01:45-02:30', subject: 'Science', faculty: 'Dr. Brown' }
      ]
    }
  ]);

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

  // Faculty information
  const facultyList = [
    { name: 'Mr. Smith', subject: 'Mathematics', department: 'Science' },
    { name: 'Ms. Johnson', subject: 'English', department: 'Languages' },
    { name: 'Dr. Brown', subject: 'Science', department: 'Science' },
    { name: 'Mr. Davis', subject: 'History', department: 'Social Studies' },
    { name: 'Ms. Wilson', subject: 'Geography', department: 'Social Studies' },
    { name: 'Coach Miller', subject: 'Physical Education', department: 'Sports' },
    { name: 'Ms. Garcia', subject: 'Art', department: 'Creative Arts' },
    { name: 'Mr. Taylor', subject: 'Music', department: 'Creative Arts' },
    { name: 'Mr. Anderson', subject: 'Computer Science', department: 'Technology' }
  ];

  // Exam Timetable Data
  const [exams] = useState([
    {
      id: 1,
      subject: 'Mathematics',
      date: '2024-06-25',
      time: '09:00 AM',
      duration: '2 hours',
      location: 'Room 101',
      type: 'Written Exam',
      syllabus: 'Chapters 1-8: Algebra, Geometry, Trigonometry'
    },
    {
      id: 2,
      subject: 'English Literature',
      date: '2024-06-27',
      time: '10:00 AM',
      duration: '3 hours',
      location: 'Room 205',
      type: 'Written Exam',
      syllabus: 'Shakespeare, Poetry Analysis, Essay Writing'
    },
    {
      id: 3,
      subject: 'Science',
      date: '2024-06-29',
      time: '02:00 PM',
      duration: '1.5 hours',
      location: 'Lab 3',
      type: 'Practical Exam',
      syllabus: 'Chemical Reactions, Physics Experiments'
    },
    {
      id: 4,
      subject: 'History',
      date: '2024-07-02',
      time: '09:00 AM',
      duration: '2 hours',
      location: 'Room 150',
      type: 'Written Exam',
      syllabus: 'World War I & II, Industrial Revolution'
    }
  ]);

  const getDaysUntilExam = (examDate: string) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil < 0) return 'border-l-gray-500';
    if (daysUntil <= 3) return 'border-l-red-500';
    if (daysUntil <= 7) return 'border-l-yellow-500';
    return 'border-l-green-500';
  };

  const getUrgencyBadge = (daysUntil: number) => {
    if (daysUntil < 0) return { text: 'Completed', color: 'bg-gray-100 text-gray-800' };
    if (daysUntil === 0) return { text: 'Today', color: 'bg-red-100 text-red-800' };
    if (daysUntil === 1) return { text: 'Tomorrow', color: 'bg-red-100 text-red-800' };
    if (daysUntil <= 3) return { text: `${daysUntil} days`, color: 'bg-red-100 text-red-800' };
    if (daysUntil <= 7) return { text: `${daysUntil} days`, color: 'bg-yellow-100 text-yellow-800' };
    return { text: `${daysUntil} days`, color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="Timetable" subtitle="View your class schedule and exam timetable" />
      
      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="class" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="class" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Class Time Table</span>
            </TabsTrigger>
            <TabsTrigger value="exam" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Exam Time Table</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="class" className="space-y-6">
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

            {/* Faculty Section */}
            <div className="card-3d p-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Faculty Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {facultyList.map((faculty, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-800 mb-1">{faculty.name}</h4>
                    <p className="text-purple-600 font-medium">{faculty.subject}</p>
                    <p className="text-sm text-gray-600">{faculty.department}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exam" className="space-y-6">
            {exams.map((exam) => {
              const daysUntil = getDaysUntilExam(exam.date);
              const urgencyBadge = getUrgencyBadge(daysUntil);
              
              return (
                <div
                  key={exam.id}
                  className={`card-3d p-6 border-l-4 ${getUrgencyColor(daysUntil)} animate-fade-in`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {exam.subject}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${urgencyBadge.color}`}>
                          {urgencyBadge.text}
                        </span>
                      </div>
                      
                      <p className="text-purple-600 font-medium mb-3">
                        {exam.type}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(exam.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{exam.time} ({exam.duration})</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{exam.location}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Syllabus:</h4>
                          <p className="text-sm text-gray-600">{exam.syllabus}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {daysUntil >= 0 && daysUntil <= 7 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        {daysUntil === 0 
                          ? "Exam is today! Good luck!" 
                          : daysUntil === 1 
                            ? "Exam is tomorrow! Final preparations!" 
                            : `Only ${daysUntil} days left to prepare!`
                        }
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Timetable;
