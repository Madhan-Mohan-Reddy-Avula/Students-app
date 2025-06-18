
import React, { useState, useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { Calendar, Clock, CheckCircle, AlertCircle, BookOpen, CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { dummyHomework } from '@/data/dummyData';

interface Assignment {
  id: string;
  subject: string;
  title: string;
  description: string;
  due_date: string;
  priority: string;
  status: string;
  faculty?: {
    name: string;
  };
}

const Homework = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      
      // Check if user is logged in
      const currentUser = localStorage.getItem('currentUser');
      
      if (currentUser) {
        // User is logged in - fetch real data
        const { data, error } = await supabase
          .from('homework_assignments')
          .select(`
            *,
            faculty (
              name
            )
          `)
          .order('due_date', { ascending: true });

        if (error) {
          console.error('Error fetching assignments:', error);
          toast.error('Failed to load assignments');
          setAssignments(dummyHomework);
          return;
        }

        setAssignments(data || []);
      } else {
        // User not logged in - use dummy data
        setAssignments(dummyHomework);
      }
    } catch (error) {
      console.error('Error:', error);
      setAssignments(dummyHomework);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  // Filter assignments based on selected date
  const filteredAssignments = selectedDate 
    ? assignments.filter(assignment => {
        const assignmentDate = new Date(assignment.due_date);
        return assignmentDate.toDateString() === selectedDate.toDateString();
      })
    : assignments;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <NavigationHeader title="Homework" subtitle="Track your assignments and deadlines" />
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading assignments...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="Homework" subtitle="Track your assignments and deadlines" />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Date Picker */}
        <div className="mb-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal card-3d",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-6">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className={`card-3d p-6 border-l-4 ${getPriorityColor(assignment.priority)} animate-fade-in`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(assignment.status)}
                    <h3 className="text-xl font-bold text-gray-800">
                      {assignment.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                      {assignment.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-purple-600 font-medium mb-2">
                    {assignment.subject}
                  </p>
                  
                  {assignment.faculty && (
                    <p className="text-gray-500 text-sm mb-2">
                      Assigned by: {assignment.faculty.name}
                    </p>
                  )}
                  
                  <p className="text-gray-600 mb-4">
                    {assignment.description || 'No description provided'}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(assignment.due_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span className="capitalize">{assignment.priority} Priority</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAssignments.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {selectedDate ? 'No assignments for this date' : 'No assignments yet'}
            </h3>
            <p className="text-gray-600">
              {selectedDate 
                ? `No homework assignments are due on ${format(selectedDate, "PPP")}.`
                : 'Your homework assignments will appear here.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homework;
