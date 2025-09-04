import React from 'react';
import { BookOpen, Calendar } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClassTimetableTab from '@/components/ClassTimetableTab';
import ExamTimetableTab from '@/components/ExamTimetableTab';
import FacultySection from '@/components/FacultySection'; // optional

const Timetable = () => {
  const [classId, setClassId] = React.useState<string | null>(null);
  const [facultyList, setFacultyList] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Set default class ID for demo purposes
    const currentClassId = localStorage.getItem('currentClassId');
    if (!currentClassId) {
      localStorage.setItem('currentClassId', 'f47ac10b-58cc-4372-a567-0e02b2c3d479');
    }
    setClassId('f47ac10b-58cc-4372-a567-0e02b2c3d479');
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
            <ClassTimetableTab />
            {facultyList.length > 0 && <FacultySection facultyList={facultyList} />}
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