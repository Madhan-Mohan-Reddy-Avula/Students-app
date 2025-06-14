
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InfoCardProps {
  title: string;
  icon: any;
  children: React.ReactNode;
}

const InfoCard = ({ title, icon: Icon, children }: InfoCardProps) => (
  <Card className="card-3d animate-fade-in">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 text-lg">
        <Icon className="w-5 h-5 text-purple-600" />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

export default InfoCard;
