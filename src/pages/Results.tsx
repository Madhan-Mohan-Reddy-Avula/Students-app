
import React, { useState, useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

const Results = () => {
  const [results, setResults] = useState<StudentResult[]>([]);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentAndResults();
  }, []);

  const fetchStudentAndResults = async () => {
    try {
      setLoading(true);
      
      // Get the first student profile (Alex Thompson)
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, name, roll_number')
        .eq('roll_number', 'CS2021001')
        .single();

      if (profileError) {
        console.error('Error fetching student profile:', profileError);
        toast.error('Failed to load student profile');
        return;
      }

      if (profiles) {
        setStudent(profiles);
        
        // Fetch results for this student
        const { data: resultsData, error: resultsError } = await supabase
          .from('student_results')
          .select('*')
          .eq('user_id', profiles.id)
          .order('exam_date', { ascending: false });

        if (resultsError) {
          console.error('Error fetching results:', resultsError);
          toast.error('Failed to load results');
          return;
        }

        setResults(resultsData || []);
        console.log('Loaded results for student:', profiles.name, resultsData);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    if (!grade) return 'bg-gray-100 text-gray-800';
    switch (grade.charAt(0)) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      case 'D':
        return 'bg-orange-100 text-orange-800';
      case 'F':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (!previous) return null;
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const getTrendText = (current: number, previous: number) => {
    if (!previous) return 'First exam';
    const diff = current - previous;
    if (diff > 0) {
      return `+${diff.toFixed(1)} points`;
    } else if (diff < 0) {
      return `${diff.toFixed(1)} points`;
    }
    return 'No change';
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

  const overallGPA = getOverallGPA();
  const topPerformer = getTopPerformer();

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
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Subjects</h3>
            <p className="text-3xl font-bold text-blue-600">{results.length}</p>
            <p className="text-sm text-gray-600">Total subjects</p>
          </div>
        </div>

        {/* Results List */}
        <div className="grid gap-6">
          {results.map((result) => (
            <div key={result.id} className="card-3d p-6 animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {result.subject}
                    </h3>
                    {result.current_grade && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(result.current_grade)}`}>
                        {result.current_grade}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-purple-600 font-medium mb-3">
                    {result.exam_type} - {new Date(result.exam_date).toLocaleDateString()}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Score</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-purple-600">
                          {result.current_score}
                        </span>
                        <span className="text-gray-500">/ {result.max_score}</span>
                        {getTrendIcon(result.current_score, result.previous_score)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {getTrendText(result.current_score, result.previous_score)}
                      </p>
                    </div>
                    
                    {result.class_rank && result.total_students && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800">Class Rank</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">
                            {result.class_rank}
                          </span>
                          <span className="text-gray-500">/ {result.total_students}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {result.class_rank <= 5 ? 'Excellent position!' : 
                           result.class_rank <= 15 ? 'Great performance' : 'Room for improvement'}
                        </p>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Progress</h4>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(result.current_score / result.max_score) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {((result.current_score / result.max_score) * 100).toFixed(1)}% of maximum score
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {results.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No results available</h3>
            <p className="text-gray-600">
              {student ? `No exam results found for ${student.name}.` : 'Your exam results will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
