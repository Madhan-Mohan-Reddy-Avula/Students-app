
import React, { useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BookOpen } from 'lucide-react';
import ClassTimetableTab from '@/components/ClassTimetableTab';
import ExamTimetableTab from '@/components/ExamTimetableTab';
import FacultySection from '@/components/FacultySection';

const Timetable = () => {
  // Remove the unused classSchedule and exams state since components now fetch their own data
  
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
            <ClassTimetableTab />
            <FacultySection facultyList={facultyList} />
          </TabsContent>

          <TabsContent value="exam" className="space-y-6">
            <ExamTimetableTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Timetable;
