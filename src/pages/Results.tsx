import React, { useState, useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import ResultsModuleCard from '@/components/ResultsModuleCard';
import ResultsChart from '@/components/ResultsChart';
import ModuleDetailView from '@/components/ModuleDetailView';
import { TrendingUp, Award, Target, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { dummyStudent, dummyResults } from '@/data/dummyData';

interface StudentResult {
  id: string;
  subject: string;
  current_score: number;
  previous_score: number;
  max_score: number;
  current_grade: string;
  exam_type: string;
  exam_date: string;
  class_rank: number;
  total_students: number;
}

interface StudentProfile {
  id: string;
  name: string;
  roll_number: string;
}

interface Module {
  id: string;
  name: string;
  period: string;
  subjects: Array<{
    name: string;
    score: number;
    previousScore?: number;
    grade: string;
    examType: string;
    examDate: string;
    rank: number;
    totalStudents: number;
  }>;
  averageScore: number;
  overallGrade: string;
}

const Results = () => {
  const [results, setResults] = useState<StudentResult[]>([]);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showModuleDetail, setShowModuleDetail] = useState(false);

  useEffect(() => {
    fetchStudentAndResults();
  }, []);

  const fetchStudentAndResults = async () => {
    try {
      setLoading(true);
      
      // Check if user is logged in
      const currentUser = localStorage.getItem('currentUser');
      let currentStudent = null;
      let resultsData = [];
      
      if (currentUser) {
        // User is logged in - use dummy data for now (can be enhanced later)
        currentStudent = JSON.parse(currentUser);
        resultsData = dummyResults;
      } else {
        // User not logged in - use dummy data
        currentStudent = {
          id: dummyStudent.id,
          name: dummyStudent.name,
          roll_number: dummyStudent.roll_number
        };
        resultsData = dummyResults;
      }

      setStudent(currentStudent);
      setResults(resultsData);
      console.log('Loaded results for student:', currentStudent.name, resultsData);
      
      // Process results into modules
      processResultsIntoModules(resultsData);
    } catch (error) {
      console.error('Error:', error);
      // Fallback to dummy data
      setStudent({
        id: dummyStudent.id,
        name: dummyStudent.name,
        roll_number: dummyStudent.roll_number
      });
      setResults(dummyResults);
      processResultsIntoModules(dummyResults);
    } finally {
      setLoading(false);
    }
  };

  const processResultsIntoModules = (resultsData: StudentResult[]) => {
    const moduleMap = new Map<string, Module>();
    
    resultsData.forEach(result => {
      const examDate = new Date(result.exam_date);
      const year = examDate.getFullYear();
      const month = examDate.getMonth();
      
      // Determine semester based on exam date
      let semester;
      let semesterYear;
      if (month >= 1 && month <= 5) {
        semester = 'Semester 1';
        semesterYear = year;
      } else {
        semester = 'Semester 2';
        semesterYear = year;
      }
      
      const moduleKey = `${semester} ${semesterYear} - ${result.exam_type}`;
      const moduleId = `${semester.toLowerCase().replace(' ', '-')}-${semesterYear}-${result.exam_type.toLowerCase().replace(' ', '-')}`;
      
      if (!moduleMap.has(moduleKey)) {
        moduleMap.set(moduleKey, {
          id: moduleId,
          name: `${semester} ${semesterYear}`,
          period: `${result.exam_type} - ${examDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
          subjects: [],
          averageScore: 0,
          overallGrade: ''
        });
      }
      
      const module = moduleMap.get(moduleKey)!;
      module.subjects.push({
        name: result.subject,
        score: result.current_score,
        previousScore: result.previous_score,
        grade: result.current_grade,
        examType: result.exam_type,
        examDate: result.exam_date,
        rank: result.class_rank,
        totalStudents: result.total_students
      });
    });
    
    // Calculate averages and grades for each module
    const processedModules = Array.from(moduleMap.values()).map(module => {
      const totalScore = module.subjects.reduce((sum, subject) => sum + subject.score, 0);
      module.averageScore = totalScore / module.subjects.length;
      
      // Calculate overall grade
      if (module.averageScore >= 90) module.overallGrade = 'A+';
      else if (module.averageScore >= 85) module.overallGrade = 'A';
      else if (module.averageScore >= 80) module.overallGrade = 'B+';
      else if (module.averageScore >= 75) module.overallGrade = 'B';
      else if (module.averageScore >= 70) module.overallGrade = 'C+';
      else if (module.averageScore >= 65) module.overallGrade = 'C';
      else if (module.averageScore >= 60) module.overallGrade = 'D';
      else module.overallGrade = 'F';
      
      return module;
    });
    
    // Sort modules by date (most recent first)
    processedModules.sort((a, b) => {
      const dateA = new Date(a.subjects[0]?.examDate || '');
      const dateB = new Date(b.subjects[0]?.examDate || '');
      return dateB.getTime() - dateA.getTime();
    });
    
    setModules(processedModules);
  };

  const getOverallGPA = () => {
    if (results.length === 0) return '0.00';
    const total = results.reduce((sum, result) => sum + result.current_score, 0);
    const average = total / results.length;
    return (average / 100 * 4).toFixed(2);
  };

  const getTopPerformer = () => {
    if (results.length === 0) return null;
    return results.reduce((top, current) => 
      current.current_score > top.current_score ? current : top
    );
  };

  // Generate chart data for performance trends
  const generateChartData = () => {
    const subjectScores = new Map<string, Array<{score: number, date: string, examType: string}>>();
    
    results.forEach(result => {
      if (!subjectScores.has(result.subject)) {
        subjectScores.set(result.subject, []);
      }
      subjectScores.get(result.subject)!.push({
        score: result.current_score,
        date: result.exam_date,
        examType: result.exam_type
      });
    });

    // Create performance trend data (latest 5 subjects)
    const trendData = Array.from(subjectScores.entries())
      .slice(0, 5)
      .map(([subject, scores]) => {
        const latestScore = scores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        return {
          name: subject,
          myScore: latestScore.score,
          classAverage: Math.max(60, latestScore.score - Math.random() * 15), // Simulated class average
          topScore: Math.min(100, latestScore.score + Math.random() * 10) // Simulated top score
        };
      });

    return trendData;
  };

  const overallGPA = getOverallGPA();
  const topPerformer = getTopPerformer();
  const chartData = generateChartData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <NavigationHeader title="Results" subtitle="Check your academic performance" />
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading results...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showModuleDetail && selectedModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <NavigationHeader 
          title={selectedModule.name} 
          subtitle={`Module Details - ${student?.name || 'Student'}`} 
        />
        <div className="max-w-6xl mx-auto p-6">
          <ModuleDetailView
            module={selectedModule}
            onBack={() => setShowModuleDetail(false)}
            studentName={student?.name || 'Student'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="Results" subtitle={student ? `Academic Performance - ${student.name}` : "Check your academic performance"} />
      
      <div className="max-w-6xl mx-auto p-6">
        {student && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-800">
              Results for {student.name} ({student.roll_number})
            </h2>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-3d p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Overall GPA</h3>
            <p className="text-3xl font-bold text-purple-600">{overallGPA}</p>
            <p className="text-sm text-gray-600">Out of 4.0</p>
          </div>
          
          {topPerformer && (
            <div className="card-3d p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Top Subject</h3>
              <p className="text-xl font-bold text-green-600">{topPerformer.subject}</p>
              <p className="text-sm text-gray-600">{topPerformer.current_score}%</p>
            </div>
          )}
          
          <div className="card-3d p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Modules</h3>
            <p className="text-3xl font-bold text-blue-600">{modules.length}</p>
            <p className="text-sm text-gray-600">Academic periods</p>
          </div>
        </div>

        {/* Performance Charts */}
        {chartData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ResultsChart
              data={chartData}
              type="line"
              title="Performance Trend"
              studentName={student?.name || 'You'}
            />
            <ResultsChart
              data={chartData}
              type="radar"
              title="Subject Comparison"
              studentName={student?.name || 'You'}
            />
          </div>
        )}

        {/* Academic Modules */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Academic Modules</h3>
          {modules.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {modules.map((module) => (
                <ResultsModuleCard
                  key={module.id}
                  module={module}
                  onClick={() => {
                    setSelectedModule(module);
                    setShowModuleDetail(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No modules available</h3>
              <p className="text-gray-600">
                {student ? `No exam results found for ${student.name}.` : 'Your exam results will appear here.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
