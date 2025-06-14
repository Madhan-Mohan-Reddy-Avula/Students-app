
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, FileText, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Exam {
  id: string;
  exam_type: string;
  exam_date: string;
  start_time: string;
  duration_minutes: number;
  location: string;
  type: string;
  syllabus_coverage: string;
  start_date: string;
  end_date: string;
  pdf_reference_url?: string;
  subjects?: {
    name: string;
  };
}

interface ExamModule {
  examType: string;
  startDate: string;
  endDate: string;
  exams: Exam[];
}

const ExamTimetableTab = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedModule, setSelectedModule] = useState<ExamModule | null>(null);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('exams')
        .select(`
          *,
          subjects (name)
        `)
        .order('exam_date', { ascending: true });

      if (error) {
        console.error('Error fetching exams:', error);
        toast.error('Failed to load exams');
        return;
      }

      setExams(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load exams');
    } finally {
      setLoading(false);
    }
  };

  // Group exams by examType to create modules
  const examModules: ExamModule[] = React.useMemo(() => {
    const moduleMap = new Map<string, ExamModule>();
    
    exams.forEach(exam => {
      if (!moduleMap.has(exam.exam_type)) {
        moduleMap.set(exam.exam_type, {
          examType: exam.exam_type,
          startDate: exam.start_date,
          endDate: exam.end_date,
          exams: []
        });
      }
      moduleMap.get(exam.exam_type)!.exams.push(exam);
    });

    return Array.from(moduleMap.values());
  }, [exams]);

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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  const handlePdfClick = (exam: Exam) => {
    setSelectedExam(exam);
    setShowPdf(true);
  };

  const handleBackFromPdf = () => {
    setShowPdf(false);
    setSelectedExam(null);
  };

  const handleBackFromModule = () => {
    setSelectedModule(null);
  };

  const handleBackFromExam = () => {
    setSelectedExam(null);
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

  // PDF Viewer
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
                {selectedExam.subjects?.name || 'Subject'} - Reference Material
              </h3>
              <p className="text-gray-500">PDF viewer would be integrated here</p>
              <p className="text-sm text-gray-400 mt-2">
                File: {selectedExam.pdf_reference_url || 'syllabus.pdf'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Individual Exam Details
  if (selectedExam) {
    const daysUntil = getDaysUntilExam(selectedExam.exam_date);
    const urgencyBadge = getUrgencyBadge(daysUntil);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBackFromExam}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Module</span>
          </Button>
        </div>

        <Card className="card-3d">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-purple-600">
                {selectedExam.subjects?.name || 'Subject'}
              </CardTitle>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${urgencyBadge.color}`}>
                {urgencyBadge.text}
              </span>
            </div>
            <p className="text-lg font-medium text-gray-700">{selectedExam.exam_type}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Exam Date</p>
                    <p className="text-gray-600">{new Date(selectedExam.exam_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Time & Duration</p>
                    <p className="text-gray-600">
                      {selectedExam.start_time ? formatTime(selectedExam.start_time) : 'TBA'} 
                      ({formatDuration(selectedExam.duration_minutes)})
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Location</p>
                    <p className="text-gray-600">{selectedExam.location || 'TBA'}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {selectedExam.start_date && selectedExam.end_date && (
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Exam Period</p>
                    <p className="text-gray-600">
                      {new Date(selectedExam.start_date).toLocaleDateString()} - {new Date(selectedExam.end_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800 mb-1">Exam Type</p>
                  <p className="text-gray-600">{selectedExam.type || 'Written'}</p>
                </div>
              </div>
            </div>

            {selectedExam.syllabus_coverage && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Syllabus Coverage</h4>
                <p className="text-gray-600 mb-4">{selectedExam.syllabus_coverage}</p>
                
                {selectedExam.pdf_reference_url && (
                  <Button
                    onClick={() => handlePdfClick(selectedExam)}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Reference Material</span>
                  </Button>
                )}
              </div>
            )}

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

  // Module View - Show all subjects in selected exam module
  if (selectedModule) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBackFromModule}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Exam Modules</span>
          </Button>
        </div>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-600">
              {selectedModule.examType}
            </CardTitle>
            {selectedModule.startDate && selectedModule.endDate && (
              <p className="text-gray-600">
                Exam Period: {new Date(selectedModule.startDate).toLocaleDateString()} - {new Date(selectedModule.endDate).toLocaleDateString()}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">All Subjects</h3>
              {selectedModule.exams.map((exam) => {
                const daysUntil = getDaysUntilExam(exam.exam_date);
                const urgencyBadge = getUrgencyBadge(daysUntil);
                
                return (
                  <div
                    key={exam.id}
                    className={`card-3d p-4 border-l-4 ${getUrgencyColor(daysUntil)} cursor-pointer hover:shadow-lg transition-shadow`}
                    onClick={() => setSelectedExam(exam)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-800">
                            {exam.subjects?.name || 'Subject'}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyBadge.color}`}>
                            {urgencyBadge.text}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(exam.exam_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{exam.start_time ? formatTime(exam.start_time) : 'TBA'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{exam.location || 'TBA'}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-purple-600 font-medium mt-2">
                          {exam.type || 'Written Exam'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main View - Show Exam Modules
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Exam Modules</h2>
        {examModules.map((module, index) => {
          // Get the earliest exam date from this module to determine urgency
          const earliestExam = module.exams.reduce((earliest, exam) => 
            new Date(exam.exam_date) < new Date(earliest.exam_date) ? exam : earliest
          );
          const daysUntil = getDaysUntilExam(earliestExam.exam_date);
          const urgencyBadge = getUrgencyBadge(daysUntil);
          
          return (
            <div
              key={index}
              className={`card-3d p-6 border-l-4 ${getUrgencyColor(daysUntil)} cursor-pointer hover:shadow-lg transition-shadow animate-fade-in`}
              onClick={() => setSelectedModule(module)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-gray-800">
                      {module.examType}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${urgencyBadge.color}`}>
                      {urgencyBadge.text}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    {module.startDate && module.endDate && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Period: {new Date(module.startDate).toLocaleDateString()} - {new Date(module.endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>{module.exams.length} Subject{module.exams.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {module.exams.map((exam, examIndex) => (
                      <span
                        key={examIndex}
                        className="px-2 py-1 bg-purple-50 text-purple-700 text-sm rounded-md"
                      >
                        {exam.subjects?.name || 'Subject'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {examModules.length === 0 && (
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
