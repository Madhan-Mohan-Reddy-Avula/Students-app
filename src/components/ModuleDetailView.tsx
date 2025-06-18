
import React from 'react';
import { ArrowLeft, Award, TrendingUp, TrendingDown, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Subject {
  name: string;
  score: number;
  previousScore?: number;
  grade: string;
  examType: string;
  examDate: string;
  rank: number;
  totalStudents: number;
}

interface Module {
  id: string;
  name: string;
  period: string;
  subjects: Subject[];
  averageScore: number;
  overallGrade: string;
}

interface ModuleDetailViewProps {
  module: Module;
  onBack: () => void;
  studentName: string;
}

const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({ module, onBack, studentName }) => {
  const getGradeColor = (grade: string) => {
    if (!grade) return 'bg-gray-100 text-gray-800 border-gray-200';
    switch (grade.charAt(0)) {
      case 'A':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'B':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'F':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTrendIcon = (current: number, previous?: number) => {
    if (!previous) return null;
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const getTrendText = (current: number, previous?: number) => {
    if (!previous) return 'First exam';
    const diff = current - previous;
    if (diff > 0) {
      return `+${diff.toFixed(1)} points`;
    } else if (diff < 0) {
      return `${diff.toFixed(1)} points`;
    }
    return 'No change';
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Modules</span>
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{module.name}</h2>
          <p className="text-gray-600">{module.period} • {studentName}</p>
        </div>
      </div>

      {/* Module Summary */}
      <div className="card-3d p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Overall Grade</h3>
            <div className={`inline-block px-4 py-2 rounded-full text-lg font-bold border ${getGradeColor(module.overallGrade)}`}>
              {module.overallGrade}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Average Score</h3>
            <p className={`text-3xl font-bold ${getScoreColor(module.averageScore)}`}>
              {module.averageScore.toFixed(1)}%
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Subjects</h3>
            <p className="text-3xl font-bold text-green-600">{module.subjects.length}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Period</h3>
            <p className="text-lg font-semibold text-orange-600">{module.period}</p>
          </div>
        </div>
      </div>

      {/* Subject Details */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Subject Results</h3>
        {module.subjects
          .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())
          .map((subject, index) => (
            <div key={index} className="card-3d p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-xl font-bold text-gray-800">{subject.name}</h4>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(subject.grade)}`}>
                      {subject.grade}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{subject.examType} - {new Date(subject.examDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-800">Score</h5>
                      <div className="flex items-center space-x-2">
                        <span className={`text-2xl font-bold ${getScoreColor(subject.score)}`}>
                          {subject.score}
                        </span>
                        <span className="text-gray-500">/ 100</span>
                        {getTrendIcon(subject.score, subject.previousScore)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {getTrendText(subject.score, subject.previousScore)}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-800">Class Rank</h5>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {subject.rank}
                        </span>
                        <span className="text-gray-500">/ {subject.totalStudents}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {subject.rank <= 5 ? 'Excellent position!' : 
                         subject.rank <= 15 ? 'Great performance' : 'Room for improvement'}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-800">Progress</h5>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${
                            subject.score >= 90 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                            subject.score >= 80 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                            subject.score >= 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                            subject.score >= 60 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                            'bg-gradient-to-r from-red-500 to-red-600'
                          }`}
                          style={{ width: `${subject.score}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {subject.score.toFixed(1)}% of maximum score
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ModuleDetailView;
