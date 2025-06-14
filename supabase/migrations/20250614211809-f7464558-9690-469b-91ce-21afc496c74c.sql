
-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roll_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL,
  year INTEGER NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  PRIMARY KEY (id)
);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  credits INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create homework/assignments table
CREATE TABLE public.homework (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'late', 'graded')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create student homework submissions table
CREATE TABLE public.homework_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  homework_id UUID NOT NULL REFERENCES public.homework(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  submitted_at TIMESTAMP WITH TIME ZONE,
  grade DECIMAL(5,2),
  feedback TEXT,
  status TEXT NOT NULL DEFAULT 'not_submitted' CHECK (status IN ('not_submitted', 'submitted', 'graded')),
  
  UNIQUE(homework_id, student_id)
);

-- Create timetable table
CREATE TABLE public.timetable (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT NOT NULL,
  teacher TEXT NOT NULL,
  class_type TEXT NOT NULL DEFAULT 'lecture' CHECK (class_type IN ('lecture', 'lab', 'tutorial', 'exam')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create school events table
CREATE TABLE public.school_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  event_type TEXT NOT NULL DEFAULT 'general' CHECK (event_type IN ('academic', 'cultural', 'sports', 'general', 'exam')),
  is_mandatory BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create event registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.school_events(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  attendance_status TEXT DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'attended', 'absent')),
  
  UNIQUE(event_id, student_id)
);

-- Create exams table
CREATE TABLE public.exams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL CHECK (exam_type IN ('mid-term', 'final', 'quiz', 'practical')),
  exam_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 180,
  max_score DECIMAL(5,2) NOT NULL DEFAULT 100.00,
  room TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create results table
CREATE TABLE public.results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  score DECIMAL(5,2) NOT NULL,
  grade TEXT,
  rank INTEGER,
  total_students INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  UNIQUE(exam_id, student_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for subjects (readable by all authenticated users)
CREATE POLICY "Authenticated users can view subjects" ON public.subjects
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for homework (readable by all authenticated users)
CREATE POLICY "Authenticated users can view homework" ON public.homework
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for homework submissions
CREATE POLICY "Students can view their own submissions" ON public.homework_submissions
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can create their own submissions" ON public.homework_submissions
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own submissions" ON public.homework_submissions
  FOR UPDATE USING (auth.uid() = student_id);

-- Create RLS policies for timetable (readable by all authenticated users)
CREATE POLICY "Authenticated users can view timetable" ON public.timetable
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for school events (readable by all authenticated users)
CREATE POLICY "Authenticated users can view events" ON public.school_events
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for event registrations
CREATE POLICY "Students can view their own registrations" ON public.event_registrations
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can create their own registrations" ON public.event_registrations
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Create RLS policies for exams (readable by all authenticated users)
CREATE POLICY "Authenticated users can view exams" ON public.exams
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for results
CREATE POLICY "Students can view their own results" ON public.results
  FOR SELECT USING (auth.uid() = student_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, roll_number, name, email, department, year)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'roll_number', 'TEMP' || EXTRACT(EPOCH FROM NOW())::TEXT),
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'department', 'General'),
    COALESCE((NEW.raw_user_meta_data->>'year')::INTEGER, 1)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample subjects
INSERT INTO public.subjects (name, code, department, credits) VALUES
  ('Mathematics', 'MATH101', 'Computer Science', 4),
  ('English Literature', 'ENG201', 'Arts', 3),
  ('Science', 'SCI101', 'Science', 4),
  ('History', 'HIST101', 'Arts', 3),
  ('Programming Fundamentals', 'CS101', 'Computer Science', 4),
  ('Database Systems', 'CS201', 'Computer Science', 3);

-- Insert sample homework
INSERT INTO public.homework (subject_id, title, description, due_date) VALUES
  ((SELECT id FROM public.subjects WHERE code = 'MATH101'), 'Calculus Assignment', 'Complete exercises 1-15 from Chapter 3', '2024-06-20T23:59:59Z'),
  ((SELECT id FROM public.subjects WHERE code = 'ENG201'), 'Essay on Shakespeare', 'Write a 1000-word essay on Hamlet', '2024-06-18T23:59:59Z'),
  ((SELECT id FROM public.subjects WHERE code = 'CS101'), 'Programming Project', 'Create a simple calculator application', '2024-06-25T23:59:59Z');

-- Insert sample timetable entries
INSERT INTO public.timetable (subject_id, day_of_week, start_time, end_time, room, teacher, class_type) VALUES
  ((SELECT id FROM public.subjects WHERE code = 'MATH101'), 1, '09:00', '10:30', 'Room 101', 'Dr. Smith', 'lecture'),
  ((SELECT id FROM public.subjects WHERE code = 'ENG201'), 2, '11:00', '12:30', 'Room 205', 'Prof. Johnson', 'lecture'),
  ((SELECT id FROM public.subjects WHERE code = 'CS101'), 3, '14:00', '15:30', 'Lab 1', 'Dr. Wilson', 'lab');

-- Insert sample school events
INSERT INTO public.school_events (title, description, event_date, location, event_type) VALUES
  ('Annual Science Fair', 'Students showcase their science projects', '2024-06-30T10:00:00Z', 'Main Auditorium', 'academic'),
  ('Sports Day', 'Inter-class sports competition', '2024-07-05T08:00:00Z', 'Sports Ground', 'sports'),
  ('Cultural Festival', 'Music, dance, and drama performances', '2024-07-10T18:00:00Z', 'Cultural Hall', 'cultural');

-- Insert sample exams
INSERT INTO public.exams (subject_id, exam_type, exam_date, max_score, room) VALUES
  ((SELECT id FROM public.subjects WHERE code = 'MATH101'), 'mid-term', '2024-06-15T09:00:00Z', 100.00, 'Exam Hall A'),
  ((SELECT id FROM public.subjects WHERE code = 'ENG201'), 'final', '2024-06-20T14:00:00Z', 100.00, 'Exam Hall B'),
  ((SELECT id FROM public.subjects WHERE code = 'SCI101'), 'practical', '2024-06-18T10:00:00Z', 100.00, 'Science Lab');
