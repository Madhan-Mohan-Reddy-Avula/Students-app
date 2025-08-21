import React, { useState, useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Exam {
  id: string;
  subject: string;
  exam_date: string;
  start_time: string;
  end_time: string;
  room: string;
  type?: string;
}

const ExamTimetable = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('exam_timetable')
        .select('*')
        .order('exam_date', { ascending: true });

      if (error) {
        console.error('Error fetching exam data:', error);
        toast.error('Failed to load exam timetable');
        setExams([]);
        return;
      }

      setExams(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Something went wrong');
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

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
      <NavigationHeader title="Exam Timetable" subtitle="View your upcoming exams and schedule" />

      <div className="max-w-6xl mx-auto p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading exams...</p>
          </div>
        ) : exams.length > 0 ? (
          <div className="grid gap-6">
            {exams.map((exam) => {
              const daysUntil = getDaysUntilExam(exam.exam_date);
              const urgencyBadge = getUrgencyBadge(daysUntil);

              return (
                <div
                  key={exam.id}
                  className={`card-3d p-6 border-l-4 ${getUrgencyColor(daysUntil)} animate-fade-in`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{exam.subject}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${urgencyBadge.color}`}
                        >
                          {urgencyBadge.text}
                        </span>
                      </div>

                      <p className="text-purple-600 font-medium mb-3">{exam.type || 'Written Exam'}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(exam.exam_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{exam.start_time} - {exam.end_time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{exam.room || 'TBA'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {daysUntil >= 0 && daysUntil <= 7 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        {daysUntil === 0
                          ? 'Exam is today! Good luck!'
                          : daysUntil === 1
                          ? 'Exam is tomorrow! Final preparations!'
                          : `Only ${daysUntil} days left to prepare!`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No exams scheduled</h3>
            <p className="text-gray-600">Your exam timetable will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamTimetable;