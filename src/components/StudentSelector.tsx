
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface StudentProfile {
  id: string;
  roll_number: string;
  name: string;
  email: string;
  department: string;
  year: number;
  phone?: string;
  avatar_url?: string;
  class_id?: string;
}

interface StudentSelectorProps {
  onStudentSelect: (student: StudentProfile) => void;
  selectedStudentId?: string;
}

const StudentSelector = ({ onStudentSelect, selectedStudentId }: StudentSelectorProps) => {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching students:', error);
        return;
      }

      if (profiles) {
        setStudents(profiles);
        console.log('Found students:', profiles.length);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading students...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600">No student profiles found</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Student Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <Card
            key={student.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              selectedStudentId === student.id ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => onStudentSelect(student)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={student.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.roll_number}</p>
                  <p className="text-xs text-gray-500">{student.department} - Year {student.year}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentSelector;
