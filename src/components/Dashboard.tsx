
import React from 'react';
import { BookOpen, Calendar, Users, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Homework',
      icon: BookOpen,
      path: '/homework',
      gradient: 'from-purple-500 to-purple-600',
      description: 'Track assignments and deadlines'
    },
    {
      title: 'Exam Timetable',
      icon: Calendar,
      path: '/exam-timetable',
      gradient: 'from-purple-600 to-purple-700',
      description: 'View upcoming exams and schedule'
    },
    {
      title: 'School Events',
      icon: Users,
      path: '/school-events',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Stay updated with school activities'
    },
    {
      title: 'Results',
      icon: FileText,
      path: '/results',
      gradient: 'from-purple-600 to-indigo-600',
      description: 'Check your academic performance'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4 animate-fade-in">
            Students App
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in">
            Education is the Most Powerful Weapon Which You Can Change the World..
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {dashboardItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="card-3d p-8 cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(item.path)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:animate-bounce-subtle`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>© 2024 Students App - Empowering your educational journey</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
