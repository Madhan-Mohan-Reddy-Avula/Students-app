
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Exam {
  id: number;
  subject: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: string;
  examType: string;
  syllabus: string;
  startDate: string;
  endDate: string;
  pdfReference?: string;
}

interface ExamTimetableTabProps {
  exams: Exam[];
}

const ExamTimetableTab = ({ exams }: ExamTimetableTabProps) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showPdf, setShowPdf] = useState(false);

  const examTypes = [
    {
      grade: "Formative Assessments (FA I–IV)",
      description: "Short-term in-class tests for continuous feedback"
    },
    {
      grade: "Summative Assessments (SA‑I, II)",
      description: "Broader exams at the end of instructional periods"
    },
    {
      grade: "SSC Board Exams (Class 10)",
      description: "6-subject public exam with SSC certificate"
    },
    {
      grade: "SSC Supplementaries",
      description: "Re-examination for failed subjects (May)"
    }
  ];

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

  const handlePdfClick = (exam: Exam) => {
    setSelectedExam(exam);
    setShowPdf(true);
  };

  const handleBackFromPdf = () => {
    setShowPdf(false);
    setSelectedExam(null);
  };

  if (showPdf && selectedExam) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <Button
            onClick={handleBackFromPdf}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Exam Details</span>
          </Button>
        </div>
        <div className="p-4">
          <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {selectedExam.subject} - Reference Material
              </h3>
              <p className="text-gray-500">PDF viewer would be integrated here</p>
              <p className="text-sm text-gray-400 mt-2">
                File: {selectedExam.pdfReference || 'syllabus.pdf'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedExam) {
    const daysUntil = getDaysUntilExam(selectedExam.date);
    const urgencyBadge = getUrgencyBadge(daysUntil);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setSelectedExam(null)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Exam List</span>
          </Button>
        </div>

        <Card className="card-3d">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-purple-600">
                {selectedExam.subject}
              </CardTitle>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${urgencyBadge.color}`}>
                {urgencyBadge.text}
              </span>
            </div>
            <p className="text-lg font-medium text-gray-700">{selectedExam.examType}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Exam Date</p>
                    <p className="text-gray-600">{new Date(selectedExam.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Time & Duration</p>
                    <p className="text-gray-600">{selectedExam.time} ({selectedExam.duration})</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <p className="text-gray-600">{selectedExam.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-800 mb-1">Exam Period</p>
                  <p className="text-gray-600">
                    {new Date(selectedExam.startDate).toLocaleDateString()} - {new Date(selectedExam.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-1">Exam Type</p>
                  <p className="text-gray-600">{selectedExam.type}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Syllabus Coverage</h4>
              <p className="text-gray-600 mb-4">{selectedExam.syllabus}</p>
              
              {selectedExam.pdfReference && (
                <Button
                  onClick={() => handlePdfClick(selectedExam)}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Reference Material</span>
                </Button>
              )}
            </div>

            {daysUntil >= 0 && daysUntil <= 7 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Exam Types Information */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-purple-600">Exam Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Grade / Exam Type</TableHead>
                <TableHead className="font-semibold">What It Is</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examTypes.map((examType, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{examType.grade}</TableCell>
                  <TableCell>{examType.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Exam Schedule */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Upcoming Exams</h2>
        {exams.map((exam) => {
          const daysUntil = getDaysUntilExam(exam.date);
          const urgencyBadge = getUrgencyBadge(daysUntil);
          
          return (
            <div
              key={exam.id}
              className={`card-3d p-6 border-l-4 ${getUrgencyColor(daysUntil)} animate-fade-in cursor-pointer hover:shadow-lg transition-shadow`}
              onClick={() => setSelectedExam(exam)}
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
                    {exam.examType}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(exam.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{exam.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{exam.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <span>Exam Period: {new Date(exam.startDate).toLocaleDateString()} - {new Date(exam.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamTimetableTab;
