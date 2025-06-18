
import React from 'react';
import { BookOpen, Calendar, TrendingUp, TrendingDown, Award } from 'lucide-react';

interface Subject {
  name: string;
  score: number;
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

interface ResultsModuleCardProps {
  module: Module;
  onClick: () => void;
}

const ResultsModuleCard: React.FC<ResultsModuleCardProps> = ({ module, onClick }) => {
  const getGradeColor = (grade: string) => {
    if (!grade) return 'bg-gray-100 text-gray-800';
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

  return (
    <div 
      className="card-3d p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:animate-bounce-subtle">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{module.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{module.period}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(module.overallGrade)}`}>
            {module.overallGrade}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Average Score:</span>
          <span className={`text-2xl font-bold ${getScoreColor(module.averageScore)}`}>
            {module.averageScore.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subjects:</span>
          <span className="font-medium text-gray-800">{module.subjects.length}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              module.averageScore >= 90 ? 'bg-gradient-to-r from-green-500 to-green-600' :
              module.averageScore >= 80 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
              module.averageScore >= 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              module.averageScore >= 60 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
              'bg-gradient-to-r from-red-500 to-red-600'
            }`}
            style={{ width: `${module.averageScore}%` }}
          ></div>
        </div>

        {/* Subject Preview */}
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Top Subjects:</h4>
          <div className="flex flex-wrap gap-2">
            {module.subjects
              .sort((a, b) => b.score - a.score)
              .slice(0, 3)
              .map((subject, index) => (
                <div key={index} className="flex items-center space-x-1 text-xs">
                  <div className={`w-2 h-2 rounded-full ${
                    subject.score >= 90 ? 'bg-green-500' :
                    subject.score >= 80 ? 'bg-blue-500' :
                    subject.score >= 70 ? 'bg-yellow-500' :
                    'bg-orange-500'
                  }`}></div>
                  <span className="text-gray-600">{subject.name}</span>
                  <span className={`font-medium ${getScoreColor(subject.score)}`}>
                    {subject.score}%
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsModuleCard;
