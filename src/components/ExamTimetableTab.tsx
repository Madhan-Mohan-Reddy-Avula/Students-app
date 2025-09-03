import React from 'react';
import { Calendar, Clock, MapPin, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExamTimetable } from '@/hooks/useExamTimetable';

interface Exam {
  id: string;
  subject: string;
  exam_date: string;
  start_time: string;
  end_time: string;
  room: string;
  exam_type: string;
  class_id: string;
  created_at: string;
}

const ExamTimetableTab = () => {
  const { exams, loading } = useExamTimetable();

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

  if (loading) {
    return (
      <div className="card-3d p-6 animate-fade-in">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading exam schedule...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Upcoming Exams</h2>
        {exams.map((exam) => {
          const daysUntil = getDaysUntilExam(exam.exam_date);
          const urgencyBadge = getUrgencyBadge(daysUntil);
          
          return (
            <Card
              key={exam.id}
              className={`card-3d border-l-4 ${getUrgencyColor(daysUntil)} animate-fade-in`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-xl text-purple-600">
                        {exam.subject}
                      </CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${urgencyBadge.color}`}>
                        {urgencyBadge.text}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(exam.exam_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {exam.start_time ? formatTime(exam.start_time) : 'TBA'} - {exam.end_time ? formatTime(exam.end_time) : 'TBA'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{exam.room || 'TBA'}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-purple-600 font-medium">
                    {exam.exam_type || 'Written Exam'}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {exams.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No exams scheduled</h3>
          <p className="text-gray-600">Exam information will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ExamTimetableTab;