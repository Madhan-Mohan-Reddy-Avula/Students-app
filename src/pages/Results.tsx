
import React, { useState } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react';

const Results = () => {
  const [results] = useState([
    {
      id: 1,
      subject: 'Mathematics',
      currentGrade: 'A',
      currentScore: 92,
      previousScore: 88,
      maxScore: 100,
      examType: 'Mid-term Exam',
      date: '2024-06-10',
      rank: 3,
      totalStudents: 45
    },
    {
      id: 2,
      subject: 'English Literature',
      currentGrade: 'B+',
      currentScore: 87,
      previousScore: 85,
      maxScore: 100,
      examType: 'Final Exam',
      date: '2024-06-08',
      rank: 8,
      totalStudents: 45
    },
    {
      id: 3,
      subject: 'Science',
      currentGrade: 'A-',
      currentScore: 89,
      previousScore: 92,
      maxScore: 100,
      examType: 'Practical Exam',
      date: '2024-06-05',
      rank: 5,
      totalStudents: 45
    },
    {
      id: 4,
      subject: 'History',
      currentGrade: 'B',
      currentScore: 82,
      previousScore: 78,
      maxScore: 100,
      examType: 'Mid-term Exam',
      date: '2024-06-03',
      rank: 12,
      totalStudents: 45
    }
  ]);

  const getGradeColor = (grade: string) => {
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
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const getTrendText = (current: number, previous: number) => {
    const diff = current - previous;
    if (diff > 0) {
      return `+${diff} points`;
    } else if (diff < 0) {
      return `${diff} points`;
    }
    return 'No change';
  };

  const getOverallGPA = () => {
    const total = results.reduce((sum, result) => sum + result.currentScore, 0);
    const average = total / results.length;
    return (average / 100 * 4).toFixed(2);
  };

  const getTopPerformer = () => {
    return results.reduce((top, current) => 
      current.currentScore > top.currentScore ? current : top
    );
  };

  const overallGPA = getOverallGPA();
  const topPerformer = getTopPerformer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="Results" subtitle="Check your academic performance" />
      
      <div className="max-w-6xl mx-auto p-6">
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
          
          <div className="card-3d p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Top Subject</h3>
            <p className="text-xl font-bold text-green-600">{topPerformer.subject}</p>
            <p className="text-sm text-gray-600">{topPerformer.currentScore}%</p>
          </div>
          
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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(result.currentGrade)}`}>
                      {result.currentGrade}
                    </span>
                  </div>
                  
                  <p className="text-purple-600 font-medium mb-3">
                    {result.examType} - {new Date(result.date).toLocaleDateString()}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Score</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-purple-600">
                          {result.currentScore}
                        </span>
                        <span className="text-gray-500">/ {result.maxScore}</span>
                        {getTrendIcon(result.currentScore, result.previousScore)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {getTrendText(result.currentScore, result.previousScore)} from last exam
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Class Rank</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {result.rank}
                        </span>
                        <span className="text-gray-500">/ {result.totalStudents}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {result.rank <= 5 ? 'Excellent position!' : 
                         result.rank <= 15 ? 'Great performance' : 'Room for improvement'}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Progress</h4>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${result.currentScore}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {result.currentScore}% of maximum score
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {results.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No results available</h3>
            <p className="text-gray-600">Your exam results will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
