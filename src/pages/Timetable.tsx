
import React, { useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BookOpen } from 'lucide-react';
import ClassTimetableTab from '@/components/ClassTimetableTab';
import ExamTimetableTab from '@/components/ExamTimetableTab';
import FacultySection from '@/components/FacultySection';

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
            <ClassTimetableTab classSchedule={classSchedule} />
            <FacultySection facultyList={facultyList} />
          </TabsContent>

          <TabsContent value="exam" className="space-y-6">
            <ExamTimetableTab exams={exams} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Timetable;
