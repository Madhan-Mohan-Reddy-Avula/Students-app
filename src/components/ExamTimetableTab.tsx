
import React from 'react';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';

interface Exam {
  id: number;
  subject: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: string;
  syllabus: string;
}

interface ExamTimetableTabProps {
  exams: Exam[];
}

const ExamTimetableTab = ({ exams }: ExamTimetableTabProps) => {
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
    <div className="space-y-6">
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
    </div>
  );
};

export default ExamTimetableTab;
