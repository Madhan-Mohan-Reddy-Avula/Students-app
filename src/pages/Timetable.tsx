import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClassTimetableTab from '@/components/ClassTimetableTab';
import ExamTimetableTab from '@/components/ExamTimetableTab';
import FacultySection from '@/components/FacultySection'; // optional

const Timetable = () => {
  const [classId, setClassId] = useState<string | null>(null);
  const [facultyList, setFacultyList] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        const user = JSON.parse(currentUser);
        setClassId(user.class_id || null);
      } catch (err) {
        console.error('Failed to parse currentUser from localStorage:', err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader
        title="Timetable"
        subtitle="View your class schedule and exam timetable"
      />

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
            {classId ? (
              <>
                <ClassTimetableTab />
                {/* If you want to show faculty info per class, enable this */}
                {facultyList.length > 0 && <FacultySection facultyList={facultyList} />}
              </>
            ) : (
              <p className="text-center text-gray-600">Class ID not found. Please log in again.</p>
            )}
          </TabsContent>

          <TabsContent value="exam" className="space-y-6">
            {classId ? (
              <ExamTimetableTab />
            ) : (
              <p className="text-center text-gray-600">Class ID not found. Please log in again.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Timetable;
