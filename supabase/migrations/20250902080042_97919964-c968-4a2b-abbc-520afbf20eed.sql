-- Create classes table
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  section TEXT,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  roll_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL,
  year INTEGER NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  class_id UUID REFERENCES public.classes(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create class_timetable table
CREATE TABLE public.class_timetable (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) NOT NULL,
  day_of_week TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  subject TEXT NOT NULL,
  faculty TEXT NOT NULL,
  room TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exam_timetable table
CREATE TABLE public.exam_timetable (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) NOT NULL,
  subject TEXT NOT NULL,
  exam_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT,
  exam_type TEXT DEFAULT 'Regular',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create homework_assignments table
CREATE TABLE public.homework_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  assigned_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create results table
CREATE TABLE public.results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) NOT NULL,
  subject TEXT NOT NULL,
  marks INTEGER NOT NULL,
  total_marks INTEGER NOT NULL DEFAULT 100,
  grade TEXT,
  exam_type TEXT DEFAULT 'Term',
  exam_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create school_events table
CREATE TABLE public.school_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME,
  location TEXT,
  category TEXT NOT NULL,
  participants_info TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a demo app)
CREATE POLICY "Anyone can view classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Anyone can view class_timetable" ON public.class_timetable FOR SELECT USING (true);
CREATE POLICY "Anyone can view exam_timetable" ON public.exam_timetable FOR SELECT USING (true);
CREATE POLICY "Anyone can view homework_assignments" ON public.homework_assignments FOR SELECT USING (true);
CREATE POLICY "Anyone can view results" ON public.results FOR SELECT USING (true);
CREATE POLICY "Anyone can view school_events" ON public.school_events FOR SELECT USING (true);

-- Insert sample class
INSERT INTO public.classes (id, name, section, year) VALUES 
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Computer Science Engineering', 'A', 3);

-- Insert sample student profile
INSERT INTO public.profiles (id, roll_number, name, email, department, year, phone, class_id) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'CS21A001', 'Alexandra Johnson', 'alexandra.johnson@university.edu', 'Computer Science Engineering', 3, '+1-555-0123', 'f47ac10b-58cc-4372-a567-0e02b2c3d479');

-- Insert class timetable data
INSERT INTO public.class_timetable (class_id, day_of_week, start_time, end_time, subject, faculty, room) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Monday', '09:00', '10:00', 'Data Structures', 'Dr. Smith', 'CS-101'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Monday', '10:00', '11:00', 'Database Systems', 'Prof. Johnson', 'CS-102'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Monday', '11:30', '12:30', 'Operating Systems', 'Dr. Williams', 'CS-103'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Monday', '14:00', '15:00', 'Computer Networks', 'Prof. Brown', 'CS-104'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Tuesday', '09:00', '10:00', 'Software Engineering', 'Dr. Davis', 'CS-105'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Tuesday', '10:00', '11:00', 'Algorithm Analysis', 'Prof. Wilson', 'CS-106'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Tuesday', '11:30', '12:30', 'Web Development', 'Dr. Taylor', 'CS-107'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Tuesday', '14:00', '15:00', 'Machine Learning', 'Prof. Anderson', 'CS-108'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Wednesday', '09:00', '10:00', 'Data Structures Lab', 'Dr. Smith', 'Lab-1'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Wednesday', '10:00', '12:00', 'Database Lab', 'Prof. Johnson', 'Lab-2'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Wednesday', '14:00', '15:00', 'Computer Graphics', 'Dr. Moore', 'CS-109'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Thursday', '09:00', '10:00', 'Artificial Intelligence', 'Prof. Garcia', 'CS-110'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Thursday', '10:00', '11:00', 'Cybersecurity', 'Dr. Martinez', 'CS-111'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Thursday', '11:30', '12:30', 'Mobile Development', 'Prof. Lee', 'CS-112'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Thursday', '14:00', '16:00', 'Project Work', 'Dr. Clark', 'CS-113'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Friday', '09:00', '10:00', 'Cloud Computing', 'Prof. White', 'CS-114'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Friday', '10:00', '11:00', 'Data Analytics', 'Dr. Hall', 'CS-115'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Friday', '11:30', '12:30', 'Blockchain Technology', 'Prof. Young', 'CS-116'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Friday', '14:00', '15:00', 'Seminar', 'Various Faculty', 'Auditorium');

-- Insert exam timetable data
INSERT INTO public.exam_timetable (class_id, subject, exam_date, start_time, end_time, room, exam_type) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Data Structures', '2024-03-15', '09:00', '12:00', 'Exam Hall A', 'Mid Term'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Database Systems', '2024-03-17', '09:00', '12:00', 'Exam Hall B', 'Mid Term'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Operating Systems', '2024-03-19', '14:00', '17:00', 'Exam Hall A', 'Mid Term'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Computer Networks', '2024-03-21', '09:00', '12:00', 'Exam Hall C', 'Mid Term'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Software Engineering', '2024-03-23', '14:00', '17:00', 'Exam Hall B', 'Mid Term'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Algorithm Analysis', '2024-03-25', '09:00', '12:00', 'Exam Hall A', 'Mid Term'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Web Development', '2024-03-27', '14:00', '17:00', 'Exam Hall C', 'Mid Term'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Machine Learning', '2024-03-29', '09:00', '12:00', 'Exam Hall B', 'Mid Term');

-- Insert homework assignments
INSERT INTO public.homework_assignments (class_id, title, description, subject, assigned_date, due_date, status) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Binary Tree Implementation', 'Implement a binary search tree with insert, delete, and search operations', 'Data Structures', '2024-02-01', '2024-02-08', 'completed'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Database Design Project', 'Design a normalized database schema for a library management system', 'Database Systems', '2024-02-05', '2024-02-15', 'in_progress'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Process Scheduling Algorithms', 'Implement and compare FCFS, SJF, and Round Robin scheduling', 'Operating Systems', '2024-02-10', '2024-02-20', 'pending'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Network Protocol Analysis', 'Analyze TCP/IP packet flow using Wireshark', 'Computer Networks', '2024-02-12', '2024-02-22', 'pending'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Software Requirements Document', 'Create SRS for a student management system', 'Software Engineering', '2024-02-15', '2024-02-25', 'pending'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Sorting Algorithm Comparison', 'Compare time complexity of different sorting algorithms', 'Algorithm Analysis', '2024-02-18', '2024-02-28', 'pending'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Responsive Web Portfolio', 'Create a responsive portfolio website using HTML, CSS, JS', 'Web Development', '2024-02-20', '2024-03-01', 'pending'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Linear Regression Model', 'Implement linear regression from scratch using Python', 'Machine Learning', '2024-02-22', '2024-03-05', 'pending');

-- Insert student results
INSERT INTO public.results (student_id, subject, marks, total_marks, grade, exam_type, exam_date) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Data Structures', 92, 100, 'A+', 'Mid Term', '2024-01-15'),
('550e8400-e29b-41d4-a716-446655440000', 'Database Systems', 88, 100, 'A', 'Mid Term', '2024-01-17'),
('550e8400-e29b-41d4-a716-446655440000', 'Operating Systems', 85, 100, 'A', 'Mid Term', '2024-01-19'),
('550e8400-e29b-41d4-a716-446655440000', 'Computer Networks', 90, 100, 'A+', 'Mid Term', '2024-01-21'),
('550e8400-e29b-41d4-a716-446655440000', 'Software Engineering', 87, 100, 'A', 'Mid Term', '2024-01-23'),
('550e8400-e29b-41d4-a716-446655440000', 'Algorithm Analysis', 94, 100, 'A+', 'Mid Term', '2024-01-25'),
('550e8400-e29b-41d4-a716-446655440000', 'Web Development', 89, 100, 'A', 'Mid Term', '2024-01-27'),
('550e8400-e29b-41d4-a716-446655440000', 'Machine Learning', 91, 100, 'A+', 'Mid Term', '2024-01-29');

-- Insert school events
INSERT INTO public.school_events (title, description, event_date, start_time, location, category, participants_info, is_featured) VALUES
('Annual Tech Fest 2024', 'Three-day technology festival featuring competitions, workshops, and exhibitions', '2024-03-15', '09:00', 'Main Campus', 'Academic', 'Open to all students and external participants', true),
('Career Fair', 'Meet with top tech companies and explore internship and job opportunities', '2024-03-20', '10:00', 'Convention Center', 'Career', 'Final year students and alumni welcome', true),
('AI Workshop Series', 'Hands-on workshop covering machine learning fundamentals and practical applications', '2024-03-25', '14:00', 'Computer Lab A', 'Workshop', 'CS and IT students preferred', false),
('Inter-College Sports Meet', 'Annual sports competition featuring multiple events and team competitions', '2024-04-01', '08:00', 'Sports Complex', 'Sports', 'All students can participate', false),
('Cultural Night', 'Evening of music, dance, and cultural performances by students', '2024-04-10', '18:00', 'Main Auditorium', 'Cultural', 'Open to all students and faculty', false),
('Coding Competition', 'Individual and team programming challenges with exciting prizes', '2024-04-15', '10:00', 'Computer Lab B', 'Competition', 'Programming enthusiasts welcome', true);