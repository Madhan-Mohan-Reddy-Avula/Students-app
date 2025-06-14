
-- First, let's add the missing columns to the profiles table for students
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Create faculty/teachers table
CREATE TABLE public.faculty (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create classes table
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  section TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add class_id to profiles table to link students to classes
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS class_id UUID REFERENCES public.classes(id);

-- Update subjects table to include department_id
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS department_id UUID;

-- Update timetable table to match class_timetable requirements
ALTER TABLE public.timetable 
  ADD COLUMN IF NOT EXISTS date DATE,
  ADD COLUMN IF NOT EXISTS faculty_id UUID REFERENCES public.faculty(id),
  ADD COLUMN IF NOT EXISTS class_id UUID REFERENCES public.classes(id),
  ADD COLUMN IF NOT EXISTS room_location TEXT;

-- Update the room column name for consistency
ALTER TABLE public.timetable RENAME COLUMN room TO room_temp;
ALTER TABLE public.timetable DROP COLUMN IF EXISTS room_temp;

-- Update exams table to match requirements
ALTER TABLE public.exams 
  ADD COLUMN IF NOT EXISTS start_time TIME,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS type TEXT CHECK (type IN ('Written', 'Practical')),
  ADD COLUMN IF NOT EXISTS syllabus_coverage TEXT,
  ADD COLUMN IF NOT EXISTS start_date DATE,
  ADD COLUMN IF NOT EXISTS end_date DATE,
  ADD COLUMN IF NOT EXISTS pdf_reference_url TEXT,
  ADD COLUMN IF NOT EXISTS class_id UUID REFERENCES public.classes(id);

-- Update school_events table
ALTER TABLE public.school_events 
  ADD COLUMN IF NOT EXISTS start_time TIME,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS participants_info TEXT,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Update event_registrations table to match requirements
ALTER TABLE public.event_registrations 
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS participation_type TEXT,
  ADD COLUMN IF NOT EXISTS skill_level TEXT,
  ADD COLUMN IF NOT EXISTS group_size INTEGER,
  ADD COLUMN IF NOT EXISTS message TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Create student_results table (replacing the generic results table structure)
CREATE TABLE public.student_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  current_score DECIMAL(5,2) NOT NULL,
  previous_score DECIMAL(5,2),
  max_score DECIMAL(5,2) NOT NULL DEFAULT 100.00,
  current_grade TEXT,
  exam_type TEXT NOT NULL,
  exam_date DATE NOT NULL,
  class_rank INTEGER,
  total_students INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create homework_assignments table (updating the existing homework table)
CREATE TABLE public.homework_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  class_id UUID REFERENCES public.classes(id),
  faculty_id UUID REFERENCES public.faculty(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create student_assignments table (updating homework_submissions)
CREATE TABLE public.student_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID NOT NULL REFERENCES public.homework_assignments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  submission_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  UNIQUE(assignment_id, user_id)
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_timetable_id UUID NOT NULL REFERENCES public.timetable(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, class_timetable_id, date)
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('exam_reminder', 'event_update', 'assignment_due')),
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security on new tables
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for faculty (readable by all authenticated users)
CREATE POLICY "Authenticated users can view faculty" ON public.faculty
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for classes (readable by all authenticated users)
CREATE POLICY "Authenticated users can view classes" ON public.classes
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for student_results
CREATE POLICY "Students can view their own results" ON public.student_results
  FOR SELECT USING (auth.uid() = user_id);

-- Create RLS policies for homework_assignments (readable by all authenticated users)
CREATE POLICY "Authenticated users can view homework assignments" ON public.homework_assignments
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for student_assignments
CREATE POLICY "Students can view their own assignments" ON public.student_assignments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can create their own assignments" ON public.student_assignments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update their own assignments" ON public.student_assignments
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for attendance
CREATE POLICY "Students can view their own attendance" ON public.attendance
  FOR SELECT USING (auth.uid() = user_id);

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample data for classes
INSERT INTO public.classes (name, year, section) VALUES
  ('1st Grade', 1, 'A'),
  ('2nd Grade', 2, 'A'),
  ('10th Grade', 10, 'A'),
  ('12th Grade', 12, 'Science');

-- Insert sample faculty data
INSERT INTO public.faculty (name, subject, department, email, phone) VALUES
  ('Dr. Smith', 'Mathematics', 'Science', 'smith@school.edu', '+1234567890'),
  ('Prof. Johnson', 'English Literature', 'Arts', 'johnson@school.edu', '+1234567891'),
  ('Dr. Wilson', 'Computer Science', 'Technology', 'wilson@school.edu', '+1234567892'),
  ('Ms. Brown', 'Physics', 'Science', 'brown@school.edu', '+1234567893');

-- Insert sample homework assignments
INSERT INTO public.homework_assignments (subject, title, description, due_date, priority, class_id, faculty_id) VALUES
  ('Mathematics', 'Algebra Problems', 'Solve equations 1-20 from Chapter 5', '2024-06-25T23:59:59Z', 'high', 
   (SELECT id FROM public.classes WHERE name = '10th Grade' LIMIT 1),
   (SELECT id FROM public.faculty WHERE name = 'Dr. Smith' LIMIT 1)),
  ('English', 'Essay Writing', 'Write a 500-word essay on environmental conservation', '2024-06-28T23:59:59Z', 'medium',
   (SELECT id FROM public.classes WHERE name = '10th Grade' LIMIT 1),
   (SELECT id FROM public.faculty WHERE name = 'Prof. Johnson' LIMIT 1));

-- Insert sample notifications
INSERT INTO public.notifications (user_id, title, message, type) 
SELECT 
  id as user_id,
  'Welcome to Students App!',
  'Your account has been created successfully. Explore all the features available.',
  'event_update'
FROM public.profiles 
LIMIT 1;
