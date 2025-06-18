
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ChartData {
  name: string;
  myScore: number;
  classAverage: number;
  topScore: number;
  date?: string;
}

interface ResultsChartProps {
  data: ChartData[];
  type: 'line' | 'bar' | 'radar';
  title: string;
  studentName: string;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ data, type, title, studentName }) => {
  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip 
          formatter={(value, name) => [
            `${value}%`,
            name === 'myScore' ? studentName : 
            name === 'classAverage' ? 'Class Average' : 'Top Score'
          ]}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="myScore" 
          stroke="#8b5cf6" 
          strokeWidth={3}
          name={studentName}
          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="classAverage" 
          stroke="#06b6d4" 
          strokeWidth={2}
          name="Class Average"
          dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="topScore" 
          stroke="#10b981" 
          strokeWidth={2}
          name="Top Score"
          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip 
          formatter={(value, name) => [
            `${value}%`,
            name === 'myScore' ? studentName : 
            name === 'classAverage' ? 'Class Average' : 'Top Score'
          ]}
        />
        <Legend />
        <Bar dataKey="myScore" fill="#8b5cf6" name={studentName} />
        <Bar dataKey="classAverage" fill="#06b6d4" name="Class Average" />
        <Bar dataKey="topScore" fill="#10b981" name="Top Score" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderRadarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={45} domain={[0, 100]} />
        <Radar
          name={studentName}
          dataKey="myScore"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.3}
          strokeWidth={2}
          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
        />
        <Radar
          name="Class Average"
          dataKey="classAverage"
          stroke="#06b6d4"
          fill="#06b6d4"
          fillOpacity={0.1}
          strokeWidth={2}
        />
        <Legend />
        <Tooltip 
          formatter={(value, name) => [
            `${value}%`,
            name === 'myScore' ? studentName : 'Class Average'
          ]}
        />
      </RadarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="card-3d p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">{title}</h3>
      {type === 'line' && renderLineChart()}
      {type === 'bar' && renderBarChart()}
      {type === 'radar' && renderRadarChart()}
    </div>
  );
};

export default ResultsChart;
